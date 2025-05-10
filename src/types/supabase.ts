
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
      applications: {
        Row: {
          id: string
          user_id: string
          job_title: string
          company: string
          location: string | null
          job_description: string | null
          status: string
          source: string | null
          applied_date: string
          updated_at: string
          feedback: string | null
          match_score: number | null
        }
        Insert: {
          id?: string
          user_id: string
          job_title: string
          company: string
          location?: string | null
          job_description?: string | null
          status?: string
          source?: string | null
          applied_date?: string
          updated_at?: string
          feedback?: string | null
          match_score?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          job_title?: string
          company?: string
          location?: string | null
          job_description?: string | null
          status?: string
          source?: string | null
          applied_date?: string
          updated_at?: string
          feedback?: string | null
          match_score?: number | null
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string | null
          type: string | null
          salary: string | null
          description: string | null
          skills: string[] | null
          posted_at: string
          expires_at: string | null
          source: string | null
          source_id: string | null
          url: string | null
        }
        Insert: {
          id?: string
          title: string
          company: string
          location?: string | null
          type?: string | null
          salary?: string | null
          description?: string | null
          skills?: string[] | null
          posted_at?: string
          expires_at?: string | null
          source?: string | null
          source_id?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string | null
          type?: string | null
          salary?: string | null
          description?: string | null
          skills?: string[] | null
          posted_at?: string
          expires_at?: string | null
          source?: string | null
          source_id?: string | null
          url?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          title: string | null
          summary: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          title?: string | null
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          title?: string | null
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_path: string
          parsed_data: Json | null
          uploaded_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_path: string
          parsed_data?: Json | null
          uploaded_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_path?: string
          parsed_data?: Json | null
          uploaded_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
