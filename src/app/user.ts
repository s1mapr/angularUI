import {Like, Title} from "./title";
import {Comment} from "./title";

export class User {
  public id: number;
  public email: string;
  public nickName: string;
  public role: string;
  public img64: string;
  public likes: Like[];
  public comments: Comment[];
  public publishedTitles: Title[];
  public creationDate: Date = new Date();
  public lastName: string;
  public firstName: string;
  public banned: boolean;


  constructor(id: number, email: string, name: string, role: string, img64: string, likes: Like[], comments: Comment[], publishedTitles: Title[], creationDate: Date, lastName: string, firstName: string, banned: boolean) {
    this.id = id;
    this.email = email;
    this.nickName = name;
    this.role = role;
    this.img64 = img64;
    this.likes = likes;
    this.comments = comments;
    this.creationDate = creationDate;
    this.lastName = lastName;
    this.firstName = firstName;
    this.banned = banned;
    this.publishedTitles = publishedTitles;
  }
}

export class Subscription {
  public authorId: number;
  public subscriberId: number;
  public author: User;
  public subscriber: User;


  constructor(authorId: number, subscriberId: number, author: User, subscriber: User) {
    this.authorId = authorId;
    this.subscriberId = subscriberId;
    this.author = author;
    this.subscriber = subscriber;
  }
}
