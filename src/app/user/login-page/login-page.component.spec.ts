import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMock } from '@testing-library/angular/jest-utils';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginPageComponent } from './login-page.component';
import { UserService } from 'src/app/services/user.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let userService: UserService;

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
      ],
      providers: [provideMock(UserService)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

      expect(component.form.valid).toBeFalsy();
    });

    it('form validation if correct', () => {
      component.form.setValue({
        email: 'admin@admin.pl',
        password: 'admmin',
      });

      expect(component.form.valid).toBeTruthy();
    });

    it('form validation if email', () => {
      component.form.setValue({
        email: 'admin@admin.pl',
        password: '',
      });

      expect(component.form.valid).toBeFalsy();
    });

    it('form validation if password', () => {
      component.form.setValue({
        email: '',
        password: 'admin',
      });

      expect(component.form.valid).toBeFalsy();
    });
  });
});
