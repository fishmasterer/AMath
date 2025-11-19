-- Create Test Student for Single-Student Setup
-- Migration: 002_create_test_student

-- Note: This creates a test student user with a hardcoded UUID that matches
-- the student ID used in /src/app/api/quizzes/[id]/start/route.ts

-- Step 1: Create the auth user
-- We use Supabase's admin API to create a user with a specific UUID
-- This requires the SQL to be run with service role privileges

DO $$
DECLARE
  test_student_id UUID := '00000000-0000-0000-0000-000000000001';
  test_student_email TEXT := 'student@amath-test.local';
BEGIN
  -- Check if user already exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = test_student_id) THEN
    -- Insert directly into auth.users (only works with service role)
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change
    ) VALUES (
      test_student_id,
      '00000000-0000-0000-0000-000000000000', -- default instance
      'authenticated',
      'authenticated',
      test_student_email,
      crypt('test-password-123', gen_salt('bf')), -- bcrypt hash
      NOW(),
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );

    RAISE NOTICE 'Created auth user with ID: %', test_student_id;
  ELSE
    RAISE NOTICE 'Auth user already exists with ID: %', test_student_id;
  END IF;

  -- Step 2: Create the profile for this user
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = test_student_id) THEN
    INSERT INTO profiles (
      id,
      role,
      full_name,
      created_at,
      updated_at
    ) VALUES (
      test_student_id,
      'student',
      'Test Student',
      NOW(),
      NOW()
    );

    RAISE NOTICE 'Created profile for test student';
  ELSE
    RAISE NOTICE 'Profile already exists for test student';
  END IF;

END $$;

-- Verify the student was created
SELECT
  p.id,
  p.role,
  p.full_name,
  u.email,
  p.created_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.id = '00000000-0000-0000-0000-000000000001';
