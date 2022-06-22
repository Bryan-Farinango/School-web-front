// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://157.245.116.195:8888/api',
  apiKeyAdmin: '3ac03c93-ddb3-4fe0-84e3-92b14c3e5bd9',
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: 'AIzaSyA9psawO5pyvfGCEQLu0OFPcUF_h4Mk0uw',
    authDomain: 'school-web-d5e3f.firebaseapp.com',
    projectId: 'school-web-d5e3f',
    storageBucket: 'school-web-d5e3f.appspot.com',
    messagingSenderId: '944413204150',
    appId: '1:944413204150:web:1bf695ee806cb4417e9017',
    measurementId: 'G-1PXBB8X6XX',
  },
  parcialOptions: ['Parcial 1', 'Parcial 2', 'Parcial 3'],
  topicNotification: ['Asistencia', 'General', 'Noticias'],
  quimestreOption: ['Primer Quimestre', 'Segundo Quimestre'],
  //credentials for drivers firebase
  driverFirebaseApiKey: 'AIzaSyBpDAB2JifxO--5ELLqee47eW0Z3bk3RdA',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
