import { QueryCountOptions } from "./namedParameters"
import { getTableName } from "./protocols"
import {
  QueryPaginator as BasePaginator,
  DynamoDbPaginatorInterface
} from "@invisit/dynamodb-query-iterator"
import { assign } from "lodash"
import {
  ZeroArgumentsConstructor,
  unmarshallItem,
  Schema
} from "@invisit/dynamodb-data-marshaller"
import { QueryInput } from "aws-sdk/clients/dynamodb"
import { asOption } from "@3fv/prelude-ts"
import DynamoDB = require("aws-sdk/clients/dynamodb")
import { DynamoDbResultsPage } from "@invisit/dynamodb-query-iterator/DynamoDbResultsPage"


/**
 * Iterates over each page of items returned by a DynamoDB query until no more
 * pages are available.
 */
export class QueryCountPaginator implements AsyncIterable<DynamoDbResultsPage> {
  protected readonly itemSchema: Schema
  protected lastKey?: DynamoDbResultsPage
  protected lastResolved: Promise<IteratorResult<DynamoDbResultsPage>> = Promise.resolve() as any
  
  protected readonly paginator: DynamoDbPaginatorInterface
  protected readonly valueConstructor: ZeroArgumentsConstructor<any>
  
  constructor(
    client: DynamoDB,
    valueConstructor: ZeroArgumentsConstructor<DynamoDbResultsPage>,
    options: QueryCountOptions & { tableNamePrefix?: string } = {}
  ) {
    let {
      indexName,
      readConsistency,
      tableNamePrefix: prefix,
      expressionAttributeNames,
      expressionAttributeValues,
      keyConditionExpression
    } = options

    const req: QueryInput = {
      TableName: getTableName(valueConstructor.prototype, prefix),
      IndexName: indexName,
      Select: "COUNT"
    }

    if (readConsistency === "strong") {
      req.ConsistentRead = true
    }

    req.KeyConditionExpression = keyConditionExpression

    asOption(expressionAttributeNames).tap(ExpressionAttributeNames => {
      assign(req, { ExpressionAttributeNames })
    })

    asOption(expressionAttributeValues).tap(ExpressionAttributeValues => {
      assign(req, { ExpressionAttributeValues })
    })

    this.paginator = new BasePaginator(client, req)
    this.valueConstructor = valueConstructor
    
  }
  
  /**
   * @inheritDoc
   */
  [Symbol.asyncIterator]() {
    return this
  }
  
  /**
   * @inheritDoc
   */
  next(): Promise<IteratorResult<DynamoDbResultsPage>> {
    this.lastResolved = this.lastResolved.then(() => this.getNext())
    return this.lastResolved
  }
  
  /**
   * @inheritDoc
   */
  return(): Promise<IteratorResult<DynamoDbResultsPage>> {
    // Prevent any further use of this iterator
    this.lastResolved = Promise.reject(new Error("Iteration has been manually interrupted and may not be resumed"))
    this.lastResolved.catch(() => {})
    
    return this.paginator.return() as any
  }
  
  /**
   * Retrieve the reported capacity consumed by this paginator. Will be
   * undefined unless returned consumed capacity is requested.
   */
  get consumedCapacity():DynamoDB.ConsumedCapacity | undefined {
    return this.paginator.consumedCapacity
  }
  
  /**
   * Retrieve the number of items yielded thus far by this paginator.
   */
  get count() {
    return this.paginator.count
  }
  
  /**
   * Retrieve the last reported `LastEvaluatedKey`, unmarshalled according to
   * the schema used by this paginator.
   */
  get lastEvaluatedKey(): Partial<DynamoDbResultsPage> | undefined {
    return this.lastKey
  }
  
  /**
   * Retrieve the number of items scanned thus far during the execution of
   * this paginator. This number should be the same as {@link count} unless a
   * filter expression was used.
   */
  get scannedCount() {
    return this.paginator.scannedCount
  }
  
  protected async getNext(): Promise<IteratorResult<DynamoDbResultsPage>> {
    return this.paginator.next().then(({ value = {}, done }) => {
      if (!done) {
        this.lastKey =
          value.LastEvaluatedKey && unmarshallItem(this.itemSchema, value.LastEvaluatedKey, this.valueConstructor)
        
        return {
          value, //.map((item: any) => unmarshallItem(this.itemSchema, item, this.valueConstructor)),
          done: false
        }
      }
      
      return { done: true } as IteratorResult<DynamoDbResultsPage>
    })
  }
}
