-- Simple Test Student Creation
-- This version assumes you'll create the auth user manually through Supabase Dashboard

-- INSTRUCTIONS:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" > "Create new user"
-- 3. Set email to: student@amath-test.local
-- 4. Set password to: test-password-123
-- 5. After creating, copy the user's UUID
-- 6. Replace '00000000-0000-0000-0000-000000000001' below with the actual UUID
-- 7. Run this SQL script

-- OR if you want to use the hardcoded UUID (00000000-0000-0000-0000-000000000001):
-- You'll need to create the user via Supabase Auth API or Dashboard first,
-- then run this script to create the profile.

-- For now, let's create a profile for any existing student user in auth.users
-- This will work if you create the user manually in Supabase Dashboard first

DO $$
DECLARE
  target_user_id UUID;
  target_email TEXT := 'student@amath-test.local';
BEGIN
  -- Find the user ID from auth.users by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = target_email
  LIMIT 1;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'No auth user found with email %. Please create this user in Supabase Dashboard first.', target_email;
  END IF;

  -- Create profile if it doesn't exist
  INSERT INTO profiles (
    id,
    role,
    full_name,
    created_at,
    updated_at
  ) VALUES (
    target_user_id,
    'student',
    'Test Student',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'student',
    full_name = 'Test Student',
    updated_at = NOW();

  RAISE NOTICE 'Profile created/updated for user ID: %', target_user_id;
  RAISE NOTICE 'You need to update the hardcoded student ID in /src/app/api/quizzes/[id]/start/route.ts to: %', target_user_id;

END $$;

-- Show the created profile
SELECT
  p.id,
  p.role,
  p.full_name,
  u.email,
  p.created_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'student@amath-test.local';
