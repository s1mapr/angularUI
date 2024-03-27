import {Component} from '@angular/core';
import {Comment, Like, Title} from "../title";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-title-view',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.css']
})
export class TitleViewComponent {
  title: Title | undefined;
  user: User | undefined;
  isLiked: boolean = false;
  clickCount: number = 0;
  countSec: number = 0;
  isWorking: boolean = false;
  isViewed: boolean = false;
  comment: string = '';


  constructor(private httpclient: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.user = AppComponent.getUser()
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadTitleByID().subscribe(title => {
        this.title = title;
        this.isLiked = checkIfLiked(this.user, this.title.content.likes);
        this.addView();
      });
    } else {
      this.loadTitleRandom().subscribe(title => {
        this.title = title;
        this.isLiked = checkIfLiked(this.user, this.title.content.likes);
        this.addView();
      });
    }

    function checkIfLiked(user: User | undefined, likes: Like[]): boolean {
      if (!user) return false;
      let liked = false;
      likes.forEach(x => {
          if (x.userId === user.id) {
            liked = true;
            return;
          }
        }
      );
      return liked;
    }
  }

  getReleaseYear(title: Title): number {
    return new Date(title.creationDate).getFullYear();
  }


  getDate(comm: Comment): Date {
    return new Date(comm.creationDate);
  }

  ngOnInit(): void {
  }

  private loadTitleByID() {
    let id = this.route.snapshot.paramMap.get('id');
    return this.httpclient.get<Title>(`${environment.serverUrl}/titles/${id}`);
  }

  private addView() {
    if (!this.title) return;
    let url = `${environment.serverUrl}/titles/add-view/` + this.title.id
    setTimeout(() => {
      this.httpclient.get(url).subscribe(() => {
      });
    }, 10000);
  }

  private loadTitleRandom() {
    return this.httpclient.get<Title>(`${environment.serverUrl}/titles/random`);
  }

  parseDate(date: Date): Date {
    return new Date(date);
  }

  public addComment() {
    if (!this.user) {
      this.router.navigate(['/sing-up'])
      return;
    }
    if (!this.comment.trim()) return;
    if (!this.title) return;
    this.httpclient.post(`${environment.serverUrl}/titles/comment`, {
      commentVal: this.comment,
      titleContentId: this.title.id,
      userId: this.user.id,
      creationDate: new Date(),
    }).subscribe(() => location.reload());
  }

  like(doLike: boolean) {
    this.clickCount++;
    if (this.isWorking) {
      return;
    }
    if (!this.user) {
      this.router.navigate(['/sing-up'])
      return;
    }

    this.isWorking = true;
    let interval = setInterval(() => {
      if (this.countSec === 5 && this.clickCount % 2 === 0) {
        this.clear(interval);
        return;
      }
      if (this.title && this.countSec === 5 && this.clickCount % 2 !== 0) {
        if (doLike) {
          this.httpclient.post<Title>(`${environment.serverUrl}/titles/like`, {
            titleContentId: this.title.id,
            // @ts-ignore
            userId: this.user.id
          }).subscribe();
        } else {
          this.httpclient.post<Title>(`${environment.serverUrl}/titles/unlike`, {
            titleContentId: this.title.id,
            // @ts-ignore
            userId: this.user.id
          }).subscribe();
        }
        this.clear(interval);
        return;
      }
      this.countSec++;
    }, 100);
  }

  clear(interval: NodeJS.Timer) {
    this.countSec = 0;
    this.isWorking = false;
    this.clickCount = 0;
    clearInterval(interval);
  }


}
