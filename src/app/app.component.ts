import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from '@angular/fire/firestore'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Memory Game';
  data:any = []
  constructor(public auth: Auth,public firestore :Firestore) {
    // this.getData()
  }

  // getData() {
  //   const dbData = collection(this.firestore, 'users');
  //   getDocs(dbData)
  //   .then((res) => {
  //     this.data = [...res.docs.map((item) => {
  //       return {...item.data(), id: item.id}
  //     })]
  //   })
  // }

  // updateData(id: any) {
  //   const dataToUpdate = doc(this.firestore, 'users', id);
  //   updateDoc(dataToUpdate, {
  //     name: 'Mahmoud'
  //   }).then(() => {
  //     console.log("Data Updated");
  //     this.getData()
  //   })
  //   .catch((err) => {
  //     console.log('error', err.message);
  //   })
  // }
  // addData(value: any) {
  //   const dbData = collection(this.firestore, 'users');
  //   addDoc(dbData, value)
  //   .then(() => {
  //     console.log("Data Sent");
  //   })
  //   .catch((err) => {
  //     console.log('error', err.message);
  //   })
  // }
  // handleRegister(value: any) {
  //   createUserWithEmailAndPassword(this.auth, value.email, value.password)
  //   .then((res: any) => {
  //     console.log('result',res.user);
  //   })
  //   .catch((err) => {
  //     console.log('error',err);
      
  //   })
  // }
  // handleLogin(value: any) {
  //   signInWithEmailAndPassword(this.auth, value.email, value.password)
  //   .then((res: any) => {
  //     console.log('result',res.user);
  //   })
  //   .catch((err) => {
  //     console.log('error',err);
      
  //   })
  // }
}
