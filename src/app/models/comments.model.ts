export class Comments {
    cid?: number;
    comment?: string;
    blogId?: number;
    username?: string;
    createdTs?: Date;

    constructor(comment:string, blogId: number, username:string){
        this.comment = comment;
        this.blogId = blogId;
        this.username = username;
    }
}
