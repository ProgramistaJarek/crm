import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { catchError, EMPTY, Observable, switchMap, retry } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  showMessage: boolean = false;
  errorMessage!: string;

  constructor(
    private service: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('admin@admin.pl', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('admin', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  get email() {
    return this.form?.get('email');
  }

  get password() {
    return this.form?.get('password');
  }

  onSubmit() {
    if (!this.form.valid) return;

    this.service
      .loginWithEmail(this.email?.value, this.password?.value)
      .pipe(
        catchError((err, caught) => {
          return this.errorHandling(caught);
        })
      )
      .subscribe({
        next: () => {
          this.showMessage = false;
          this.router.navigate(['/home']);
          this.snackBar.open('Success', 'ok', {
            duration: 3000,
          });
        },
        error: (e) => {
          this.showMessage = true;
          this.errorMessage = e;
          console.log(e);
        },
      });
    this.form.reset();
  }

  errorHandling(caught: Observable<any>) {
    const snackRef = this.snackBar.open('Napraw se internet', 'dziala?');

    return snackRef.afterDismissed().pipe(
      switchMap((info) => {
        if (info.dismissedByAction === true) {
          return caught.pipe(retry());
        }
        return EMPTY;
      })
    );
  }
}
