const http = require('http');
const https = require('https');
const nodemailer = require('nodemailer');

// Configuration
const PORT = 3847;
const WHOP_API_KEY = 'apik_yx0wPer1gc9YT_C3869233_C_52c180330ad59e3e566e467964a8b8b087c42921887d34de1d931a6b9cb740';

// Email configuration
const EMAIL_USER = 'wong.isaiah924@gmail.com';
const EMAIL_PASS = 'djyhulgygtlzjchq';
const NOTIFY_EMAIL = 'wong.isaiah924@gmail.com';

// Create email transporter
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Product IDs
const PRODUCTS = {
  SPECTATOR: 'prod_SfAPHnCsSeXQr',
  WHITE_BELT: 'prod_HEv3FMCeDU4nw',
  BROWN_BELT: 'prod_oRd4Kp3vvEbCJ',
  BLACK_BELT: 'prod_9CV018XWNFO05'
};

// Helper to make API requests
function whopAPI(method, endpoint, data = null, apiVersion = 'v5') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.whop.com',
      port: 443,
      path: `/api/${apiVersion}${endpoint}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Generate unique promo code
function generatePromoCode(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = prefix;
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Create a promo code for White Belt
async function createWhiteBeltPromoCode(months, lifetime = false) {
  const prefix = lifetime ? 'BLACK' : 'BROWN';
  const code = generatePromoCode(prefix);
  
  const promoData = {
    code: code,
    amount_off: 100,
    base_currency: 'usd',
    promo_type: 'percentage',
    product_ids: [PRODUCTS.WHITE_BELT],
    stock: 1,
    unlimited_uses: false
  };
  
  // If lifetime, use "forever" duration, otherwise set months
  if (lifetime) {
    promoData.duration = 'forever';
  } else {
    promoData.number_of_intervals = months;
  }
  
  try {
    const result = await whopAPI('POST', '/promo_codes', promoData, 'v2');
    
    console.log('Promo code created:', result.code);
    return result.code || code;
  } catch (error) {
    console.error('Error creating promo code:', error);
    return null;
  }
}

// Send Telegram notification
async function sendTelegramNotification(message) {
  const TELEGRAM_BOT_TOKEN = '8297285108:AAEcHBBr15aIjG_S7xNVXaRm90bBceUVWH0';
  const CHAT_ID = '8418476992';
  
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Send email notification
async function sendEmailNotification(subject, htmlBody) {
  try {
    await emailTransporter.sendMail({
      from: EMAIL_USER,
      to: NOTIFY_EMAIL,
      subject: subject,
      html: htmlBody
    });
    console.log('Email notification sent');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Notify about White Belt grant needed
async function notifyWhiteBeltGrant(userName, userEmail, userId, months, productName, lifetime = false) {
  const accessType = lifetime ? 'LIFETIME' : `${months}-month`;
  console.log(`Notifying about ${accessType} White Belt for user ${userId}`);
  
  // Create unique promo code automatically
  const promoCode = await createWhiteBeltPromoCode(months, lifetime);
  
  const accessText = lifetime ? 'LIFETIME' : `${months}-month`;
  
  // Send Telegram notification with promo code
  const telegramMessage = `🥋 <b>DOJO GAINS - New Sale!</b>

<b>${productName}</b> purchased! 🎉

👤 <b>Customer:</b> ${userName}
📧 <b>Email:</b> ${userEmail}

🎟️ <b>Promo Code (auto-generated):</b>
<code>${promoCode}</code>

⏰ <b>Access:</b> ${accessText} White Belt

📤 <b>Send this message to the customer:</b>

"Welcome to the Dojo! 🥋 Here's your ${accessText} White Belt access as a thank you for purchasing ${productName}. 

Go to https://whop.com/capital-gains-club/ and claim White Belt using code: <b>${promoCode}</b>"`;

  await sendTelegramNotification(telegramMessage);
}

// Handle incoming webhooks
async function handleWebhook(payload) {
  console.log('Received webhook:', JSON.stringify(payload, null, 2));
  
  const eventType = payload.type || payload.action;
  const data = payload.data || payload;
  
  // Only process membership activated events
  if (eventType !== 'membership.activated' && eventType !== 'membership.went_valid' && eventType !== 'membership.created') {
    console.log('Ignoring event:', eventType);
    return;
  }
  
  const productId = data?.product?.id || data?.product_id;
  const userId = data?.user?.id || data?.user_id;
  
  if (!productId || !userId) {
    console.log('Missing product or user ID');
    return;
  }
  
  console.log(`Processing: Product ${productId} for User ${userId}`);
  
  const userName = data?.user?.name || data?.user?.username || 'Unknown';
  const userEmail = data?.user?.email || 'Unknown';
  
  // Check if Brown Belt purchased -> Notify to grant 3 months White Belt
  if (productId === PRODUCTS.BROWN_BELT) {
    console.log('Brown Belt purchased! Notifying...');
    await notifyWhiteBeltGrant(userName, userEmail, userId, 3, 'Brown Belt', false);
  }
  
  // Check if Black Belt purchased -> Notify to grant LIFETIME White Belt
  if (productId === PRODUCTS.BLACK_BELT) {
    console.log('Black Belt purchased! Notifying...');
    await notifyWhiteBeltGrant(userName, userEmail, userId, 0, 'Black Belt', true);
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Health check
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'dojo-gains-webhook' }));
    return;
  }
  
  // Webhook endpoint
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        
        // Respond immediately (Whop expects quick response)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ received: true }));
        
        // Process webhook asynchronously
        await handleWebhook(payload);
      } catch (error) {
        console.error('Webhook error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  
  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Dojo Gains Webhook Server running on port ${PORT}`);
  console.log(`Webhook URL: http://your-server:${PORT}/webhook`);
  console.log('');
  console.log('Configured bundles:');
  console.log('  - Brown Belt purchase -> 3 months White Belt');
  console.log('  - Black Belt purchase -> 6 months White Belt');
});
