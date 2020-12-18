import {PropertyAnnotation} from './annotationShapes';
import {hashKey} from './hashKey';
import {StringType} from '@invisit/dynamodb-data-marshaller';
import {v4} from 'uuid';

export function autoGeneratedHashKey(
    parameters: Partial<StringType> = {}
): PropertyAnnotation {
    return hashKey({
        ...parameters,
        type: 'String',
        defaultProvider: v4,
    });
}
