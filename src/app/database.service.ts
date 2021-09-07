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
        sorting: false,
        id: '',
        direction: '',
    };
    filtering = {
        active: false,
        query: ''
    };

    constructor() {}

    getParameters() {
        this.parameters.length = 0;
        this.parameters.push(`_page=${this.pageNum}`);
        this.parameters.push(`_limit=${this.pageSize}`);
        
        if (this.sort.sorting) {
            this.parameters.push(`_sort=${this.sort.id}&_order=${this.sort.direction}`);
        }

        if (this.filtering.active) {
            this.parameters.push(`q=${this.filtering.query}`)
        }
    }

    fetchData() {
        this.getParameters();
        const request = `http://localhost:3000/users?${this.parameters.join('&')}`;

        fetch(request, {
            method: 'GET',
            mode: 'cors'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Get the total number of entries for use in pagination
            this.rowCount = response.headers.get('X-Total-Count');
            return response.json();
        }).then(data => {
            this.users = data;
        }).catch(e => {
            console.error('Error: GET fetch request failed: ' + e.message);
        });
    }

    sendRequest(type: string, data: object, id?: number) {
        let request = 'http://localhost:3000/users'

        if (type === 'PUT' || type === 'DELETE') {
            request += `/${id}`;
        }

        console.log(`Sending ${type} request to ${request}`)

        fetch(request, {
            method: type,
            mode: 'cors',
            headers: new Headers({
                'Access-Control-Request-Method': type,
                'Access-Control-Request-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(response => {
            console.log(`Logging ${type} response:\n${response}`)

            this.fetchData(); // Refresh data afterwards
        }).catch(e => {
            console.error(`Error: ${type} fetch request failed: ${e.message}`);
        });
    }
}
