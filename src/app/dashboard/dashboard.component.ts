import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../core/dashboard.service';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalQuestions = 0;
  closedQuestions = 0;
  totalUsers  = 0;

  constructor(
    
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {

    this.dashboardService.getDasboardStats().subscribe(
      data => {
        console.log({ data });
        this.totalQuestions = data.totalQuestions;
        this.closedQuestions = data.closedQuestions;
        this.totalUsers = data.totalRegisteredUsers;
      },
      err => {
        console.log({ err });
      }
    )
  }

}
