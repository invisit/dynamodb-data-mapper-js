import {PropertyAnnotation} from './AnnotationShapes';
import {Attribute} from './Attribute';
import {NumberType} from '@invisit/dynamodb-data-marshaller';

export function VersionAttribute(
    parameters: Partial<NumberType> = {}
): PropertyAnnotation {
    return Attribute({
        ...parameters,
        type: 'Number',
        versionAttribute: true,
    });
}
