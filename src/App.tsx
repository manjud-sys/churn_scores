import { useState } from 'react';
import { CustomerList } from './components/CustomerList';
import { CustomerDetailPage } from './components/CustomerDetailPage';
import { Customer } from './lib/supabase';

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  if (selectedCustomer) {
    return (
      <CustomerDetailPage
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
      />
    );
  }

  return <CustomerList onSelectCustomer={setSelectedCustomer} />;
}

export default App;
