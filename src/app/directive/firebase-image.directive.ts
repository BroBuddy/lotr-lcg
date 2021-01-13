import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

@Directive({
  selector: 'img[appFirebaseImage]'
})
export class FirebaseImageDirective implements OnInit {

  @Input('appFirebaseImage') firebaseImage: string;

  constructor(public el: ElementRef, private firestore: AngularFireStorage) {}

  ngOnInit(): void {
    this.getFireBaseUrl(this.firebaseImage);
  }

  getFireBaseUrl(path: string): void {
    this.firestore.refFromURL('gs://lord-of-the-rings-d038c.appspot.com/' + path).getDownloadURL().subscribe(url => {
      this.el.nativeElement.src = url;
    });
  }

}
