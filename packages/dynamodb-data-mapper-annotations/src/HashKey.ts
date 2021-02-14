import { PropertyAnnotation } from "./AnnotationShapes"
import { Attribute } from "./Attribute"
import { BinaryType, CustomType, DateType, NumberType, StringType, SchemaType } from "@invisit/dynamodb-data-marshaller"

export type HashKeySchemaType = Partial<BinaryType | CustomType<any> | DateType | NumberType | StringType>

export function hashKey<S extends HashKeySchemaType>(parameters: S = {} as S) {
  return {
    type: 'String',
    ...parameters,
    keyType: "HASH"
  } as S
}

export function HashKey(
  parameters: Partial<BinaryType | CustomType<any> | DateType | NumberType | StringType> = {}
): PropertyAnnotation {
  return Attribute(hashKey(parameters))
}
