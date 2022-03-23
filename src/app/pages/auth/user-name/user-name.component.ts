import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from '@angular/fire/firestore'
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
})
export class UserNameComponent implements OnInit {
  data:any = []
  constructor(
    public auth: Auth,
    public firestore :Firestore,
    private router: Router) { }

  ngOnInit(): void {
    // this.getData()
  }
  getData() {
    const dbData = collection(this.firestore, 'users');
    getDocs(dbData)
    .then((res) => {
      this.data = [...res.docs.map((item) => {
        return {...item.data(), id: item.id}
      })]
      console.log(this.data);
    })
    
  }
  addData(value: any) {
    const dbData = collection(this.firestore, 'users');
    addDoc(dbData, value)
    .then(() => {
      console.log("Data Sent");
      this.router.navigate(['/types']);
      // this.getData()
    })
    .catch((err) => {
      console.log('error', err.message);
    })
  }
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
