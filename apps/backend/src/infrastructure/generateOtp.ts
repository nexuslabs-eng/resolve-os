export const otpExpiryMs = 15 * 60 * 1000;

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};