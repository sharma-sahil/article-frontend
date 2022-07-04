import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleHomeComponent } from './article-home/article-home.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { CreateArticleComponent } from './create-article/create-article.component';

const routes: Routes = [
  {
    path: '', component: ArticleHomeComponent,
    children: [
      { path: 'editor', component: CreateArticleComponent },
      { path: ':id', component: ArticleDetailsComponent },
      { path: '', component: ArticleListComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
