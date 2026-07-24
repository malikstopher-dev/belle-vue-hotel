export interface Database {
  public: {
    Tables: {
      site_content: {
        Row: {
          id: string;
          key: string;
          locale: string;
          section: string;
          value: Record<string, unknown>;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          locale: string;
          section: string;
          value: Record<string, unknown>;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          locale?: string;
          section?: string;
          value?: Record<string, unknown>;
          updated_at?: string;
        };
      };
      rooms: {
        Row: {
          id: string;
          name: string;
          name_fr: string | null;
          name_pt: string | null;
          description: string | null;
          description_fr: string | null;
          description_pt: string | null;
          price: number | null;
          currency: string;
          size: number | null;
          max_guests: number;
          bed_type: string | null;
          amenities: string[];
          images: string[];
          featured: boolean;
          slug: string | null;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          price?: number | null;
          currency?: string;
          size?: number | null;
          max_guests?: number;
          bed_type?: string | null;
          amenities?: string[];
          images?: string[];
          featured?: boolean;
          slug?: string | null;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          price?: number | null;
          currency?: string;
          size?: number | null;
          max_guests?: number;
          bed_type?: string | null;
          amenities?: string[];
          images?: string[];
          featured?: boolean;
          slug?: string | null;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_categories: {
        Row: {
          id: string;
          name: string;
          name_fr: string | null;
          name_pt: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          name_fr?: string | null;
          name_pt?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_fr?: string | null;
          name_pt?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          name_fr: string | null;
          name_pt: string | null;
          description: string | null;
          description_fr: string | null;
          description_pt: string | null;
          price: number | null;
          dietary: string[];
          image: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id: string;
          category_id: string;
          name: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          price?: number | null;
          dietary?: string[];
          image?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          price?: number | null;
          dietary?: string[];
          image?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      spa_treatments: {
        Row: {
          id: string;
          name: string;
          name_fr: string | null;
          name_pt: string | null;
          description: string | null;
          description_fr: string | null;
          description_pt: string | null;
          duration: number | null;
          price: number | null;
          category: string | null;
          image: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          duration?: number | null;
          price?: number | null;
          category?: string | null;
          image?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          duration?: number | null;
          price?: number | null;
          category?: string | null;
          image?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          name: string;
          name_fr: string | null;
          name_pt: string | null;
          description: string | null;
          description_fr: string | null;
          description_pt: string | null;
          price: number | null;
          duration: string | null;
          image: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          price?: number | null;
          duration?: string | null;
          image?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_fr?: string | null;
          name_pt?: string | null;
          description?: string | null;
          description_fr?: string | null;
          description_pt?: string | null;
          price?: number | null;
          duration?: string | null;
          image?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          country: string | null;
          rating: number;
          text: string | null;
          text_fr: string | null;
          text_pt: string | null;
          date: string | null;
          avatar: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          country?: string | null;
          rating?: number;
          text?: string | null;
          text_fr?: string | null;
          text_pt?: string | null;
          date?: string | null;
          avatar?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          country?: string | null;
          rating?: number;
          text?: string | null;
          text_fr?: string | null;
          text_pt?: string | null;
          date?: string | null;
          avatar?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          url: string;
          alt_text: string;
          file_name: string;
          file_size: number;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          alt_text?: string;
          file_name?: string;
          file_size?: number;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          alt_text?: string;
          file_name?: string;
          file_size?: number;
          uploaded_at?: string;
        };
      };
    };
  };
}
