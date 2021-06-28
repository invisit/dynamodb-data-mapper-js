import { AttributeValue } from "@invisit/dynamodb-expressions"

export type DynamoManagerMode = "normal" | "custom-resource"

export interface DynamoRepoConfig<HasSortKey extends boolean> {
  hasSortKey: HasSortKey
}


export type DynamoRepoOptions<HasSortKey extends boolean> = Partial<DynamoRepoConfig<HasSortKey>>

export interface DynamoExecuteStatementConfig<
  HasSortKey extends boolean
  > extends DynamoRepoConfig<HasSortKey> {
  params?: AttributeValue[]
  statement?: string
}

export type DynamoExecuteStatementOptions<HasSortKey extends boolean> = Partial<DynamoRepoConfig<HasSortKey>>


export function applyDynamoRepoDefaults<HasSortKey extends boolean>(overrides: DynamoRepoOptions<HasSortKey> = {}):DynamoRepoConfig<HasSortKey> {
  return {
    hasSortKey: false as HasSortKey,
    ...overrides
  }
}

export function applyDynamoExecuteStatementDefaults<HasSortKey extends boolean>(overrides: DynamoExecuteStatementOptions<HasSortKey> = {}):DynamoExecuteStatementConfig<HasSortKey> {
  return {
    ...applyDynamoRepoDefaults<HasSortKey>(),
    params: [],
    ...overrides
  }
}
