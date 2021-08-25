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

    constructor() { }

    fetchData() {
        fetch('http://localhost:3000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
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
