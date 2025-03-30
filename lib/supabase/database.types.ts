// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Json = string | number | boolean | null | { [key: string]: any | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      generations: {
        Row: {
          created_at: string
          id: string
          image: string | null
          output: string | null
          progress: number | null
          prompt: string | null
          success: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          image?: string | null
          output?: string | null
          progress?: number | null
          prompt?: string | null
          success?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          output?: string | null
          progress?: number | null
          prompt?: string | null
          success?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      moderations: {
        Row: {
          created_at: string
          flagged: boolean
          generation_id: string
          harassment: boolean
          'harassment/threatening': boolean
          hate: boolean
          'hate/threatening': boolean
          id: string
          illicit: boolean | null
          'illicit/violent': boolean | null
          scores: Json
          'self-harm': boolean
          'self-harm/instructions': boolean
          'self-harm/intent': boolean
          sexual: boolean
          'sexual/minors': boolean
          violence: boolean
          'violence/graphic': boolean
        }
        Insert: {
          created_at?: string
          flagged: boolean
          generation_id: string
          harassment: boolean
          'harassment/threatening': boolean
          hate: boolean
          'hate/threatening': boolean
          id: string
          illicit?: boolean | null
          'illicit/violent'?: boolean | null
          scores: Json
          'self-harm': boolean
          'self-harm/instructions': boolean
          'self-harm/intent': boolean
          sexual: boolean
          'sexual/minors': boolean
          violence: boolean
          'violence/graphic': boolean
        }
        Update: {
          created_at?: string
          flagged?: boolean
          generation_id?: string
          harassment?: boolean
          'harassment/threatening'?: boolean
          hate?: boolean
          'hate/threatening'?: boolean
          id?: string
          illicit?: boolean | null
          'illicit/violent'?: boolean | null
          scores?: Json
          'self-harm'?: boolean
          'self-harm/instructions'?: boolean
          'self-harm/intent'?: boolean
          sexual?: boolean
          'sexual/minors'?: boolean
          violence?: boolean
          'violence/graphic'?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'moderations_generation_id_fkey'
            columns: ['generation_id']
            isOneToOne: false
            referencedRelation: 'generations'
            referencedColumns: ['id']
          }
        ]
      }
      replicates: {
        Row: {
          completed_at: string | null
          created_at: string
          error: string | null
          generation_id: string
          id: string
          input: Json
          model: string
          predict_time: number | null
          progress: number | null
          started_at: string | null
          status: string
          version: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error?: string | null
          generation_id: string
          id: string
          input: Json
          model: string
          predict_time?: number | null
          progress?: number | null
          started_at?: string | null
          status: string
          version: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error?: string | null
          generation_id?: string
          id?: string
          input?: Json
          model?: string
          predict_time?: number | null
          progress?: number | null
          started_at?: string | null
          status?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 'replicates_generation_id_fkey'
            columns: ['generation_id']
            isOneToOne: false
            referencedRelation: 'generations'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          image: string | null
          name: string | null
          stripe_id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          image?: string | null
          name?: string | null
          stripe_id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          image?: string | null
          name?: string | null
          stripe_id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_username: {
        Args: {
          email: string
        }
        Returns: string
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

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
