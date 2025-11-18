#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  console.error('Please set them in your .env.local file or export them');
  process.exit(1);
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getTutorId() {
  // Get the first tutor from the database
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'tutor')
    .limit(1)
    .single();

  if (error || !data) {
    console.error('Error: No tutor found in database');
    console.error('Please create a tutor account first');
    process.exit(1);
  }

  return data.id;
}

async function uploadQuiz(quizData, tutorId) {
  // Calculate total marks
  const total_marks = quizData.questions.reduce((sum, q) => sum + q.marks, 0);

  const { data, error } = await supabase
    .from('quizzes')
    .insert({
      title: quizData.title,
      topic: quizData.topic,
      week: quizData.week,
      difficulty: quizData.difficulty,
      time_limit_minutes: quizData.time_limit_minutes,
      due_date: quizData.due_date,
      total_marks: total_marks,
      questions: quizData.questions,
      created_by: tutorId,
      published: quizData.published ?? false,
    })
    .select()
    .single();

  if (error) {
    console.error(`Error uploading quiz "${quizData.title}":`, error);
    return null;
  }

  return data;
}

async function main() {
  const batchArg = process.argv[2];

  if (!batchArg) {
    console.error('Usage: node upload_batch_quizzes.mjs <batch_number>');
    console.error('Example: node upload_batch_quizzes.mjs 1');
    process.exit(1);
  }

  const batchDir = join(__dirname, '..', 'draft_quizzes', `batch_${batchArg}`);

  console.log(`\nUploading quizzes from batch ${batchArg}...`);
  console.log(`Directory: ${batchDir}\n`);

  // Get tutor ID
  const tutorId = await getTutorId();
  console.log(`Using tutor ID: ${tutorId}\n`);

  // Read all JSON files in the batch directory
  let files;
  try {
    files = readdirSync(batchDir).filter(f => f.endsWith('.json'));
  } catch (error) {
    console.error(`Error: Could not read directory ${batchDir}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log('No quiz files found in the directory');
    return;
  }

  console.log(`Found ${files.length} quiz files:\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const filePath = join(batchDir, file);

    try {
      const quizData = JSON.parse(readFileSync(filePath, 'utf-8'));

      console.log(`Uploading: ${quizData.title}...`);

      const result = await uploadQuiz(quizData, tutorId);

      if (result) {
        console.log(`✓ Success! Quiz ID: ${result.id} (${result.total_marks} marks, published: ${result.published})\n`);
        successCount++;
      } else {
        console.log(`✗ Failed\n`);
        failCount++;
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
      console.log(`✗ Failed\n`);
      failCount++;
    }
  }

  console.log('='.repeat(50));
  console.log(`Upload complete!`);
  console.log(`Success: ${successCount}/${files.length}`);
  console.log(`Failed: ${failCount}/${files.length}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
