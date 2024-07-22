import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '../models/user.model';
import { Observable, map, of, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // user$: Observable<User | undefined|null>;
  user$: Observable<any>;
  username?:string = "Anonimo";

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,  private router: Router,private ngZone: NgZone) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }),
      take(1),
      map(u => true)
    )
}


isLoggedIn(){
  var a = false;
  this.user$.pipe(
    take(1),
    tap(user => this.username = user?.displayName),
    map(user => !!user), // <-- map to boolean
    tap(loggedIn => {
      if (loggedIn) {
       a = true;
      }
  }))
  
    return a
}

async googleSignin() {
  const credential = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
  if(credential.user){
    this.router.navigate(['/home']);
  }
  return this.updateUserData(credential.user);
}

  // Sign in with Google
 
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  async AuthLogin(provider:any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');

      })
      .catch((error) => {
        console.log(error);
      });
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName,
    } 

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    this.username = 'Anonimo';
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
