import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { SharedModule } from '../shared/shared.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleHomeComponent } from './article-home/article-home.component';


@NgModule({
  declarations: [ArticleListComponent, ArticleDetailsComponent, CreateArticleComponent, ArticleHomeComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule
  ]
})
export class ArticleModule { }
