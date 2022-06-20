import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { UserResponse } from '../shared/models/user-response.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  currentUser: UserResponse | undefined;

  userLoggedIn = false;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        console.log({ userData })
        if (userData && userData.username) {
          this.userLoggedIn = true;
        }
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

}
