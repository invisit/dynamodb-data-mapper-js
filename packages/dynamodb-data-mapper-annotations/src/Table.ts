import { ClassAnnotation } from "./AnnotationShapes"
import { DynamoDbTable } from "@invisit/dynamodb-data-mapper"
import { asOption } from "@3fv/prelude-ts"
import { isString } from "@3fv/guard"

/**
 * Declare a TypeScript class to represent items in a table in a way that is
 * understandable by the AWS DynamoDB DataMapper for JavaScript. Meant to be
 * used as a TypeScript class decorator in projects compiled with the
 * `experimentalDecorators` option enabled.
 *
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html
 * @see https://www.typescriptlang.org/docs/handbook/compiler-options.html
 */
export function Table(tableNameOverride?: string): ClassAnnotation {
    return constructor => {


      constructor.prototype[DynamoDbTable] = asOption(tableNameOverride)
        .filter(isString)
        .orElse(() => asOption(constructor?.name as string))
        .filter(isString)
        .getOrThrow(`No name for ctor ${constructor}`)
    };
}
