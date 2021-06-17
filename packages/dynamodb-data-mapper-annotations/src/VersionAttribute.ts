import {PropertyAnnotation} from './AnnotationShapes';
import {Attribute} from './Attribute';
import {NumberType} from '@invisit/dynamodb-data-marshaller';

export function versionAttribute(parameters:Partial<NumberType> = {}): Partial<NumberType> {
  return {
    ...parameters,
    type: 'Number',
    versionAttribute: true,
  }
}

export function VersionAttribute(
    parameters: Partial<NumberType> = {}
): PropertyAnnotation {
    return Attribute(versionAttribute(parameters));
}
