import { X, Sparkles } from 'lucide-react';

interface OfferBannerProps {
  onClose: () => void;
  onClaimUpgrade: () => void;
}

export function OfferBanner({ onClose, onClaimUpgrade }: OfferBannerProps) {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                <Sparkles className="text-blue-600" size={40} />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-white text-base leading-relaxed">
                We want to upgrade you to our Enterprise Plan free of charge so you can get all the value you need from Brightback!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close offer banner"
            >
              <X className="text-gray-400 hover:text-white" size={20} />
            </button>
            <button
              onClick={onClaimUpgrade}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
            >
              <Sparkles size={18} />
              <span>Claim Upgrade</span>
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
