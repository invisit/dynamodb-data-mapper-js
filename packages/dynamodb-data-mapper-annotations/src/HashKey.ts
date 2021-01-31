import {PropertyAnnotation} from './AnnotationShapes';
import {Attribute} from './Attribute';
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
    return Attribute({
        ...parameters,
        keyType: 'HASH',
    });
}
