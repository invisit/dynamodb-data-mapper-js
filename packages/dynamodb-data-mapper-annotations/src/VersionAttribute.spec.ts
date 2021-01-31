import { VersionAttribute } from './VersionAttribute';

jest.mock('./Attribute', () => ({Attribute: jest.fn()}));
import { Attribute } from './Attribute';

describe('versionAttribute', () => {
    beforeEach(() => {
        (Attribute as any).mockClear();
    });

    it(
        'should call attribute with a defined type and versionAttribute trait',
        () => {
            VersionAttribute();

            expect((Attribute as any).mock.calls.length).toBe(1);
            expect((Attribute as any).mock.calls[0]).toEqual([
                {
                    type: 'Number',
                    versionAttribute: true,
                }
            ]);
        }
    );

    it('should pass through any supplied parameters', () => {
        const attributeName = 'foo'
        VersionAttribute({attributeName});

        expect((Attribute as any).mock.calls[0][0])
            .toMatchObject({attributeName});
    });
});
