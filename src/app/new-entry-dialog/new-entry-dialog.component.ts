import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DialogUserData } from '../app.models';

@Component({
    selector: 'app-new-entry-dialog',
    templateUrl: './new-entry-dialog.component.html',
    styleUrls: ['./new-entry-dialog.component.scss']
})
export class NewEntryDialogComponent {
    email = new FormControl('',[
        Validators.email
    ]);
    maxDate: Date = new Date;
    minDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 120));

    constructor(
        public dialogRef: MatDialogRef<NewEntryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogUserData) { }

    getEmailErrorMessage() {
        return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    isValid() {
        if (!this.data.user.name ||
            !this.data.user.email ||
            this.email.errors) {
            return false;
        }

        return true;
    }

    onNoClick() {
        this.dialogRef.close({
            confirm: false
        });
    }

    onCloseConfirm() {
        if (this.data.user.dob) {
            this.data.user.dob = new Date(this.data.user.dob).toISOString();
        }
        this.dialogRef.close({
            confirm: true,
            data: this.data
        });
    }
}
