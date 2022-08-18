import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

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

  showDeatils(id: number) {
    this.service.getUser(id).subscribe((result) => {
      const dialogRef = this.dialog.open(UserDetailsComponent, {
        data: result,
      });

      dialogRef.afterClosed().subscribe((result: UserDetails) => {
        if (result) {
          this.service.updateUser(result).subscribe();
          this.users$ = this.service.getUsers();
        }
        this.router.navigate(['dashboard']);
      });
    });
  }
}
