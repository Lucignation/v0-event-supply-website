// lib/otp.ts

export function generateOTP(length = 6) {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // digits only
    }
    return otp;
  }
  
  export const OTP_EXPIRY_MINUTES = 10;
  