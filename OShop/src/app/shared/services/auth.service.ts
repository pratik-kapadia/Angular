import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ : Observable<firebase.User>;

  constructor(private userService:UserService, private afAuth: AngularFireAuth,private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
   }

   login(){
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   }

   logout() {
     this.afAuth.auth.signOut();
   }

   get appUser$() : Observable<AppUser>{
     return this.user$
            .switchMap(user => {
              if(user) return this.userService.get(user.uid).valueChanges();
              return of(null);
            })
   }
}
