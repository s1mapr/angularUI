import {User} from "./user";

export class Title {
  public id: number;
  public titleName: string;
  public typeName: string;
  public originalAuthor: string;
  public authorId: number;
  public creationDate: Date = new Date();
  public description: string = '';
  public titleImg: string = '';
  public released: boolean;
  public author: User;
  public content: TitleContent;
  public categories: Category[];
  public tags: Tag[];
  public serials: Serial[];


  constructor(id: number, titleName: string, typeName: string, originalAuthor: string, authorId: number, creationDate: Date, description: string, titleImg: string, released: boolean, author: User, content: TitleContent, categories: Category[], tags: Tag[], serials: Serial[]) {
    this.id = id;
    this.titleName = titleName;
    this.typeName = typeName;
    this.originalAuthor = originalAuthor;
    this.authorId = authorId;
    this.creationDate = creationDate;
    this.description = description;
    this.titleImg = titleImg;
    this.content = content;
    this.categories = categories;
    this.tags = tags;
    this.serials = serials;
    this.released = released;
    this.author = author;
  }
}

export class Like {
  public titleContentId: number
  public userId: number


  constructor(titleContentId: number, userId: number) {
    this.titleContentId = titleContentId;
    this.userId = userId;
  }

  static getEmptyLike(): Like {
    return new Like(0, 0);
  }
}

export class PossibleContent {
  public categories: Category[];
  public tags: Tag[];
  public serials: Serial[];
  public types: StaticType[];


  constructor(categories: Category[], tags: Tag[], serials: Serial[], types: StaticType[]) {
    this.categories = categories;
    this.tags = tags;
    this.serials = serials;
    this.types = types;
  }
}

export class Comment {
  public commentVal: string;
  public user: User;
  public titleContent: TitleContent;
  public creationDate: Date;


  constructor(commentVal: string, user: User, titleContent: TitleContent, creationDate: Date) {
    this.commentVal = commentVal;
    this.user = user;
    this.titleContent = titleContent;
    this.creationDate = creationDate;
  }
}

export class StaticType {
  public id: number;
  public typeName: string;

  constructor(id: number, typeName: string) {
    this.id = id;
    this.typeName = typeName;
  }
}

export class TitleContent {
  public id: number;
  public titleId: number;
  public likesCount: number = 0;
  public likes: Like[] = [];
  public views: number;
  public images: Image[];
  public comments: Comment[];


  constructor(id: number, titleId: number, likes: Like[], views: number, images: Image[], comments: Comment[]) {
    this.id = id;
    this.titleId = titleId;
    this.likes = likes;
    this.views = views;
    this.images = images;
    this.comments = comments;
  }

  static getEmptyContent(): TitleContent {
    return new TitleContent(0, 0, [], 0, [], []);
  }
}

export class Image {
  public id: number;
  public img64: string;

  constructor(id: number, img64: string) {
    this.id = id;
    this.img64 = img64;
  }

  static getEmptyImg(): Image {
    return new Image(0, "");
  }
}


export class Category {
  public id: number;
  public genre: string;
  public titles: Title[];


  constructor(id: number, genre: string, titles: Title[]) {
    this.id = id;
    this.genre = genre;
    this.titles = titles;
  }

  static getEmptyCategory(): Category {
    return new Category(0, "", []);
  }
}

export class Tag {
  public id: number;
  public tag: string;
  public titles: Title[];


  constructor(id: number, tagName: string, titles: Title[]) {
    this.id = id;
    this.tag = tagName;
    this.titles = titles;
  }

  static getEmptyTag(): Tag {
    return new Tag(0, "", []);
  }
}

export class Serial {
  public id: number;
  public serialName: string;
  public titles: Title[];

  constructor(id: number, serialName: string, titles: Title[]) {
    this.id = id;
    this.serialName = serialName;
    this.titles = titles;
  }

  static getEmptySerial(): Serial {
    return new Serial(0, "", []);
  }
}
