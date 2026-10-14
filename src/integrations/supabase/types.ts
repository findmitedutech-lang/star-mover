export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      app_sections: {
        Row: {
          id: string
          is_hidden: boolean
          is_locked: boolean
          updated_at: string
        }
        Insert: {
          id: string
          is_hidden?: boolean
          is_locked?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          is_hidden?: boolean
          is_locked?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      call_events: {
        Row: {
          caller_id: string
          conversation_id: string
          created_at: string
          id: string
          kind: string
          receiver_id: string
          status: string
          updated_at: string
        }
        Insert: {
          caller_id: string
          conversation_id: string
          created_at?: string
          id?: string
          kind?: string
          receiver_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          caller_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
          kind?: string
          receiver_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_events_caller_id_fkey"
            columns: ["caller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_events_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_call_signals: {
        Row: {
          call_id: string
          created_at: string
          data: Json
          from_id: string
          id: string
          to_id: string
          type: string
        }
        Insert: {
          call_id: string
          created_at?: string
          data: Json
          from_id: string
          id?: string
          to_id: string
          type: string
        }
        Update: {
          call_id?: string
          created_at?: string
          data?: Json
          from_id?: string
          id?: string
          to_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_call_signals_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "chat_calls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_call_signals_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_call_signals_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_calls: {
        Row: {
          caller_id: string
          conversation_id: string
          created_at: string
          id: string
          kind: string
          receiver_id: string
          status: string
          updated_at: string
        }
        Insert: {
          caller_id: string
          conversation_id: string
          created_at?: string
          id?: string
          kind?: string
          receiver_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          caller_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
          kind?: string
          receiver_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_calls_caller_id_fkey"
            columns: ["caller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_calls_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_calls_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_members: {
        Row: {
          chat_id: string
          created_at: string
          role: string
          user_id: string
        }
        Insert: {
          chat_id: string
          created_at?: string
          role?: string
          user_id: string
        }
        Update: {
          chat_id?: string
          created_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_members_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_notifications: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: string
          is_read: boolean
          message_type: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message_type?: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message_type?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_notifications_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_notifications_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_notifications_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_prefs: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: string
          message_id: string | null
          muted: boolean
          pinned: boolean
          starred: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          message_id?: string | null
          muted?: boolean
          pinned?: boolean
          starred?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          message_id?: string | null
          muted?: boolean
          pinned?: boolean
          starred?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_prefs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_prefs_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          avatar_path: string | null
          community_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_community: boolean
          is_group: boolean
          last_message: string | null
          last_message_at: string | null
          name: string | null
          updated_at: string
        }
        Insert: {
          avatar_path?: string | null
          community_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_community?: boolean
          is_group?: boolean
          last_message?: string | null
          last_message_at?: string | null
          name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_path?: string | null
          community_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_community?: boolean
          is_group?: boolean
          last_message?: string | null
          last_message_at?: string | null
          name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_enrollments: {
        Row: {
          amount: number
          class_id: string
          created_at: string
          currency: string
          id: string
          reference: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          class_id: string
          created_at?: string
          currency?: string
          id?: string
          reference?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          class_id?: string
          created_at?: string
          currency?: string
          id?: string
          reference?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "live_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_message_votes: {
        Row: {
          created_at: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_message_votes_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "class_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_message_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_messages: {
        Row: {
          answered: boolean
          body: string
          channel: string
          class_id: string
          created_at: string
          id: string
          image_path: string | null
          upvotes: number
          user_id: string
        }
        Insert: {
          answered?: boolean
          body?: string
          channel?: string
          class_id: string
          created_at?: string
          id?: string
          image_path?: string | null
          upvotes?: number
          user_id: string
        }
        Update: {
          answered?: boolean
          body?: string
          channel?: string
          class_id?: string
          created_at?: string
          id?: string
          image_path?: string | null
          upvotes?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_messages_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "live_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_replays: {
        Row: {
          class_id: string
          created_at: string
          duration_seconds: number | null
          host_id: string
          id: string
          preview_seconds: number
          price: number
          title: string
          video_path: string
        }
        Insert: {
          class_id: string
          created_at?: string
          duration_seconds?: number | null
          host_id: string
          id?: string
          preview_seconds?: number
          price?: number
          title: string
          video_path: string
        }
        Update: {
          class_id?: string
          created_at?: string
          duration_seconds?: number | null
          host_id?: string
          id?: string
          preview_seconds?: number
          price?: number
          title?: string
          video_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_replays_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "live_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_replays_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_stage_requests: {
        Row: {
          class_id: string
          created_at: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_stage_requests_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "live_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_stage_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          announcement_chat_id: string | null
          avatar_path: string | null
          created_at: string
          created_by: string
          description: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          announcement_chat_id?: string | null
          avatar_path?: string | null
          created_at?: string
          created_by: string
          description?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          announcement_chat_id?: string | null
          avatar_path?: string | null
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communities_announcement_chat_id_fkey"
            columns: ["announcement_chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      company_verification_applications: {
        Row: {
          company_name: string
          company_size: string | null
          created_at: string
          documents_paths: string[]
          fee_currency: string
          ghana_card_number: string | null
          hr_contact_name: string | null
          hr_contact_position: string | null
          id: string
          industry: string | null
          information_confirmed: boolean
          insurance_policy_path: string | null
          official_email: string | null
          phone: string | null
          region_city: string | null
          registration_ghana_card_path: string | null
          review_note: string | null
          salary_max: number | null
          salary_min: number | null
          ssnit_proof_path: string | null
          staff_count: number | null
          status: string
          tin: string
          updated_at: string
          user_id: string
          verification_fee: number
          website: string | null
          workers_compensation_path: string | null
        }
        Insert: {
          company_name: string
          company_size?: string | null
          created_at?: string
          documents_paths?: string[]
          fee_currency?: string
          ghana_card_number?: string | null
          hr_contact_name?: string | null
          hr_contact_position?: string | null
          id?: string
          industry?: string | null
          information_confirmed?: boolean
          insurance_policy_path?: string | null
          official_email?: string | null
          phone?: string | null
          region_city?: string | null
          registration_ghana_card_path?: string | null
          review_note?: string | null
          salary_max?: number | null
          salary_min?: number | null
          ssnit_proof_path?: string | null
          staff_count?: number | null
          status?: string
          tin: string
          updated_at?: string
          user_id: string
          verification_fee?: number
          website?: string | null
          workers_compensation_path?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string | null
          created_at?: string
          documents_paths?: string[]
          fee_currency?: string
          ghana_card_number?: string | null
          hr_contact_name?: string | null
          hr_contact_position?: string | null
          id?: string
          industry?: string | null
          information_confirmed?: boolean
          insurance_policy_path?: string | null
          official_email?: string | null
          phone?: string | null
          region_city?: string | null
          registration_ghana_card_path?: string | null
          review_note?: string | null
          salary_max?: number | null
          salary_min?: number | null
          ssnit_proof_path?: string | null
          staff_count?: number | null
          status?: string
          tin?: string
          updated_at?: string
          user_id?: string
          verification_fee?: number
          website?: string | null
          workers_compensation_path?: string | null
        }
        Relationships: []
      }
      contact_purchases: {
        Row: {
          amount: number
          contacts: number
          created_at: string
          currency: string
          featured: number
          id: string
          method: string | null
          plan: string
          reference: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          contacts?: number
          created_at?: string
          currency?: string
          featured?: number
          id?: string
          method?: string | null
          plan: string
          reference: string
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          contacts?: number
          created_at?: string
          currency?: string
          featured?: number
          id?: string
          method?: string | null
          plan?: string
          reference?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string
          last_message_text: string | null
          participant1_id: string
          participant2_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_text?: string | null
          participant1_id: string
          participant2_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_text?: string | null
          participant1_id?: string
          participant2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_participant1_id_fkey"
            columns: ["participant1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant2_id_fkey"
            columns: ["participant2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_credits: {
        Row: {
          contacts_remaining: number
          featured_credits: number
          updated_at: string
          user_id: string
        }
        Insert: {
          contacts_remaining?: number
          featured_credits?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          contacts_remaining?: number
          featured_credits?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      expertise_payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          method: string | null
          reference: string
          status: string
          talent_profile_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          method?: string | null
          reference: string
          status?: string
          talent_profile_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          method?: string | null
          reference?: string
          status?: string
          talent_profile_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expertise_payments_talent_profile_id_fkey"
            columns: ["talent_profile_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      folder_items: {
        Row: {
          added_at: string
          folder_id: string
          id: string
          item_id: string
          item_type: string
          title: string | null
          user_id: string
        }
        Insert: {
          added_at?: string
          folder_id: string
          id?: string
          item_id: string
          item_type: string
          title?: string | null
          user_id: string
        }
        Update: {
          added_at?: string
          folder_id?: string
          id?: string
          item_id?: string
          item_type?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folder_items_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "profile_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_alerts: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          job_type: string | null
          keywords: string
          label: string
          min_salary: number | null
          skills: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          job_type?: string | null
          keywords?: string
          label?: string
          min_salary?: number | null
          skills?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          job_type?: string | null
          keywords?: string
          label?: string
          min_salary?: number | null
          skills?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          chat_id: string | null
          conversation_id: string | null
          created_at: string
          employee_id: string
          employer_id: string
          id: string
          job_id: string | null
          kind: string
          status: string
          talent_id: string | null
          updated_at: string
        }
        Insert: {
          chat_id?: string | null
          conversation_id?: string | null
          created_at?: string
          employee_id: string
          employer_id: string
          id?: string
          job_id?: string | null
          kind?: string
          status?: string
          talent_id?: string | null
          updated_at?: string
        }
        Update: {
          chat_id?: string | null
          conversation_id?: string | null
          created_at?: string
          employee_id?: string
          employer_id?: string
          id?: string
          job_id?: string | null
          kind?: string
          status?: string
          talent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_notifications: {
        Row: {
          alert_id: string | null
          body: string
          created_at: string
          id: string
          is_read: boolean
          job_id: string
          title: string
          user_id: string
        }
        Insert: {
          alert_id?: string | null
          body: string
          created_at?: string
          id?: string
          is_read?: boolean
          job_id: string
          title: string
          user_id: string
        }
        Update: {
          alert_id?: string | null
          body?: string
          created_at?: string
          id?: string
          is_read?: boolean
          job_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_notifications_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "job_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_notifications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          job_id: string | null
          method: string | null
          reference: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          job_id?: string | null
          method?: string | null
          reference: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          job_id?: string | null
          method?: string | null
          reference?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_payments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          age_max: number | null
          age_min: number | null
          applicants_count: number
          category: string
          company: string
          company_verification_status: string
          created_at: string
          description: string
          employer_id: string
          expires_at: string | null
          gender_requirement: string
          id: string
          is_featured: boolean
          is_open: boolean
          is_paid: boolean
          job_type: string
          location_lat: number | null
          location_lng: number | null
          location_name: string
          meets_requirements: boolean
          plan: string | null
          salary_amount: number
          salary_currency: string
          salary_period: string
          skills: string[]
          title: string
          updated_at: string
          vacancies: number
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          applicants_count?: number
          category: string
          company: string
          company_verification_status?: string
          created_at?: string
          description: string
          employer_id: string
          expires_at?: string | null
          gender_requirement?: string
          id?: string
          is_featured?: boolean
          is_open?: boolean
          is_paid?: boolean
          job_type: string
          location_lat?: number | null
          location_lng?: number | null
          location_name: string
          meets_requirements?: boolean
          plan?: string | null
          salary_amount: number
          salary_currency?: string
          salary_period: string
          skills?: string[]
          title: string
          updated_at?: string
          vacancies?: number
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          applicants_count?: number
          category?: string
          company?: string
          company_verification_status?: string
          created_at?: string
          description?: string
          employer_id?: string
          expires_at?: string | null
          gender_requirement?: string
          id?: string
          is_featured?: boolean
          is_open?: boolean
          is_paid?: boolean
          job_type?: string
          location_lat?: number | null
          location_lng?: number | null
          location_name?: string
          meets_requirements?: boolean
          plan?: string | null
          salary_amount?: number
          salary_currency?: string
          salary_period?: string
          skills?: string[]
          title?: string
          updated_at?: string
          vacancies?: number
        }
        Relationships: [
          {
            foreignKeyName: "jobs_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_classes: {
        Row: {
          created_at: string
          current_topic: string | null
          description: string
          duration_minutes: number
          ended_at: string | null
          hls_url: string | null
          host_id: string
          id: string
          is_live: boolean
          practical_currency: string
          practical_price: number
          recording_path: string | null
          room_name: string
          scheduled_end_at: string | null
          started_at: string
          teacher_share: number
          thumbnail_path: string | null
          topic: string
          updated_at: string
          viewers_count: number
        }
        Insert: {
          created_at?: string
          current_topic?: string | null
          description?: string
          duration_minutes?: number
          ended_at?: string | null
          hls_url?: string | null
          host_id: string
          id?: string
          is_live?: boolean
          practical_currency?: string
          practical_price?: number
          recording_path?: string | null
          room_name: string
          scheduled_end_at?: string | null
          started_at?: string
          teacher_share?: number
          thumbnail_path?: string | null
          topic: string
          updated_at?: string
          viewers_count?: number
        }
        Update: {
          created_at?: string
          current_topic?: string | null
          description?: string
          duration_minutes?: number
          ended_at?: string | null
          hls_url?: string | null
          host_id?: string
          id?: string
          is_live?: boolean
          practical_currency?: string
          practical_price?: number
          recording_path?: string | null
          room_name?: string
          scheduled_end_at?: string | null
          started_at?: string
          teacher_share?: number
          thumbnail_path?: string | null
          topic?: string
          updated_at?: string
          viewers_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "live_classes_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_classroom_views: {
        Row: {
          duration_watched: number
          id: string
          live_session_id: string
          student_id: string
          watched_at: string
        }
        Insert: {
          duration_watched?: number
          id?: string
          live_session_id: string
          student_id: string
          watched_at?: string
        }
        Update: {
          duration_watched?: number
          id?: string
          live_session_id?: string
          student_id?: string
          watched_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_classroom_views_live_session_id_fkey"
            columns: ["live_session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_replays: {
        Row: {
          class_id: string | null
          created_at: string
          duration_seconds: number
          id: string
          teacher_id: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
          views_count: number
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          duration_seconds?: number
          id?: string
          teacher_id: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
          views_count?: number
        }
        Update: {
          class_id?: string | null
          created_at?: string
          duration_seconds?: number
          id?: string
          teacher_id?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "live_replays_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "live_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_replays_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_sessions: {
        Row: {
          created_at: string
          duration_seconds: number | null
          host_id: string
          id: string
          is_live: boolean
          replay_url: string | null
          subject: string | null
          topic: string
          updated_at: string
          viewer_count: number
        }
        Insert: {
          created_at?: string
          duration_seconds?: number | null
          host_id: string
          id?: string
          is_live?: boolean
          replay_url?: string | null
          subject?: string | null
          topic?: string
          updated_at?: string
          viewer_count?: number
        }
        Update: {
          created_at?: string
          duration_seconds?: number | null
          host_id?: string
          id?: string
          is_live?: boolean
          replay_url?: string | null
          subject?: string | null
          topic?: string
          updated_at?: string
          viewer_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "live_sessions_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_signals: {
        Row: {
          created_at: string
          data: Json
          from_id: string
          id: string
          session_id: string
          to_id: string
          type: string
        }
        Insert: {
          created_at?: string
          data: Json
          from_id: string
          id?: string
          session_id: string
          to_id: string
          type: string
        }
        Update: {
          created_at?: string
          data?: Json
          from_id?: string
          id?: string
          session_id?: string
          to_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_signals_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_signals_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_signals_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          chat_id: string | null
          content: string | null
          conversation_id: string | null
          created_at: string
          deleted_for_everyone: boolean
          delivered_at: string | null
          id: string
          is_read: boolean
          media_duration: number | null
          media_name: string | null
          media_path: string | null
          media_type: string | null
          media_url: string | null
          message_type: string
          read_at: string | null
          receiver_id: string | null
          reply_to: string | null
          sender_id: string
        }
        Insert: {
          body?: string
          chat_id?: string | null
          content?: string | null
          conversation_id?: string | null
          created_at?: string
          deleted_for_everyone?: boolean
          delivered_at?: string | null
          id?: string
          is_read?: boolean
          media_duration?: number | null
          media_name?: string | null
          media_path?: string | null
          media_type?: string | null
          media_url?: string | null
          message_type?: string
          read_at?: string | null
          receiver_id?: string | null
          reply_to?: string | null
          sender_id: string
        }
        Update: {
          body?: string
          chat_id?: string | null
          content?: string | null
          conversation_id?: string | null
          created_at?: string
          deleted_for_everyone?: boolean
          delivered_at?: string | null
          id?: string
          is_read?: boolean
          media_duration?: number | null
          media_name?: string | null
          media_path?: string | null
          media_type?: string | null
          media_url?: string | null
          message_type?: string
          read_at?: string | null
          receiver_id?: string | null
          reply_to?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_prefs: {
        Row: {
          chat_enabled: boolean
          created_at: string
          live_enabled: boolean
          preview_enabled: boolean
          sound_enabled: boolean
          updated_at: string
          user_id: string
          vibrate_enabled: boolean
        }
        Insert: {
          chat_enabled?: boolean
          created_at?: string
          live_enabled?: boolean
          preview_enabled?: boolean
          sound_enabled?: boolean
          updated_at?: string
          user_id: string
          vibrate_enabled?: boolean
        }
        Update: {
          chat_enabled?: boolean
          created_at?: string
          live_enabled?: boolean
          preview_enabled?: boolean
          sound_enabled?: boolean
          updated_at?: string
          user_id?: string
          vibrate_enabled?: boolean
        }
        Relationships: []
      }
      partner_tvs: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          live_stream_url: string
          logo_url: string | null
          name: string
          region: string | null
          updated_at: string
          viewer_count: number
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          live_stream_url: string
          logo_url?: string | null
          name: string
          region?: string | null
          updated_at?: string
          viewer_count?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          live_stream_url?: string
          logo_url?: string | null
          name?: string
          region?: string | null
          updated_at?: string
          viewer_count?: number
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          body: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_saves: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_saves_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_saves_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          allow_comments: boolean
          allow_duet: boolean
          allow_save: boolean
          allow_stitch: boolean
          caption: string
          comments_count: number
          created_at: string
          duration_seconds: number | null
          hashtags: string[]
          id: string
          likes_count: number
          media_path: string
          media_type: string
          mentions: string[]
          music_author: string | null
          music_title: string | null
          privacy: string
          saves_count: number
          shares_count: number
          status: string
          thumbnail_path: string | null
          tv_category: string | null
          tv_order: number | null
          tv_type: string | null
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          allow_comments?: boolean
          allow_duet?: boolean
          allow_save?: boolean
          allow_stitch?: boolean
          caption?: string
          comments_count?: number
          created_at?: string
          duration_seconds?: number | null
          hashtags?: string[]
          id?: string
          likes_count?: number
          media_path: string
          media_type?: string
          mentions?: string[]
          music_author?: string | null
          music_title?: string | null
          privacy?: string
          saves_count?: number
          shares_count?: number
          status?: string
          thumbnail_path?: string | null
          tv_category?: string | null
          tv_order?: number | null
          tv_type?: string | null
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          allow_comments?: boolean
          allow_duet?: boolean
          allow_save?: boolean
          allow_stitch?: boolean
          caption?: string
          comments_count?: number
          created_at?: string
          duration_seconds?: number | null
          hashtags?: string[]
          id?: string
          likes_count?: number
          media_path?: string
          media_type?: string
          mentions?: string[]
          music_author?: string | null
          music_title?: string | null
          privacy?: string
          saves_count?: number
          shares_count?: number
          status?: string
          thumbnail_path?: string | null
          tv_category?: string | null
          tv_order?: number | null
          tv_type?: string | null
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_folders: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          completed_projects: number
          created_at: string
          display_name: string
          followers_count: number
          following_count: number
          id: string
          is_verified: boolean
          last_seen: string | null
          likes_count: number
          payment_momo_number: string | null
          payment_momo_provider: string | null
          photo_path: string | null
          posts_count: number
          skill_score: number
          social_links: Json
          updated_at: string
          username: string
          verification_status: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          completed_projects?: number
          created_at?: string
          display_name: string
          followers_count?: number
          following_count?: number
          id: string
          is_verified?: boolean
          last_seen?: string | null
          likes_count?: number
          payment_momo_number?: string | null
          payment_momo_provider?: string | null
          photo_path?: string | null
          posts_count?: number
          skill_score?: number
          social_links?: Json
          updated_at?: string
          username: string
          verification_status?: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          completed_projects?: number
          created_at?: string
          display_name?: string
          followers_count?: number
          following_count?: number
          id?: string
          is_verified?: boolean
          last_seen?: string | null
          likes_count?: number
          payment_momo_number?: string | null
          payment_momo_provider?: string | null
          photo_path?: string | null
          posts_count?: number
          skill_score?: number
          social_links?: Json
          updated_at?: string
          username?: string
          verification_status?: string
          website?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          created_at: string
          id: string
          platform: string
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform?: string
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      replay_access: {
        Row: {
          granted_at: string
          id: string
          replay_id: string
          user_id: string
        }
        Insert: {
          granted_at?: string
          id?: string
          replay_id: string
          user_id: string
        }
        Update: {
          granted_at?: string
          id?: string
          replay_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "replay_access_replay_id_fkey"
            columns: ["replay_id"]
            isOneToOne: false
            referencedRelation: "live_replays"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replay_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_jobs: {
        Row: {
          created_at: string
          id: string
          job_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      skipped_live_classes: {
        Row: {
          class_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      talent_contacts: {
        Row: {
          created_at: string
          phone: string
          talent_profile_id: string
          updated_at: string
          user_id: string
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          phone: string
          talent_profile_id: string
          updated_at?: string
          user_id: string
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          phone?: string
          talent_profile_id?: string
          updated_at?: string
          user_id?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "talent_contacts_talent_profile_id_fkey"
            columns: ["talent_profile_id"]
            isOneToOne: true
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_profiles: {
        Row: {
          age: number | null
          availability: string
          created_at: string
          cv_path: string | null
          description: string
          expertise: string
          face_path: string | null
          face_verified: boolean
          gender: string
          id: string
          is_paid: boolean
          landmark: string | null
          location_name: string
          negotiable: boolean
          paid_at: string | null
          rate_amount: number
          rate_currency: string
          rate_period: string
          region: string | null
          review_status: string
          skills: string[]
          town: string | null
          updated_at: string
          user_id: string
          video_paths: string[]
          views_count: number
          years_experience: number
        }
        Insert: {
          age?: number | null
          availability?: string
          created_at?: string
          cv_path?: string | null
          description: string
          expertise: string
          face_path?: string | null
          face_verified?: boolean
          gender?: string
          id?: string
          is_paid?: boolean
          landmark?: string | null
          location_name: string
          negotiable?: boolean
          paid_at?: string | null
          rate_amount: number
          rate_currency?: string
          rate_period: string
          region?: string | null
          review_status?: string
          skills?: string[]
          town?: string | null
          updated_at?: string
          user_id: string
          video_paths?: string[]
          views_count?: number
          years_experience?: number
        }
        Update: {
          age?: number | null
          availability?: string
          created_at?: string
          cv_path?: string | null
          description?: string
          expertise?: string
          face_path?: string | null
          face_verified?: boolean
          gender?: string
          id?: string
          is_paid?: boolean
          landmark?: string | null
          location_name?: string
          negotiable?: boolean
          paid_at?: string | null
          rate_amount?: number
          rate_currency?: string
          rate_period?: string
          region?: string | null
          review_status?: string
          skills?: string[]
          town?: string | null
          updated_at?: string
          user_id?: string
          video_paths?: string[]
          views_count?: number
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "talent_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_unlocks: {
        Row: {
          created_at: string
          employer_id: string
          id: string
          talent_profile_id: string
        }
        Insert: {
          created_at?: string
          employer_id: string
          id?: string
          talent_profile_id: string
        }
        Update: {
          created_at?: string
          employer_id?: string
          id?: string
          talent_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_unlocks_talent_profile_id_fkey"
            columns: ["talent_profile_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_verification_applications: {
        Row: {
          certificate_path: string | null
          created_at: string
          cv_path: string | null
          evidence_option: string | null
          fee_reference: string | null
          findmit_user_id: string | null
          full_name: string | null
          ghana_card: string | null
          id: string
          learning_pathway: string | null
          location_name: string | null
          master_trainer: string | null
          phone: string | null
          photo_paths: string[]
          projects: string
          reason: string
          review_note: string | null
          short_bio: string | null
          skill_trade: string | null
          status: string
          updated_at: string
          user_id: string
          video1_path: string | null
          video2_path: string | null
          years_experience: string | null
        }
        Insert: {
          certificate_path?: string | null
          created_at?: string
          cv_path?: string | null
          evidence_option?: string | null
          fee_reference?: string | null
          findmit_user_id?: string | null
          full_name?: string | null
          ghana_card?: string | null
          id?: string
          learning_pathway?: string | null
          location_name?: string | null
          master_trainer?: string | null
          phone?: string | null
          photo_paths?: string[]
          projects?: string
          reason?: string
          review_note?: string | null
          short_bio?: string | null
          skill_trade?: string | null
          status?: string
          updated_at?: string
          user_id: string
          video1_path?: string | null
          video2_path?: string | null
          years_experience?: string | null
        }
        Update: {
          certificate_path?: string | null
          created_at?: string
          cv_path?: string | null
          evidence_option?: string | null
          fee_reference?: string | null
          findmit_user_id?: string | null
          full_name?: string | null
          ghana_card?: string | null
          id?: string
          learning_pathway?: string | null
          location_name?: string | null
          master_trainer?: string | null
          phone?: string | null
          photo_paths?: string[]
          projects?: string
          reason?: string
          review_note?: string | null
          short_bio?: string | null
          skill_trade?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          video1_path?: string | null
          video2_path?: string | null
          years_experience?: string | null
        }
        Relationships: []
      }
      tv_channels: {
        Row: {
          category: string
          created_at: string
          host_id: string | null
          id: string
          is_live: boolean
          scheduled_start: string | null
          started_at: string | null
          subject: string
          total_seconds: number
          updated_at: string
          viewers_seed: number
        }
        Insert: {
          category: string
          created_at?: string
          host_id?: string | null
          id?: string
          is_live?: boolean
          scheduled_start?: string | null
          started_at?: string | null
          subject?: string
          total_seconds?: number
          updated_at?: string
          viewers_seed?: number
        }
        Update: {
          category?: string
          created_at?: string
          host_id?: string | null
          id?: string
          is_live?: boolean
          scheduled_start?: string | null
          started_at?: string | null
          subject?: string
          total_seconds?: number
          updated_at?: string
          viewers_seed?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_view_replay: {
        Args: { _replay_id: string; _user_id: string }
        Returns: boolean
      }
      has_paid_job_post: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_partner_tv_viewers: {
        Args: { _id: string }
        Returns: undefined
      }
      increment_post_view: { Args: { _post_id: string }; Returns: undefined }
      increment_talent_view: {
        Args: { _talent_profile_id: string }
        Returns: undefined
      }
      is_chat_member: {
        Args: { _chat_id: string; _user_id: string }
        Returns: boolean
      }
      is_conversation_member: {
        Args: { _conversation_id: string; _user_id: string }
        Returns: boolean
      }
      is_super_admin: { Args: never; Returns: boolean }
      owns_replay: {
        Args: { _replay_id: string; _user_id: string }
        Returns: boolean
      }
      unlock_talent_contact: {
        Args: { _talent_profile_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "teacher"],
    },
  },
} as const
