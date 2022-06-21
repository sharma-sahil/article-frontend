import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleDetails } from '../shared/models/article-detail.model';
import { CommentResponse } from '../shared/models/comment-response.model';
import { PagedArticlePreviewResponse } from '../shared/models/paged-article-preview-response.model';
import { Product } from '../shared/models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private apiService: ApiService
  ) { }

  getUserArticles(pageNumber: number, pageSize: number): Observable<PagedArticlePreviewResponse> {
    const route = '/question/myQuestions?pageNumber=' + pageNumber + '&pageSize=' + pageSize;

    return this.apiService.get(route)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  searchQuestions(searchText: string, pageNumber: number, pageSize: number): Observable<PagedArticlePreviewResponse> {
    const route = '/question/search?text=' + searchText + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize;

    return this.apiService.get(route)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  getArticleDetails(id: number): Observable<ArticleDetails> {
    const route = '/question/' + id;

    return this.apiService.get(route)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  getAllProducts() : Observable<Product[]> {
    const route = '/product';

    return this.apiService.get(route)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  postComment(comment: string, questionId: number): Observable<CommentResponse> {
    const route = '/reply/';
    const requestBody = {
      "body": comment,
      "question": questionId
    };

    return this.apiService.post(route, requestBody)
      .pipe(map(
        data => {
          console.log({ data });
          return data;
        }
      ));
  }

  postArticle(requestBody: any) : Observable<ArticleDetails> {
    const route = '/question';

    return this.apiService.post(route, requestBody)
      .pipe(map(
        data => {
          console.log({ data });
          return data;
        }
      ));
  }

}
