const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");

const con = require("../db");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

router.get("/getKey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

router.get("/", (req, res) => {
  res.send("This is payment endpoint");
});

router.post("/checkout", async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

router.post("/paymentverification", async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const { user, amt } = req.query;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    const sql =
      "INSERT INTO `orders`(`user_name`, `amount`, `order_id`, `payment_id`, `razorpay_sign`) VALUES ('" +
      user +
      "','" +
      amt +
      "','" +
      razorpay_order_id +
      "','" +
      razorpay_payment_id +
      "','" +
      razorpay_signature +
      "')";
    con.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Database Query Error");
        return;
      }
      console.log("Result: " + result);
    });

    res.redirect(
      `http://localhost:5173/marketplace?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

router.post("/sendMail", async (req, res) => {
  const { reciever,refId } = req.body;
  console.log(reciever);
  try {
    // Create a Nodemailer transporter with a test account
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d9fbc8fdb1500b",
        pass: "a7e969db7b03e0",
      },
    });

    // Send mail with defined transport object
    const info = await transport.sendMail({
      from: "Parthbhuva20@gnu.ac.in",
      to: reciever.email,
      subject: "Payment Processed",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Processed</title>
</head>
<body>

    <p>Dear ${reciever.user_name},</p>

    <p>Your payment has been successfully processed. Thank you for choosing our services!</p>

    <p>Payment Details:</p>
    <ul>
        <li><strong>Amount:</strong> ${reciever.total_approved_amount}</li>
        <li><strong>Date:</strong> ${new Date()}</li>
        <li><strong>Reference ID:</strong> ${refId}</li>
    </ul>

    <p>We appreciate your business and look forward to serving you again in the future.</p>

    <p>If you have any questions or concerns, feel free to contact our support team at support@example.com.</p>

    <p>Thank you,</p>
    <p>The FORKIT Team</p>

</body>
</html>`,
    });

    console.log("Email sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
