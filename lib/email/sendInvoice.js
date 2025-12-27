import { sendEmail } from "./transporter";

export const sendInvoiceEmail = async (booking) => {
  const {
    _id,
    userName,
    userEmail,
    serviceName,
    duration,
    totalCost,
    createdAt,
    location,
  } = booking;

  const invoiceDate = new Date(createdAt).toLocaleDateString();
  const invoiceId = _id.toString().slice(-6).toUpperCase();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
        .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #6366f1; }
        .logo { font-size: 24px; font-weight: bold; color: #4f46e5; }
        .invoice-details { margin-bottom: 30px; }
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .invoice-table th { text-align: left; padding: 10px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; }
        .invoice-table td { padding: 10px; border-bottom: 1px solid #eee; }
        .total { text-align: right; font-size: 18px; font-weight: bold; color: #4f46e5; margin-top: 20px; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #999; }
        .btn { display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Care.xyz</div>
          <p>Booking Invoice</p>
        </div>
        
        <div class="invoice-details">
          <p><strong>Invoice ID:</strong> #${invoiceId}</p>
          <p><strong>Date:</strong> ${invoiceDate}</p>
          <p><strong>Billed To:</strong> ${userName} (${userEmail})</p>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${serviceName}</td>
              <td>${duration.value} ${duration.unit}</td>
              <td>${location.area}, ${location.city}</td>
              <td>৳${totalCost}</td>
            </tr>
          </tbody>
        </table>

        <div class="total">
          Total: ৳${totalCost}
        </div>

        <div style="text-align: center;">
          <p>Status: <strong>Pending Payment</strong></p>
          <p>Thank you for choosing Care.xyz! Your booking request has been received.</p>
        </div>

        <div class="footer">
          <p>Care.xyz - Baby Sitting & Elderly Care Service Platform</p>
          <p>Contact us: support@care.xyz</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail(
      userEmail,
      `Invoice #${invoiceId} - Booking Confirmation from Care.xyz`,
      html
    );
    console.log(`Invoice email sent to ${userEmail}`);
  } catch (error) {
    console.error("Failed to send invoice email:", error);
    // Don't throw here to avoid failing the api request if email fails
  }
};
