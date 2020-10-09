import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }
  create_student(record) {
    return this.firestore.collection('posts').add(record);
  }

  read_students() {
    return this.firestore.collection('posts').snapshotChanges();
  }

  update_student(recordID, record) {
    this.firestore.doc('posts' + '/' + recordID).update(record);
  }
}
