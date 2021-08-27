import { Injectable } from '@angular/core';

export interface User {
    id: number;
    name: string;
    avatar: string;
    email: string;
    dob: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    localData: User[] = [];
    parameters: any = [];
    rowCount: any;
    pageSize = 10;
    pageNum = 1;
    sort = {
        'sorting': false,
        'id': '',
        'direction': ''
    };

    constructor() { }

    addParameters() {
        this.parameters.length = 0;
        this.parameters.push(`_page=${this.pageNum}`);
        this.parameters.push(`_limit=${this.pageSize}`);
        
        if (this.sort.sorting === true) {
            this.parameters.push(`_sort=${this.sort.id}&_order=${this.sort.direction}`);
        }
    }

    fetchData() {
        let request = 'http://localhost:3000/users';
        this.addParameters();
        
        if (this.parameters.length > 0) {
            request += '?' + this.parameters.join('&');
        }

        console.log(request);

        fetch(request)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Get the total number of entries for use in pagination
                this.rowCount = response.headers.get('X-Total-Count');
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.localData = data;
            })
            .catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
    }
}