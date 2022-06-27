import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  isSubmitting = false;
  authForm: FormGroup;
  errorMessage: string = '';
  errorPasswordNotMatch = false;

  constructor(
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
  }

  submitForm() {

    this.errorMessage = '';
    this.errorPasswordNotMatch = false;

    const passwordValue = this.authForm.get('password')?.value;
    const confirmPasswordValue = this.authForm.get('confirmPassword')?.value;

    if (confirmPasswordValue !== passwordValue) {
      this.errorPasswordNotMatch = true;
      this.errorMessage = 'Password and confirm password field must match with each other';
      return;
    }
    this.isSubmitting = true;

    const userData = this.authForm.value;
    this.userService
      .registerUser(userData)
      .subscribe(
        data => this.router.navigateByUrl('/login'),
        err => {
          if (err.message) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage = 'Login Failed!!. Please check credentials or try again after some time.'
          }
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000, this);
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
  }


}
