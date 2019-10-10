import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase'; 
import { AngularFireDatabase } from 'angularfire2/database';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  name$: string;

  constructor(
    private db: AngularFireDatabase,
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;    
  }

  signupUser(name: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(
      data => {console.log(data);
      // this.db.object('users')
      this.db.object('users/'+ data.uid).update(
        {displayname: name}
      )
      this.name$ = name;
      }
    )
      .catch(
        error => console.log(error)
      )
  }

  signInUser(email: string, password:string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(
      reponse => { console.log(reponse)
        // this.db.object(`users/${reponse.uid}`).valueChanges()
      })
    .catch(
      error => console.log(error)
    );
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() { 
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });    
  }
}
