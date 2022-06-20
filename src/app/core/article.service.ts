import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleDetails } from '../shared/models/article-detail.model';

import { ArticlePreview } from '../shared/models/article-preview.model';
import { CommentResponse } from '../shared/models/comment-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private apiService: ApiService
  ) { }

  getUserArticles(): Observable<ArticlePreview[]> {
    const route = '/question/myQuestions';

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

}
