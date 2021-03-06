import { DynamoDbSchema, getSchemaFuzzy } from "./protocols"
import {
    DocumentType,
    ZeroArgumentsConstructor,
} from '@invisit/dynamodb-data-marshaller';

export interface DocumentTypeOptions<T> {
    defaultProvider?: () => T;
    attributeName?: string;
}


export function embed<T>(
    documentConstructor: ZeroArgumentsConstructor<T>,
    {attributeName, defaultProvider}: DocumentTypeOptions<T> = {}
): DocumentType {
    return {
        type: 'Document',
        members: getSchemaFuzzy(documentConstructor, {}),// || {},
        attributeName,
        defaultProvider,
        valueConstructor: documentConstructor
    };
}
