const express = require('express');
const SibApiV3Sdk = require('@getbrevo/brevo');
const cors = require('cors');
const cron = require('node-cron');
const app = express();

// 1. MIDDLEWARE
app.use(express.json());
app.use(cors()); // CRITICAL: Allows your public website to talk to Render

// 2. BREVO CONFIGURATION
const BREVO_KEY = process.env.BREVO_API_KEY;

app.post('/thank-you', async (req, res) => {
    const { email, name } = req.body;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = BREVO_KEY;

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Welcome to the Culinary World of Chef Kyegonza";
    sendSmtpEmail.sender = { "name": "Chef Kyegonza", "email": "info@chefkyegonza.site" };
    sendSmtpEmail.to = [{ "email": email }];

    // 3. HIGH-QUALITY HTML DESIGN
    sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #fefcf8; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f0e6e0; }
            .header { background-color: #4a0404; padding: 40px; text-align: center; }
            .body-content { padding: 40px; color: #1e1e1e; line-height: 1.6; }
            .footer { background-color: #121212; padding: 30px; text-align: center; color: #ffffff; font-size: 12px; }
            .button { background-color: #b28950; color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 40px; font-weight: bold; display: inline-block; margin-top: 20px; }
            h1 { color: #ffffff; font-family: 'Playfair Display', serif; margin: 0; font-size: 24px; }
            .gold-text { color: #b28950; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Chef Kyegonza</h1>
                <p style="color: #b28950; letter-spacing: 2px; font-size: 10px; margin-top: 10px; text-transform: uppercase;">Elite Catering & Mikolo Specialist</p>
            </div>
            <div class="body-content">
                <h2 style="font-family: serif; color: #4a0404;">Hello, ${name || 'Valued Guest'}!</h2>
                <p>Thank you for joining the inner circle of <span class="gold-text">Chef Kyegonza</span>. We are honored to have you with us.</p>
                <p>Whether you are planning a grand <strong>Mikolo</strong>, an intimate private dinner, or simply looking for the finest continental cuisine in Uganda, we are here to craft an unforgettable experience for you.</p>
                <p>You will now be the first to receive our <strong>Weekly Signature Creations</strong> and exclusive menu updates.</p>
                <div style="text-align: center;">
                    <a href="https://chefkyegonza.site" class="button">Explore the Full Menu</a>
                </div>
            </div>
            <div class="footer">
                <p>© 2026 Chef Kyegonza — Kampala, Uganda</p>
                <p>Authentic Taste, Modern Excellence.</p>
                <div style="margin-top: 15px;">
                    <a href="https://wa.me/256702586485" style="color: #25D366; text-decoration: none;">Chat via WhatsApp</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        res.status(200).json({ message: "Professional email sent successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to send email" });
    }
});

// 4. WEEKLY NEWSLETTER (Placeholder for the logic you will add)
cron.schedule('0 9 * * 1', () => {
    console.log("Weekly cron job running: Fetching users and sending updates...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Chef Engine running on port ${PORT}`));
