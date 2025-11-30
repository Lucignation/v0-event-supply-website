// /emails/adminUserRegistered.js
export default function adminUserRegistered(user: any) {
    return `
      <html>
        <body>
          <h3>New User Registered</h3>
          <p>${user.name} (${user.email}) just joined.</p>
        </body>
      </html>
    `;
  }
  