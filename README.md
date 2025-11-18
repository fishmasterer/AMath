# AMath Tutor - Quiz & Learning Management System

A comprehensive quiz and homework management system for Singapore O-Level Additional Mathematics tutoring.

## 🚀 Live Deployment

**Production URL:** https://a-math.vercel.app

The application is deployed on Vercel with automatic deployments from the `main` branch.

## 🏗️ Architecture

**Tech Stack:**
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes + Supabase (PostgreSQL + Auth + Realtime)
- **Math Rendering:** KaTeX
- **Validation:** Zod
- **State Management:** Zustand
- **Deployment:** Vercel

## 📁 Project Structure

```
amath-tutor/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication routes
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (tutor)/             # Tutor dashboard routes
│   │   │   ├── dashboard/
│   │   │   ├── upload-quiz/
│   │   │   ├── results/
│   │   │   └── layout.tsx
│   │   ├── (student)/           # Student routes
│   │   │   ├── homework/
│   │   │   ├── quiz/[id]/
│   │   │   ├── mistakes/
│   │   │   ├── progress/
│   │   │   └── layout.tsx
│   │   ├── api/                 # API routes
│   │   │   ├── quizzes/
│   │   │   ├── attempts/
│   │   │   └── results/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── quiz/                # Quiz components
│   │   ├── upload/              # Upload components
│   │   └── ui/                  # Reusable UI components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Client-side Supabase
│   │   │   └── server.ts        # Server-side Supabase
│   │   ├── validators/
│   │   │   └── quiz.validator.ts
│   │   ├── utils/
│   │   │   └── grading.ts
│   │   ├── types.ts             # TypeScript types
│   │   └── database.types.ts    # Auto-generated Supabase types
│   └── styles/
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
├── public/
├── .env.local                    # Environment variables (create this)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🚀 Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm 9+
- Supabase account (free tier works)
- Git

### 2. Clone Repository

```bash
git clone <your-repo-url>
cd amath-tutor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key
4. Run the migration:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `001_initial_schema.sql`
   - Execute the SQL

### 5. Environment Variables

Create `.env.local` in project root:

```bash
cp .env.template .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Generate Supabase Types (Optional but Recommended)

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npm run supabase:gen-types
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 👥 User Setup

### Creating Users

1. Go to Supabase Dashboard > Authentication > Users
2. Add User (manually or via signup page)
3. After user creation, insert profile record:

```sql
-- For tutor
INSERT INTO profiles (id, role, full_name)
VALUES ('user-uuid-from-auth', 'tutor', 'Your Name');

-- For student  
INSERT INTO profiles (id, role, full_name)
VALUES ('user-uuid-from-auth', 'student', 'Student Name');
```

## 📝 Quiz Upload Format

### JSON Schema

```json
{
  "title": "Quadratic Functions - Week 2",
  "topic": "A1",
  "week": 2,
  "difficulty": "intermediate",
  "time_limit_minutes": 30,
  "due_date": "2024-12-01T23:59:59Z",
  "questions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "Find the minimum value of $f(x) = 2x^2 + 8x + 3$",
      "options": ["$-5$", "$-2$", "$0$", "$3$"],
      "correctAnswer": "A",
      "marks": 3,
      "explanation": "Complete the square: $f(x) = 2(x+2)^2 - 5$"
    },
    {
      "id": 2,
      "type": "multi_select",
      "question": "Which equations have real roots?",
      "options": [
        "$x^2 + 2x + 1 = 0$",
        "$x^2 + 2x + 2 = 0$",
        "$x^2 - 4x + 4 = 0$"
      ],
      "correctAnswers": ["A", "C"],
      "partialCredit": true,
      "marks": 4
    }
  ]
}
```

### Topics

- **A1:** Quadratic Functions
- **A2:** Equations and Inequalities
- **A3:** Surds
- **A4:** Polynomials and Partial Fractions
- **A5:** Binomial Expansions
- **A6:** Exponential and Logarithmic Functions
- **G1:** Trigonometric Functions
- **G2:** Coordinate Geometry
- **G3:** Proofs in Plane Geometry
- **C1:** Calculus

### Difficulty Levels

- `foundational`: Basic concept understanding
- `intermediate`: Standard exam questions
- `exam_level`: Challenging exam-style questions

## 🔐 Security Features

- Row Level Security (RLS) enabled
- Role-based access control (Tutor/Student)
- Protected API routes
- Session management via Supabase Auth
- Middleware authentication checks

## 📊 Database Schema

### Tables

1. **profiles** - User profiles with roles
2. **quizzes** - Quiz definitions
3. **quiz_attempts** - Student quiz attempts
4. **question_results** - Individual question results (mistake journal)

### Key Features

- One attempt per quiz per student
- Automatic grading for MCQ and multi-select
- Partial credit support for multi-select questions
- Real-time progress tracking
- Comprehensive analytics

## 🎯 Core Features

### For Tutors

- Upload quizzes via JSON
- View real-time quiz progress
- Review detailed results
- Track student performance
- Analytics dashboard

### For Students

- Take timed quizzes
- Auto-save progress
- View immediate results
- Mistake journal
- Topic mastery tracking

## 📱 Mobile Support

- Progressive Web App (PWA) ready
- Responsive design
- Touch-optimized
- Works offline (after first load)

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
git push origin main
# Vercel auto-deploys
```

### Manual Build

```bash
npm run build
npm start
```

## 🧪 Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 🐛 Troubleshooting

### Common Issues

1. **Supabase connection errors**
   - Check `.env.local` credentials
   - Verify Supabase project is active

2. **KaTeX rendering issues**
   - Ensure proper LaTeX syntax: `$...$` for inline, `$$...$$` for display
   - Check KaTeX CSS is imported in globals.css

3. **Type errors**
   - Run `npm run supabase:gen-types` to regenerate types
   - Check TypeScript version compatibility

4. **Authentication loops**
   - Clear browser cookies
   - Check middleware configuration
   - Verify RLS policies

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [KaTeX Documentation](https://katex.org/docs/supported.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a private tutoring project. For feature requests or bugs, create an issue.

## 📄 License

Private project - All rights reserved
