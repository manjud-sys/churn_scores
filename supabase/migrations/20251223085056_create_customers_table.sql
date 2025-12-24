/*
  # Create customers table with churn scores

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `company_name` (text) - Customer company name
      - `contact_name` (text) - Contact person name
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone number
      - `subscription_status` (text) - ACTIVE, CANCELLED, etc.
      - `subscription_plan` (text) - Plan name
      - `subscription_amount` (numeric) - Subscription amount
      - `currency` (text) - Currency code
      - `net_payment` (numeric) - Total payment amount
      - `total_unpaid` (numeric) - Unpaid amount
      - `churn_score` (numeric) - Churn probability score (0-100)
      - `billing_address` (text) - Billing address
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `customers` table
    - Add policy for authenticated users to read all customers
    - Add policy for authenticated users to insert customers
    - Add policy for authenticated users to update customers
    - Add policy for authenticated users to delete customers
*/

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subscription_status text DEFAULT 'ACTIVE',
  subscription_plan text,
  subscription_amount numeric DEFAULT 0,
  currency text DEFAULT 'INR',
  net_payment numeric DEFAULT 0,
  total_unpaid numeric DEFAULT 0,
  churn_score numeric DEFAULT 0 CHECK (churn_score >= 0 AND churn_score <= 100),
  billing_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert customers"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update customers"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete customers"
  ON customers
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO customers (company_name, contact_name, email, phone, subscription_status, subscription_plan, subscription_amount, currency, net_payment, total_unpaid, churn_score, created_at)
VALUES 
  ('Greenplus Enterprises', 'Douglas Quaid', 'douglas_AT_test.com@example.com', '2344903756', 'INACTIVE', NULL, 0, 'INR', 0, 0, 75, '2024-10-30 11:17:00'),
  ('Zencorporation', 'Richard Hendricks', 'richard_AT_test.com@example.com', '1155685961', 'ACTIVE', 'Standard INR Yearly', 7500.00, 'INR', 28300.00, 0, 25, '2024-10-30 11:17:00'),
  ('Iselectrics', 'Tyler Durden', 'tyler_AT_test.com@example.com', '4141538473', 'ACTIVE', 'Advanced INR Yearly', 7500.00, 'INR', 5300.00, 270.00, 65, '2024-10-30 11:17:00'),
  ('Goodsilron Ltd', 'Carol Miller', 'carol_AT_test.com@example.com', '8065829176', 'CANCELLED', 'Basic INR Monthly', 400.00, 'INR', 400.00, 0, 95, '2024-10-30 11:17:00'),
  ('Openlane Ltd', 'Simon Masrani', 'simon_AT_test.com@example.com', NULL, 'ACTIVE', 'Lite INR Monthly', 500.00, 'INR', 10400.00, 0, 15, '2024-10-30 11:17:00')
ON CONFLICT DO NOTHING;
