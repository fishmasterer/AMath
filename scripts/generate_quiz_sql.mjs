#!/usr/bin/env node

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function escapeSingleQuotes(str) {
  return str.replace(/'/g, "''");
}

function generateQuizInsertSQL(quizData) {
  const total_marks = quizData.questions.reduce((sum, q) => sum + q.marks, 0);

  const questionsJson = JSON.stringify(quizData.questions);

  return `-- ${quizData.title}
INSERT INTO quizzes (title, topic, week, difficulty, time_limit_minutes, due_date, total_marks, questions, created_by, published)
SELECT
  '${escapeSingleQuotes(quizData.title)}',
  '${quizData.topic}',
  ${quizData.week},
  '${quizData.difficulty}',
  ${quizData.time_limit_minutes},
  '${quizData.due_date}'::timestamptz,
  ${total_marks},
  '${escapeSingleQuotes(questionsJson)}'::jsonb,
  (SELECT id FROM profiles WHERE role = 'tutor' LIMIT 1),
  ${quizData.published ?? false}
WHERE NOT EXISTS (
  SELECT 1 FROM quizzes
  WHERE title = '${escapeSingleQuotes(quizData.title)}'
  AND topic = '${quizData.topic}'
  AND difficulty = '${quizData.difficulty}'
);`;
}

async function main() {
  const batchArg = process.argv[2];

  if (!batchArg) {
    console.error('Usage: node generate_quiz_sql.mjs <batch_number>');
    console.error('Example: node generate_quiz_sql.mjs 1');
    process.exit(1);
  }

  const batchDir = join(__dirname, '..', 'draft_quizzes', `batch_${batchArg}`);
  const outputFile = join(__dirname, '..', 'supabasemigrations', `100_add_batch_${batchArg}_quizzes.sql`);

  console.log(`\nGenerating SQL for batch ${batchArg}...`);
  console.log(`Input directory: ${batchDir}`);
  console.log(`Output file: ${outputFile}\n`);

  // Read all JSON files in the batch directory
  let files;
  try {
    files = readdirSync(batchDir).filter(f => f.endsWith('.json')).sort();
  } catch (error) {
    console.error(`Error: Could not read directory ${batchDir}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log('No quiz files found in the directory');
    return;
  }

  console.log(`Found ${files.length} quiz files\n`);

  let sqlStatements = [];
  sqlStatements.push(`-- Batch ${batchArg} Quizzes`);
  sqlStatements.push(`-- Generated: ${new Date().toISOString()}`);
  sqlStatements.push('');

  for (const file of files) {
    const filePath = join(batchDir, file);

    try {
      const quizData = JSON.parse(readFileSync(filePath, 'utf-8'));
      console.log(`Processing: ${quizData.title}`);

      const sql = generateQuizInsertSQL(quizData);
      sqlStatements.push(sql);
      sqlStatements.push('');
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
    }
  }

  const fullSQL = sqlStatements.join('\n');
  writeFileSync(outputFile, fullSQL, 'utf-8');

  console.log(`\n✓ SQL migration file created: ${outputFile}`);
  console.log(`  Total quizzes: ${files.length}`);
}

main().catch(console.error);
