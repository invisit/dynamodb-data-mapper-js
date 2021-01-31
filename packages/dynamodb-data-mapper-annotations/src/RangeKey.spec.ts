import { RangeKey } from './RangeKey';

jest.mock('./Attribute', () => ({Attribute: jest.fn()}));
import { Attribute } from './Attribute';

describe('rangeKey', () => {
    beforeEach(() => {
        (Attribute as any).mockClear();
    });

    it('should call attribute with a defined keyType', () => {
        RangeKey();

        expect((Attribute as any).mock.calls.length).toBe(1);
        expect((Attribute as any).mock.calls[0]).toEqual([
            {keyType: 'RANGE'}
        ]);
    });

    it('should pass through any supplied parameters', () => {
        const attributeName = 'foo'
        RangeKey({attributeName});

        expect((Attribute as any).mock.calls[0][0])
            .toMatchObject({attributeName});
    });
});
