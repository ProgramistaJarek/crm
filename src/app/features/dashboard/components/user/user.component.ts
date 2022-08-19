import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserDetails } from 'src/app/utilities/UserDetails';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() users!: UserDetails[];
  @Output() showDeatils: EventEmitter<number> = new EventEmitter();
  @Output() deleteUser: EventEmitter<number> = new EventEmitter();
  displayedColumns: string[] = [
    'position',
    'name',
    'username',
    'email',
    'phone',
    'actions',
  ];

  constructor(private router: ActivatedRoute, public dialog: MatDialog) {
    this.router.queryParams.subscribe((params) => {
      if (params['action'] === 'edit') {
        this.onShowDeatails(params['id']);
      }
      if (params['action'] === 'delete') {
        this.onDelete(params['id']);
      }
    });
  }

  onShowDeatails(uid: number) {
    this.showDeatils.emit(uid);
  }

  onDelete(uid: number) {
    this.deleteUser.emit(uid);
  }
}
