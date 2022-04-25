import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  form: FormGroup | any;
  emailAlert: string = 'Valid email is required: ex@abc.xyz';
  passwordAlert: string = 'You need to specify at least 5 characters';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, Validators.email],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ]),
      ],
    });
  }

  get f() {
    return this.form?.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    var userInfo: User = this.form?.value;
    if (
      userInfo?.email === 'sheheryarnadeem@gmail.com' &&
      userInfo?.password === '123123'
    ) {
      userInfo.userRole = 'User';
    } else if (
      userInfo?.email === 'sheheryarnadeem@yahoo.com' &&
      userInfo?.password === '123123'
    ) {
      userInfo.userRole = 'Admin';
    } else {
      this.loading = false;
      this.toastr.error('Email and Password is not valid!', 'User');
      return;
    }

    this.authService.login(userInfo);
    this.toastr.success('Login Successful', userInfo?.email);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
  }
}
