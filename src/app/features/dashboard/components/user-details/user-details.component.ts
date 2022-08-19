import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

import { UserDetails } from 'src/app/utilities/UserDetails';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  profileForm = new FormGroup({
    name: new FormControl(this.data.user?.name),
    email: new FormControl(this.data.user?.email),
    phone: new FormControl(this.data.user?.phone),
    website: new FormControl(this.data.user?.website),
    username: new FormControl(this.data.user?.username),
    city: new FormControl(this.data.user?.address.city),
    companyName: new FormControl(this.data.user?.company.name),
    phrase: new FormControl(this.data.user?.company.catchPhrase),
  });
  edit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { user?: UserDetails; action: boolean },
    private dialogRef: MatDialogRef<UserDetailsComponent>
  ) {
    if (data.action == true) {
      this.edit = true;
    }
  }

  changeEdit() {
    this.edit = !this.edit;
  }

  saveChanges() {
    const data = {
      ...this.data.user,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      website: this.profileForm.value.website,
      username: this.profileForm.value.username,
      address: {
        ...this.data.user?.address,
        city: this.profileForm.value.city,
      },
      company: {
        ...this.data.user?.company,
        name: this.profileForm.value.companyName,
        catchPhrase: this.profileForm.value.phrase,
      },
    };
    this.dialogRef.close(data);
  }
}
