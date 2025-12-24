import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Customer } from '../lib/supabase';
import { OfferBanner } from './OfferBanner';
import { UpgradeOfferDialog } from './UpgradeOfferDialog';

interface CustomerDetailPageProps {
  customer: Customer;
  onBack: () => void;
}

export function CustomerDetailPage({ customer, onBack }: CustomerDetailPageProps) {
  const [activeSection, setActiveSection] = useState('summary');
  const [showOfferBanner, setShowOfferBanner] = useState(true);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const menuItems = [
    { id: 'summary', label: 'Summary' },
    { id: 'customer-config', label: 'Customer Config...' },
    { id: 'tax-details', label: 'Tax Details' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'billing-address', label: 'Billing Address' },
    { id: 'additional-contacts', label: 'Additional Cont...' },
    { id: 'payment-methods', label: 'Payment Metho...' },
    { id: 'unbilled-charges', label: 'Unbilled Charges' },
    { id: 'invoice-note', label: 'Invoice Note' },
    { id: 'history', label: 'History' },
    { id: 'comments', label: 'Comments' },
    { id: 'activity-log', label: 'Activity Log' },
  ];

  const [firstName, lastName] = customer.contact_name.split(' ');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Back to Customers</span>
          </button>
        </div>
      </div>

      {showOfferBanner && (
        <OfferBanner
          onClose={() => setShowOfferBanner(false)}
          onClaimUpgrade={() => setShowUpgradeDialog(true)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          <aside className="w-56 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    activeSection === item.id ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">
                  {customer.company_name}
                </h1>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-x-24 gap-y-6">
                    <div className="flex py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700 w-32">ID</span>
                      <span className="text-sm text-gray-900">cbdemo_{customer.contact_name.toLowerCase().split(' ')[0]}</span>
                    </div>

                    <div className="flex py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700 w-32">Company</span>
                      <span className="text-sm text-gray-900">{customer.company_name}</span>
                    </div>

                    <div className="flex py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700 w-32">First Name</span>
                      <span className="text-sm text-gray-900">{firstName}</span>
                    </div>

                    <div className="flex py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700 w-32">Last Name</span>
                      <span className="text-sm text-gray-900">{lastName || ''}</span>
                    </div>

                    <div className="flex py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700 w-32">Email ID</span>
                      <span className="text-sm text-gray-900">{customer.email}</span>
                    </div>

                    <div className="flex py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700 w-32">Phone</span>
                      <span className="text-sm text-gray-900">{customer.phone || '—'}</span>
                    </div>

                    <div className="flex py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700 w-32">JSON Metadata</span>
                      <button className="text-sm text-blue-600 hover:underline">Add</button>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-semibold text-gray-900">$0.00</span>
                        <span className="text-sm text-gray-500">USD</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Total amount due</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-semibold text-gray-900">$0.00</span>
                        <span className="text-sm text-gray-500">USD</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">No upcoming payments</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Configurations</h2>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <aside className="w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Edit Customer
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Clear Personal Data
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Subscription Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5 flex items-center justify-between group">
                    <span>Create New Subscription</span>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Billing Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Request Payment Method Update
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Add Billing Info
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5 flex items-center justify-between group">
                    <span>Add One-Time Charges and Quick Charges</span>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Add Charge
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Create Quick Charge
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Manage Credits
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1.5">
                    Record an Offline Payment
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button className="w-full text-left text-sm text-red-600 hover:text-red-700 py-1.5">
                  Delete Customer
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <UpgradeOfferDialog
        isOpen={showUpgradeDialog}
        onClose={() => setShowUpgradeDialog(false)}
      />
    </div>
  );
}
