const baseTemplate = require("./baseTemplate");

const accountUnblockedTemplate = (username) => {
  const content = `
    <h2 style="color: #2a9d8f;">Account Access Restored 🎉</h2>

    Hello <strong>${username}</strong>


      Good news — your account has been reviewed and successfully <strong>unblocked</strong>.<br>
    

      You can now access all features of your account without any restrictions.<br>

      If you previously experienced any inconvenience, we sincerely apologize for the interruption.<br>

      We appreciate your patience and understanding during the review process.<br>

      If you have any questions or face any issues, feel free to contact our support team anytime.<br>

      Welcome back 
  `;

  return baseTemplate(content);
};

module.exports = { accountUnblockedTemplate };
