// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseAPIURL = "http://localhost:3000";
export const environment = {
  production: false,
  firebase : {// dùng để liên kết dự án vs firebase
    apiKey: "AIzaSyBpcMT-bHlpX5sIRLVzIrxqbY3LLE0ZXBw",
    authDomain: "total-chess-345906.firebaseapp.com",
    projectId: "total-chess-345906",
    storageBucket: "total-chess-345906.appspot.com",
    messagingSenderId: "331993473881",
    appId: "1:331993473881:web:989615b066a90300f6e248",
    measurementId: "G-J89B3RLG0T"
  },
  GOOGLE_CLIENT_ID: '331993473881-rqfu014fodno5kppmb28oltldjvh9f5r.apps.googleusercontent.com',
  base_api: baseAPIURL,
  student_api: `${baseAPIURL}/students`,
  subject_api: `${baseAPIURL}/subjects`,
  
};
//nơi định nghĩa ra các đường dẫn chung để lấy dữ liệu


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
