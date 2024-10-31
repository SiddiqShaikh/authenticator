// import express from 'express'
// import {
//   getLoginPage,
//   postLogin,
//   getEnable2FAPage,
//   postEnable2FA,
//   getverify2FAPage,
//   postVerify2FA,
// } from '../controllers/AuthController.js'
// import { getHomePage } from '../controllers/HomeController.js'

// const router = express.Router()

// /**
//  * Init all APIs on your application
//  * @param {*} app from express framework
//  */
// const initAPIs = (app) => {
//   // Gọi ra trang chủ home page
//   router.get('/', getHomePage)

//   // Trang login
//   router.get('/login', getLoginPage)
//   router.post('/login', postLogin)

//   // Trang bật tính năng bảo mật 2 lớp
//   router.get('/enable-2fa', getEnable2FAPage)
//   router.post('/enable-2fa', postEnable2FA)

//   // Trang yêu cầu xác thực 2 lớp
//   router.get('/verify-2fa', getverify2FAPage)
//   router.post('/verify-2fa', postVerify2FA)

//   return app.use('/', router)
// }

// export { initAPIs }

import express from 'express';
import {
  getLoginPage,
  postLogin,
  getEnable2FAPage,
  postEnable2FA,
  getverify2FAPage,
  postVerify2FA,
} from '../controllers/AuthController.js';
import { getHomePage } from '../controllers/HomeController.js';

const router = express.Router();

const initAPIs = (app) => {
  router.get('/', getHomePage);

  // Authentication routes
  router.get('/auth/login', getLoginPage);
  router.post('/auth/login', postLogin);

  // Two-Factor Authentication (2FA) routes
  router.get('/2fa/enable', getEnable2FAPage);
  router.post('/2fa/enable', postEnable2FA);
  router.get('/2fa/verify', getverify2FAPage);
  router.post('/2fa/verify', postVerify2FA);

  app.use('/', router);
};

export { initAPIs };