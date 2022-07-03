import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/article.service';
import { Errors } from 'src/app/shared/models/errors.model';
import { ArticlePreview } from 'src/app/shared/models/paged-article-preview-response.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {

  articleDate = new Date();

  articlePreviewList: ArticlePreview[] = [];
  errors: Errors = { errors: {} };

  activeTab = 'MY_FEED';


  pageSize = 5;
  pageNumber = 1;
  totalRecords = 0;
  totalPages = 0;

  pageNumberArr: number[] = [];
  firstPageLinkDisabled = false;
  lastPageLinkDisabled = false;
  showPagination = false;

  searchText = '';

  searchTextPrivate = '';

  showNoDataFound = false;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.getUserArticles();
  }

  private getUserArticles() {
    this.showNoDataFound = true;
    this.articleService.getUserArticles(this.pageNumber, this.pageSize).subscribe(
      data => {
        this.articlePreviewList = data.data;
        this.pageNumber = data.pageNumber;
        this.totalPages = data.totalPages;
        this.totalRecords = data.totalRecords;
        if(this.totalRecords <= 0) {
          this.showNoDataFound = true;
        } else {
          this.showNoDataFound = false;
        }
        this.updatePagination();
        this.cd.markForCheck();
      },
      err => {
        console.log({ err });
        this.errors = err;
        this.cd.markForCheck();
      }
    );
  }

  openArticleDetails(id: number) {
    const route = '/article/' + id;
    this.router.navigate([route]);
  }

  showMyFeed() {
    this.activeTab = 'MY_FEED';
    this.searchText = '';
    this.resetPagination();
    this.getUserArticles();
  }

  showGlobalFeed() {
    this.activeTab = 'GLOBAL_FEED';
    this.articlePreviewList = [];
    this.resetPagination();
    this.showNoDataFound = false;
  }

  resetPagination() {
    this.showPagination = false;
    this.pageNumberArr = [];

    this.firstPageLinkDisabled = true;
    this.lastPageLinkDisabled = true;

    this.pageNumber = 1;
    this.totalRecords = 0;
    this.totalPages = 0;
  }

  updatePagination() {
    this.showPagination = true;
    this.pageNumberArr = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumberArr.push(i);
    }
    if (this.pageNumber == 1) {
      this.firstPageLinkDisabled = true;
    } else {
      this.firstPageLinkDisabled = false;
    }
    if (this.pageNumber == this.totalPages) {
      this.lastPageLinkDisabled = true;
    } else {
      this.lastPageLinkDisabled = false;
    }
    if(this.totalPages == 0) {
      this.lastPageLinkDisabled = true;
      this.firstPageLinkDisabled = true;
    }
  }

  searchQuestions() {
    if (this.searchText) {
      this.searchTextPrivate = this.searchText;
      this.getFilteredQuestions();
    }
  }

  private getFilteredQuestions() {
    this.showNoDataFound = false;
    this.articleService.searchQuestions(this.searchTextPrivate, this.pageNumber, this.pageSize).subscribe(
      data => {
        console.log({ data });
        this.articlePreviewList = data.data;
        this.pageNumber = data.pageNumber;
        this.totalPages = data.totalPages;
        this.totalRecords = data.totalRecords;
        this.searchText = '';
        if(this.totalRecords <= 0) {
          this.showNoDataFound = true;
        } else {
          this.showNoDataFound = false;
        }
        this.updatePagination();
        this.cd.markForCheck();
      },
      err => {
        console.log({ err });
        this.errors = err;
      }
    );
  }

  changePage(newPageNum: number) {
    if (this.pageNumber != newPageNum) {
      this.pageNumber = newPageNum;
      this.getData();
    }
  }


  firstPage() {
    this.pageNumber = 1;
    this.getData();
    this.lastPageLinkDisabled = true;
    this.firstPageLinkDisabled = false;
  }

  lastPage() {
    this.pageNumber = this.totalPages;
    this.getData();
    this.lastPageLinkDisabled = true;
    this.firstPageLinkDisabled = false;
  }

  private getData() {
    if (this.activeTab == 'GLOBAL_FEED') {
      this.getFilteredQuestions();
    } else {
      this.getUserArticles();
    }
  }

}
