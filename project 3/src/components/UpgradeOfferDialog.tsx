import { X, Sparkles, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UpgradeOfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UpgradeOffer {
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  discount: string;
  features: string[];
  badge: string;
  buttonText: string;
}

const upgradeOffers: UpgradeOffer[] = [
  {
    title: 'Enterprise Plan',
    subtitle: 'Unlock unlimited potential',
    price: '$299',
    originalPrice: '$499',
    discount: '40% OFF',
    badge: 'Most Popular',
    buttonText: 'Upgrade to Enterprise',
    features: [
      'Unlimited customer records',
      'Advanced analytics & reporting',
      'Priority 24/7 support',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced security features'
    ]
  },
  {
    title: 'Professional Plan',
    subtitle: 'Perfect for growing businesses',
    price: '$149',
    originalPrice: '$249',
    discount: '40% OFF',
    badge: 'Best Value',
    buttonText: 'Upgrade to Professional',
    features: [
      'Up to 10,000 customers',
      'Enhanced analytics',
      'Email & chat support',
      'API access',
      'Custom reports',
      'Team collaboration tools'
    ]
  },
  {
    title: 'Premium Plus',
    subtitle: 'Maximum performance and features',
    price: '$399',
    originalPrice: '$599',
    discount: '33% OFF',
    badge: 'Limited Time',
    buttonText: 'Claim Premium Plus',
    features: [
      'Everything in Enterprise',
      'White-label solution',
      'Custom feature development',
      'On-premise deployment option',
      'SLA guarantee',
      'Advanced AI-powered insights'
    ]
  },
  {
    title: 'Growth Plan',
    subtitle: 'Scale your business efficiently',
    price: '$199',
    originalPrice: '$299',
    discount: '33% OFF',
    badge: 'Recommended',
    buttonText: 'Upgrade to Growth',
    features: [
      'Up to 5,000 customers',
      'Standard analytics',
      'Email support',
      'Basic API access',
      'Monthly reports',
      'Multi-user access'
    ]
  }
];

export function UpgradeOfferDialog({ isOpen, onClose }: UpgradeOfferDialogProps) {
  const [selectedOffer, setSelectedOffer] = useState<UpgradeOffer>(upgradeOffers[0]);

  useEffect(() => {
    if (isOpen) {
      const randomOffer = upgradeOffers[Math.floor(Math.random() * upgradeOffers.length)];
      setSelectedOffer(randomOffer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
            <Sparkles className="text-white" size={40} />
          </div>
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
            {selectedOffer.badge}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedOffer.title}</h2>
          <p className="text-gray-600 text-lg">{selectedOffer.subtitle}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-6 border border-blue-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <span className="text-gray-500 line-through text-2xl">{selectedOffer.originalPrice}</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {selectedOffer.discount}
              </span>
            </div>
            <div className="text-5xl font-bold text-blue-900 mb-1">
              {selectedOffer.price}
              <span className="text-2xl text-gray-600">/month</span>
            </div>
            <p className="text-blue-700 text-sm">Special upgrade offer - Limited time only!</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h3>
          <div className="space-y-3">
            {selectedOffer.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="text-green-600" size={16} />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Maybe Later
          </button>
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg flex items-center justify-center space-x-2">
            <Sparkles size={18} />
            <span>{selectedOffer.buttonText}</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          No commitment required. Cancel anytime within 30 days for a full refund.
        </p>
      </div>
    </div>
  );
}
