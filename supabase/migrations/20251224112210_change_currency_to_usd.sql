/*
  # Change currency from INR to USD

  1. Changes
    - Update default currency from 'INR' to 'USD' on customers table
    - Update all existing customer records to use 'USD' instead of 'INR'

  2. Notes
    - This is a data migration that changes currency display values
    - Does not convert monetary amounts (keeps same numerical values)
*/

ALTER TABLE customers ALTER COLUMN currency SET DEFAULT 'USD';

UPDATE customers SET currency = 'USD' WHERE currency = 'INR';
