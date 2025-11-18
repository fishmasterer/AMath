# Migration Instructions - Adding 30 O-Level A Math Quizzes

This guide explains how to add the 30 draft quizzes (5 batches) to your Supabase database.

## Option 1: Automated Script (Recommended)

### Prerequisites
- Supabase project URL
- Supabase Service Role Key (found in Project Settings → API)

### Steps

1. **Set environment variables** in your `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

2. **Run the migration script**:
```bash
node scripts/run_migrations.mjs
```

The script will automatically run all 5 batch migration files in order.

---

## Option 2: Manual Migration via Supabase Dashboard

If the automated script doesn't work (due to RPC permissions), run the migrations manually:

### Steps

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Navigate to your project
   - Click **SQL Editor** in the sidebar

2. **Run each migration file**

   For each of these files (in order):
   - `supabasemigrations/100_add_batch_1_quizzes.sql` (A1 & A2 topics)
   - `supabasemigrations/100_add_batch_2_quizzes.sql` (A3 & A4 topics)
   - `supabasemigrations/100_add_batch_3_quizzes.sql` (A5 & A6 topics)
   - `supabasemigrations/100_add_batch_4_quizzes.sql` (G1 & G2 topics)
   - `supabasemigrations/100_add_batch_5_quizzes.sql` (G3 & C1 topics)

   **Do the following:**
   - Click "New Query" in SQL Editor
   - Copy the entire contents of the SQL file
   - Paste into the query editor
   - Click "Run" or press Ctrl+Enter

3. **Verify the migration**
   - After running all 5 files, you should have 30 quizzes in the database
   - Run this query to check:
   ```sql
   SELECT count(*) as total_quizzes, published
   FROM quizzes
   GROUP BY published;
   ```
   - Expected result: 30 quizzes with `published = false`

---

## Option 3: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Initialize Supabase (if not already done)
supabase init

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Or run individual migration files
supabase db execute --file supabasemigrations/100_add_batch_1_quizzes.sql
supabase db execute --file supabasemigrations/100_add_batch_2_quizzes.sql
supabase db execute --file supabasemigrations/100_add_batch_3_quizzes.sql
supabase db execute --file supabasemigrations/100_add_batch_4_quizzes.sql
supabase db execute --file supabasemigrations/100_add_batch_5_quizzes.sql
```

---

## After Migration - Accessing Your Quizzes

Once the migrations are complete:

1. **Login to Tutor Dashboard**
   - Navigate to `/tutor` in your application
   - Enter the passcode (default: `1234`)

2. **View Your Quizzes**
   - Click the **"Manage"** tab
   - You should see all 30 quizzes listed
   - Filter by:
     - Status (Published/Draft)
     - Topic (A1-A6, G1-G3, C1)
     - Difficulty (foundational, intermediate, exam_level)

3. **Publish Quizzes**
   - All 30 quizzes are created as **drafts** (`published: false`)
   - Click **"Publish"** on any quiz to make it visible to students
   - Click **"Unpublish"** to revert back to draft status

4. **Generate More Quizzes**
   - Go to the **"Upload Quiz"** tab
   - Click **"Copy AI Prompt Template"** button
   - Use the prompt with Claude or any AI to generate new quizzes
   - Paste the JSON and upload!

---

## Quiz Structure

All 30 quizzes follow this organization:

### Batch 1 (Weeks 1-6) - Algebra Foundations
- **A1 - Quadratic Functions:** 3 quizzes (foundational, intermediate, exam_level)
- **A2 - Equations & Inequalities:** 3 quizzes

### Batch 2 (Weeks 7-12) - Advanced Algebra
- **A3 - Surds, Indices & Logarithms:** 3 quizzes
- **A4 - Polynomials & Partial Fractions:** 3 quizzes

### Batch 3 (Weeks 13-18) - Specialized Algebra
- **A5 - Binomial Expansions:** 3 quizzes
- **A6 - Exponential & Logarithmic Functions:** 3 quizzes

### Batch 4 (Weeks 19-24) - Trigonometry & Coordinate Geometry
- **G1 - Trigonometric Functions:** 3 quizzes
- **G2 - Coordinate Geometry:** 3 quizzes

### Batch 5 (Weeks 25-30) - Geometry Proofs & Calculus
- **G3 - Proofs in Plane Geometry:** 3 quizzes
- **C1 - Differentiation and Integration:** 3 quizzes

---

## Troubleshooting

### "Authentication required" error
- Make sure you're using the **Service Role Key**, not the Anon Key
- The Service Role Key bypasses Row Level Security (RLS)

### "Permission denied" error
- Check that the `quizzes` table exists
- Verify RLS policies allow inserts from service role

### Quizzes not showing in Manage tab
- Check that the API endpoint `/api/tutor/quizzes` is working
- Open browser DevTools → Network tab to see API responses
- Verify you're logged into the tutor dashboard

### Need to re-run a migration
- Migrations are idempotent but will fail if quizzes with the same data already exist
- You may need to delete existing quizzes first or modify the SQL to use `ON CONFLICT DO NOTHING`

---

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the Supabase logs in the Dashboard
3. Verify your environment variables are set correctly
4. Ensure Row Level Security policies allow tutor access
