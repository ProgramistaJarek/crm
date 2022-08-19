import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserDetails } from 'src/app/utilities/UserDetails';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required]),
  });
  edit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { user$: Observable<UserDetails>; action: boolean },
    private dialogRef: MatDialogRef<UserDetailsComponent>
  ) {
    if (data.action === true) {
      this.edit = true;
    }
    if (data.action === false) {
      data.user$.subscribe((item) => {
        this.profileForm.setValue({
          name: item.name,
          email: item.email,
          phone: item.phone,
          website: item.website,
          username: item.username,
          city: item.address.city,
          companyName: item.company.name,
          phrase: item.company.catchPhrase,
        });
      });
    }
  }

  changeEdit() {
    this.edit = !this.edit;
  }

  saveChanges(user?: UserDetails) {
    const data = {
      ...user,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      website: this.profileForm.value.website,
      username: this.profileForm.value.username,
      address: {
        ...user?.address,
        city: this.profileForm.value.city,
      },
      company: {
        ...user?.company,
        name: this.profileForm.value.companyName,
        catchPhrase: this.profileForm.value.phrase,
      },
    };
    this.dialogRef.close(data);
  }
}
