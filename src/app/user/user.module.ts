import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserRoutingModule } from './user-routing.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    PasswordStrengthBarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UserRoutingModule,
    RouterModule,
    MatSnackBarModule,
  ],
})
export class UserModule {}
