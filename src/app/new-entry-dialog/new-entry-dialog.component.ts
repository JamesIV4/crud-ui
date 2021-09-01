import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../database.service';

export interface DialogUserData {
    existing: boolean,
    user: {
        id?: number,
        name: string,
        avatar: string,
        email: string,
        dob: string,
    }
}

@Component({
    selector: 'app-new-entry-dialog',
    templateUrl: './new-entry-dialog.component.html',
    styleUrls: ['./new-entry-dialog.component.scss']
})
export class NewEntryDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<NewEntryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogUserData) { }

    onNoClick() {
        this.dialogRef.close({
            confirm: false
        });
    }

    onCloseConfirm() {
        this.dialogRef.close({
            confirm: true,
            data: this.data
        });
    }
}
