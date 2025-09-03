const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Transporter Gmail (pakai App Password, bukan password biasa)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "herodigitalapp@gmail.com",
    pass: "dwisyubabxneeiau" // App Password Gmail
  }
});

// Endpoint untuk kirim OTP
app.post("/sendOtp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email harus disertakan" });
  }

  // Generate OTP 6 digit
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: "Your App <herodigitalapp@gmail.com>",
    to: email,
    subject: "Kode OTP Verifikasi",
    text: Kode OTP Anda adalah: ${otp} (berlaku 5 menit).,
    html: <p>Kode OTP Anda adalah: <b>${otp}</b><br>Berlaku 5 menit.</p>
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(OTP terkirim ke ${email}: ${otp});
    res.json({ success: true, otp });
  } catch (error) {
    console.error("Gagal kirim email:", error);
    res.status(500).json({ success: false, message: "Gagal mengirim OTP" });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});