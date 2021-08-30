import { Injectable } from '@angular/core';

export interface User {
    id?: number;
    name: string;
    avatar: string;
    email: string;
    dob: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    users: User[] = [];
    parameters: any = [];
    rowCount: any;
    pageSize = 10;
    pageNum = 1;
    sort = {
        'sorting': false,
        'id': '',
        'direction': ''
    };

    constructor() {}

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
            this.users = data;
        })
        .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
    }

    async postData(url = 'http://localhost:3000/users/', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response);
            return response;
        });


        //return response.json();
    }
}
