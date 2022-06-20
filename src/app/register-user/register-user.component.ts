import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/user.service';

import { Errors } from '../shared/models/errors.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass']
})
export class RegisterUserComponent implements OnInit {

  authType: string = 'register';
  title: string = 'Sign up';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.route.url.subscribe(data => {
    //   // Get the last piece of the URL (it's either 'login' or 'register')
    //   this.authType = data[data.length - 1].path;
    //   // Set a title for the page accordingly
    //   this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    //   // add form control for username if this is the register page
    //   if (this.authType === 'register') {
    //     this.authForm.addControl('username', new FormControl());
    //   }
    //   this.cd.markForCheck();
    // });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    const userData = this.authForm.value;
    this.userService
      .registerUser(userData)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
  }


}
