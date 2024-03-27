import { Component } from '@angular/core';
import {Title} from "../../title";
import {User} from "../../user";
import {AppComponent} from "../../app.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environment";

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.css']
})
export class PublishedComponent {
  titles: Title[] = []
  user: User | undefined = AppComponent.getUser()

  constructor(private httpclient: HttpClient, private router: Router) {
    if (!this.user) return;

    this.httpclient.get<any>(`${environment.serverUrl}/account/published`).subscribe(titles => {
      this.titles = titles;
    });

  }

  parseDate(date: Date): Date {
    return new Date(date);
  }
}
