// /emails/welcomeUser.ts

export default function welcomeUserTemplate(name: string) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Our Platform, ${name} 🎉</h2>
        <p>We’re excited to have you on board!</p>
  
        <p>Start exploring your dashboard and let us know if you need help.</p>
  
        <br/>
        <p>Best regards,<br>The Team</p>
      </div>
    `;
  }
  