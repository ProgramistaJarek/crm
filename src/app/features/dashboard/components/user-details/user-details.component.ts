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
  edit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDetails,
    private dialogRef: MatDialogRef<UserDetailsComponent>
  ) {}

  profileForm = new FormGroup({
    email: new FormControl(this.data.email),
    phone: new FormControl(this.data.phone),
    website: new FormControl(this.data.website),
    city: new FormControl(this.data.address.city),
    companyName: new FormControl(this.data.company.name),
    phrase: new FormControl(this.data.company.catchPhrase),
  });

  changeEdit() {
    this.edit = !this.edit;
  }

  saveChanges() {
    const data = {
      ...this.data,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      website: this.profileForm.value.website,
      address: { ...this.data.address, city: this.profileForm.value.city },
      company: {
        ...this.data.company,
        name: this.profileForm.value.companyName,
        catchPhrase: this.profileForm.value.phrase,
      },
    };
    this.dialogRef.close(data);
  }
}
