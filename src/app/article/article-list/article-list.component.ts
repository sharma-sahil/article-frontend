import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/article.service';
import { ArticlePreview } from 'src/app/shared/models/article-preview.model';
import { Errors } from 'src/app/shared/models/errors.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articleDate = new Date();

  articlePreviewList : ArticlePreview[] = [];
  errors: Errors = { errors: {} };

  constructor(
    private router: Router,
    private articleService: ArticleService,
    
  ) { }

  ngOnInit(): void {
    this.articleService.getUserArticles().subscribe(
      data => {
        this.articlePreviewList = data;
      },
      err => {
        console.log({err})
        this.errors = err;
      }
    )
  }

  openArticleDetails(id: number) {
    const route = '/article/' + id;
    this.router.navigate([route]);
  }

}
