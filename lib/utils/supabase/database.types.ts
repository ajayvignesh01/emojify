export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bybit_orders: {
        Row: {
          account_name: string
          category: string
          closedSize: number | null
          execCount: number
          execFee: number
          execPrice: number
          execQty: number
          execTime: string
          execType: string
          execValue: number
          feeRate: number
          isMaker: boolean
          markPrice: number
          orderId: string
          orderPrice: number
          orderQty: number
          orderType: string
          side: string
          stopOrderType: string | null
          symbol: string
          tradeloop_eid: string
          user_id: string
        }
        Insert: {
          account_name: string
          category: string
          closedSize?: number | null
          execCount: number
          execFee: number
          execPrice: number
          execQty: number
          execTime: string
          execType: string
          execValue: number
          feeRate: number
          isMaker: boolean
          markPrice: number
          orderId: string
          orderPrice: number
          orderQty: number
          orderType: string
          side: string
          stopOrderType?: string | null
          symbol: string
          tradeloop_eid: string
          user_id?: string
        }
        Update: {
          account_name?: string
          category?: string
          closedSize?: number | null
          execCount?: number
          execFee?: number
          execPrice?: number
          execQty?: number
          execTime?: string
          execType?: string
          execValue?: number
          feeRate?: number
          isMaker?: boolean
          markPrice?: number
          orderId?: string
          orderPrice?: number
          orderQty?: number
          orderType?: string
          side?: string
          stopOrderType?: string | null
          symbol?: string
          tradeloop_eid?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bybit_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          created_now: string | null
          id: string
          payload: Json
          user_id: string
        }
        Insert: {
          created_now?: string | null
          id: string
          payload: Json
          user_id?: string
        }
        Update: {
          created_now?: string | null
          id?: string
          payload?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cmc_map: {
        Row: {
          first_historical_data: string
          id: number
          is_active: boolean
          last_historical_data: string
          name: string
          platform: Json | null
          rank: number
          slug: string
          symbol: string
        }
        Insert: {
          first_historical_data: string
          id: number
          is_active: boolean
          last_historical_data: string
          name: string
          platform?: Json | null
          rank: number
          slug: string
          symbol: string
        }
        Update: {
          first_historical_data?: string
          id?: number
          is_active?: boolean
          last_historical_data?: string
          name?: string
          platform?: Json | null
          rank?: number
          slug?: string
          symbol?: string
        }
        Relationships: []
      }
      logos_map: {
        Row: {
          created_at: string | null
          id: number
          symbol: string
        }
        Insert: {
          created_at?: string | null
          id: number
          symbol: string
        }
        Update: {
          created_at?: string | null
          id?: number
          symbol?: string
        }
        Relationships: []
      }
      user_exchanges: {
        Row: {
          bybit1: Json
          bybit2: Json
          bybit3: Json
          bybit4: Json
          bybit5: Json
          user_id: string
        }
        Insert: {
          bybit1?: Json
          bybit2?: Json
          bybit3?: Json
          bybit4?: Json
          bybit5?: Json
          user_id?: string
        }
        Update: {
          bybit1?: Json
          bybit2?: Json
          bybit3?: Json
          bybit4?: Json
          bybit5?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_exchanges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notes: {
        Row: {
          created_at: string
          note: Json
          trade_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          note: Json
          trade_id: string
          updated_at: string
          user_id?: string
        }
        Update: {
          created_at?: string
          note?: Json
          trade_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_trades: {
        Row: {
          account_name: string
          average_entry: number
          average_exit: number
          category: string
          close_time: string
          fee: number
          funding: number
          open_time: string
          order_count: number
          orders: Json[]
          quantity: number
          realized_pnl: number
          side: string
          symbol: string
          trade_id: string
          tradeloop_eid: string
          user_id: string
          value: number
        }
        Insert: {
          account_name: string
          average_entry: number
          average_exit: number
          category: string
          close_time: string
          fee: number
          funding: number
          open_time: string
          order_count: number
          orders: Json[]
          quantity: number
          realized_pnl: number
          side: string
          symbol: string
          trade_id: string
          tradeloop_eid: string
          user_id?: string
          value: number
        }
        Update: {
          account_name?: string
          average_entry?: number
          average_exit?: number
          category?: string
          close_time?: string
          fee?: number
          funding?: number
          open_time?: string
          order_count?: number
          orders?: Json[]
          quantity?: number
          realized_pnl?: number
          side?: string
          symbol?: string
          trade_id?: string
          tradeloop_eid?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_trades_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      count_trades: {
        Args: {
          trade_ids: string[]
        }
        Returns: number
      }
      get_best_ranked_symbols: {
        Args: {
          symbol_array: Json
        }
        Returns: {
          id: number
          rank: number
          name: string
          symbol: string
          slug: string
          is_active: boolean
          first_historical_data: string
          last_historical_data: string
          platform: Json
        }[]
      }
      get_exchanges: {
        Args: {
          user_id: string
        }
        Returns: {
          bybit1: Json
          bybit2: Json
          bybit3: Json
          bybit4: Json
          bybit5: Json
        }[]
      }
      get_logos: {
        Args: {
          symbols: Json
        }
        Returns: {
          id: number
          symbol: string
        }[]
      }
      get_user_exchanges: {
        Args: {
          user_id: string
        }
        Returns: {
          bybit1: Json
          bybit2: Json
          bybit3: Json
          bybit4: Json
          bybit5: Json
        }[]
      }
      use_user_trades: {
        Args: {
          trade_ids: string[]
          page: number
        }
        Returns: {
          account_name: string
          average_entry: number
          average_exit: number
          category: string
          close_time: string
          fee: number
          funding: number
          open_time: string
          order_count: number
          orders: Json[]
          quantity: number
          realized_pnl: number
          side: string
          symbol: string
          trade_id: string
          tradeloop_eid: string
          user_id: string
          value: number
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
