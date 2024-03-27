import {Component} from '@angular/core';
import {Title} from "../../title";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../user";
import {environment} from "../../environment";

@Component({
  selector: 'app-likes-page',
  templateUrl: './likes-page.component.html',
  styleUrls: ['./likes-page.component.css']
})
export class LikesPageComponent {
  titles: Title[] = []
  user: User | undefined = AppComponent.getUser()

  constructor(private httpclient: HttpClient, private router: Router) {
    if (!this.user) return;

    this.httpclient.get<any>(`${environment.serverUrl}/account/likes`).subscribe(titles => {
      this.titles = titles;
    });

  }

  parseDate(date: Date): Date {
    return new Date(date);
  }
}
