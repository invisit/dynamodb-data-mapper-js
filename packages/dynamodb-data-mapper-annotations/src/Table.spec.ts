import {Table} from "./Table";
import {DynamoDbTable} from '@invisit/dynamodb-data-mapper';

describe('table', () => {
    it(
        'should bind the provided table name to the target in a way compatible with the DynamoDbTable protocol',
        () => {
            class MyDocument {}
            const tableName = 'tableName';
            const decorator = Table(tableName);
            decorator(MyDocument);

            expect((new MyDocument() as any)[DynamoDbTable.description]).toBe(tableName);
        }
    );
});
