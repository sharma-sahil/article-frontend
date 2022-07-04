import { CommentResponse } from "./comment-response.model";
import { UserResponse } from "./user-response.model";

export interface ArticleDetails {
    id: number;
    subject: string;
    body: string;
    product: string;
    user : UserResponse;
    createdOn: string;
    replies: CommentResponse[];
    status: string;
}
