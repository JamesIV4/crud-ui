import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NewEntryDialogComponent } from './new-entry-dialog/new-entry-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
	MatTableModule,
	MatButtonModule,
	MatPaginatorModule,
	MatSortModule,
	MatInputModule,
	MatDialogModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatNativeDateModule
]

@NgModule({
	declarations: [
		AppComponent,
		ListViewComponent,
		NewEntryDialogComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		...materialModules
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
