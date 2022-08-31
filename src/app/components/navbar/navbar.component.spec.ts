import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from '@testing-library/angular/jest-utils';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { UserService } from 'src/app/services/user.service';

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
  });
});
