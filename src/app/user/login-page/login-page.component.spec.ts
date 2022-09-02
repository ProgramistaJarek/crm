import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMock } from '@testing-library/angular/jest-utils';

import { Router } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginPageComponent } from './login-page.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [provideMock(UserService), provideMock(Router)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#Form login', () => {
    it('form validation if empty', () => {
      component.form.setValue({
        email: ' ',
        password: ' ',
      });

      fixture.detectChanges();

      expect(component.form.valid).toBeFalsy();
    });

    it('form validation if correct', () => {
      component.form.setValue({
        email: 'admin@admin.pl',
        password: 'admmin',
      });

      fixture.detectChanges();

      expect(component.form.valid).toBeTruthy();
    });

    it('form validation if email', () => {
      component.form.setValue({
        email: 'admin@admin.pl',
        password: '',
      });

      fixture.detectChanges();

      expect(component.form.valid).toBeFalsy();
    });

    it('form validation if password', () => {
      component.form.setValue({
        email: '',
        password: 'admin',
      });

      fixture.detectChanges();

      expect(component.form.valid).toBeFalsy();
    });

    it('should login', () => {
      component.form.setValue({
        email: 'admin@admin.pl',
        password: 'admin',
      });
      fixture.detectChanges();

      const userServiceSpy = jest
        .spyOn(userService, 'loginWithEmail')
        .mockReturnValue(
          of({
            firstName: 'admin',
            lastName: 'admin',
            email: 'admin@admin.pl',
            password: 'admin',
            id: 1,
          })
        );
      const routerSpy = jest.spyOn(router, 'navigate');

      component.onSubmit();

      expect(component.form.valid).toBeTruthy;
      expect(userServiceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/home']);
    });
  });
});
