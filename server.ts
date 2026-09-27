import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const OWNER_EMAIL = 'omshrirao58@gmail.com';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data directory for inquiries persistence
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  clothingFor: string;
  message: string;
  status: 'new' | 'contacted' | 'appointment_booked' | 'resolved';
  createdAt: string;
  emailSent: boolean;
  emailSentAt?: string;
  emailError?: string;
  adminNotes?: string;
}

// Initial sample inquiries for realistic store demonstration
const defaultInquiries: Inquiry[] = [
  {
    id: 'inq-1727440001',
    name: 'Mrs. Sunita Deshmukh',
    phone: '09822451980',
    email: 'sunita.deshmukh@gmail.com',
    category: "Women's Ethnic Wear",
    clothingFor: 'Women',
    message: 'Looking for a heavy embroidery peach or wine bridal lehenga and 2 dress materials for Diwali family function.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    emailSent: true,
    emailSentAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'inq-1727440002',
    name: 'Rajesh Kulkarni',
    phone: '09422119045',
    email: 'rajesh.kulkarni@yahoo.co.in',
    category: 'Raymond Suiting & Shirting',
    clothingFor: 'Men',
    message: 'Need 4 sets of Raymond pure wool-blend suit lengths with matching shirting fabric. Do you offer custom in-store measurements?',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    emailSent: true,
    emailSentAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    adminNotes: 'Called customer. Scheduled store visit for Saturday 4 PM at Pratap Nagar showroom.'
  }
];

function loadInquiries(): Inquiry[] {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(defaultInquiries, null, 2), 'utf-8');
      return defaultInquiries;
    }
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading inquiries:', error);
    return defaultInquiries;
  }
}

function saveInquiries(inquiries: Inquiry[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving inquiries:', error);
  }
}

// Mailer setup
async function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Graceful fallback: create ethereal test account or test transport
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch {
    // If ethereal is unavailable, use mock transport that logs
    return {
      sendMail: async (options: any) => {
        console.log(`[Email Simulation] To: ${options.to}, Subject: ${options.subject}`);
        return { messageId: 'simulated-' + Date.now() };
      }
    } as any;
  }
}

// API Routes
app.get('/api/inquiries', (_req, res) => {
  const inquiries = loadInquiries();
  res.json({ success: true, inquiries });
});

app.get('/api/inquiries/stats', (_req, res) => {
  const inquiries = loadInquiries();
  const total = inquiries.length;
  const newCount = inquiries.filter(i => i.status === 'new').length;
  const contactedCount = inquiries.filter(i => i.status === 'contacted').length;
  const resolvedCount = inquiries.filter(i => i.status === 'resolved' || i.status === 'appointment_booked').length;
  res.json({
    total,
    new: newCount,
    contacted: contactedCount,
    resolved: resolvedCount,
  });
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, phone, email, category, clothingFor, message } = req.body;

    if (!name || !phone) {
      res.status(400).json({ success: false, message: 'Name and contact number are required' });
      return;
    }

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : 'Not provided',
      category: category ? String(category).trim() : 'General Inquiry',
      clothingFor: clothingFor ? String(clothingFor).trim() : 'All Age Groups',
      message: message ? String(message).trim() : 'Customer requested store callback / collection details.',
      status: 'new',
      createdAt: new Date().toISOString(),
      emailSent: false,
    };

    // Immediate Email Dispatch to Owner
    let emailStatus = 'pending';
    let emailPreviewUrl: string | undefined;

    try {
      const transporter = await createTransporter();
      const mailOptions = {
        from: `"Chaudhari Lifestyle Portal" <inquiries@chaudharilifestyle.com>`,
        to: OWNER_EMAIL,
        replyTo: email && email.includes('@') ? email : undefined,
        subject: `[New Customer Inquiry] ${newInquiry.name} - ${newInquiry.category} (${newInquiry.phone})`,
        text: `New Inquiry Received for Chaudhari Lifestyle!\n\nCustomer Details:\n- Name: ${newInquiry.name}\n- Phone: ${newInquiry.phone}\n- Email: ${newInquiry.email}\n- Category of Interest: ${newInquiry.category}\n- Age Group / Target: ${newInquiry.clothingFor}\n- Message: ${newInquiry.message}\n- Received At: ${new Date(newInquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\nChaudhari Lifestyle Store\nPlot No 69, Pratap Nagar Square, Ring Road, Pratap Nagar, Nagpur-440022`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e7e5e4; border-radius: 8px; background-color: #faf8f5;">
            <div style="border-bottom: 2px solid #9c4238; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #9c4238; margin: 0; font-size: 22px; letter-spacing: 0.5px;">CHAUDHARI LIFESTYLE</h2>
              <p style="color: #57534e; margin: 4px 0 0 0; font-size: 13px;">New Customer Inquiry Notification</p>
            </div>
            
            <p style="color: #1c1917; font-size: 15px; font-weight: 600;">You have received a new inquiry from the website:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background: #ffffff; border-radius: 6px; overflow: hidden; border: 1px solid #e7e5e4;">
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 16px; font-weight: 600; color: #78716c; width: 35%;">Customer Name</td>
                <td style="padding: 12px 16px; color: #1c1917; font-weight: 500;">${newInquiry.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 16px; font-weight: 600; color: #78716c;">Phone Number</td>
                <td style="padding: 12px 16px; color: #0f766e; font-weight: 700;"><a href="tel:${newInquiry.phone}" style="color: #0f766e; text-decoration: none;">${newInquiry.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 16px; font-weight: 600; color: #78716c;">Email</td>
                <td style="padding: 12px 16px; color: #1c1917;">${newInquiry.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 16px; font-weight: 600; color: #78716c;">Interest Category</td>
                <td style="padding: 12px 16px; color: #9c4238; font-weight: 600;">${newInquiry.category}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 16px; font-weight: 600; color: #78716c;">Target Group</td>
                <td style="padding: 12px 16px; color: #1c1917;">${newInquiry.clothingFor}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: 600; color: #78716c; vertical-align: top;">Requirement / Query</td>
                <td style="padding: 12px 16px; color: #1c1917; line-height: 1.5;">${newInquiry.message}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 16px; background-color: #f5f5f4; border-radius: 6px; font-size: 13px; color: #57534e;">
              <strong>Store Location:</strong> Plot No 69, Pratap Nagar Square, Ring Road, Pratap Nagar, Nagpur-440022, Maharashtra<br/>
              <strong>Phone:</strong> 07947426973 | <strong>Admin Notification:</strong> Sent directly to ${OWNER_EMAIL}
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      newInquiry.emailSent = true;
      newInquiry.emailSentAt = new Date().toISOString();
      emailStatus = 'sent';
      console.log(`[Email Dispatched] To: ${OWNER_EMAIL}, ID: ${info?.messageId}`);

      if (info && (nodemailer as any).getTestMessageUrl) {
        const preview = (nodemailer as any).getTestMessageUrl(info);
        if (preview) {
          emailPreviewUrl = preview;
          console.log(`[Ethereal Preview URL]: ${preview}`);
        }
      }
    } catch (err: any) {
      console.error('[Email Notification Error]:', err);
      newInquiry.emailSent = false;
      newInquiry.emailError = err?.message || 'Failed to dispatch via SMTP';
      emailStatus = 'failed';
    }

    const currentInquiries = loadInquiries();
    currentInquiries.unshift(newInquiry);
    saveInquiries(currentInquiries);

    // Provide mailto url as instant client fallback
    const mailtoSubject = encodeURIComponent(`Inquiry for Chaudhari Lifestyle - ${newInquiry.name}`);
    const mailtoBody = encodeURIComponent(
      `Customer Name: ${newInquiry.name}\nPhone: ${newInquiry.phone}\nEmail: ${newInquiry.email}\nCategory: ${newInquiry.category}\nMessage: ${newInquiry.message}\n`
    );
    const fallbackMailto = `mailto:${OWNER_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    res.status(201).json({
      success: true,
      inquiry: newInquiry,
      emailStatus,
      emailPreviewUrl,
      fallbackMailto,
      ownerEmail: OWNER_EMAIL,
      message: 'Your inquiry has been received! Our team and owner have been notified.'
    });
  } catch (error: any) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
});

app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const inquiries = loadInquiries();
  const index = inquiries.findIndex(i => i.id === id);

  if (index === -1) {
    res.status(404).json({ success: false, message: 'Inquiry not found' });
    return;
  }

  if (status) inquiries[index].status = status;
  if (adminNotes !== undefined) inquiries[index].adminNotes = adminNotes;

  saveInquiries(inquiries);
  res.json({ success: true, inquiry: inquiries[index] });
});

app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  let inquiries = loadInquiries();
  const exists = inquiries.some(i => i.id === id);

  if (!exists) {
    res.status(404).json({ success: false, message: 'Inquiry not found' });
    return;
  }

  inquiries = inquiries.filter(i => i.id !== id);
  saveInquiries(inquiries);
  res.json({ success: true, message: 'Inquiry deleted successfully' });
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Chaudhari Lifestyle server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
