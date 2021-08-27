import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../database.service';

@Component({
    selector: 'app-new-entry-dialog',
    templateUrl: './new-entry-dialog.component.html',
    styleUrls: ['./new-entry-dialog.component.scss']
})
export class NewEntryDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<NewEntryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User) { }

    onNoClick() {
        this.dialogRef.close();
    }
}
