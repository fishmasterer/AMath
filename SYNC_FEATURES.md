# Cross-Device Sync Features

This document describes the cross-device synchronization features implemented in AMath Tutor. All user data is automatically synced across devices when users are logged in.

## Overview

The sync system ensures that students can seamlessly switch between devices (laptop, tablet, phone) while maintaining their study progress, preferences, and quiz state.

## 🛡️ Bulletproof Sync Features

The sync implementation includes enterprise-grade reliability:

### Automatic Retry with Exponential Backoff
- **Network failures** are automatically retried up to 3 times
- **Exponential backoff**: 1s → 2s → 4s delays between retries
- **Smart retry**: Only retries on 5xx errors and 429 (rate limit), not client errors

### Race Condition Prevention
- **Request deduplication**: Prevents concurrent identical requests
- **In-flight tracking**: Only one fetch/save operation at a time
- **State comparison**: Skips saves if data hasn't actually changed

### Infinite Loop Prevention
- **Session restoration runs ONCE** after initial load
- **Change detection**: Only syncs when data actually changes
- **Reference tracking**: Uses refs to prevent dependency loops

### Debouncing & Batching
- **Preference updates** debounced by 500ms
- **Quiz session updates** batched every 10 seconds
- **Pending updates merged** to avoid data loss

### Optimistic UI Updates
- **Instant feedback** for user actions
- **Automatic rollback** on error
- **Backup state** for error recovery

### Keepalive on Unmount
- **Pending changes flushed** when user closes tab
- **Keepalive flag** ensures request completes
- **No data loss** on navigation

### User Preference Integration
- **Auto-save respects user preferences**
- **Visual indicators** when auto-save is disabled
- **Graceful degradation** if preferences unavailable

## Synced Data

### 1. User Preferences ✅
**Location:** `/api/student/preferences`

User preferences are automatically synced across all logged-in devices:

- **Show LaTeX** - Display mathematical notation in questions
- **Show Explanations** - View answer explanations after quiz submission
- **Auto-save** - Automatically save quiz progress
- **Theme** - UI theme preference (light/dark/system)
- **Custom Settings** - Flexible JSONB field for future preferences

**How to use:**
```typescript
import { usePreferences } from '@/lib/hooks'

function MyComponent() {
  const {
    preferences,
    setShowLatex,
    setShowExplanations,
    setAutoSave,
    setTheme,
    syncing
  } = usePreferences()

  // Use preferences
  if (preferences.show_latex) {
    // Render LaTeX
  }

  // Update preferences (automatically syncs)
  await setShowLatex(true)
}
```

### 2. Quiz Session State ✅
**Location:** `/api/student/quiz-session`

Active quiz sessions are synced to allow students to resume quizzes on different devices:

- **Current Question** - Which question the student is on
- **Time Remaining** - Remaining time in the quiz
- **Flagged Questions** - Questions marked for review
- **Session Data** - Flexible JSONB field for additional state

**How to use:**
```typescript
import { useQuizSession } from '@/lib/hooks'

function QuizAttemptPage({ quizId }: { quizId: string }) {
  const {
    session,
    updateSessionState,
    deleteSession,
    syncing
  } = useQuizSession({
    quizId,
    autoSaveInterval: 10000, // 10 seconds
    enabled: true
  })

  // Update session (auto-saves every 10s)
  updateSessionState({
    current_question: 5,
    time_remaining_seconds: 1200,
    session_data: {
      flagged_questions: [1, 3, 5]
    }
  })

  // Clean up when quiz is submitted
  await deleteSession()
}
```

### 3. Quiz Attempts & Answers ✅
**Already implemented** - Quiz attempts and answers are stored in `quiz_attempts` table:

- **Answers** - Student answers (auto-saved every 30 seconds)
- **Progress** - Started/completed status
- **Score** - Final score after submission
- **Time Taken** - Total time spent on quiz

### 4. Performance Analytics ✅
**Already implemented** - All analytics are computed from database:

- **Topic Mastery** - Performance by topic
- **Score Trends** - Historical score data
- **Mistake Journal** - All incorrect answers
- **Completion Rate** - Quiz completion statistics

## Database Schema

### user_preferences
```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  show_latex BOOLEAN DEFAULT true,
  show_explanations BOOLEAN DEFAULT true,
  auto_save BOOLEAN DEFAULT true,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### quiz_sessions
```sql
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  current_question INTEGER DEFAULT 0,
  time_remaining_seconds INTEGER,
  session_data JSONB DEFAULT '{}',
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(quiz_id, student_id)
);
```

## API Endpoints

### User Preferences

**GET /api/student/preferences**
- Fetches user preferences
- Creates default preferences if none exist
- Returns: `UserPreferences` object

**PUT /api/student/preferences**
- Updates user preferences
- Uses upsert to handle first-time creation
- Body: Partial<UserPreferences>
- Returns: Updated `UserPreferences` object

### Quiz Sessions

**GET /api/student/quiz-session?quiz_id={id}**
- Fetches quiz session for a specific quiz
- Returns: `QuizSession` object or `null`

**POST /api/student/quiz-session**
- Creates or updates quiz session
- Uses upsert to handle creation/update
- Body: `{ quiz_id, current_question?, time_remaining_seconds?, session_data? }`
- Returns: `QuizSession` object

**DELETE /api/student/quiz-session?quiz_id={id}**
- Deletes quiz session (called when quiz is submitted)
- Returns: `{ success: true }`

## React Hooks

### usePreferences()
```typescript
const {
  preferences,        // UserPreferences object
  loading,           // Initial load state
  error,             // Error message
  syncing,           // Currently syncing
  updatePreferences, // Update multiple preferences
  refreshPreferences,// Refetch from server
  setShowLatex,      // Update show_latex
  setShowExplanations,// Update show_explanations
  setAutoSave,       // Update auto_save
  setTheme           // Update theme
} = usePreferences()
```

**Features:**
- Automatic fetch on mount
- Optimistic UI updates
- Error handling with rollback
- Individual preference updaters

### useQuizSession(options)
```typescript
const {
  session,           // QuizSession object or null
  loading,          // Initial load state
  error,            // Error message
  syncing,          // Currently syncing
  saveSession,      // Manually save session
  deleteSession,    // Delete session
  updateSessionState,// Update session (queued for auto-save)
  refreshSession    // Refetch from server
} = useQuizSession({
  quizId: string,
  autoSaveInterval?: number, // Default: 10000ms
  enabled?: boolean          // Default: true
})
```

**Features:**
- Automatic periodic sync (every 10s by default)
- Queues updates and batches them
- Auto-cleanup on unmount with `keepalive`
- Can be disabled when not needed

## Row Level Security (RLS)

All sync features respect Supabase RLS policies:

**user_preferences:**
- Users can only view/update their own preferences
- Automatic creation on profile creation

**quiz_sessions:**
- Students can only view/update their own sessions
- Tutors can view all sessions for monitoring
- Automatic cleanup of stale sessions (24h old)

## Migration Instructions

### Running the Migration

**Option 1: Supabase Dashboard (Recommended)**
1. Go to Supabase Dashboard → SQL Editor
2. Open `supabasemigrations/003_add_user_sync_features.sql`
3. Copy the entire contents
4. Paste into SQL Editor and run

**Option 2: Supabase CLI**
```bash
supabase db push
# or
supabase db execute --file supabasemigrations/003_add_user_sync_features.sql
```

### Verifying the Migration

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('user_preferences', 'quiz_sessions');

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('user_preferences', 'quiz_sessions');

-- Test default preferences creation
SELECT * FROM user_preferences LIMIT 5;
```

## Testing Cross-Device Sync

### Testing User Preferences
1. Log in on Device 1
2. Go to Profile page → Study Preferences
3. Toggle "Show LaTeX" off
4. Log in on Device 2 (same account)
5. Go to Profile page → Verify "Show LaTeX" is off
6. Toggle it back on Device 2
7. Refresh Device 1 → Verify it's now on

### Testing Quiz Session Sync
1. Start a quiz on Device 1
2. Answer a few questions
3. Note the current question number
4. Open the same quiz on Device 2 (same account)
5. Verify you resume at the same question
6. Flag a question on Device 2
7. Refresh Device 1 → Verify the flag appears

### Testing Quiz Auto-Save
1. Start a quiz
2. Answer several questions
3. Close browser tab (don't submit)
4. Reopen quiz → Verify all answers are preserved
5. Check sync indicator shows "Synced" after each answer

## Performance Considerations

### Auto-Save Intervals
- **User Preferences:** Immediate (on change)
- **Quiz Sessions:** Every 10 seconds
- **Quiz Answers:** Every 30 seconds + on navigation

### Database Cleanup
Run periodically to clean up stale sessions:
```sql
SELECT cleanup_stale_quiz_sessions();
```

Set up a cron job in Supabase Dashboard:
```sql
-- Runs daily at midnight
SELECT cron.schedule(
  'cleanup-stale-quiz-sessions',
  '0 0 * * *',
  $$ SELECT cleanup_stale_quiz_sessions(); $$
);
```

## Future Enhancements

### Potential Additions
1. **Real-time Sync** - Use Supabase Realtime for instant updates
2. **Offline Mode** - Service Worker + IndexedDB for offline support
3. **Conflict Resolution** - Handle simultaneous edits from multiple devices
4. **Sync History** - Track when and where preferences were changed
5. **Device Management** - View/manage active sessions per device

### Real-time Sync Example
```typescript
// Listen for preference changes from other devices
supabase
  .channel('user_preferences')
  .on('postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'user_preferences',
      filter: `user_id=eq.${user.id}`
    },
    (payload) => {
      // Update local state
      setPreferences(payload.new)
    }
  )
  .subscribe()
```

## Troubleshooting

### Preferences Not Syncing
1. Check user is authenticated: `supabase.auth.getUser()`
2. Verify RLS policies: Run as service role to check table access
3. Check network tab for API errors
4. Verify migration ran successfully

### Quiz Session Not Restoring
1. Check `quiz_sessions` table has data: `SELECT * FROM quiz_sessions WHERE student_id = 'user-id'`
2. Verify session not older than 24h (auto-cleanup)
3. Check browser console for hook errors
4. Verify `enabled` prop is true in `useQuizSession`

### Auto-Save Not Working
1. Check `autoSaveInterval` is not 0
2. Verify component doesn't unmount during save
3. Check network for PATCH/POST failures
4. Verify RLS policies allow student updates

## Security Notes

- All sync endpoints require authentication
- RLS ensures users can only access their own data
- Service role key should never be exposed to client
- Session tokens stored securely in HTTP-only cookies
- All API requests use server-side Supabase client

## Support

For issues or questions about sync features:
1. Check this documentation
2. Review RLS policies in Supabase Dashboard
3. Check API route logs in Vercel
4. Verify database migrations ran successfully
