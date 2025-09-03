const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email harus disertakan" });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "herodigitalapp@gmail.com",
      pass: "dwisyubabxneeiau", // App Password Gmail
    },
  });

  const mailOptions = {
    from: "HeroMobile OTP <herodigitalapp@gmail.com>",
    to: email,
    subject: "Kode OTP Verifikasi",
    text: Kode OTP Anda adalah: ${otp} (berlaku 5 menit).,
    html: <p>Kode OTP Anda adalah: <b>${otp}</b><br>Berlaku 5 menit.</p>,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, otp });
  } catch (error) {
    console.error("Gagal kirim email:", error);
    return res.status(500).json({ success: false, message: "Gagal mengirim OTP" });
  }
};