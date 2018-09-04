import { Component, OnInit } from "@angular/core";
import { Response } from "@angular/http";
import { AuthService } from "../../auth/auth.service";
import { DataStorageService } from "../../../shared/data-storage.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeData().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.fetchData();
  }

  onLogout() {
    this.authService.logout();
  }
}