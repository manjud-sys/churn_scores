import { useState } from 'react';
import { X, Download } from 'lucide-react';
import { Customer } from '../lib/supabase';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
}

export function ExportDialog({ isOpen, onClose, customers }: ExportDialogProps) {
  const [churnScoreMin, setChurnScoreMin] = useState<number>(0);
  const [churnScoreMax, setChurnScoreMax] = useState<number>(100);

  if (!isOpen) return null;

  const handleExport = () => {
    const filteredCustomers = customers.filter(
      customer => customer.churn_score >= churnScoreMin && customer.churn_score <= churnScoreMax
    );

    const csvHeaders = [
      'Company Name',
      'Contact Name',
      'Email',
      'Phone',
      'Subscription Status',
      'Subscription Plan',
      'Subscription Amount',
      'Currency',
      'Net Payment',
      'Total Unpaid',
      'Churn Score',
      'Billing Address',
      'Created At'
    ];

    const csvRows = filteredCustomers.map(customer => [
      customer.company_name,
      customer.contact_name,
      customer.email,
      customer.phone || '',
      customer.subscription_status,
      customer.subscription_plan || '',
      customer.subscription_amount,
      customer.currency,
      customer.net_payment,
      customer.total_unpaid,
      customer.churn_score,
      customer.billing_address || '',
      new Date(customer.created_at).toLocaleString()
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Export Customers</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Churn Score Range
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Min Score</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={churnScoreMin}
                  onChange={(e) => setChurnScoreMin(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max Score</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={churnScoreMax}
                  onChange={(e) => setChurnScoreMax(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              {customers.filter(c => c.churn_score >= churnScoreMin && c.churn_score <= churnScoreMax).length} of {customers.length} customers will be exported
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
