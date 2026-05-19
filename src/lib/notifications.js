import { logNotification } from './supabase';

const EMAIL_API_KEY = import.meta.env.VITE_EMAIL_API_KEY;
const EMAIL_SERVICE = import.meta.env.VITE_EMAIL_SERVICE || 'resend';

async function sendEmail(to, subject, html) {
  if (EMAIL_SERVICE === 'resend') {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EMAIL_API_KEY}`
      },
      body: JSON.stringify({
        from: 'noreply@rinse.local',
        to,
        subject,
        html
      })
    });
    if (!response.ok) throw new Error('Failed to send email');
    return response.json();
  }
  
  // Fallback: log to console for testing
  console.log(`📧 Email sent to ${to}:\n${subject}\n${html}`);
  return { success: true };
}

// Booking confirmation
export async function sendBookingConfirmation(booking, runnerEmail) {
  const customerHtml = `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #080f0f; color: #eee; padding: 40px 20px;">
      <h1 style="color: #00d4aa; margin: 0 0 10px;">🎉 Booking Confirmed!</h1>
      <p>Hi ${booking.customer_name},</p>
      <p>Your laundry pickup is confirmed for <strong>${booking.pickup_day} at ${booking.pickup_time}</strong>.</p>
      
      <div style="background: #0d1616; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #1a2828;">
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>Price:</strong> ${booking.price}</p>
        <p><strong>Status:</strong> Pending Runner Assignment</p>
      </div>
      
      <p>A verified runner will arrive to collect your laundry. You'll receive updates via email.</p>
      <p style="color: #667; font-size: 12px; margin-top: 30px;">Need help? Visit our Help Center</p>
      <hr style="border: none; border-top: 1px solid #1a2828;" />
      <p style="font-size: 11px; color: #445;">Rinse • Clean, minimal, modern</p>
    </div>
  `;

  const runnerHtml = `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #080f0f; color: #eee; padding: 40px 20px;">
      <h1 style="color: #00d4aa; margin: 0 0 10px;">📦 New Gig Available!</h1>
      <p>New laundry pickup available:</p>
      
      <div style="background: #0d1616; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #1a2828;">
        <p><strong>Customer:</strong> ${booking.customer_name}</p>
        <p><strong>Pickup:</strong> ${booking.pickup_day} at ${booking.pickup_time}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>Pay:</strong> <span style="color: #00d4aa; font-weight: 700;">${booking.price}</span></p>
      </div>
      
      <p style="margin-top: 20px;"><a href="#" style="background: #00d4aa; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 700; display: inline-block;">View Gig in App →</a></p>
      <p style="font-size: 11px; color: #445; margin-top: 30px;">Rinse • Clean, minimal, modern</p>
    </div>
  `;

  try {
    await sendEmail(booking.customer_email, '✅ Your Rinse Booking is Confirmed', customerHtml);
    await sendEmail(runnerEmail, '🚀 New Laundry Pickup Available', runnerHtml);

    // Log notifications
    await logNotification({
      recipient_email: booking.customer_email,
      booking_id: booking.id,
      notification_type: 'booking_confirmation',
      subject: '✅ Your Rinse Booking is Confirmed',
      body: customerHtml,
      sent: true,
      sent_at: new Date().toISOString()
    });

    await logNotification({
      recipient_email: runnerEmail,
      booking_id: booking.id,
      notification_type: 'new_gig',
      subject: '🚀 New Laundry Pickup Available',
      body: runnerHtml,
      sent: true,
      sent_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
}

// OTP email
export async function sendOTPEmail(email, otp) {
  const html = `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #080f0f; color: #eee; padding: 40px 20px;">
      <h1 style="color: #00d4aa; margin: 0 0 10px;">🔐 Your Verification Code</h1>
      <p>Your one-time password is:</p>
      <div style="background: #0d1616; padding: 30px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #1a2828;">
        <h2 style="letter-spacing: 8px; color: #00d4aa; font-size: 32px; margin: 0;">${otp}</h2>
      </div>
      <p style="color: #667; font-size: 13px;">This code expires in 10 minutes. Don't share it with anyone.</p>
      <p style="font-size: 11px; color: #445; margin-top: 30px;">Rinse • Clean, minimal, modern</p>
    </div>
  `;

  await sendEmail(email, '🔐 Your Rinse Verification Code', html);
}

// Pickup reminder
export async function sendPickupReminder(booking) {
  const html = `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #080f0f; color: #eee; padding: 40px 20px;">
      <h1 style="color: #00d4aa; margin: 0 0 10px;">⏰ Pickup Reminder</h1>
      <p>Hi ${booking.customer_name},</p>
      <p>Your laundry pickup is <strong>tomorrow at ${booking.pickup_time}</strong>!</p>
      <p>Our runner will arrive at:</p>
      <p style="font-weight: 700; background: #0d1616; padding: 15px; border-radius: 6px; border-left: 3px solid #00d4aa;">${booking.address}</p>
      <p style="color: #667; font-size: 13px;">Make sure your laundry is ready and easily accessible.</p>
      <p style="font-size: 11px; color: #445; margin-top: 30px;">Rinse • Clean, minimal, modern</p>
    </div>
  `;

  await sendEmail(booking.customer_email, '⏰ Pickup Reminder - Tomorrow!', html);
}
