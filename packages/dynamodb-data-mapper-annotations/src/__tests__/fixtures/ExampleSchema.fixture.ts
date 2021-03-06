import {
    Attribute,
    AutoGeneratedHashKey,
    RangeKey,
    Table,
    VersionAttribute,
} from "@invisit/dynamodb-data-mapper-annotations"

import { CreateTableOptions, embed } from '@invisit/dynamodb-data-mapper';

export class Author {
    @Attribute()
    name?: string;

    @Attribute({memberType: {type: 'String'}})
    socialMediaHandles?: Map<string, string>;

    @Attribute()
    photo?: Uint8Array;
}

export class Comment {
    /**
     * The time at which this comment was posted
     */
    @Attribute()
    timestamp?: Date;

    /**
     * Whether this comment has been approved by a moderator.
     */
    @Attribute()
    approved?: boolean;

    /**
     * The title of the comment
     */
    @Attribute()
    subject?: string;

    /**
     * The text of the comment
     */
    @Attribute()
    text?: string;

    /**
     * The handle of the comment author
     */
    @Attribute()
    author?: string;

    /**
     * The number of upvotes this comment has received.
     */
    @Attribute()
    upvotes?: number;

    /**
     * The number of downvotes this comment has received.
     */
    @Attribute()
    downvotes?: number;

    /**
     * Replies to this comment
     */
    @Attribute({ memberType: embed(Comment) })
    replies?: Array<Comment>;
}

@Table('Posts')
export class Post {

    static tableOptions: CreateTableOptions = {
        indexOptions: {
            postTitleIndex: {
                projection: "all",
                type: "global"
            }
        }
    }

    @AutoGeneratedHashKey()
    id?: string;

    @RangeKey()
    createdAt?: Date;

    @VersionAttribute()
    version?: number;

    @Attribute()
    author?: Author;

    @Attribute()
    content?: string;

    @Attribute({
        indexKeyConfigurations: {
            postTitleIndex: "HASH"
        }
    })
    title?: string;

    @Attribute()
    subtitle?: string;

    @Attribute()
    imageLink?: string;

    @Attribute({ memberType: { type: 'String' }})
    corrections?: Array<string>;

    /**
     * Replies to this post
     */
    @Attribute({ memberType: embed(Comment) })
    replies?: Array<Comment>;

    @Attribute({ memberType: 'String' })
    tags?: Set<string>;
}
