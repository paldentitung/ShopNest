const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ShopNest <onboarding@resend.dev>",
        to,
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error response:", data);
      throw new Error(data?.message || "Email failed");
    }

    console.log("Email sent successfully:", data.id);
    return data;
  } catch (error) {
    console.error("SendEmail error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
