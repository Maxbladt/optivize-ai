const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

const JWT_SECRET = process.env.JWT_SECRET || 'optivaize-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Groenekanseweg12!';

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

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
