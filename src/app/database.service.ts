import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getData() {
    fetch('http://localhost:3000/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.log('There has been a problem with your fetch operation: ' + e.message);
    });

  }
}
