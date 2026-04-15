const baseTemplate = (content) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">

      ${content}

      <br/><br/>

      <p style="margin-top: 20px; font-size: 14px;">
        If you have any questions, feel free to contact our support team.
      </p>

      <p style="font-size: 12px; color: #777; margin-top: 30px;">
        🚀 This is an automated message. Please do not reply directly to this email.
      </p>

      <p style="font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} Your App Name. All rights reserved.
      </p>

    </div>
  `;
};

module.exports = baseTemplate;
