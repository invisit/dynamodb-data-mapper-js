import { HashKey } from './HashKey';

jest.mock('./Attribute', () => ({Attribute: jest.fn()}));
import {Attribute} from './Attribute';

describe('hashKey', () => {
    beforeEach(() => {
        (Attribute as any).mockClear();
    });

    it('should call attribute with a defined keyType', () => {
        HashKey();

        expect((Attribute as any).mock.calls.length).toBe(1);
        expect((Attribute as any).mock.calls[0]).toEqual([
            {keyType: 'HASH'}
        ]);
    });

    it('should pass through any supplied parameters', () => {
        const attributeName = 'foo'
        HashKey({attributeName});

        expect((Attribute as any).mock.calls[0][0])
            .toMatchObject({attributeName});
    });
});
