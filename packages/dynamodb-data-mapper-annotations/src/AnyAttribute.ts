import { PropertyAnnotation } from "./AnnotationShapes"
import { Attribute } from "./Attribute"
import type { SchemaType } from "@invisit/dynamodb-data-marshaller"

export function anyAttribute<S extends SchemaType>(parameters: Partial<S> = {} as S) {
  return {
    type: "Document",
    members: {},
    ...parameters
  } as S
}


export function AnyAttribute(
  parameters: Partial<SchemaType> = {}
): PropertyAnnotation {
  return Attribute(anyAttribute(parameters))
}
