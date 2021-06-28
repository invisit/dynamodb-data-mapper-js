import { getLogger } from "@3fv/logger-proxy"
import {
  ZeroArgumentsConstructor,
  unmarshallItem
} from "@invisit/dynamodb-data-marshaller"
import {Bind} from "@invisit/decorators"
import {
  DataMapper,
  UpdateOptions,
  DeleteOptions,
  StringToAnyObjectMap,
  PutOptions,
  QueryOptions,
  GetOptions,
  BatchGetOptions,
  getSchema,
  QueryCountOptions,
  QueryCountPaginator,
  ScanOptions
} from "@invisit/dynamodb-data-mapper"
import { assign, cloneDeep, isEmpty, negate } from "lodash"
import {
  ConditionExpression,
  ConditionExpressionPredicate
} from "@invisit/dynamodb-expressions"
import { asOption } from "@3fv/prelude-ts"
import { chunk } from "lodash/fp"
import {
  DynamoResultSet,
  DynamoExecuteStatementOptions,
  DynamoExecuteStatementConfig
} from "./models"
import { Deferred } from "@3fv/deferred"
import * as AWS from "aws-sdk"
// noinspection ES6PreferShortImport
//import { getTableNamePrefix } from "../../util/dynamo-tools"

const log = getLogger(__filename)
const { debug } = log
const isNotEmpty = negate(isEmpty)
async function iterableToArray<T = any>(
  iterator: AsyncIterableIterator<T> | IterableIterator<T>
) {
  const items = Array<T>()

  for await (const item of iterator) {
    items.push(item)
  }

  return items
}

export class DynamoRepository<
  T extends StringToAnyObjectMap,
  HasSortKey extends boolean = false,
  Ctor extends ZeroArgumentsConstructor<T> = ZeroArgumentsConstructor<T>
> {
  @Bind
  get(
    partialItem: Partial<T>,
    options: GetOptions = {}
  ): Promise<T> {
    return this.mapper.get<T>(
      this.newInstance(partialItem),
      options
    )
  }

  @Bind
  async count(options: QueryCountOptions): Promise<number> {
    const [client, docClient] = [
      this.client,
      this.docClient
    ]
    const iter = new QueryCountPaginator(
      client,
      this.clazz,
      {
        tableNamePrefix: DynamoRepository.getTableNamePrefix(),
        ...options
      }
    )

    let total = 0
    for await (const page of iter) {
      const pageTotal = page.Count ?? 0
      log.info(`page`, page, pageTotal)

      total += pageTotal
    }

    return total
  }

  @Bind
  async batchGet(
    partialItems: Array<Partial<T>>,
    options: BatchGetOptions = {}
  ): Promise<T[]> {
    const chunks = chunk(100)(
      partialItems.map(this.newInstance)
    )
    const items = Array<T>()
    for (const chunkItems of chunks) {
      const result = await this.mapper.batchGet<T>(
        chunkItems,
        options
      )
      const itemIterator = await iterableToArray(result)
      items.push(...itemIterator)
    }
    return items
  }

  @Bind
  async query(
    keyCondition:
      | ConditionExpression
      | ConditionPredicatePropertyMap<T>,
    options?: QueryOptions
  ): Promise<T[]> {
    return iterableToArray(
      await this.mapper.query<T>(
        this.clazz,
        keyCondition,
        options
      )
    )
  }

  @Bind
  async all(options?: ScanOptions): Promise<T[]> {
    return iterableToArray(
      await this.mapper.scan<T>(this.clazz, options)
    )
  }

  async executeStatement(
    stmt: string,
    options: DynamoExecuteStatementOptions<HasSortKey> = {}
  ): Promise<DynamoResultSet<T, HasSortKey, Ctor>> {
    const { docClient, client } = this
    const { mapper } = this

    const deferred = new Deferred<
      DynamoResultSet<T, HasSortKey, Ctor>
    >()
    const allItems = Array<T>()
    const execute = async (token?: string) => {
      try {
        const result = await client
          .executeStatement({
            Statement: stmt,
            NextToken: token
          })
          .promise()

        const [nextToken, items] = [
          result.NextToken,
          result.Items
        ]

        const schema = getSchema(this.clazz)
        allItems.push(
          ...items.map(item =>
            unmarshallItem(schema, item, this.clazz)
          )
        )

        if (isNotEmpty(nextToken)) {
          queueMicrotask(() => execute(nextToken))
        } else {
          deferred.resolve(
            new DynamoResultSet(allItems, {
              ...options,
              statement: stmt
            } as DynamoExecuteStatementConfig<HasSortKey>)
          )
        }
      } catch (err) {
        log.error(`statement failed`, err)
        if (!deferred.isSettled()) {
          deferred.reject(err)
        }
      }
    }

    queueMicrotask(() => execute())

    return deferred.promise
  }

  @Bind
  put(item: Partial<T>, options?: PutOptions): Promise<T> {
    return this.mapper.put(
      this.newPersistInstance(item),
      options
    )
  }

  @Bind
  async batchPut(
    partialItems: Array<Partial<T>>
  ): Promise<T[]> {
    return iterableToArray(
      await this.mapper.batchPut<T>(
        partialItems.map(this.newPersistInstance)
      )
    )
    //return this.mapper.get<T>(this.newInstance({ ...keys }))
  }

  @Bind
  save(item: Partial<T>, options?: PutOptions): Promise<T> {
    return this.put(item, options)
  }

  @Bind
  update(
    item: Partial<T>,
    options?: UpdateOptions
  ): Promise<T> {
    return this.mapper.update(
      this.newPersistInstance(item),
      options
    )
  }

  @Bind
  delete(
    item: Partial<T>,
    options?: DeleteOptions
  ): Promise<T> {
    return this.mapper.delete(
      this.newPersistInstance(item),
      options
    )
  }

  @Bind
  async batchDelete(
    partialItems: Array<Partial<T>>
  ): Promise<T[]> {
    return iterableToArray(
      await this.mapper.batchDelete<T>(
        partialItems.map(this.newPersistInstance)
      )
    )
    //return this.mapper.get<T>(this.newInstance({ ...keys }))
  }

  //, isPersistEvent: boolean =  false
  @Bind
  newInstance(source: Partial<T>): T {
    return assign(new this.clazz(), cloneDeep(source))
  }

  @Bind
  newPersistInstance(source: Partial<T>): T {
    return assign(
      new this.clazz(),
      cloneDeep(source),

      // TODO: implement some sort of extension injection system, for later
      // isAuditable(this.clazz)
      //   ? asOption(new Date())
      //       .map(updatedAt => ({
      //         createdAt:
      //           (source as any).createdAt ?? updatedAt,
      //         updatedAt
      //       }))
      //       .get()
      //   : {}
    )
  }

  constructor(
    public readonly mapper: DataMapper,
    public readonly clazz: Ctor,
    public readonly client: AWS.DynamoDB,
    public readonly docClient: AWS.DynamoDB.DocumentClient,
    public readonly hasSortKey: HasSortKey = false as HasSortKey
  ) {

  }

  private static state = {
    tableNamePrefix: ""
  }

  static getTableNamePrefix() {
    return DynamoRepository.state.tableNamePrefix
  }

  static setTableNamePrefix(tableNamePrefix: string):string {
    return Object.assign(DynamoRepository.state, { tableNamePrefix }).tableNamePrefix
  }
}

export type ConditionPredicatePropertyMap<T extends {}> =
  Partial<
    {
      [propertyName in keyof T]:
        | ConditionExpressionPredicate
        | any
    }
  >
