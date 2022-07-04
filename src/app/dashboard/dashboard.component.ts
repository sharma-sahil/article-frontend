import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../core/dashboard.service';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  totalQuestions = 0;
  closedQuestions = 0;
  totalUsers  = 0;

  constructor(
    private cd: ChangeDetectorRef,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {

    this.dashboardService.getDasboardStats().subscribe(
      data => {
        this.totalQuestions = data.totalQuestions;
        this.closedQuestions = data.closedQuestions;
        this.totalUsers = data.totalRegisteredUsers;
        this.cd.markForCheck();
      },
      err => {
        console.log({ err });
      }
    )
  }

}
