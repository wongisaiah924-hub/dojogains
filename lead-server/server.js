const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3849;
const RESEND_KEY = 're_Nsu2da2d_6vWQ4rjMe7VxnpxCXJFYBzWW';
const TG_TOKEN = '8297285108:AAEcHBBr15aIjG_S7xNVXaRm90bBceUVWH0';
const TG_CHAT = '8418476992';
const PROMO_CODE = 'DOJO20';
const LEADS_FILE = path.join(__dirname, 'leads.json');

function loadLeads() {
  try { return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')); } catch { return []; }
}

function saveLead(lead) {
  const leads = loadLeads();
  leads.push(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

function httpsPost(hostname, reqPath, headers, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({ hostname, path: reqPath, method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(d) }); } catch { resolve({ status: res.statusCode, body: d }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function sendEmail(lead) {
  const html = `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0A0A12;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">
  <div style="text-align:center;margin-bottom:30px">
    <h1 style="color:#E63946;font-size:32px;margin:0">🥋 DOJO GAINS</h1>
    <p style="color:#888;margin-top:5px;">Master the Art of Trading</p>
  </div>
  <div style="background:#15151F;border-radius:12px;padding:32px;border:1px solid #222">
    <h2 style="color:#fff;text-align:center;margin:0 0 16px">Welcome to the Dojo, ${lead.name}!</h2>
    <p style="color:#ccc;text-align:center;font-size:16px;line-height:1.6">Here's your <strong>20% off</strong> code for your first month of White Belt membership:</p>
    <div style="background:#0a0a0a;border:2px solid #E63946;border-radius:8px;padding:20px;text-align:center;margin:24px 0">
      <p style="color:#888;margin:0 0 8px 0;font-size:14px;">YOUR DISCOUNT CODE</p>
      <span style="color:#E63946;font-size:32px;font-weight:bold;letter-spacing:4px">${PROMO_CODE}</span>
    </div>
    <p style="color:#ccc;text-align:center;font-size:14px;line-height:1.6">Use this code at checkout to save 20% on your first month.</p>
    <div style="text-align:center;margin:28px 0">
      <a href="https://whop.com/dojo-gains-club/" style="display:inline-block;background:#E63946;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:16px">Join Dojo Gains Now →</a>
    </div>
    <div style="background:#0a0a0a;border-radius:8px;padding:16px;margin-top:20px;">
      <p style="color:#888;font-size:13px;margin:0;text-align:center;">💡 <strong style="color:#ccc;">What you get with White Belt:</strong></p>
      <p style="color:#888;font-size:13px;margin:8px 0 0;text-align:center;">Live setups • Market analysis • Trading community • Weekly watchlists</p>
    </div>
  </div>
  <div style="text-align:center;margin-top:30px;color:#555;font-size:12px">
    <p>Dojo Gains — No hype. No gurus. Just growth.</p>
    <p>You received this because you signed up at dojogains.com</p>
  </div>
</div>
</body></html>`;

  return httpsPost('api.resend.com', '/emails', { Authorization: `Bearer ${RESEND_KEY}` }, {
    from: 'Dojo Gains <support@dojogains.com>',
    to: [lead.email],
    subject: '🥋 Your 20% Off Code — Welcome to Dojo Gains!',
    html
  });
}

function sendFollowUpEmail(lead) {
  const html = `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0A0A12;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">
  <div style="text-align:center;margin-bottom:30px">
    <h1 style="color:#E63946;font-size:32px;margin:0">🥋 DOJO GAINS</h1>
    <p style="color:#888;margin-top:5px;">Master the Art of Trading</p>
  </div>
  <div style="background:#15151F;border-radius:12px;padding:32px;border:1px solid #222">
    <h2 style="color:#fff;text-align:center;margin:0 0 16px">Hey ${lead.name}, your discount is waiting! ⏳</h2>
    <p style="color:#ccc;text-align:center;font-size:16px;line-height:1.6">You grabbed your <strong>20% off</strong> code but haven't joined yet. Don't let it go to waste!</p>
    <div style="background:#0a0a0a;border:2px solid #E63946;border-radius:8px;padding:20px;text-align:center;margin:24px 0">
      <p style="color:#888;margin:0 0 8px 0;font-size:14px;">YOUR CODE IS STILL ACTIVE</p>
      <span style="color:#E63946;font-size:32px;font-weight:bold;letter-spacing:4px">${PROMO_CODE}</span>
    </div>
    <p style="color:#ccc;text-align:center;font-size:15px;line-height:1.6">White Belt gives you access to:</p>
    <div style="background:#0a0a0a;border-radius:8px;padding:20px;margin:16px 0;">
      <p style="color:#ccc;font-size:14px;margin:6px 0;">✅ Live trade setups from experienced traders</p>
      <p style="color:#ccc;font-size:14px;margin:6px 0;">✅ Daily market analysis & watchlists</p>
      <p style="color:#ccc;font-size:14px;margin:6px 0;">✅ Active trading community</p>
      <p style="color:#ccc;font-size:14px;margin:6px 0;">✅ Beginner-friendly education channels</p>
    </div>
    <p style="color:#aaa;text-align:center;font-size:14px;">That's less than <strong style="color:#fff;">$40/month</strong> with your discount. Skip one dinner out and invest in your trading.</p>
    <div style="text-align:center;margin:28px 0">
      <a href="https://whop.com/dojo-gains-club/" style="display:inline-block;background:#E63946;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:16px">Claim Your Spot →</a>
    </div>
  </div>
  <div style="text-align:center;margin-top:30px;color:#555;font-size:12px">
    <p>Dojo Gains — No hype. No gurus. Just growth.</p>
    <p>You received this because you signed up at dojogains.com</p>
  </div>
</div>
</body></html>`;

  return httpsPost('api.resend.com', '/emails', { Authorization: `Bearer ${RESEND_KEY}` }, {
    from: 'Dojo Gains <support@dojogains.com>',
    to: [lead.email],
    subject: '⏳ Your 20% off is still waiting — Dojo Gains',
    html
  });
}

function sendTelegram(lead, emailSent) {
  const text = `🥋 New Lead!\n\n👤 Name: ${lead.name}\n📧 Email: ${lead.email}\n📱 Phone: ${lead.phone || 'N/A'}\n🎟️ Code: ${PROMO_CODE}\n\n📨 Email: ${emailSent ? '✅ Sent' : '❌ Failed'}`;
  return httpsPost('api.telegram.org', `/bot${TG_TOKEN}/sendMessage`, {}, { chat_id: TG_CHAT, text });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': 'https://dojogains.com', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  // Health check endpoint
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok',
      service: 'lead-server',
      port: PORT,
      leadsCount: loadLeads().length,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  if (req.method === 'POST' && req.url === '/lead') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const lead = JSON.parse(body);
        if (!lead.name || !lead.email) {
          res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://dojogains.com' });
          return res.end(JSON.stringify({ error: 'name and email required' }));
        }

        // Duplicate check
        const existingLeads = loadLeads();
        if (existingLeads.find(l => l.email === lead.email)) {
          console.log(`Duplicate lead: ${lead.email} — skipping`);
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://dojogains.com' });
          return res.end(JSON.stringify({ success: true }));
        }

        // Save lead
        saveLead({ ...lead, promoCode: PROMO_CODE, timestamp: new Date().toISOString() });

        // Send email
        let emailSent = false;
        try {
          const emailResult = await sendEmail(lead);
          emailSent = emailResult.status === 200;
          if (!emailSent) console.error('Email failed:', JSON.stringify(emailResult.body));
        } catch (e) {
          console.error('Email error:', e.message);
        }

        // Telegram notification
        sendTelegram(lead, emailSent).catch(e => console.error('TG error:', e));

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://dojogains.com' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        console.error('Request error:', e.message);
        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://dojogains.com' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Check for follow-ups every hour (24hr after signup)
function checkFollowUps() {
  const leads = loadLeads();
  const now = Date.now();
  let updated = false;

  for (const lead of leads) {
    if (lead.followUpSent || !lead.email || !lead.timestamp) continue;
    const age = now - new Date(lead.timestamp).getTime();
    if (age >= 24 * 60 * 60 * 1000) {
      console.log(`Sending follow-up email to ${lead.email}...`);
      sendFollowUpEmail(lead).then(result => {
        const sent = result.status === 200;
        console.log(`Follow-up to ${lead.email}: ${sent ? '✅ Sent' : '❌ Failed'}`);
        httpsPost('api.telegram.org', `/bot${TG_TOKEN}/sendMessage`, {}, {
          chat_id: TG_CHAT,
          text: `📩 Follow-up Email\n\n👤 ${lead.name}\n📧 ${lead.email}\n📨 ${sent ? '✅ Sent' : '❌ Failed'}`
        }).catch(() => {});
      }).catch(e => console.error('Follow-up error:', e.message));
      lead.followUpSent = true;
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  }
}

// Run follow-up check immediately on startup (handle restarts)
console.log('Running startup follow-up check...');
checkFollowUps();

// Check for follow-ups every hour
setInterval(checkFollowUps, 60 * 60 * 1000);

server.listen(PORT, () => {
  console.log(`Lead server on :${PORT}`);
  console.log('Follow-up system active - checking on startup and every hour');
});
