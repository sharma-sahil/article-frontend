import { UserResponse } from "./user-response.model";

export interface ArticlePreview {
    id: number;
    subject: string;
    body: string;
    product: string;
    user : UserResponse;
    createdOn: string;
}
