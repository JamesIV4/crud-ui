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

    addParameters() {
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
        let request = 'http://localhost:3000/users';
        this.addParameters();
        
        if (this.parameters.length > 0) {
            request += '?' + this.parameters.join('&');
        }

        fetch(request).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Get the total number of entries for use in pagination
            this.rowCount = response.headers.get('X-Total-Count');
            return response.json();
        }).then(data => {
            this.users = data;
        }).catch(e => {
            console.log('Error: GET fetch request failed: ' + e.message);
        });
    }

    postData(url = 'http://localhost:3000/users/', data = {}) {
        fetch(url, {
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
            console.log('Logging POST response:')
            console.log(response);

            this.fetchData(); // Refresh data after POST
        }).catch(e => {
            console.log('Error: POST fetch request failed: ' + e.message);
        });
    }

    putData(url = 'http://localhost:3000/users/', data = {}) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => {
            console.log('Logging PUT response:')
            console.log(response);

            this.fetchData(); // Refresh data after POST
        }).catch(e => {
            console.log('Error: PUT fetch request failed: ' + e.message);
        });
    }

    deleteData(url = 'http://localhost:3000/users/', userId: any) {
        const request = url + userId;
        console.log(request);

        fetch(request, {
            method: 'DELETE',
            mode: 'cors',
            //cache: 'no-cache',
            //credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            //redirect: 'follow',
            //referrerPolicy: 'no-referrer'
        }).then(response => {
            console.log('Logging DELETE response:')
            console.log(response);

            this.fetchData(); // Refresh data after POST
        }).catch(e => {
            console.log('Error: DELETE fetch request failed: ' + e.message);
        });
    }
}
