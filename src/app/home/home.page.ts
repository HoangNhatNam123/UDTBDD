import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService) { }
  ionViewWillEnter() {
    this.getPosts();
  }
  async getPosts() {
    // show loader
    const loader = this.loadingCtrl.create({
      message: 'Please wait ...'
    });
    (await loader).present();
    try {
      // this.firestore.collection('posts').snapshotChanges().subscribe(data => {
      //   this.posts = data.map(e => {
      //     return {
      //       id: e.payload.doc.id,
      //       // tslint:disable-next-line:no-string-literal
      //       title: e.payload.doc.data()['title'],
      //       // tslint:disable-next-line:no-string-literal
      //       details: e.payload.doc.data()['details']
      //     };
      //   });
      // });
      this.ReadRecord();
      // dismiss loader
      (await loader).dismiss();
    } catch (e) {
      this.showToast(e);
    }
  }
  ReadRecord() {
    this.firebaseService.read_students().subscribe(data => {
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          // tslint:disable-next-line:no-string-literal
          title: e.payload.doc.data()['title'],
          // tslint:disable-next-line:no-string-literal
          details: e.payload.doc.data()['details']
        };
      });
    });
  }
  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}
