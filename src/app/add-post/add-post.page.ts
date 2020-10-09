import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { from } from 'rxjs';
import { Post } from '../models/post.model';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  post = {} as Post;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }
  async createPost(post: Post) {
    if (this.fromValidation()) {
      // show loader
      const loader = this.loadingCtrl.create({
        message: 'Please wait ...'
      });
      (await loader).present();
      try {
        await this.CreateRecord(post);
      } catch (e) {
        this.showToast(e);
      }
      // dissmiss loader
      (await loader).dismiss();
      this.navCtrl.navigateRoot('home');
    }
  }
  CreateRecord(posts) {
    this.firebaseService.create_student(posts);

  }
  fromValidation() {
    if (!this.post.title) {
      this.showToast('Enter title');
      return false;
    }
    if (!this.post.details) {
      this.showToast('Enter details');
      return false;
    }
    return true;
  }
  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}
