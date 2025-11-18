# Database Migrations

This folder contains SQL migrations for the AMath Tutor application.

## Migrations

1. `001_initial_schema.sql` - Initial database schema with tables for profiles, quizzes, quiz attempts, and question results
2. `002_add_test_quiz.sql` - Adds a sample test quiz for the Quadratic Functions topic (A1)

## How to Apply Migrations

### If using Supabase locally:

```bash
npx supabase db reset
```

### If using Supabase cloud:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of each migration file
4. Execute them in order (001, then 002, etc.)

### Manual PostgreSQL:

```bash
psql -h your-host -U your-user -d your-database -f supabasemigrations/001_initial_schema.sql
psql -h your-host -U your-user -d your-database -f supabasemigrations/002_add_test_quiz.sql
```

## Test Quiz

The test quiz (`002_add_test_quiz.sql`) includes:
- Topic: A1 (Quadratic Functions)
- Difficulty: Foundational
- 5 questions (mix of MCQ and multi-select)
- 10 total marks
- 20 minute time limit
- Due date: 30 days from migration execution

This quiz is perfect for testing the student portal functionality!
