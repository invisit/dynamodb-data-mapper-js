import {PropertyAnnotation} from './AnnotationShapes';
import {Attribute} from './Attribute';
import {
    BinaryType,
    CustomType,
    DateType,
    NumberType,
    StringType,
} from '@invisit/dynamodb-data-marshaller';

export type RangeKeySchemaType = Partial<BinaryType|CustomType<any>|DateType|NumberType|StringType>


export function rangeKey(
  parameters: RangeKeySchemaType = {}
) {
  return {
    ...parameters,
    keyType: 'RANGE',
  } as RangeKeySchemaType
}

export function RangeKey(
    parameters: RangeKeySchemaType = {}
): PropertyAnnotation {
    return Attribute(rangeKey(parameters));
}
