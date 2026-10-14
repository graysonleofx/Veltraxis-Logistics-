import { Resend } from 'resend';

export async function POST(req) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if(!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: 'Name, email, and message are required.' }), { status: 400, headers });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email sending is not configured. Add RESEND_API_KEY to the server environment and restart the app.'
      }), { status: 503, headers });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'GlobalAxis Logistics Contact-US <contact@globalaxislogistics.online>',
      to: ['contact@globalaxislogistics.online'],
      subject: subject || 'New Contact Message',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <br>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p><strong>Phone:</strong> ${phone}</p>
        <br>
        <p><strong>Message:</strong> ${message}</p>
        <br>
      `
    });

    if (error) {
      console.error('Resend rejected contact email:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'The email provider rejected the message.'
      }), { status: 502, headers });
    }

    console.log('Resend  Response:', data);

    return new Response(JSON.stringify({ success: true, data, message: 'Email sent successfully' }), { status: 200, headers });
    // return new Response(JSON.stringify({ success: true, data }), { status: 200, headers });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers });
    // return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers });
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
