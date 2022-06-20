import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../core/jwt.service';
import { UserService } from '../core/user.service';

import { Errors } from '../shared/models/errors.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  authType: string = 'login';
  title: string = 'Sign in';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private jwtService: JwtService
  ) {

    const token =  this.jwtService.getToken();
    if(token) {
      this.router.navigateByUrl('/article')
    }

    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(credentials)
      .subscribe(
        data => {
          this.router.navigateByUrl('/article')
        },
        err => {
          console.log({err})
          this.errors = err;
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
  }

}
