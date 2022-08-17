import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UserDetails } from 'src/app/utilities/UserDetails';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() users!: UserDetails[];
  @Output() showDeatils: EventEmitter<UserDetails> = new EventEmitter();
  displayedColumns: string[] = [
    'position',
    'name',
    'username',
    'email',
    'phone',
  ];

  constructor() {}

  onShowDeatails(user: UserDetails) {
    this.showDeatils.emit(user);
  }
}
