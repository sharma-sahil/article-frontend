import { UserResponse } from "./user-response.model";

export interface PagedArticlePreviewResponse {
    data: ArticlePreview[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}

export interface ArticlePreview {
    id: number;
    subject: string;
    body: string;
    product: string;
    user: UserResponse;
    createdOn: string;
    status: string;
}
