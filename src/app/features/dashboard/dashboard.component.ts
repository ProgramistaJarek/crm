import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DashboardService } from 'src/app/services/dashboard.service';
import { UserDetails } from 'src/app/utilities/UserDetails';

import { UserDetailsComponent } from 'src/app/features/dashboard/components/user-details/user-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users$!: Observable<UserDetails[]>;
  displayedColumns: string[] = ['position', 'name', 'email', 'phone'];

  constructor(
    private service: DashboardService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.service.getUsers();
  }

  showDeatils(uid: number) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: { user$: this.service.getUser(uid), action: false },
    });

    dialogRef.afterClosed().subscribe((result: UserDetails) => {
      if (result) {
        this.service.updateUser(result).subscribe();
        this.users$ = this.service.getUsers();
      }
      this.router.navigate(['dashboard']);
    });
  }

  deleteUser(uid: number) {
    const dialogRef = this.dialog.open(DialogDeleteUser, {});

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.deleteUser(uid).subscribe();
        this.users$ = this.service.getUsers();
      }
      this.router.navigate(['dashboard']);
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: { action: true },
    });

    dialogRef.afterClosed().subscribe((result: UserDetails) => {
      if (result) {
        this.service.addNewUser(result).subscribe();
        this.users$ = this.service.getUsers();
      }
      this.router.navigate(['dashboard']);
    });
  }
}

@Component({
  selector: 'dialog-delete-user',
  template: `
    <h1 mat-dialog-title>Delete this user?</h1>

    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="onDelete()">
        Yes
      </button>
    </div>
  `,
})
export class DialogDeleteUser {
  constructor(private dialogRef: MatDialogRef<DialogDeleteUser>) {}

  onDelete() {
    this.dialogRef.close(true);
  }
}
