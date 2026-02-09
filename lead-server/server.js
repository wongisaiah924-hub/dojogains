const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3849;
const RESEND_KEY = 're_Nsu2da2d_6vWQ4rjMe7VxnpxCXJFYBzWW';
const TG_TOKEN = '8297285108:AAEcHBBr15aIjG_S7xNVXaRm90bBceUVWH0';
const TG_CHAT = '8418476992';
const LEADS_FILE = path.join(__dirname, 'leads.json');

function loadLeads() {
  try { return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')); } catch { return []; }
}

function saveLead(lead) {
  const leads = loadLeads();
  leads.push({ ...lead, timestamp: new Date().toISOString() });
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

function httpsPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({ hostname, path, method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
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
  </div>
  <div style="background:#15151F;border-radius:12px;padding:32px;border:1px solid #222">
    <h2 style="color:#fff;text-align:center;margin:0 0 16px">Welcome to the Dojo, ${lead.name}!</h2>
    <p style="color:#ccc;text-align:center;font-size:16px;line-height:1.6">Here's your exclusive 20% off code for your first month:</p>
    <div style="background:#E63946;border-radius:8px;padding:20px;text-align:center;margin:24px 0">
      <span style="color:#fff;font-size:32px;font-weight:bold;letter-spacing:4px">DOJO20</span>
    </div>
    <p style="color:#ccc;text-align:center;font-size:14px">Use this code at checkout to claim your discount.</p>
    <div style="text-align:center;margin:28px 0">
      <a href="https://whop.com/dojo-gains-club/" style="display:inline-block;background:#E63946;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:16px">Join Dojo Gains Now →</a>
    </div>
  </div>
  <div style="text-align:center;margin-top:30px;color:#555;font-size:12px">
    <p>Dojo Gains — Stop gambling. Start trading.</p>
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

function sendTelegram(lead) {
  const text = `🥋 New Lead!\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}`;
  return httpsPost('api.telegram.org', `/bot${TG_TOKEN}/sendMessage`, {}, { chat_id: TG_CHAT, text });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': 'https://dojogains.com', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
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
        saveLead(lead);
        // Fire and forget
        sendEmail(lead).catch(e => console.error('Email error:', e));
        sendTelegram(lead).catch(e => console.error('TG error:', e));
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://dojogains.com' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://dojogains.com' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => console.log(`Lead server on :${PORT}`));
