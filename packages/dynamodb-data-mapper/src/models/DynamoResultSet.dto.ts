import { getLogger } from "@3fv/logger-proxy"
import { assign } from "lodash"
import {
  applyDynamoExecuteStatementDefaults,
  DynamoExecuteStatementConfig,
  DynamoExecuteStatementOptions
} from "./DynamoTypes"
import { StringToAnyObjectMap } from "@invisit/dynamodb-data-mapper"
import { ZeroArgumentsConstructor } from "@invisit/dynamodb-data-marshaller"

const log = getLogger(__filename)

export class DynamoResultSet<
  T extends StringToAnyObjectMap,
  HasSortKey extends boolean = false,
  Ctor extends ZeroArgumentsConstructor<T> = ZeroArgumentsConstructor<T>
  > {

  readonly config: DynamoExecuteStatementConfig<HasSortKey>

  readonly items: T[]


  constructor(items:T[], options?: DynamoExecuteStatementConfig<HasSortKey>)
  constructor(from?:Partial<DynamoResultSet<HasSortKey>>)
  constructor(fromOrItems: T[] | Partial<DynamoResultSet<HasSortKey>> = {}, options: DynamoExecuteStatementOptions<HasSortKey> = {}) {
    if (Array.isArray(fromOrItems)) {
      assign(this, {
        items: fromOrItems,
        config: applyDynamoExecuteStatementDefaults(options)
      })

    } else {

      assign(this, fromOrItems)
    }
  }
}
