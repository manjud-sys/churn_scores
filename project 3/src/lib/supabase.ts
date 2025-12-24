import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Customer {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  subscription_status: string;
  subscription_plan: string | null;
  subscription_amount: number;
  currency: string;
  net_payment: number;
  total_unpaid: number;
  churn_score: number;
  billing_address: string | null;
  created_at: string;
  updated_at: string;
}
