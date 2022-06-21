import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  currentUser: UserResponse | undefined;

  userLoggedIn = false;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        console.log({ userData })
        if (userData && userData.username) {
          this.userLoggedIn = true;
        } else {
          this.userLoggedIn = false;
        }
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

  /**
   * Since we are using JWT which is a stateless authentication.
   * So we can just remove the currently issued JWT from memory. No other step is required for logout
   *
   * @memberof HeaderComponent
   */
  logoutUser() {
    this.userService.purgeAuth();
    this.router.navigate(['/dashboard']);
  }

}
