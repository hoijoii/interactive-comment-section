export declare interface IComments {
    currentUser: IUser
    comments: Array<IComment>
}

export declare interface IUser {
    image: IImage
    username: string
}

export declare interface IImage {
    png: string
    webp: string
}

export declare interface IComment {
    id: number
    content: string
    createdAt: string
    score: number
    user: IUser
    replies: Array<IReplies>
    edityn?: boolean
}

export declare interface IReplies {
    id: number
    content: string
    createdAt: string
    score: number
    replyingTo: string
    user: IUser
}