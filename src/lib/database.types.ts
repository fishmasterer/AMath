// Auto-generated types for Supabase
// Based on database schema in supabasemigrations/001_initial_schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'tutor' | 'student'
          full_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'tutor' | 'student'
          full_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'tutor' | 'student'
          full_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          title: string
          topic: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'G1' | 'G2' | 'G3' | 'C1'
          week: number
          difficulty: 'foundational' | 'intermediate' | 'exam_level'
          time_limit_minutes: number
          due_date: string
          total_marks: number
          questions: Json
          created_by: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          topic: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'G1' | 'G2' | 'G3' | 'C1'
          week: number
          difficulty: 'foundational' | 'intermediate' | 'exam_level'
          time_limit_minutes: number
          due_date: string
          total_marks: number
          questions: Json
          created_by: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          topic?: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'G1' | 'G2' | 'G3' | 'C1'
          week?: number
          difficulty?: 'foundational' | 'intermediate' | 'exam_level'
          time_limit_minutes?: number
          due_date?: string
          total_marks?: number
          questions?: Json
          created_by?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          quiz_id: string
          student_id: string
          started_at: string
          submitted_at: string | null
          answers: Json
          score: number | null
          total_marks: number | null
          time_taken_seconds: number | null
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          student_id: string
          started_at?: string
          submitted_at?: string | null
          answers?: Json
          score?: number | null
          total_marks?: number | null
          time_taken_seconds?: number | null
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          student_id?: string
          started_at?: string
          submitted_at?: string | null
          answers?: Json
          score?: number | null
          total_marks?: number | null
          time_taken_seconds?: number | null
          completed?: boolean
          created_at?: string
        }
      }
      question_results: {
        Row: {
          id: string
          attempt_id: string
          question_index: number
          question_text: string
          topic: string
          question_type: 'mcq' | 'multi_select'
          student_answer: Json
          correct_answer: Json
          is_correct: boolean
          marks_awarded: number
          marks_possible: number
          created_at: string
        }
        Insert: {
          id?: string
          attempt_id: string
          question_index: number
          question_text: string
          topic: string
          question_type: 'mcq' | 'multi_select'
          student_answer: Json
          correct_answer: Json
          is_correct: boolean
          marks_awarded: number
          marks_possible: number
          created_at?: string
        }
        Update: {
          id?: string
          attempt_id?: string
          question_index?: number
          question_text?: string
          topic?: string
          question_type?: 'mcq' | 'multi_select'
          student_answer?: Json
          correct_answer?: Json
          is_correct?: boolean
          marks_awarded?: number
          marks_possible?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
