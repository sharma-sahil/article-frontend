import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/article.service';
import { ArticleDetails } from 'src/app/shared/models/article-detail.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailsComponent implements OnInit {

  articleId: number;

  articleDetail!: ArticleDetails;

  isSubmitting = false;

  commentForm: FormGroup;

  showArticleClosed = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.articleId = this.route.snapshot.params.id;
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.articleService.getArticleDetails(this.articleId).subscribe(
      data => {
        this.articleDetail = data;
        this.cd.markForCheck();
      },
      err => {
        console.log({ err });
      }
    )
  }

  submitForm() {
    this.isSubmitting = true;

    this.articleService
      .postComment(this.commentForm.get('comment')?.value, this.articleId)
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.articleDetail.replies.splice(0, 0, data);
          this.commentForm.reset();
          this.cd.markForCheck();
        },
        err => {
          console.log({ err })

          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
  }

  closeArticle(commentId: number) {
    this.articleService.closeQuestion(this.articleId, commentId).subscribe(
      data => {
        this.articleDetail = data;
        this.showArticleClosed = true;
        this.cd.markForCheck();
        setTimeout(() => {
          this.showArticleClosed = false;
          this.cd.markForCheck();
        }, 3000, this);
      },
      err => {
        console.log({ err });
        this.cd.markForCheck();
      }
    )
  }

}
