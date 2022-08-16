import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/utilities/User';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  form!: FormGroup;
  user!: User;

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      repeatEmail: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      repeatPassword: new FormControl('', []),
    });
  }

  get firstName() {
    return this.form?.get('firstName');
  }

  get lastName() {
    return this.form?.get('lastName');
  }

  get email() {
    return this.form?.get('email');
  }

  get emailConfirm() {
    return this.form?.get('repeatEmail');
  }

  get emailDoesMatch() {
    const matched = this.email?.value === this.emailConfirm?.value;

    if (matched) {
      this.form?.get('repeatEmail')?.setErrors(null);
    } else {
      this.form?.get('repeatEmail')?.setErrors({ notMatched: true });
    }
    return matched;
  }

  get password() {
    return this.form?.get('password');
  }

  get passwordConfirm() {
    return this.form?.get('repeatPassword');
  }

  get passwordDoesMatch() {
    const matched = this.password?.value === this.passwordConfirm?.value;

    if (matched) {
      this.form?.get('repeatPassword')?.setErrors(null);
    } else {
      this.form?.get('repeatPassword')?.setErrors({ notMatched: true });
    }
    return matched;
  }

  onSubmit() {
    if (this.form.valid) {
      const uid = this.randomId();
      this.service
        .addNewUser({
          firstName: this.firstName?.value,
          lastName: this.lastName?.value,
          email: this.email?.value,
          password: this.password?.value,
          id: uid,
        })
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }

  randomId(): number {
    return Date.now() * Math.floor(Math.random() * 10);
  }
}
