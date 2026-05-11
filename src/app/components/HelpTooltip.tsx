import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  currentStep: string;
}

export default function HelpTooltip({ currentStep }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const getHelpText = () => {
    switch (currentStep) {
      case 'initial':
        return 'Choose "Good" if your needs feel met right now, or "Bad" if they feel unmet. This helps us understand your emotional starting point.';
      case 'categories':
        return 'Select up to 3 broad emotion categories that best describe how you\'re feeling. These will help us get more specific.';
      case 'specific':
        return 'Choose up to 3 specific emotions from the categories you selected. Pick the ones that resonate most with you right now.';
      case 'emotionSummary':
        return 'Review your emotional state before we explore the underlying needs. This helps connect feelings to what you need.';
      case 'needs':
        return 'Select up to 5 universal human needs that are currently being met or not met, based on your initial feeling.';
      case 'needsSummary':
        return 'This is your complete emotional journey - from feelings to underlying needs. Use this for reflection or share with others.';
      case 'thankYou':
        return 'Congratulations on completing your emotional journey! Regular emotional check-ins can improve your wellbeing.';
      default:
        return 'Navigate through the steps to identify your emotions and underlying needs.';
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-12 h-12 bg-slate-600 hover:bg-slate-700 rounded-full shadow-md transition-all duration-200 hover:scale-105"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </button>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-slate-800 text-white p-4 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="font-['Josefin_Sans:Regular',_sans-serif] text-sm leading-relaxed">
            {getHelpText()}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
}