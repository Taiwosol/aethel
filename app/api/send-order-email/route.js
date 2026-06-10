import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { order, userEmail, userName } = await request.json();

    // Create email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
          .order-details { background: #f9f9f9; padding: 20px; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AETHEL</h1>
            <p>Order Confirmation</p>
          </div>
          <h2>Hi ${userName},</h2>
          <p>Thank you for your order! Here are your order details:</p>
          <div class="order-details">
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Order Date:</strong> ${order.orderDate}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <h3>Items:</h3>
            ${order.items.map(item => `
              <div class="item">
                <span>${item.quantity}x ${item.product.name} (Size: ${item.size})</span>
                <span>₦${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            `).join('')}
            <div class="total">
              <p>Subtotal: ₦${order.subtotal.toLocaleString()}</p>
              <p>Shipping: ${order.deliveryFee === 0 ? 'Free' : '₦' + order.deliveryFee.toLocaleString()}</p>
              <p>Total: ₦${order.total.toLocaleString()}</p>
            </div>
          </div>
          <p>We'll notify you when your order ships!</p>
          <p>Best regards,<br/>The AETHEL Team</p>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      Hi ${userName},

      Thank you for your order! Here are your order details:

      Order Number: ${order.orderNumber}
      Order Date: ${order.orderDate}
      Status: ${order.status}

      Items:
      ${order.items.map(item => `- ${item.quantity}x ${item.product.name} (Size: ${item.size}) - ₦${(item.product.price * item.quantity).toLocaleString()}`).join('\n')}

      Subtotal: ₦${order.subtotal.toLocaleString()}
      Shipping: ${order.deliveryFee === 0 ? 'Free' : '₦' + order.deliveryFee.toLocaleString()}
      Total: ₦${order.total.toLocaleString()}

      We'll notify you when your order ships!

      Best regards,
      The AETHEL Team
    `;

    // TODO: Implement email sending with your preferred service
    // Option 1: SendGrid
    // Option 2: Nodemailer
    // Option 3: Resend

    console.log("Email would be sent to:", userEmail);
    console.log("Email content:", emailContent);

    // For now, just return success (remove this when implementing actual email service)
    return NextResponse.json({ success: true, message: "Email queued for delivery" });

    /*
    // --- SendGrid Example ---
    // 1. Install: npm install @sendgrid/mail
    // 2. Add SENDGRID_API_KEY to .env.local
    import sgMail from '@sendgrid/mail';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: userEmail,
      from: 'your-email@yourdomain.com', // Verified sender in SendGrid
      subject: `Order Confirmation - ${order.orderNumber}`,
      text: textContent,
      html: emailContent,
    };

    await sgMail.send(msg);
    */

    /*
    // --- Nodemailer Example ---
    // 1. Install: npm install nodemailer
    // 2. Add SMTP details to .env.local
    import nodemailer from 'nodemailer';

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: 'your-email@yourdomain.com',
      to: userEmail,
      subject: `Order Confirmation - ${order.orderNumber}`,
      text: textContent,
      html: emailContent,
    });
    */

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
