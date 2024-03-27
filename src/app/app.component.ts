import {Component} from '@angular/core';
import {User} from "./user";
import {Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contentPublicationUI';

  constructor() {
  }

  public static getUser(): User | undefined {
    let item = localStorage.getItem("user");
    if (item) {
      return JSON.parse(String(localStorage.getItem("user")));
    }
    return undefined;
  }
}
