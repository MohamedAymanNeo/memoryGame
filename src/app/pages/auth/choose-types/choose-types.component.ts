import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  getDocFromCache
} from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { query, orderBy, limit } from "firebase/firestore";  
@Component({
  selector: 'app-choose-types',
  templateUrl: './choose-types.component.html',
})
export class ChooseTypesComponent implements OnInit {

  constructor(public firestore :Firestore,private router: Router) { }
  types:any = [
    {type: 'social', id: 'social'},
    {type: 'numbers', id: 'numbers'},
    {type: 'flags', id: 'flags'},
    {type: 'animals', id: 'animals'},
    {type: 'food', id: 'food'},
  ]
  typesInfo: any = []
  ngOnInit(): void {
    // this.getData()
  }
  getData() {
    const dbData = collection(this.firestore, 'types');
    getDocs(dbData)
    .then((res) => {
      // console.log(res);
      
      this.types = [...res.docs.map((item) => {
        return {...item.data(), id: item.id}
      })]
      // console.log(this.types);
    })
    
  }
  getDataTypes(value: any) {
    const dbData = collection(this.firestore, 'types');
    console.log('dbdata',value);
    
    getDocs(dbData)
    .then((res) => {
      this.typesInfo = [...res.docs.map((item) => {      
        return {...item.data(), id: item.id}
      })]
      console.log(this.typesInfo);
    }).then((res)=> {
      console.log(res);
      
    })
  }

  goToGame(value: any) {
    // console.log(value);
    
    this.router.navigate(['/game/',value])
  }

  async getFields(docs: any) {
    console.log(docs);
    
    const docRef = doc(this.firestore, docs);
    try {
      const doc = await getDocFromCache(docRef);
    
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log("Cached document data:", doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    // const q = query(value, limit(1));
  }
}
