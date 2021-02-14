import { v4 } from "uuid"
import { Attribute } from "./Attribute"
import { StringType } from "@invisit/dynamodb-data-marshaller"


export function uuidAttribute(parameters: Partial<StringType> = {}) {
  return {

    ...parameters,
    type: 'String',

  } as Partial<StringType>
}

export function autoUUIDAttribute(parameters: Partial<StringType> = {}) {
  return {
    ...parameters,
    type: "String",
    defaultProvider: v4
  } as Partial<StringType>
}

export function UUIDAttribute(parameters: Partial<StringType> = {}) {
  return Attribute(uuidAttribute(parameters))
}

export function AutoUUIDAttribute(parameters: Partial<StringType> = {}) {
  return Attribute(autoUUIDAttribute(parameters))
}
