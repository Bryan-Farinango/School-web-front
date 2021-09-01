// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://157.245.116.195:8888/api',
  apiKeyAdmin: '3ac03c93-ddb3-4fe0-84e3-92b14c3e5bd9',
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: 'AIzaSyBHd8F9-iH9DLlFW4QK1v6awJv5k8Oz6B8',
    authDomain: 'school-web-b8fc2.firebaseapp.com',
    projectId: 'school-web-b8fc2',
    storageBucket: 'school-web-b8fc2.appspot.com',
    messagingSenderId: '161151247861',
    appId: '1:161151247861:web:ce4d1a8f0f6a6d737e6cbc',
    measurementId: 'G-GZJVPK15GF',
  },
  parcialOptions: ['Parcial 1', 'Parcial 2', 'Parcial 3'],
  topicNotification: ['Asistencia', 'General', 'Noticias'],
  quimestreOption: ['Primer Quimestre', 'Segundo Quimestre'],
  //credentials for drivers firebase
  driverFirebaseApiKey: 'AIzaSyAtp_1k7RgfaMiPWuPA6fQYVxEUnJ2-c20',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
