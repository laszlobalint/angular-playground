import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loadedFeature: string = 'recipe';
  
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCaIeh8phSZ5aZe9HoiJduU3I_j5mOX-iE",
      authDomain: "recipe-book-75f4b.firebaseapp.com"  
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}