import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from '@testing-library/angular/jest-utils';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from 'src/app/services/dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let dashboardService: DashboardService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [provideMock(DashboardService), provideMock(MatDialog)],
      imports: [MatDialogModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dashboardService = TestBed.inject(DashboardService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Dashboard testing', () => {
    it('should open details dialog', () => {
      //GIVEN
      const dashboardServiceSpy = jest.spyOn(dialog, 'open');

      //WHEN
      component.showDeatils(1);

      //THEN
      expect(dashboardServiceSpy).toHaveBeenCalled();
    });
  });
});
