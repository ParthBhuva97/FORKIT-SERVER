const express = require("express");
const crypto = require("crypto");
const router = express.Router();
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

router.post("/paymentverification", async (req, res,next) => {
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
    con.query(sql, (err,result) => {
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

module.exports = router;
