import {PropertyAnnotation} from './annotationShapes';
import {attribute} from './attribute';
import {
    BinaryType,
    CustomType,
    DateType,
    NumberType,
    StringType,
} from '@invisit/dynamodb-data-marshaller';

export function hashKey(
    parameters: Partial<BinaryType|CustomType<any>|DateType|NumberType|StringType> = {}
): PropertyAnnotation {
    return attribute({
        ...parameters,
        keyType: 'HASH',
    });
}
