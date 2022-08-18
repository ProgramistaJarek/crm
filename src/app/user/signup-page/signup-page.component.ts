import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  showMessage: boolean = false;
  errorMessage!: string;

  regexForLowerLetter: RegExp = /[a-z]/;
  regexForUpperLetter: RegExp = /[A-Z]/;
  regexForNumber: RegExp = /\d/;
  regexForSpecialCharacter: RegExp = /[-+_!@#$%^&*.,?{}()\[\]]/;
  hasLower: boolean = false;
  hasUpper: boolean = false;
  hasNum: boolean = false;
  hasSpecial: boolean = false;
  passwordStrength: number = 0;

  constructor(
    private service: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
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

  passwordCheck() {
    this.passwordStrength = 0;

    this.hasLower = this.regexForLowerLetter.test(this.password?.value)
      ? true
      : false;

    this.hasUpper = this.regexForUpperLetter.test(this.password?.value)
      ? true
      : false;

    this.hasNum = this.regexForNumber.test(this.password?.value) ? true : false;

    this.hasSpecial = this.regexForSpecialCharacter.test(this.password?.value)
      ? true
      : false;

    const checks = [this.hasLower, this.hasUpper, this.hasNum, this.hasSpecial];
    checks.forEach((e) => (e ? this.passwordStrength++ : null));
  }

  onSubmit() {
    if (this.form.valid) {
      const uid = this.randomId();

      this.service.checkIfAddressEmailExist(this.email?.value).subscribe({
        next: () => {
          this.showMessage = false;

          this.service
            .addNewUser({
              firstName: this.firstName?.value,
              lastName: this.lastName?.value,
              email: this.email?.value,
              password: this.password?.value,
              id: uid,
            })
            .subscribe();
          this.router.navigate(['/login']);
          this.form.reset();
          this.snackBar.open('Success', 'ok', {
            duration: 3000,
          });
        },
        error: (e) => {
          this.showMessage = true;
          this.errorMessage = e;
        },
      });
    }
  }

  randomId(): number {
    return Date.now() * Math.floor(Math.random() * 10);
  }
}
