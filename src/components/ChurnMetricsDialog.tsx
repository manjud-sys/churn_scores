import { X, TrendingUp, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { Customer } from '../lib/supabase';

interface ChurnMetricsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
}

export function ChurnMetricsDialog({ isOpen, onClose, customers }: ChurnMetricsDialogProps) {
  if (!isOpen) return null;

  const highRisk = customers.filter(c => c.churn_score >= 75);
  const mediumRisk = customers.filter(c => c.churn_score >= 50 && c.churn_score < 75);
  const lowRisk = customers.filter(c => c.churn_score >= 25 && c.churn_score < 50);
  const veryLowRisk = customers.filter(c => c.churn_score < 25);

  const totalRevenue = customers.reduce((sum, c) => sum + c.net_payment, 0);
  const atRiskRevenue = customers
    .filter(c => c.churn_score >= 50)
    .reduce((sum, c) => sum + c.net_payment, 0);

  const averageChurnScore = customers.length > 0
    ? customers.reduce((sum, c) => sum + c.churn_score, 0) / customers.length
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Churn Score Analytics</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-blue-600 font-medium mb-1">Average Churn Score</div>
            <div className="text-3xl font-bold text-blue-900">{averageChurnScore.toFixed(1)}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="text-sm text-purple-600 font-medium mb-1">At-Risk Revenue</div>
            <div className="text-3xl font-bold text-purple-900">${(atRiskRevenue / 1000).toFixed(1)}K</div>
            <div className="text-xs text-purple-600 mt-1">
              {((atRiskRevenue / totalRevenue) * 100).toFixed(1)}% of total
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-red-900">High Risk</div>
                  <div className="text-sm text-red-600">Churn Score: 75-100%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-900">{highRisk.length}</div>
                <div className="text-sm text-red-600">customers</div>
              </div>
            </div>
            {highRisk.length > 0 && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <div className="text-sm text-red-700">
                  Revenue at risk: <span className="font-semibold">${highRisk.reduce((sum, c) => sum + c.net_payment, 0).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="text-orange-600" size={24} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-orange-900">Medium Risk</div>
                  <div className="text-sm text-orange-600">Churn Score: 50-74%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-900">{mediumRisk.length}</div>
                <div className="text-sm text-orange-600">customers</div>
              </div>
            </div>
            {mediumRisk.length > 0 && (
              <div className="mt-3 pt-3 border-t border-orange-200">
                <div className="text-sm text-orange-700">
                  Revenue at risk: <span className="font-semibold">${mediumRisk.reduce((sum, c) => sum + c.net_payment, 0).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <AlertTriangle className="text-yellow-600" size={24} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-yellow-900">Low Risk</div>
                  <div className="text-sm text-yellow-600">Churn Score: 25-49%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-900">{lowRisk.length}</div>
                <div className="text-sm text-yellow-600">customers</div>
              </div>
            </div>
            {lowRisk.length > 0 && (
              <div className="mt-3 pt-3 border-t border-yellow-200">
                <div className="text-sm text-yellow-700">
                  Total revenue: <span className="font-semibold">${lowRisk.reduce((sum, c) => sum + c.net_payment, 0).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-900">Very Low Risk</div>
                  <div className="text-sm text-green-600">Churn Score: 0-24%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-900">{veryLowRisk.length}</div>
                <div className="text-sm text-green-600">customers</div>
              </div>
            </div>
            {veryLowRisk.length > 0 && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <div className="text-sm text-green-700">
                  Total revenue: <span className="font-semibold">${veryLowRisk.reduce((sum, c) => sum + c.net_payment, 0).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
