import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserComponent } from 'src/app/features/dashboard/components/user/user.component';
import { UserDetailsComponent } from 'src/app/features/dashboard/components/user-details/user-details.component';
import { DialogDeleteUser } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    UserDetailsComponent,
    DialogDeleteUser,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardModule {}
