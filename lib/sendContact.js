
export const sendContactNotification = async(formData) => {
  try{
    const res = await fetch('https://resend-api-backend.vercel.app/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(formData)
    })

    const result = await res.json();
    return result
  } catch (error) {
    console.error('Error sending email:', error);
    return{success: false}
  }
}