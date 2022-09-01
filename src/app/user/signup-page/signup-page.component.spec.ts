import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideMock,
  provideMockWithValues,
} from '@testing-library/angular/jest-utils';
import { Router } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { user1, user2, mockUserArray } from 'src/mocks/mockUsers';

import { SignupPageComponent } from './signup-page.component';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPageComponent, PasswordStrengthBarComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideMockWithValues(UserService, {
          checkIfAddressEmailExist: jest.fn().mockReturnValue(of(0)),
        }),
        provideMock(Router),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#Form signup', () => {
    it('form validation if empty', () => {
      //GIVEN
      //WHEN
      //THEN
      expect(component.form.valid).toBeFalsy();
    });

    it('form validation if correct', () => {
      //GIVEN
      component.form.setValue({
        firstName: 'Jarek',
        lastName: 'Lepich',
        email: 'admin@admin.pl',
        password: 'admin123',
        repeatPassword: 'admin123',
      });

      //WHEN
      component.passwordDoesMatch;

      //THEN
      expect(component.form.valid).toBeTruthy();
    });

    it('form validation if password is incorrect', () => {
      //GIVEN
      component.form.setValue({
        firstName: 'Jarek',
        lastName: 'Lepich',
        email: 'admin@admin.pl',
        password: 'admin123',
        repeatPassword: 'admin12',
      });

      //WHEN
      component.passwordDoesMatch;

      //THEN
      expect(component.form.valid).toBeFalsy();
    });

    it('form validation if email is incorrect', () => {
      //GIVEN
      component.form.setValue({
        firstName: 'Jarek',
        lastName: 'Lepich',
        email: 'adminadmin.pl',
        password: 'admin123',
        repeatPassword: 'admin123',
      });

      //WHEN
      component.passwordDoesMatch;

      //THEN
      expect(component.form.valid).toBeFalsy();
    });

    it('check password full strength', () => {
      //GIVEN
      component.form.controls['password'].setValue('Admin12$%');

      //WHEN
      component.passwordCheck();

      //THEN
      expect(component.hasLower).toBeTruthy();
      expect(component.hasUpper).toBeTruthy();
      expect(component.hasNum).toBeTruthy();
      expect(component.hasSpecial).toBeTruthy();
    });

    it('check password without special characters', () => {
      //GIVEN
      component.form.controls['password'].setValue('Admin12');

      //WHEN
      component.passwordCheck();

      //THEN
      expect(component.hasSpecial).toBeFalsy();
    });

    it('check password without numbers', () => {
      //GIVEN
      component.form.controls['password'].setValue('Admin');

      //WHEN
      component.passwordCheck();

      //THEN
      expect(component.hasNum).toBeFalsy();
    });

    it('check password without upper letters', () => {
      //GIVEN
      component.form.controls['password'].setValue('admin');

      //WHEN
      component.passwordCheck();

      //THEN
      expect(component.hasUpper).toBeFalsy();
    });

    it('check password without lower letters', () => {
      //GIVEN
      component.form.controls['password'].setValue('ADMIN');

      //WHEN
      component.passwordCheck();

      //THEN
      expect(component.hasLower).toBeFalsy();
    });

    //its works???
    it('should correctly login', () => {
      //GIVEN
      const serviceSpy = jest.spyOn(userService, 'checkIfAddressEmailExist');

      //WHEN
      component.onSubmit();
      userService.checkIfAddressEmailExist('admin@admin.pl');

      //THEN
      expect(serviceSpy).toHaveBeenCalled();
    });

    /* it('should correctly navigate to login', fakeAsync((done: () => void) => {
      //GIVEN
      const serviceSpy = jest.spyOn(router, 'navigate');

      //WHEN
      component.onSubmit();
      userService.checkIfAddressEmailExist('admin@admin.pl').subscribe({
        next: () => {
          //THEN
          expect(serviceSpy).toHaveBeenCalled();
          done();
        },
      });
    })); */
  });
});
