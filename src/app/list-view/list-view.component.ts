import { NewEntryDialogComponent } from './../new-entry-dialog/new-entry-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DatabaseService, User } from "../database.service";
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss']
})

export class ListViewComponent implements OnInit {
    displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'dob'];
    selection = new SelectionModel<User>(false); // Passing allowMultiSelect = false here

    constructor(
        public database: DatabaseService,
        public dialog: MatDialog
        ) {}

    @ViewChild(MatTable) table: MatTable<User>;

    ngOnInit() {
        this.database.fetchData();
    }

    selectRow(row: any) {
        this.selection.isSelected(row);
        this.selection.toggle(row);
        console.log(row);
    }

    newEntry() {
        let newUser: any = {
            id: Number,
            name: '',
            avatar: '',
            email: '',
            dob: '',
        };

        const dialogRef = this.dialog.open(NewEntryDialogComponent, {
            width: '350px',
            data: {
                id: Number(this.database.rowCount) + 1,
                name: newUser.name, 
                avatar: newUser.avatar,
                email: newUser.email,
                dob: newUser.dob
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result.body);
            newUser = result;

            this.database.postData('http://localhost:3000/users/', newUser)
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
                this.database.fetchData();
            });
        });
    }

    convertDate(_date: string) {
        const date = new Date(_date);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    }

    onChangePage(pageEvent: PageEvent) {
        // Clear any selections
        this.selection.clear()

        // Pass page info for fetch call parameters
        this.database.pageNum = pageEvent.pageIndex + 1;
        this.database.pageSize = pageEvent.pageSize;
        this.database.fetchData();
    }

    sortData(sort: Sort) {
        if (sort.direction === '') { // sort.direction is blank if no sorting is active
            this.database.sort.sorting = false;
        } else {
            this.database.sort.sorting = true;
            this.database.sort.id = sort.active;
            this.database.sort.direction = sort.direction;
        }

        this.database.fetchData();
    }

    refreshList() {
        this.database.fetchData();
    }
}