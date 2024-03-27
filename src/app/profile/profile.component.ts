import {Component, OnInit} from '@angular/core';
import {Subscription, User} from "../user";
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../environment";
import {Comment, Title} from "../title";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../title-view/title-view.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  likedTitles: Title[] | undefined
  publishedTitles: Title[] | undefined
  commentedTitles: Title[] | undefined
  subscriptions: Subscription[] | undefined

  constructor(private httpclient: HttpClient, private router: Router) {
    this.httpclient.get<User>(`${environment.serverUrl}/account/`).subscribe(user => {
      this.user = user
    });

  }

  getLimitLikes() {
    this.httpclient.get<Title[]>(`${environment.serverUrl}/account/likes-limit`).subscribe(titles => {
      this.likedTitles = titles;
    });
  }

  getPublishedTitles() {
    this.httpclient.get<Title[]>(`${environment.serverUrl}/account/published`).subscribe(titles => {
      this.publishedTitles = titles;
    });
  }

  getSubscriptions() {
    this.httpclient.get<Subscription[]>(`${environment.serverUrl}/account/subscriptions`).subscribe(subscriptions => {
      this.subscriptions = subscriptions;
    });
  }


  getLimitComments() {
    this.httpclient.get<Title[]>(`${environment.serverUrl}/account/commented-limit`).subscribe(titles => {
      this.commentedTitles = titles;
    });
  }


  beAuthorRequest() {
    this.httpclient.post(`${environment.serverUrl}/account/request/author`, {}).subscribe(() => {
      document.location.reload();
    });
  }

  beSimpleUserRequest() {
    this.httpclient.post(`${environment.serverUrl}/account/request/user`, {}).subscribe(() => {
      document.location.reload();
    });
  }

  getReleaseYear(u: User): string {
    return new Date(u.creationDate).toLocaleDateString();
  }

  parseDate(date: Date): Date {
    return new Date(date);
  }

  ngOnInit(): void {
    this.getLimitLikes();
    this.getLimitComments();
    this.getPublishedTitles();
    this.getSubscriptions();
  }
}
