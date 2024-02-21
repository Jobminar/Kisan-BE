import OTP from "../models/otpModel.js";

export const saveOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if the email is already associated with an active OTP
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      return res.status(400).json({
        message: "OTP already saved for this email. Please check your email.",
      });
    }

    const otpRecord = new OTP({
      email,
      otp,
    });
    await otpRecord.save();

    return res.status(200).json({ message: "OTP saved successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOTPByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res
        .status(404)
        .json({ message: "No active OTP found for this email." });
    }

    return res.status(200).json({ email: otpRecord.email, otp: otpRecord.otp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
