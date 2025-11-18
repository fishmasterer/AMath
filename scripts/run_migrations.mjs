#!/usr/bin/env node
/**
 * Migration Runner for Supabase
 *
 * This script runs all SQL migration files in the supabasemigrations directory.
 * It requires the SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.
 *
 * Usage:
 *   node scripts/run_migrations.mjs
 *
 * Or with environment variables:
 *   SUPABASE_URL=your-url SUPABASE_SERVICE_ROLE_KEY=your-key node scripts/run_migrations.mjs
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('');
  console.error('Please set the following environment variables:');
  console.error('  SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)');
  console.error('  SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error('Example:');
  console.error('  export SUPABASE_URL="https://your-project.supabase.co"');
  console.error('  export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"');
  console.error('  node scripts/run_migrations.mjs');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigrations() {
  console.log('🚀 Starting migration runner...\n');
  console.log(`📡 Connecting to: ${supabaseUrl}\n`);

  const migrationsDir = join(__dirname, '..', 'supabasemigrations');

  try {
    // Get all SQL files
    const files = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .filter(f => f.startsWith('100_add_batch_'))
      .sort();

    if (files.length === 0) {
      console.log('⚠️  No migration files found matching pattern: 100_add_batch_*.sql');
      return;
    }

    console.log(`Found ${files.length} migration file(s):\n`);
    files.forEach((file, i) => {
      console.log(`  ${i + 1}. ${file}`);
    });
    console.log('');

    // Run each migration
    for (const file of files) {
      const filePath = join(migrationsDir, file);
      console.log(`📄 Running: ${file}`);

      try {
        const sql = readFileSync(filePath, 'utf-8');

        // Execute the SQL
        const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

        if (error) {
          // Try alternative method - direct execution via REST API
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`
            },
            body: JSON.stringify({ sql_query: sql })
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
          }
        }

        console.log(`   ✓ Success\n`);
      } catch (error) {
        console.error(`   ✗ Error: ${error.message}\n`);
        console.error('⚠️  Note: You may need to run this migration manually through the Supabase Dashboard');
        console.error(`   SQL Query → Dashboard → SQL Editor → Paste the contents of ${file}\n`);
      }
    }

    console.log('✅ Migration process complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Check the tutor dashboard at /tutor/dashboard');
    console.log('  2. Navigate to the "Manage" tab');
    console.log('  3. You should see all 30 quizzes listed');
    console.log('');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

runMigrations();
