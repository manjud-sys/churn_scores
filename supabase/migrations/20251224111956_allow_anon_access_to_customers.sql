/*
  # Allow anonymous access to customers table

  1. Changes
    - Add RLS policies for anonymous (anon) users to read customers
    - This allows the app to display customer data without authentication

  2. Security
    - Anonymous users can read all customer data
    - Only authenticated users can insert, update, or delete
*/

CREATE POLICY "Anonymous users can read all customers"
  ON customers
  FOR SELECT
  TO anon
  USING (true);
