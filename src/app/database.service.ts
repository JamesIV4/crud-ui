import { HttpClient } from '@angular/common/http';
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

    constructor(private http: HttpClient) {}

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
        const request = type === 'DELETE' ? `http://localhost:3000/users/${id}` : 'http://localhost:3000/users';
        const mode = type === 'POST' ? 'no-cors' : 'cors';

        console.log(`Sending ${type} request to ${request}`)

        fetch(request, {
            method: type,
            mode: mode,
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => {
            console.log(`Logging ${type} response:`)
            console.log(response);

            this.fetchData(); // Refresh data afterwards
        }).catch(e => {
            console.error(`Error: ${type} fetch request failed: ${e.message}`);
        });
    }

    // httpPutRequest(body: object) {
    //     const headers = {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json'
    //     };
    //     this.http.put<any>('http://localhost:3000/users', body, { headers })
    //     .subscribe({
    //         next: data => {
    //             console.log(data);
    //         },
    //         error: error => {
    //             console.log(error.message);
    //         }
    //     });
    // }
}
