const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'optivaize',
  user: process.env.DB_USER || 'optivaize',
  password: process.env.DB_PASSWORD || 'optivaize123',
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Cases table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cases (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title_nl TEXT NOT NULL,
        title_en TEXT NOT NULL,
        company VARCHAR(255) NOT NULL,
        preview_nl TEXT,
        preview_en TEXT,
        description_nl TEXT,
        description_en TEXT,
        results_nl JSONB DEFAULT '[]',
        results_en JSONB DEFAULT '[]',
        detailed_results_nl JSONB DEFAULT '[]',
        detailed_results_en JSONB DEFAULT '[]',
        logo VARCHAR(500),
        image VARCHAR(500),
        partner_logos JSONB DEFAULT '[]',
        published BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Blogs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        meta_description TEXT,
        meta_keywords TEXT,
        excerpt TEXT,
        content_html TEXT,
        featured_image VARCHAR(500),
        author VARCHAR(255) DEFAULT 'Optivaize',
        published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_cases_slug ON cases(slug);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_cases_published ON cases(published);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at);');

    await client.query('COMMIT');
    console.log('Migration completed successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(() => process.exit(1));
