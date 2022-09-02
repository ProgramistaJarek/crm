import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from '@testing-library/angular/jest-utils';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [provideMock(UserService), provideMock(Router)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onLogout', () => {
    it('should correctly call logout', () => {
      //GIVEN
      const serviceSpy = jest.spyOn(userService, 'logout');

      //WHEN
      component.onLogout();

      //THEN
      expect(serviceSpy).toHaveBeenCalled();
    });

    it('should correctly navigate to home', () => {
      //GIVEN
      const navigateSpy = jest.spyOn(router, 'navigate');

      //WHEN
      component.onLogout();

      //THEN
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    });

    it('should not dispaly dashboard ', () => {
      //GIVEN
      component.isLoggedin = new BehaviorSubject(false);
      const { debugElement } = fixture;

      //WHEN
      fixture.detectChanges();

      //THEN
      const dashboardRef = debugElement.query(
        By.css('[data-testid="dashboard-button"]')
      );
      expect(dashboardRef).toBeFalsy();
    });

    it('should correctly dispaly login ', () => {
      //GIVEN
      component.isLoggedin = new BehaviorSubject(false);
      const { debugElement } = fixture;

      //WHEN
      fixture.detectChanges();

      //THEN
      const loginRef = debugElement.query(
        By.css('[data-testid="login-button"]')
      );
      expect(loginRef).toBeTruthy();
    });
  });

  describe('#onLogin', () => {
    it('should correctly dispaly dashboard ', () => {
      //GIVEN
      component.isLoggedin = new BehaviorSubject(true);
      const { debugElement } = fixture;

      //WHEN
      fixture.detectChanges();

      //THEN
      const dashboardRef = debugElement.query(
        By.css('[data-testid="dashboard-button"]')
      );
      expect(dashboardRef).toBeTruthy();
    });

    it('should correctly dispaly logout ', () => {
      //GIVEN
      component.isLoggedin = new BehaviorSubject(true);
      const { debugElement } = fixture;

      //WHEN
      fixture.detectChanges();

      //THEN
      const logoutRef = debugElement.query(
        By.css('[data-testid="logout-button"]')
      );
      expect(logoutRef).toBeTruthy();
    });

    it('should not dispaly login ', () => {
      //GIVEN
      component.isLoggedin = new BehaviorSubject(true);
      const { debugElement } = fixture;

      //WHEN
      fixture.detectChanges();

      //THEN
      const loginRef = debugElement.query(
        By.css('[data-testid="login-button"]')
      );
      expect(loginRef).toBeFalsy();
    });
  });
});
