# Test Student Setup Instructions

The quiz system is failing because the hardcoded student ID `00000000-0000-0000-0000-000000000001` doesn't exist in the database.

## Quick Fix (Recommended)

### Option 1: Create the exact test student

Run this in your **Supabase SQL Editor** with service role access:

```sql
-- Create test student with the hardcoded UUID
-- This uses Supabase's internal auth functions

-- First, check if we have pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert into auth.users (requires service role)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000001'::uuid,
  'authenticated',
  'authenticated',
  'student@amath-test.local',
  crypt('TestPassword123!', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001'
);

-- Then create the profile
INSERT INTO profiles (id, role, full_name, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'student',
  'Test Student',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT
  p.id,
  p.role,
  p.full_name,
  u.email
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.id = '00000000-0000-0000-0000-000000000001';
```

### Option 2: Create via Dashboard (if SQL approach fails)

If the SQL approach doesn't work due to permissions:

1. **Go to Supabase Dashboard** → Authentication → Users
2. **Click "Add User"** → "Create new user"
3. **Email**: `student@amath-test.local`
4. **Password**: `TestPassword123!`
5. **Auto-confirm**: Yes (enable this)
6. **Click Create**
7. **Copy the generated UUID**
8. **Update the code** at `/src/app/api/quizzes/[id]/start/route.ts` line 10:
   ```typescript
   const studentId = 'YOUR-COPIED-UUID-HERE' // Replace with the actual UUID from step 7
   ```
9. **Run this SQL** to create the profile:
   ```sql
   INSERT INTO profiles (id, role, full_name)
   VALUES (
     'YOUR-COPIED-UUID-HERE',
     'student',
     'Test Student'
   );
   ```

### Option 3: Find existing student

If you already have a student user, run this to find them:

```sql
SELECT u.id, u.email, p.full_name, p.role
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE p.role = 'student'
LIMIT 5;
```

Then update `/src/app/api/quizzes/[id]/start/route.ts` line 10 with one of those IDs.

## After Creating the Student

1. Redeploy your app to Vercel (or wait for auto-deployment)
2. Try starting a quiz again from the student portal
3. It should now work!

## Verifying It Works

After running the SQL, you can verify with:

```sql
-- Check auth user exists
SELECT id, email, email_confirmed_at
FROM auth.users
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Check profile exists
SELECT id, role, full_name
FROM profiles
WHERE id = '00000000-0000-0000-0000-000000000001';
```

Both queries should return one row.
