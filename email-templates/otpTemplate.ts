// emails/otpTemplate.ts

export default function otpTemplate(otp: string) {
    return `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Your One-Time Password (OTP)</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 8px;">${otp}</h1>
        
        <p>This code expires in <strong>10 minutes</strong>.</p>
  
        <p>If you did not request this, please ignore this message.</p>
  
        <br/>
        <p>Regards,<br/>Your App Team</p>
      </div>
    `;
  }
  