import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeadercComponent} from './headerc/headerc.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {TitlesComponent} from './titles/titles.component';
import {ProfileComponent} from './profile/profile.component';
import {PublishComponent} from './publish/publish.component';
import {FormsModule} from "@angular/forms";
import {TitleViewComponent} from './title-view/title-view.component';
import {TitleViewRandomComponent} from './title-view-random/title-view-random.component';

import {AuthPageComponent} from './auth-page/auth-page.component';
import {Observable} from "rxjs";
import { LoginComponent } from './auth-page/login/login.component';
import { LikesPageComponent } from './profile/likes-page/likes-page.component';
import { FootercComponent } from './footerc/footerc.component';
import { ImagesViewComponent } from './images-view/images-view.component';
import { ProfEditComponent } from './auth-page/prof-edit/prof-edit.component';
import { CommentsPageComponent } from './profile/comments-page/comments-page.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { PublishedComponent } from './profile/published/published.component';
import { SubscriptionsComponent } from './profile/subscriptions/subscriptions.component';

const appRoutes: Routes = [
  {path: 'titles', component: TitlesComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'title/create', component: PublishComponent},
  {path: 'random', component: TitleViewRandomComponent},
  {path: 'titles/:id', component: TitleViewComponent},
  {path: 'sing-up', component: AuthPageComponent},
  {path: 'do-login', component: LoginComponent},
  {path: 'liked-titles', component: LikesPageComponent},
  {path: 'titles/:id/images', component: ImagesViewComponent},
  {path: 'edit-profile', component: ProfEditComponent},
  {path: 'user-comments', component: CommentsPageComponent},
  {path: 'profile-view/:id', component: ProfileViewComponent},
  {path: 'published-titles', component: PublishedComponent},
  {path: 'user-subscriptions', component: SubscriptionsComponent},
]

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials: true
    });

    return next.handle(request);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeadercComponent,
    TitlesComponent,
    ProfileComponent,
    PublishComponent,
    TitleViewComponent,
    TitleViewRandomComponent,
    AuthPageComponent,
    LoginComponent,
    LikesPageComponent,
    FootercComponent,
    ImagesViewComponent,
    ProfEditComponent,
    CommentsPageComponent,
    ProfileViewComponent,
    PublishedComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public getUser() {

  }
}
