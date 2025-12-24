import { useEffect, useState } from 'react';
import { Search, ChevronDown, MoreVertical, Download, TrendingUp } from 'lucide-react';
import { supabase, Customer } from '../lib/supabase';
import { ExportDialog } from './ExportDialog';
import { ChurnMetricsDialog } from './ChurnMetricsDialog';

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomerList({ onSelectCustomer }: CustomerListProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isChurnMetricsDialogOpen, setIsChurnMetricsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChurnScoreColor = (score: number) => {
    if (score >= 75) return 'text-red-600 bg-red-50';
    if (score >= 50) return 'text-orange-600 bg-orange-50';
    if (score >= 25) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getChurnRiskLabel = (score: number) => {
    if (score >= 75) return 'High Risk';
    if (score >= 50) return 'Medium Risk';
    if (score >= 25) return 'Low Risk';
    return 'Very Low Risk';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
              <span className="text-sm text-gray-500">{customers.length} Customers</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Import Customers
              </button>
              <button
                onClick={() => setIsChurnMetricsDialogOpen(true)}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-1.5 text-sm"
              >
                <TrendingUp size={14} />
                <span>Churn scores</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Create Customer
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for ID / Name / Company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsExportDialogOpen(true)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Export</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Churn Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billing Address
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span
                        onClick={() => onSelectCustomer(customer)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {customer.company_name}
                      </span>
                      <span className="text-sm text-gray-600">{customer.contact_name}</span>
                      <span className="text-sm text-gray-500">{customer.email}</span>
                      {customer.phone && (
                        <span className="text-sm text-gray-500">{customer.phone}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {customer.subscription_plan ? (
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(customer.subscription_status)}`}>
                            {customer.subscription_status}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900">{customer.subscription_plan}</span>
                        <span className="text-sm text-gray-600">
                          ${customer.subscription_amount.toLocaleString()} {customer.currency} / yr
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className={`px-3 py-1.5 rounded-md font-semibold text-sm ${getChurnScoreColor(customer.churn_score)}`}>
                        {customer.churn_score}%
                      </div>
                      <span className="text-xs text-gray-500">
                        {getChurnRiskLabel(customer.churn_score)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {customer.net_payment.toLocaleString()} {customer.currency}
                      </span>
                      {customer.total_unpaid > 0 && (
                        <span className="text-sm text-red-600">
                          ${customer.total_unpaid.toLocaleString()} {customer.currency}
                          <div className="text-xs text-gray-500">(Total unpaid)</div>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {new Date(customer.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}{' '}
                      {new Date(customer.created_at).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {customer.billing_address || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportDialog
        isOpen={isExportDialogOpen}
        onClose={() => setIsExportDialogOpen(false)}
        customers={filteredCustomers}
      />

      <ChurnMetricsDialog
        isOpen={isChurnMetricsDialogOpen}
        onClose={() => setIsChurnMetricsDialogOpen(false)}
        customers={customers}
      />
    </div>
  );
}
