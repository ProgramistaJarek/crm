import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
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
    if (this.form.valid) {
      this.service
        .loginWithEmail(this.email?.value, this.password?.value)
        .subscribe({
          next: () => (this.showMessage = false),
          error: (e) => {
            this.showMessage = true;
            this.errorMessage = e;
          },
        });
      this.form.reset();
    }
  }
}
