// Import the Resend SDK
import {Resend} from 'resend';
const resend = new Resend('REDACTED_RESEND_API_KEY');

export async function handler(req, res) {
  // const body = await req.json();

  const {name, email, phone, subject, message} = req.body;

  try{
    const data = await resend.emails.send({
      from: email,
      to: ['contact@pennywiselogistics.online'],
      subject: subject,
      html: `
        <p><strong>Name:</strong>${name} </p>
        <br>
        <p><strong>Email:</strong>${email} </p>
        <br>
        <p><strong>Phone:</strong>${phone} </p>
        <br>
        <p><strong>Message:</strong>${message} </p>
        <br>
      `
    })
    console.log('Resend Response', data);

    return res.status(200).json({success: true, data});
  }catch(error){
    console.error(error)
    return res.status(500).json({success: false, error: error.message})
  }
}


// export async function POST(req) {
//   const body = await req.json();

//   const {name, email, phone, subject, message} = body;

//   try{
//     const data = await resend.emails.send({
//       from: email,
//       to: ['contact@pennywiselogistics.online'],
//       subject: subject,
//       html: `
//         <p><strong>Name:</strong>${name} </p>
//         <br>
//         <p><strong>Email:</strong>${email} </p>
//         <br>
//         <p><strong>Phone:</strong>${phone} </p>
//         <br>
//         <p><strong>Message:</strong>${message} </p>
//         <br>
//       `
//     })
//     console.log('Resend Response', data);

//     return Response.json({ success: true, data, message: 'Email sent successfully' });
//   }catch(error){
//     return Response.json({success: false, error: error.message}, {status: 500})
//   }
// }
