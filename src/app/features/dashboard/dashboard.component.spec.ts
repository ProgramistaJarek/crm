import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from '@testing-library/angular/jest-utils';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserDetails } from 'src/app/utilities/UserDetails';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let user: UserDetails;
  let dashboardService: DashboardService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [provideMock(DashboardService), provideMock(MatDialog)],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    user = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        city: 'Gwenborough',
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'junior',
      },
    };
    dashboardService = TestBed.inject(DashboardService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Dashboard testing', () => {
    it('should open details dialog', () => {
      //GIVEN
      const dialogSpy = jest
        .spyOn(dialog, 'open')
        .mockReturnValue({ afterClosed: () => of(user) } as MatDialogRef<
          typeof component
        >);

      //WHEN
      component.showDeatils(user.id);

      //THEN
      expect(dialogSpy).toHaveBeenCalled();
    });
  });
});
