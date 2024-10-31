// import path from 'path'
// import {
//   generateUniqueSecret,
//   verifyOTPToken,
//   generateOTPToken,
//   generateQRCode,
// } from '../helpers/2fa.js'

// // Lấy đường dẫn thư mục gốc của ứng dụng
// const __dirname = path.resolve()

// /** Vì demo nên mình sẽ tạo một biến giả lập user ở global của file.
//  * Trong dự án thực tế, user và secret riêng của user đó PHẢI được lưu vào Database
// */
// const MOCK_USER = {
//     username: 'longnn',
//     password: 'longnn',
//     is2FAEnabled: true,
//     secret: generateUniqueSecret()
// }

// /** controller get login page */
// const getLoginPage = async (req, res) => {
//     return res.sendFile(path.join(`${__dirname}/src/views/login.html`))
// }
  
// /** controller get enable 2FA page */
// const getEnable2FAPage = async (req, res) => {
//     return res.sendFile(path.join(`${__dirname}/src/views/enable2FA.html`))
// }
  
// /** controller get verify 2FA page */
// const getverify2FAPage = async (req, res) => {
//     return res.sendFile(path.join(`${__dirname}/src/views/verify2FA.html`))
// }
  
// /** controller xử lý đăng nhập */
// const postLogin = async (req, res) => {
//     try {
//       let user = MOCK_USER
//       const { username, password } = req.body
//       // Giả sử trường hợp đăng nhập thành công
//       if (username === user.username && password === user.password) {
//         // Thực hiện yêu cầu xác thực 2 bước nếu tài khoản user này đã bật xác thực 2 lớp trước đó.
//         if (user.is2FAEnabled) {
//           return res.status(200).json({
//             isCorrectIdentifier: true,
//             is2FAEnabled: true,
//             isLoggedIn: false,
//           })
//         }
//         // Bỏ qua xác thực 2 lớp nếu tài khoản user này không bật xác thực 2 lớp
//         return res.status(200).json({
//           isCorrectIdentifier: true,
//           is2FAEnabled: false,
//           isLoggedIn: true,
//         })
//       }
//       // Trường hợp đăng nhập thất bại (do thông tin đăng nhập không chính xác)
//       return res.status(200).json({
//         isCorrectIdentifier: false,
//         is2FAEnabled: false,
//         isLoggedIn: false,
//       })
//     } catch (error) {
//       return res.status(500).json(error)
//     }
// }
  

//   /** controller xử lý tạo mã otp và gửi về client dạng hình ảnh QR Code */
// const postEnable2FA = async (req, res) => {
//     try {
//       let user = MOCK_USER
  
//       // đây là tên ứng dụng của các bạn, nó sẽ được hiển thị trên app Google Authenticator hoặc Authy sau khi bạn quét mã QR
//       const serviceName = 'longnn.com'
//       // Thực hiện tạo mã OTP
//       const otpAuth = generateOTPToken(user.username, serviceName, user.secret)
//       console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------`);
//       console.log(`🛠 LOG: 🚀 --> ~ file: AuthController.js ~ line 80 ~ postEnable2FA ~ otpAuth`, otpAuth);
//       console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------`);
//       // console.log(otpAuth)
//       // nếu các bạn console.log cái otpAuth ở trên thì các bạn sẽ thấy rõ hơn về nó, mình ví dụ:
//       // otpauth://totp/trungquandev.com:trungquandev?secret=GYCCWGRLDY3RAFBU&period=30&digits=6&algorithm=SHA1&issuer=trungquandev.com
  
//       // Tạo ảnh QR Code để gửi về client
//       const QRCodeImage = await generateQRCode(otpAuth)
  
//       return res.status(200).json({ QRCodeImage })
//     } catch (error) {
//       return res.status(500).json(error)
//     }
// }

// const postVerify2FA = async (req, res) => {
//     try {
//       let user = MOCK_USER
//       const { otpToken } = req.body
  
//       // Kiểm tra mã token người dùng truyền lên có hợp lệ hay không?
//       const isValid = verifyOTPToken(otpToken, user.secret)
//       /** Sau bước này nếu verify thành công thì thực tế chúng ta sẽ redirect qua trang đăng nhập thành công,
//       còn hiện tại demo thì mình sẽ trả về client là đã verify success hoặc fail */
  
//       return res.status(200).json({ isValid })
//     } catch (error) {
//       return res.status(500).json(error)
//     }
// }
  
// export {
//     getLoginPage,
//     getEnable2FAPage,
//     getverify2FAPage,
//     postLogin,
//     postEnable2FA,
//     postVerify2FA,
// }
import path from 'path';
import {
  generateUniqueSecret,
  verifyOTPToken,
  generateOTPToken,
  generateQRCode,
} from '../helpers/2fa.js';

// Root path of the application
const __dirname = path.resolve();

// Mock user for demo purposes (should be stored in a database in production)
const MOCK_USER = {
  username: 'longnn',
  password: 'longnn',
  is2FAEnabled: true,
  secret: generateUniqueSecret()
};

// GET /login - Login page
export const getLoginPage = async (req, res) => {
  res.sendFile(path.join(`${__dirname}/src/views/login.html`));
};

// POST /login - Handle login
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  if (username === MOCK_USER.username && password === MOCK_USER.password) {
    return res.status(200).json({
      isCorrectIdentifier: true,
      is2FAEnabled: MOCK_USER.is2FAEnabled,
      isLoggedIn: !MOCK_USER.is2FAEnabled
    });
  }
  return res.status(401).json({ message: "Invalid credentials" });
};

// GET /2fa/enable - Enable 2FA page
export const getEnable2FAPage = async (req, res) => {
  res.sendFile(path.join(`${__dirname}/src/views/enable2FA.html`));
};

// POST /2fa/enable - Generate OTP and return QR Code
export const postEnable2FA = async (req, res) => {
  try {
    const serviceName = 'longnn.com';
    const otpAuth = generateOTPToken(MOCK_USER.username, serviceName, MOCK_USER.secret);
    const QRCodeImage = await generateQRCode(otpAuth);
    return res.status(200).json({ QRCodeImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /2fa/verify - Verify 2FA page
export const getverify2FAPage = async (req, res) => {
  res.sendFile(path.join(`${__dirname}/src/views/verify2FA.html`));
};

// POST /2fa/verify - Verify OTP token
export const postVerify2FA = async (req, res) => {
  const { otpToken } = req.body;
  const isValid = verifyOTPToken(otpToken, MOCK_USER.secret);
  res.status(200).json({ isValid });
};