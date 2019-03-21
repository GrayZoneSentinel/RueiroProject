import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyDmcXuoA4pWQpvbgbmd3OJY4RKdTkqHEv8",
    authDomain: "rueiro-9fe97.firebaseapp.com",
    databaseURL: "https://rueiro-9fe97.firebaseio.com",
    projectId: "rueiro-9fe97",
    storageBucket: "rueiro-9fe97.appspot.com",
    messagingSenderId: "592408708075"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database();
//   firebaseDB.ref('matches').once('value').then((snapshot)=>{
//       console.log(snapshot.val())
//   })
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions');
  const firebaseTeams = firebaseDB.ref('teams');
  // Try to create a folder in Firebase to record the associates
  const firebaseAssociates = firebaseDB.ref('associates');
  // Try to create a folder in Firebase to record the managers
  const firebaseManagers = firebaseDB.ref('managers');
  const firebaseOffices = firebaseDB.ref('offices')
  // Try to create a folder in Firebase to record the events
  const firebaseEvents = firebaseDB.ref('events');

export {
    firebase,
    // ASSOCIATES DATABASE CONST
    firebaseAssociates,
    // MANAGERS DATABASE CONST
    firebaseManagers,
    firebaseOffices,
    // EVENTS DATABASE CONST
    firebaseEvents,
    // MISCELANEA DATABASE CONST
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    // DATABASE CONST
    firebaseDB
}