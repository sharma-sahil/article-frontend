import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/article.service';
import { UserService } from 'src/app/core/user.service';
import { Errors } from 'src/app/shared/models/errors.model';
import { Product } from 'src/app/shared/models/product.model';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticleComponent implements OnInit {

  authType: string = 'register';
  title: string = 'Sign up';
  isSubmitting = false;
  articleForm: FormGroup;

  products: Product[] = [];

  showProductError = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private articleService: ArticleService
  ) {
    // use FormBuilder to create a form group
    this.articleForm = this.fb.group({
      'subject': ['', Validators.required],
      'body': ['', Validators.required],
      'product': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.articleService.getAllProducts().subscribe(
      data => {
        this.products = data;
        this.cd.markForCheck();
      },
      err => console.log({ err })
    )
  }

  submitForm() {

    const productValue = this.articleForm.get('product')?.value;

    if(!productValue || productValue == 'selectProduct') {
      this.showProductError = true;
      return;
    } else {
      this.showProductError = false;
    }

    this.isSubmitting = true;

    const userData = this.articleForm.value;
    this.articleService
      .postArticle(userData)
      .subscribe(
        data => {
          this.router.navigateByUrl('/article')
        },
        err => {
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
  }

}
