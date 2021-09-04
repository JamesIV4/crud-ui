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
    filtering: boolean = false;

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

        console.log(`${this.selection.hasValue() ? 'Selected' : 'Deselected'} row${this.selection.hasValue() ? ':\n' + JSON.stringify(row) : '.'}`);
    }

    toggleFiltering() {
        if (this.database.filtering.active) {
            this.database.filtering.active = false;
            this.database.fetchData(); // Filter is removed, so fetch the data again
        } else {
            this.database.filtering.active = true;
        }
    }

    applyFilter(event: any) {
        // Enter is pressed, set filter query parameter and fetch data
        if (event.key.toLowerCase() === 'enter') {
            this.database.filtering.query = event.target.value;
            this.database.fetchData();
        }
    }

    userChange(newUser: boolean = false) {
        const dialogRef = this.dialog.open(NewEntryDialogComponent, {
            width: '35%',
            minWidth: '350px',
            data: {
                existing: newUser ? false : true,
                user: {
                    id: newUser ? Number(this.database.rowCount) + 2 : this.selection.selected[0].id,
                    name: newUser ? '' : this.selection.selected[0].name,
                    avatar: newUser ? '' : this.selection.selected[0].avatar,
                    email: newUser ? '' : this.selection.selected[0].email,
                    dob: newUser ? '' : this.selection.selected[0].dob
                }
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

            if (result.confirm === true) { // If confirm was clicked
                console.log(result.data.user);

                if (newUser) {
                    console.log('Creating new user');
                    this.database.sendRequest('POST', result.data.user);
                } else {
                    this.selection.clear() // Deselect the user
                    this.database.sendRequest('PUT', result.data.user);
                }
            }
        });
    }

    deleteUser(id: any) {
        this.database.sendRequest('DELETE', {}, id);
        this.selection.clear() // Deselect the user
    }

    convertDate(_date: string) {
        if (_date) {
            const date = new Date(_date);
            return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        } else return '';
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