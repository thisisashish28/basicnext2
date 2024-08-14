export const generateOtp = (digits = 4) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString().slice(-digits);
};
