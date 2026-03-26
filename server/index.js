const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!JWT_SECRET || !ADMIN_PASSWORD) {
  console.error('FATAL: JWT_SECRET and ADMIN_PASSWORD environment variables are required');
  process.exit(1);
}

// Teamleader config
const TEAMLEADER_CLIENT_ID = process.env.TEAMLEADER_CLIENT_ID;
const TEAMLEADER_CLIENT_SECRET = process.env.TEAMLEADER_CLIENT_SECRET;
const TEAMLEADER_REDIRECT_URI = process.env.TEAMLEADER_REDIRECT_URI || 'https://optivaize.nl/api/teamleader/callback';

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'optivaize',
  user: process.env.DB_USER || 'optivaize',
  password: process.env.DB_PASSWORD || 'optivaize123',
});

// Test DB connection
pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err.message));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// File upload config
const uploadsDir = process.env.NODE_ENV === 'production'
  ? '/app/pictures_good'
  : path.join(__dirname, '..', 'pictures_good');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${name}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// ─── AUTH ROUTES ───

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// ─── CASES ROUTES ───

// Public: get all cases
app.get('/api/cases', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM cases WHERE published = true ORDER BY sort_order ASC, created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get cases error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Public: get single case by slug
app.get('/api/cases/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cases WHERE slug = $1', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Case not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: get all cases (including unpublished)
app.get('/api/admin/cases', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cases ORDER BY sort_order ASC, created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: create case
app.post('/api/admin/cases', authenticate, async (req, res) => {
  try {
    const {
      slug, title_nl, title_en, company, preview_nl, preview_en,
      description_nl, description_en, results_nl, results_en,
      detailed_results_nl, detailed_results_en,
      logo, image, partner_logos, published, sort_order
    } = req.body;

    const result = await pool.query(
      `INSERT INTO cases (slug, title_nl, title_en, company, preview_nl, preview_en,
        description_nl, description_en, results_nl, results_en,
        detailed_results_nl, detailed_results_en,
        logo, image, partner_logos, published, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
       RETURNING *`,
      [slug, title_nl, title_en, company, preview_nl, preview_en,
        description_nl, description_en, JSON.stringify(results_nl), JSON.stringify(results_en),
        JSON.stringify(detailed_results_nl), JSON.stringify(detailed_results_en),
        logo, image, JSON.stringify(partner_logos || []), published !== false, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create case error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: update case
app.put('/api/admin/cases/:id', authenticate, async (req, res) => {
  try {
    const {
      slug, title_nl, title_en, company, preview_nl, preview_en,
      description_nl, description_en, results_nl, results_en,
      detailed_results_nl, detailed_results_en,
      logo, image, partner_logos, published, sort_order
    } = req.body;

    const result = await pool.query(
      `UPDATE cases SET
        slug=$1, title_nl=$2, title_en=$3, company=$4, preview_nl=$5, preview_en=$6,
        description_nl=$7, description_en=$8, results_nl=$9, results_en=$10,
        detailed_results_nl=$11, detailed_results_en=$12,
        logo=$13, image=$14, partner_logos=$15, published=$16, sort_order=$17,
        updated_at=NOW()
       WHERE id=$18 RETURNING *`,
      [slug, title_nl, title_en, company, preview_nl, preview_en,
        description_nl, description_en, JSON.stringify(results_nl), JSON.stringify(results_en),
        JSON.stringify(detailed_results_nl), JSON.stringify(detailed_results_en),
        logo, image, JSON.stringify(partner_logos || []), published, sort_order || 0,
        req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Case not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update case error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: delete case
app.delete('/api/admin/cases/:id', authenticate, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM cases WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Case not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── BLOG ROUTES ───

// Public: get all published blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, slug, title, meta_description, meta_keywords, excerpt, featured_image,
              author, published_at, created_at
       FROM blogs WHERE published = true
       ORDER BY published_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Public: get single blog by slug
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE slug = $1 AND published = true', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: get all blogs
app.get('/api/admin/blogs', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: get single blog
app.get('/api/admin/blogs/:id', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: create blog
app.post('/api/admin/blogs', authenticate, async (req, res) => {
  try {
    const {
      slug, title, meta_description, meta_keywords, excerpt,
      content_html, featured_image, author, published, published_at
    } = req.body;

    const result = await pool.query(
      `INSERT INTO blogs (slug, title, meta_description, meta_keywords, excerpt,
        content_html, featured_image, author, published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [slug, title, meta_description, meta_keywords, excerpt,
        content_html, featured_image, author || 'Optivaize', published || false,
        published_at || (published ? new Date().toISOString() : null)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: update blog
app.put('/api/admin/blogs/:id', authenticate, async (req, res) => {
  try {
    const {
      slug, title, meta_description, meta_keywords, excerpt,
      content_html, featured_image, author, published, published_at
    } = req.body;

    const result = await pool.query(
      `UPDATE blogs SET
        slug=$1, title=$2, meta_description=$3, meta_keywords=$4, excerpt=$5,
        content_html=$6, featured_image=$7, author=$8, published=$9, published_at=$10,
        updated_at=NOW()
       WHERE id=$11 RETURNING *`,
      [slug, title, meta_description, meta_keywords, excerpt,
        content_html, featured_image, author, published,
        published_at || (published ? new Date().toISOString() : null),
        req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: delete blog
app.delete('/api/admin/blogs/:id', authenticate, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── FILE UPLOAD ───

app.post('/api/admin/upload', authenticate, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ─── TEAMLEADER INTEGRATION ───

async function refreshTeamleaderToken(refreshToken) {
  const resp = await fetch('https://focus.teamleader.eu/oauth2/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: TEAMLEADER_CLIENT_ID,
      client_secret: TEAMLEADER_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    console.error('Token refresh failed:', resp.status, text);
    return null;
  }
  const data = await resp.json();
  const newExpiresAt = new Date(Date.now() + data.expires_in * 1000);
  await pool.query(
    'UPDATE teamleader_tokens SET access_token = $1, refresh_token = $2, expires_at = $3, updated_at = NOW() WHERE id = 1',
    [data.access_token, data.refresh_token, newExpiresAt]
  );
  return data.access_token;
}

async function getValidToken() {
  const result = await pool.query('SELECT * FROM teamleader_tokens WHERE id = 1');
  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  const expiresAt = new Date(row.expires_at);
  const now = new Date();

  // Refresh if expired or expiring within 5 minutes
  if (expiresAt.getTime() - now.getTime() < 5 * 60 * 1000) {
    try {
      return await refreshTeamleaderToken(row.refresh_token);
    } catch (err) {
      console.error('Token refresh error:', err);
      return null;
    }
  }

  return row.access_token;
}

async function teamleaderRequest(endpoint, body = {}) {
  const token = await getValidToken();
  if (!token) return { error: 'not_connected' };

  let resp = await fetch(`https://api.focus.teamleader.eu/${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  // If 401, try one more refresh and retry the request
  if (resp.status === 401) {
    const row = (await pool.query('SELECT refresh_token FROM teamleader_tokens WHERE id = 1')).rows[0];
    if (!row) return { error: 'not_connected' };
    const newToken = await refreshTeamleaderToken(row.refresh_token);
    if (!newToken) return { error: 'not_connected' };
    resp = await fetch(`https://api.focus.teamleader.eu/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${newToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  if (!resp.ok) {
    const text = await resp.text();
    console.error(`Teamleader API error (${endpoint}):`, resp.status, text);
    return { error: 'api_error', status: resp.status, details: text };
  }

  return resp.json();
}

// OAuth: start authorization
app.get('/api/teamleader/authorize', (req, res) => {
  const params = new URLSearchParams({
    client_id: TEAMLEADER_CLIENT_ID,
    response_type: 'code',
    redirect_uri: TEAMLEADER_REDIRECT_URI,
  });
  res.redirect(`https://focus.teamleader.eu/oauth2/authorize?${params}`);
});

// OAuth: callback
app.get('/api/teamleader/callback', async (req, res) => {
  const { code, error } = req.query;
  if (error || !code) {
    return res.status(400).json({ error: error || 'No authorization code received' });
  }

  try {
    const resp = await fetch('https://focus.teamleader.eu/oauth2/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: TEAMLEADER_CLIENT_ID,
        client_secret: TEAMLEADER_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: TEAMLEADER_REDIRECT_URI,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Token exchange failed:', text);
      return res.status(400).json({ error: 'Token exchange failed' });
    }

    const data = await resp.json();
    const expiresAt = new Date(Date.now() + data.expires_in * 1000);

    await pool.query(
      `INSERT INTO teamleader_tokens (id, access_token, refresh_token, expires_at)
       VALUES (1, $1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET access_token = $1, refresh_token = $2, expires_at = $3, updated_at = NOW()`,
      [data.access_token, data.refresh_token, expiresAt]
    );

    res.redirect('/stats/123121221213213?connected=true');
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Connection status
app.get('/api/teamleader/status', async (req, res) => {
  try {
    const result = await pool.query('SELECT expires_at FROM teamleader_tokens WHERE id = 1');
    res.json({ connected: result.rows.length > 0 });
  } catch {
    res.json({ connected: false });
  }
});

// Invoices for current month
app.get('/api/teamleader/invoices', async (req, res) => {
  try {
    const now = new Date();
    const firstDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

    const allInvoices = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await teamleaderRequest('invoices.list', {
        filter: {
          invoice_date_after: firstDay,
          invoice_date_before: lastDayStr,
        },
        page: { size: 100, number: page },
      });

      if (data.error) {
        return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
      }

      allInvoices.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 10) break; // safety limit
    }

    res.json({ data: allInvoices });
  } catch (err) {
    console.error('Invoices error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Open deals
app.get('/api/teamleader/deals', async (req, res) => {
  try {
    const data = await teamleaderRequest('deals.list', {
      filter: { status: ['open'] },
      sort: [{ field: 'weighted_value', order: 'desc' }],
      page: { size: 50, number: 1 },
      include: 'lead.customer,responsible_user',
    });
    if (data.error) {
      return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
    }
    res.json(data);
  } catch (err) {
    console.error('Deals error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Running projects
app.get('/api/teamleader/projects', async (req, res) => {
  try {
    const data = await teamleaderRequest('projects-v2/projects.list', {
      filter: { status: 'running' },
      sort: [{ field: 'end_date', order: 'asc' }],
      page: { size: 50, number: 1 },
    });
    if (data.error) {
      return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
    }
    res.json(data);
  } catch (err) {
    console.error('Projects error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Incomplete tasks (including overdue from past months)
app.get('/api/teamleader/tasks', async (req, res) => {
  try {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

    const allTasks = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await teamleaderRequest('tasks.list', {
        filter: {
          completed: false,
          due_by: lastDayStr,
        },
        sort: [{ field: 'due_on', order: 'asc' }],
        page: { size: 100, number: page },
      });

      if (data.error) {
        return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
      }

      allTasks.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 5) break;
    }

    res.json({ data: allTasks });
  } catch (err) {
    console.error('Tasks error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Team members
app.get('/api/teamleader/users', async (req, res) => {
  try {
    const data = await teamleaderRequest('users.list', {
      page: { size: 100, number: 1 },
    });
    if (data.error) {
      return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
    }
    res.json(data);
  } catch (err) {
    console.error('Users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Year-to-date invoices
app.get('/api/teamleader/invoices-ytd', async (req, res) => {
  try {
    const now = new Date();
    const firstDay = `${now.getFullYear()}-01-01`;
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const allInvoices = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await teamleaderRequest('invoices.list', {
        filter: {
          invoice_date_after: firstDay,
          invoice_date_before: today,
        },
        page: { size: 100, number: page },
      });

      if (data.error) {
        return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
      }

      allInvoices.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 20) break;
    }

    res.json({ data: allInvoices });
  } catch (err) {
    console.error('Invoices YTD error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Completed tasks (broader range to capture tasks completed recently regardless of due date)
app.get('/api/teamleader/tasks-completed', async (req, res) => {
  try {
    const now = new Date();
    // Go back 3 months to capture tasks completed this month that had earlier due dates
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const firstDay = `${threeMonthsAgo.getFullYear()}-${String(threeMonthsAgo.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

    const allTasks = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const data = await teamleaderRequest('tasks.list', {
        filter: { completed: true, due_from: firstDay, due_by: lastDayStr },
        page: { size: 100, number: page },
      });
      if (data.error) return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
      allTasks.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 10) break;
    }

    // Filter client-side: only keep tasks completed this month (using completed_at)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const filtered = allTasks.filter(t => {
      if (!t.completed_at) return false;
      return new Date(t.completed_at) >= monthStart;
    });

    res.json({ data: filtered });
  } catch (err) {
    console.error('Completed tasks error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Time tracking this week
app.get('/api/teamleader/time-tracking-week', async (req, res) => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 0);

    const mondayStr = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}T00:00:00+00:00`;
    const sundayStr = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, '0')}-${String(sunday.getDate()).padStart(2, '0')}T23:59:59+00:00`;

    const allEntries = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const data = await teamleaderRequest('timeTracking.list', {
        filter: { started_after: mondayStr, started_before: sundayStr },
        page: { size: 100, number: page },
      });
      if (data.error) return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
      allEntries.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 5) break;
    }
    res.json({ data: allEntries });
  } catch (err) {
    console.error('Time tracking week error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Deal phases (pipeline columns)
app.get('/api/teamleader/deal-phases', async (req, res) => {
  try {
    // First get all pipelines
    const pipelinesResp = await teamleaderRequest('pipelines.list', {});
    if (pipelinesResp.error) {
      return res.status(pipelinesResp.error === 'not_connected' ? 401 : 502).json(pipelinesResp);
    }
    const pipelines = pipelinesResp.data || [];

    // Then get phases for each pipeline
    const allPhases = [];
    for (const pl of pipelines) {
      const phasesResp = await teamleaderRequest('dealPhases.list', {
        filter: { pipeline_id: pl.id },
      });
      if (phasesResp.data) {
        allPhases.push(...phasesResp.data);
      }
    }
    res.json({ data: allPhases });
  } catch (err) {
    console.error('Deal phases error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Time tracking this month
app.get('/api/teamleader/time-tracking', async (req, res) => {
  try {
    const now = new Date();
    const firstDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01T00:00:00+00:00`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}T23:59:59+00:00`;

    const allEntries = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await teamleaderRequest('timeTracking.list', {
        filter: {
          started_after: firstDay,
          started_before: lastDayStr,
        },
        page: { size: 100, number: page },
      });

      if (data.error) {
        return res.status(data.error === 'not_connected' ? 401 : 502).json(data);
      }

      allEntries.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 10) break;
    }

    res.json({ data: allEntries });
  } catch (err) {
    console.error('Time tracking error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── SITEMAP ───

app.get('/api/sitemap.xml', async (req, res) => {
  const staticRoutes = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/ai-agenten', priority: '0.9', changefreq: 'monthly' },
    { loc: '/ai-marketing', priority: '0.9', changefreq: 'monthly' },
    { loc: '/ai-sales', priority: '0.9', changefreq: 'monthly' },
    { loc: '/automatisering', priority: '0.9', changefreq: 'monthly' },
    { loc: '/custom-software', priority: '0.9', changefreq: 'monthly' },
    { loc: '/ai-business', priority: '0.8', changefreq: 'monthly' },
    { loc: '/ai-chatbot', priority: '0.8', changefreq: 'monthly' },
    { loc: '/ai-training', priority: '0.8', changefreq: 'monthly' },
    { loc: '/crypto-blockchain', priority: '0.7', changefreq: 'monthly' },
    { loc: '/cases', priority: '0.8', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
    { loc: '/over-ons', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
    { loc: '/hiring', priority: '0.6', changefreq: 'monthly' },
  ];

  try {
    const [casesResult, blogsResult] = await Promise.all([
      pool.query('SELECT slug, updated_at FROM cases WHERE published = true ORDER BY created_at DESC'),
      pool.query('SELECT slug, updated_at FROM blogs WHERE published = true ORDER BY published_at DESC'),
    ]);

    const base = 'https://optivaize.nl';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const r of staticRoutes) {
      xml += `  <url>\n    <loc>${base}${r.loc}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>\n`;
    }

    for (const c of casesResult.rows) {
      const lastmod = c.updated_at ? new Date(c.updated_at).toISOString().split('T')[0] : '';
      xml += `  <url>\n    <loc>${base}/cases/${c.slug}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    for (const b of blogsResult.rows) {
      const lastmod = b.updated_at ? new Date(b.updated_at).toISOString().split('T')[0] : '';
      xml += `  <url>\n    <loc>${base}/blog/${b.slug}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    xml += '</urlset>';
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap error:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
