import { NextResponse } from 'next/server';
// Import the Resend SDK
import {Resend} from 'resend';

const escapeHtml = (value) => String(value ?? '—').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

export async function POST(req) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email sending is not configured. Add RESEND_API_KEY to the server environment and restart the app.'
      }), { status: 503, headers });
    }

    const body = await req.json();
    // Destructure the necessary fields from the request body
    const { email, trackingId, shipmentDetails } = body;

    if (!email || !trackingId || !shipmentDetails) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email, tracking ID, and shipment details are required.'
      }), { status: 400, headers });
    }

    const resend = new Resend(apiKey);
    const receiptDate = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
    }).format(new Date());
    const trackingCode = escapeHtml(trackingId);
    const safeTrackingUrl = (() => {
      try {
        const url = new URL(shipmentDetails.trackingUrl);
        return ['http:', 'https:'].includes(url.protocol) ? escapeHtml(url.href) : '';
      } catch {
        return '';
      }
    })();
    const detailRows = [
      ['Sender', shipmentDetails.senderName],
      ['Receiver', shipmentDetails.receiverName],
      ['Shipment status', shipmentDetails.status],
      ['Description', shipmentDetails.description],
      ['Package weight', shipmentDetails.weight],
      ['Estimated delivery', shipmentDetails.estimatedDelivery],
    ].map(([label, value]) => `
      <tr>
        <td style="padding:13px 0;border-bottom:1px solid #ececee;color:#77777d;font-size:13px;">${label}</td>
        <td align="right" style="padding:13px 0;border-bottom:1px solid #ececee;color:#171719;font-size:13px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>
    `).join('');

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Veltraxis Logistics <no-reply@veltraxislogistics.online>',
      to: email,
      subject: `Shipment receipt: #${trackingId}`,
      html: `
        <div style="margin:0;padding:32px 12px;background:#f1f1f2;font-family:Arial,Helvetica,sans-serif;color:#171719;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e2e4;border-radius:6px;overflow:hidden;">
            <tr>
              <td style="padding:22px 28px;background:#0d0d0d;border-bottom:4px solid #e11d2e;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="54" valign="middle">
                      <img src="https://veltraxislogistics.online/assets/logo.png" width="46" height="46" alt="" style="display:block;width:46px;height:46px;border:1px solid #e11d2e;border-radius:8px;object-fit:cover;" />
                    </td>
                    <td valign="middle" style="padding-left:12px;">
                      <div style="color:#ffffff;font-size:16px;font-weight:700;">Veltraxis Logistics</div>
                      <div style="margin-top:4px;color:#b7b7bc;font-size:11px;">Driven by Speed. Defined by Trust.</div>
                    </td>
                    <td align="right" valign="middle" style="color:#d1d1d5;font-size:11px;">SHIPMENT<br />RECEIPT</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 30px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="margin-bottom:7px;color:#e11d2e;font-size:11px;font-weight:700;letter-spacing:1px;">SHIPMENT CONFIRMED</div>
                      <div style="color:#171719;font-size:24px;font-weight:700;line-height:1.25;">Your shipment is on its way.</div>
                    </td>
                    <td align="right" valign="bottom" style="color:#77777d;font-size:12px;white-space:nowrap;">${receiptDate}</td>
                  </tr>
                </table>
                <div style="margin-top:22px;padding:14px 16px;background:#f7f7f8;border-left:3px solid #e11d2e;">
                  <div style="color:#77777d;font-size:10px;font-weight:700;letter-spacing:1px;">TRACKING NUMBER</div>
                  <div style="margin-top:5px;color:#171719;font-family:Consolas,monospace;font-size:17px;font-weight:700;">${trackingCode}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 30px 24px;">
                <div style="padding:16px;background:#0d0d0d;border-radius:4px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="50%" valign="top" style="padding-right:12px;">
                        <div style="margin-bottom:6px;color:#a1a1a6;font-size:10px;font-weight:700;letter-spacing:1px;">FROM</div>
                        <div style="color:#ffffff;font-size:14px;font-weight:600;line-height:1.5;">${escapeHtml(shipmentDetails.from)}</div>
                      </td>
                      <td width="50%" valign="top" style="padding-left:12px;border-left:1px solid #38383b;">
                        <div style="margin-bottom:6px;color:#a1a1a6;font-size:10px;font-weight:700;letter-spacing:1px;">TO</div>
                        <div style="color:#ffffff;font-size:14px;font-weight:600;line-height:1.5;">${escapeHtml(shipmentDetails.to)}</div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="padding-top:18px;color:#171719;font-size:12px;font-weight:700;letter-spacing:.6px;">SHIPMENT DETAILS</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:5px;border-collapse:collapse;">
                  ${detailRows}
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 30px 26px;">
                ${safeTrackingUrl ? `<a href="${safeTrackingUrl}" style="display:inline-block;padding:13px 28px;background:#e11d2e;border-radius:4px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Track this shipment</a>` : ''}
                <div style="margin-top:18px;color:#77777d;font-size:12px;line-height:1.6;">Questions? <a href="mailto:contact-us@veltraxislogistics.online" style="color:#e11d2e;text-decoration:none;">Contact our team</a></div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:15px 20px;border-top:1px solid #ececee;color:#8b8b90;font-size:10px;line-height:1.6;">
                &copy; ${new Date().getFullYear()} Veltraxis Logistics. All rights reserved.
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error('Resend rejected shipment email:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'The email provider rejected the message.'
      }), { status: 502, headers });
    }
    // console.log('Resend  Response:', data);

    return new Response(JSON.stringify({ success: true, data, message: 'Email sent successfully' }), { status: 200, headers });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers });
  }
}

// Optional: Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}