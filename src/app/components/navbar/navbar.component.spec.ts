import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { createMock, provideMock } from '@testing-library/angular/jest-utils';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let userService: UserService;

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
  });
});
