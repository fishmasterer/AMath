# Database Migrations

This folder contains SQL migrations for the AMath Tutor application.

## Migrations

1. `001_initial_schema.sql` - Initial database schema with tables for profiles, quizzes, quiz attempts, and question results
2. `002_add_test_quiz.sql` - Adds a sample test quiz (requires existing tutor profile)
3. `002_add_test_quiz_simple.sql` - Simple version where you manually specify tutor UUID

## ⚠️ Important: Foreign Key Constraint

The `quizzes` table has a foreign key to `profiles(created_by)`, which references `auth.users(id)`. This means you **MUST** have a tutor user account before adding quizzes.

## How to Get a Test Quiz Working

### Option 1: Use the Tutor Dashboard (EASIEST)

1. Navigate to `/tutor` (passcode: **1234**)
2. Go to the "Upload Quiz" tab
3. Paste quiz JSON and upload

**Note:** Currently the tutor dashboard uses session auth, so you'll need to either:
- Set up proper Supabase auth, OR
- Temporarily modify the upload API to bypass auth for testing

### Option 2: Create a Tutor User First, Then Run Migration

1. **Create a tutor user via Supabase:**
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Add user" (email + password)
   - Get the user's UUID

2. **Create a profile for the tutor:**
   ```sql
   INSERT INTO profiles (id, role, full_name)
   VALUES ('YOUR_USER_UUID_HERE', 'tutor', 'Your Name');
   ```

3. **Run the simple migration:**
   - Open `002_add_test_quiz_simple.sql`
   - Replace `'YOUR_TUTOR_UUID_HERE'` with your actual tutor UUID
   - Execute in SQL Editor

### Option 3: Use the Auto-Detect Migration (Advanced)

If you already have a tutor profile in the database, run `002_add_test_quiz.sql`. It will automatically find your tutor ID and use it.

## How to Apply Migrations

### Supabase Cloud (Recommended):

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Copy and paste the contents of each migration file
4. Execute them in order (001, then 002, etc.)

### Local PostgreSQL:

```bash
psql -h your-host -U your-user -d your-database -f supabasemigrations/001_initial_schema.sql
psql -h your-host -U your-user -d your-database -f supabasemigrations/002_add_test_quiz_simple.sql
```

## Test Quiz Details

The test quiz includes:
- **Topic:** A1 (Quadratic Functions)
- **Difficulty:** Foundational
- **Questions:** 5 (mix of MCQ and multi-select)
- **Total Marks:** 10
- **Time Limit:** 20 minutes
- **Due Date:** 30 days from migration execution

Perfect for testing the student portal functionality!
