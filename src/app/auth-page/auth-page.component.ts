import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css', '../title-view/title-view.component.css', '../publish/publish.component.css']
})
export class AuthPageComponent implements OnInit {
  email: string | undefined
  password: string | undefined
  name: string | undefined
  firstName: string | undefined
  lastName: string | undefined
  img: any = ''

  incorrectPass: boolean = false
  userExist: boolean = false
  emptyEmail: boolean = false
  emptyName: boolean = false
  emptyPass: boolean = false

  imgInputHelper: HTMLElement | any;
  imgInputHelperLabel: HTMLElement | any;
  imgContainer: HTMLElement | any;
  imgFiles = [];
  addImgHandler: any;

  msg = "";
  public edited = false;
  url: any;

  constructor(private httpclient: HttpClient, private router: Router) {
  }

  //@ts-ignore
  @ViewChild('pass') pass: ElementRef;
  //@ts-ignore
  @ViewChild('passRep') passRep: ElementRef;


  ngOnInit(): void {
    this.imgInputHelper = document.getElementById("add-single-img");
    this.imgInputHelperLabel = document.getElementById("add-img-label");
    this.imgContainer = document.querySelector(".custom-image-container");
    this.imgFiles = [];

    this.addImgHandler = () => {
      const file = this.imgInputHelper.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImg = document.createElement("img");
        newImg.style.width = "100%";
        newImg.style.height = "650px";
        newImg.style.border = "solid 1px black";
        newImg.style.borderRadius = "5px";
        newImg.style.objectFit = "cover";
        if (typeof reader.result === "string") {
          newImg.src = reader.result;
        }
        this.imgContainer.insertBefore(newImg, this.imgInputHelperLabel);
        this.imgInputHelperLabel.remove();
      };
      // @ts-ignore
      this.imgFiles.push(file);
      this.imgInputHelper.value = "";
      return;
    };
    this.imgInputHelper.addEventListener("change", this.addImgHandler);
  }

  selectTitleImg(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    let mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }

    this.edited = true
  }

  validation() {
    if (!this.email) {
      this.emptyEmail = true;
      return;
    }

    if (!this.name) {
      this.emptyName = true;
      return;
    }

    let pass = this.pass.nativeElement.value;
    let passRep = this.passRep.nativeElement.value;

    if (pass.length < 6) {
      this.emptyPass = true;
      return;
    }

    if (pass !== passRep) {
      this.incorrectPass = true;
      return;
    }

    this.incorrectPass = false;
    this.emptyName = false;
    this.emptyEmail = false;
    this.emptyPass = false;
    this.userExist = false;

    this.httpclient.post<boolean>(`${environment.serverUrl}/auth/check-exist`, {
      email: this.email
    }).subscribe(exist => {
      this.userExist = exist;
      if (!this.userExist) {
        this.singUp()
      }
    });
  }

  selectImg(event: any) {
    let mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      this.img = reader.result;
    }

    this.edited = true
  }

  singUp() {
    this.httpclient.post<bigint>(`${environment.serverUrl}/auth/register`, {
      email: this.email,
      password: this.password,
      nickName: this.name,
      img64: this.url,
      firstName: this.firstName,
      lastName: this.lastName,
      creationDate: new Date()
    }).subscribe(() => this.singIn());
  }

  singIn() {
    this.httpclient.post(`${environment.serverUrl}/auth/login`, {
      email: this.email,
      password: this.password,
    }).subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    this.httpclient.get(`${environment.serverUrl}/auth/user`).subscribe(user => {
      localStorage.setItem("user", JSON.stringify(user));
      document.location.reload();
    });
  }
}
