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
  displayedColumns: string[] = [
    'position',
    'name',
    'username',
    'email',
    'phone',
  ];

  constructor(private router: ActivatedRoute, public dialog: MatDialog) {
    this.router.queryParams.subscribe((params) => {
      if (params['id']) {
        this.onShowDeatails(params['id']);
      }
    });
  }

  onShowDeatails(user: number) {
    this.showDeatils.emit(user);
  }
}
