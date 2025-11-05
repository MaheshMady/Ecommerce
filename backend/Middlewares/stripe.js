require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

exports.createCheckoutSession = function (lineitems, orderdetail) {
  let session = stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineitems,
    metadata: {
      orderid: String(orderdetail._id),
      userid: String(orderdetail.userid),
    },
    success_url: "ecommerce-alpha-teal.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "ecommerce-alpha-teal.vercel.app/failure?session_id={CHECKOUT_SESSION_ID}",
  });

  return session;
};

exports.checkWebhook = async (body, signature, secret) => {
  try {
    return stripe.webhooks.constructEvent(
     body,
      signature,
      secret
    );
  } catch (err) {
    console.log("⚠️  Webhook signature verification failed.", err.message);
    
  }
};
