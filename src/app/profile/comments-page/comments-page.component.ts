import { Component } from '@angular/core';
import {Title} from "../../title";
import {User} from "../../user";
import {AppComponent} from "../../app.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environment";

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css', '../likes-page/likes-page.component.css']
})
export class CommentsPageComponent {
  titles: Title[] = []
  user: User | undefined = AppComponent.getUser()

  constructor(private httpclient: HttpClient, private router: Router) {
    if (!this.user) return;

    this.httpclient.get<any>(`${environment.serverUrl}/account/commented`).subscribe(titles => {
      this.titles = titles;
    });
  }

  parseDate(date: Date): Date {
    return new Date(date);
  }
}
