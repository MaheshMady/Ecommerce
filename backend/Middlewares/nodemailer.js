const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
require("dotenv").config()

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

exports.sendEmailverifymail = async (email, verifyLink) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: "Please Verify Your Email Address",
    html: `
      <p>Dear User,</p>
      <p>Thank you for registering with us. To complete your signup, please verify your email address by clicking the link below:</p>
      <p><a href="${verifyLink}" target="_blank">Verify Email Address</a></p>
      <p>If you did not initiate this request, please ignore this email.</p>
      <br/>
      <p>Best regards,<br/>Your Company Name Team</p>
    `
  };

  await transport.sendMail(mailOptions);
};


exports.sendmail = async function (email, resetLink) {
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>Dear User,</p>
      <p>We received a request to reset your password. Please click the link below to set a new password:</p>
      <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
      <p>If you did not request a password reset, please ignore this email or contact support.</p>
      <br/>
      <p>Best regards,<br/>Your Company Name Team</p>
    `
  };

  await transport.sendMail(mailOptions);
};


exports.sendProductConfirmationMail = async function (email, order) {
  // order structure:
  // {
  //   _id: "69005a5b96fa3fd97c44e233",
  //   userid: "68f0d84dfc435bd341c657ed",
  //   items: [{ productid: "68e771d77d44ec2e1856eda4", quantity: 1, price: 1800 }],
  //   totalprice: 1800,
  //   phoneno: 6379854849,
  //   pincode: 625532,
  //   address: "madurai",
  //   paymentmethod: "Card",
  //   orderedAt: "2025-10-28T05:52:34.337Z",
  //   orderStatus: "Packed",
  //   paymentStatus: "pending"
  // }

  const orderDate = new Date(order.orderedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Generate product rows
  const productRows = order.items
    .map(
      (item, i) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${i + 1}</td>
        <td style="padding:8px;border:1px solid #ddd;">${item.productid.product}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${item.price}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${item.price * item.quantity}</td>
      </tr>`
    )
    .join("");

  await transport.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: ` Order Confirmation `,
    text: `
Thank you for your order!

Order ID: ${order._id}
Date: ${orderDate}

Delivery Address:
${order.address}, ${order.pincode}
Phone: ${order.phoneno}

Payment Method: ${order.paymentmethod}
Payment Status: ${order.paymentStatus}
Order Status: ${order.orderStatus}

Items:
${order.items.map((i) => `${i.productid} x${i.quantity} — ₹${i.price * i.quantity}`).join("\n")}

Total: ₹${order.totalprice}

We’ll notify you when your package ships.

— Ecommerce Team
    `,
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden;">
      <div style="background:#007bff;color:white;padding:16px 24px;">
        <h2 style="margin:0;">Order Confirmation</h2>
      </div>
      <div style="padding:24px;">
        <p>Hi there,</p>
        <p>Thank you for your purchase! Here’s your order summary:</p>
        <p><strong>Order ID:</strong> ${order._id}<br>
        <strong>Date:</strong> ${orderDate}</p>

        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:8px;border:1px solid #ddd;">#</th>
              <th style="padding:8px;border:1px solid #ddd;">Product ID</th>
              <th style="padding:8px;border:1px solid #ddd;">Qty</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
          <tfoot>
            <tr style="background:#fafafa;font-weight:bold;">
              <td colspan="4" style="padding:8px;border:1px solid #ddd;text-align:right;">Grand Total:</td>
              <td style="padding:8px;border:1px solid #ddd;text-align:right;">₹${order.totalprice}</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top:20px;">
          <p><strong>Shipping Address:</strong><br>${order.address}, ${order.pincode}</p>
          <p><strong>Phone:</strong> ${order.phoneno}</p>
          <p><strong>Payment:</strong> ${order.paymentmethod} (${order.paymentStatus})</p>
          <p><strong>Order Status:</strong> ${order.orderStatus}</p>
        </div>

        <p style="margin-top:20px;">We’ll notify you when your order is shipped. Thanks for shopping with <strong>SmartDigitalHub</strong>!</p>
      </div>
      <div style="background:#f9f9f9;padding:12px;text-align:center;color:#777;font-size:12px;">
        © ${new Date().getFullYear()} Ecommerce — All rights reserved.
      </div>
    </div>
    `,
  });
};
