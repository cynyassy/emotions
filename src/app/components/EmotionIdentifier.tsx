import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Heart, Brain } from 'lucide-react';
import { goodEmotions, badEmotions, initialGoodCategories, initialBadCategories } from '../data/emotions';
import { universalNeeds } from '../data/needs';
import HelpTooltip from './HelpTooltip';
import SocialShare from './SocialShare';

type Step = 'initial' | 'categories' | 'specific' | 'emotionSummary' | 'needs' | 'needsSummary' | 'thankYou';
type Feeling = 'good' | 'bad' | null;

interface UserSelection {
  initialFeeling: Feeling;
  categories: string[];
  specificEmotions: string[];
  selectedNeeds: string[];
}

const needCategoryMeta: Record<string, { emoji: string; hint: string }> = {
  Connection: { emoji: '🤝', hint: 'Being seen, heard, and understood' },
  Autonomy: { emoji: '🧭', hint: 'Choice, space, and self-direction' },
  Peace: { emoji: '🌿', hint: 'Ease, harmony, and order' },
  Interconnection: { emoji: '🫶', hint: 'Belonging, support, and trust' },
  Meaning: { emoji: '✨', hint: 'Purpose, contribution, and hope' },
  Celebration: { emoji: '🎈', hint: 'Joy, play, and honoring loss' },
  Competence: { emoji: '🛠️', hint: 'Growth, learning, and effectiveness' },
  Honesty: { emoji: '💬', hint: 'Integrity and authenticity' },
  'Basic Survival': { emoji: '🏡', hint: 'Rest, safety, food, and shelter' },
};

export default function EmotionIdentifier() {
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  const [activeNeedCategory, setActiveNeedCategory] = useState<string | null>(null);
  const [selection, setSelection] = useState<UserSelection>({
    initialFeeling: null,
    categories: [],
    specificEmotions: [],
    selectedNeeds: []
  });

  const resetJourney = () => {
    setCurrentStep('initial');
    setActiveNeedCategory(null);
    setSelection({
      initialFeeling: null,
      categories: [],
      specificEmotions: [],
      selectedNeeds: []
    });
  };

  const handleInitialChoice = (feeling: Feeling) => {
    setActiveNeedCategory(null);
    setSelection(prev => ({
      ...prev,
      initialFeeling: feeling,
      categories: [],
      specificEmotions: [],
      selectedNeeds: []
    }));
    
    setCurrentStep('categories');
  };

  const handleCategorySelection = (category: string) => {
    setSelection(prev => {
      const isSelected = prev.categories.includes(category);
      const newCategories = isSelected 
        ? prev.categories.filter(c => c !== category)
        : prev.categories.length < 3 
          ? [...prev.categories, category]
          : prev.categories;
      
      return {
        ...prev,
        categories: newCategories
      };
    });
  };

  const handleSpecificEmotionSelection = (emotion: string) => {
    setSelection(prev => {
      const isSelected = prev.specificEmotions.includes(emotion);
      const newEmotions = isSelected
        ? prev.specificEmotions.filter(e => e !== emotion)
        : prev.specificEmotions.length < 3
          ? [...prev.specificEmotions, emotion]
          : prev.specificEmotions;
      
      return {
        ...prev,
        specificEmotions: newEmotions
      };
    });
  };

  const handleNeedSelection = (need: string) => {
    setSelection(prev => {
      const isSelected = prev.selectedNeeds.includes(need);
      const newNeeds = isSelected
        ? prev.selectedNeeds.filter(n => n !== need)
        : prev.selectedNeeds.length < 5
          ? [...prev.selectedNeeds, need]
          : prev.selectedNeeds;
      
      return {
        ...prev,
        selectedNeeds: newNeeds
      };
    });
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'categories':
        setCurrentStep('initial');
        setSelection(prev => ({ ...prev, categories: [], specificEmotions: [], selectedNeeds: [] }));
        break;
      case 'specific':
        setCurrentStep('categories');
        setSelection(prev => ({ ...prev, specificEmotions: [], selectedNeeds: [] }));
        break;
      case 'emotionSummary':
        setCurrentStep('specific');
        setSelection(prev => ({ ...prev, selectedNeeds: [] }));
        break;
      case 'needs':
        if (activeNeedCategory) {
          setActiveNeedCategory(null);
          break;
        }
        setCurrentStep('emotionSummary');
        break;
      case 'needsSummary':
        setCurrentStep('needs');
        break;
      case 'thankYou':
        setCurrentStep('needsSummary');
        break;
    }
  };

  const handleForward = () => {
    switch (currentStep) {
      case 'categories':
        if (selection.categories.length > 0) {
          setCurrentStep('specific');
        }
        break;
      case 'specific':
        if (selection.specificEmotions.length > 0) {
          setCurrentStep('emotionSummary');
        }
        break;
      case 'emotionSummary':
        setActiveNeedCategory(null);
        setCurrentStep('needs');
        break;
      case 'needs':
        if (selection.selectedNeeds.length > 0) {
          setCurrentStep('needsSummary');
        }
        break;
      case 'needsSummary':
        setCurrentStep('thankYou');
        break;
    }
  };

  const canGoForward = () => {
    switch (currentStep) {
      case 'categories':
        return selection.categories.length > 0;
      case 'specific':
        return selection.specificEmotions.length > 0;
      case 'emotionSummary':
        return true;
      case 'needs':
        return selection.selectedNeeds.length > 0;
      case 'needsSummary':
        return true;
      default:
        return false;
    }
  };

  const getSpecificEmotions = () => {
    const emotions: string[] = [];
    const emotionData = selection.initialFeeling === 'good' ? goodEmotions : badEmotions;
    
    selection.categories.forEach(categoryName => {
      const category = emotionData.find(cat => 
        cat.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (category) {
        emotions.push(...category.emotions);
      }
    });
    return emotions;
  };

  const getCurrentCategories = () => {
    return selection.initialFeeling === 'good' ? initialGoodCategories : initialBadCategories;
  };

  const getStepNumber = () => {
    const stepMap = {
      'initial': 1,
      'categories': 2,
      'specific': 3,
      'emotionSummary': 4,
      'needs': 5,
      'needsSummary': 6,
      'thankYou': 7
    };
    return stepMap[currentStep];
  };

  const Header = () => (
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-t-2xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" />
          <Brain className="w-6 h-6" />
        </div>
        <div className="text-sm font-medium opacity-90">
          Step {getStepNumber()} of 7
        </div>
      </div>
      <h1 className="font-['Josefin_Sans:Regular',_sans-serif] text-2xl md:text-3xl font-bold text-center">
        The Emotion Identifier
      </h1>
      <p className="text-center text-sm mt-1 opacity-90">
        Expand your emotional vocabulary
      </p>
    </div>
  );

  const NavigationButtons = () => (
    <div className="flex items-center justify-between p-4 bg-white/50 border-t border-slate-200">
      {currentStep !== 'initial' && currentStep !== 'thankYou' ? (
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-12 h-12 bg-teal-600 hover:bg-teal-700 rounded-full shadow-md transition-all duration-200 hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      ) : (
        <div className="w-12"></div>
      )}
      
      <HelpTooltip currentStep={currentStep} />
      
      {currentStep !== 'initial' && currentStep !== 'thankYou' ? (
        <button
          onClick={handleForward}
          disabled={!canGoForward()}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-all duration-200 ${
            canGoForward() 
              ? 'bg-teal-600 hover:bg-teal-700 hover:scale-105 cursor-pointer' 
              : 'bg-slate-300 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      ) : (
        <div className="w-12"></div>
      )}
    </div>
  );

  const renderInitialStep = () => (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
      <h2 className="font-['Josefin_Sans:Regular',_sans-serif] text-3xl md:text-4xl font-bold text-slate-800 text-center mb-3">
        How are you feeling<br />right now?
      </h2>
      
      <p className="text-slate-600 text-center mb-8 max-w-md">
        Pick how you're feeling right now to get started on your emotional journey!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={() => handleInitialChoice('good')}
          className="group relative overflow-hidden bg-gradient-to-br from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative font-['Josefin_Sans:Regular',_sans-serif] text-3xl font-bold">
            Good
          </div>
        </button>
        
        <button
          onClick={() => handleInitialChoice('bad')}
          className="group relative overflow-hidden bg-gradient-to-br from-coral-400 to-coral-500 hover:from-coral-500 hover:to-coral-600 text-white rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{ 
            background: 'linear-gradient(to bottom right, #f48071, #e56b5a)',
          }}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative font-['Josefin_Sans:Regular',_sans-serif] text-3xl font-bold">
            Bad
          </div>
        </button>
      </div>
    </div>
  );

  const renderCategoriesStep = () => {
    const categories = getCurrentCategories();
    const feelingColor = selection.initialFeeling === 'good' ? 'text-teal-600' : 'text-coral-600';
    const feelingBg = selection.initialFeeling === 'good' ? 'from-teal-400 to-teal-500' : 'from-coral-400 to-coral-500';
    const feelingText = selection.initialFeeling === 'good' ? 'GOOD' : 'BAD';
    
    return (
      <div className="p-6 min-h-[500px]">
        <div className="mb-6">
          <h2 className="font-['Josefin_Sans:Regular',_sans-serif] text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            So you're feeling <span className={feelingColor}>{feelingText}</span>
          </h2>
          <p className="text-lg text-slate-600 mb-1">Let's dive deeper.</p>
          <p className="text-slate-700 font-medium">
            What kind of {selection.initialFeeling} are you feeling?
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Pick up to 3 categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 max-h-[280px] overflow-y-auto pr-2">
          {categories.map((category) => {
            const isSelected = selection.categories.includes(category);
            const baseClasses = "h-20 rounded-xl font-['Josefin_Sans:Regular',_sans-serif] text-white text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg";
            
            return (
              <button
                key={category}
                onClick={() => handleCategorySelection(category)}
                className={`${baseClasses} ${
                  isSelected 
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800 ring-4 ring-teal-400 shadow-xl scale-105' 
                    : `bg-gradient-to-br ${feelingBg}`
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-100 rounded-lg p-3 mt-4">
          <p className="text-sm text-slate-600 font-medium">
            Selected ({selection.categories.length}/3): 
            <span className="text-slate-800 ml-1">
              {selection.categories.join(', ') || 'None yet'}
            </span>
          </p>
        </div>
      </div>
    );
  };

  const renderSpecificStep = () => {
    const specificEmotions = getSpecificEmotions();
    const feelingBg = selection.initialFeeling === 'good' ? 'from-teal-400 to-teal-500' : 'from-coral-400 to-coral-500';
    
    return (
      <div className="p-6 min-h-[500px]">
        <div className="mb-6">
          <h2 className="font-['Josefin_Sans:Regular',_sans-serif] text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Getting more specific...
          </h2>
          <p className="text-slate-600 mb-1">
            Categories: <span className="font-medium text-slate-800">{selection.categories.join(', ')}</span>
          </p>
          <p className="text-slate-700 font-medium mt-3">
            Choose specific emotions
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Select up to 3 emotions
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 max-h-[300px] overflow-y-auto pr-2">
          {specificEmotions.map((emotion) => {
            const isSelected = selection.specificEmotions.includes(emotion);
            
            return (
              <button
                key={emotion}
                onClick={() => handleSpecificEmotionSelection(emotion)}
                className={`h-14 px-4 rounded-lg font-['Josefin_Sans:Regular',_sans-serif] text-white text-base font-medium transition-all duration-200 hover:scale-105 capitalize ${
                  isSelected 
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800 ring-4 ring-teal-400 shadow-xl' 
                    : `bg-gradient-to-br ${feelingBg} hover:shadow-md`
                }`}
              >
                {emotion}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-100 rounded-lg p-3 mt-4">
          <p className="text-sm text-slate-600 font-medium">
            Selected ({selection.specificEmotions.length}/3): 
            <span className="text-slate-800 ml-1 capitalize">
              {selection.specificEmotions.join(', ') || 'None yet'}
            </span>
          </p>
        </div>
      </div>
    );
  };

  const renderEmotionSummaryStep = () => {
    const feelingBg = selection.initialFeeling === 'good' ? 'from-teal-400 to-teal-500' : 'from-coral-400 to-coral-500';
    
    return (
      <div className="p-6 min-h-[500px] flex flex-col">
        <h2 className="font-['Josefin_Sans:Regular',_sans-serif] text-2xl md:text-3xl font-bold text-slate-800 mb-6">
          It seems that you are feeling:
        </h2>
        
        <div className="space-y-3 mb-8 flex-1">
          {selection.specificEmotions.map((emotion) => (
            <div 
              key={emotion}
              className={`bg-gradient-to-r ${feelingBg} text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow`}
            >
              <span className="font-['Josefin_Sans:Regular',_sans-serif] text-xl font-semibold capitalize">
                {emotion}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border-l-4 border-teal-500">
          <p className="text-slate-700 text-lg mb-2 font-medium">
            Let's explore what needs of yours are currently {selection.initialFeeling === 'good' ? 'being met' : 'not being met'}.
          </p>
          <p className="text-slate-600 text-sm">
            Press forward when you're ready to continue.
          </p>
        </div>
      </div>
    );
  };

  const renderNeedsStep = () => {
    const feelingBg = selection.initialFeeling === 'good' ? 'from-teal-400 to-teal-500' : 'from-coral-400 to-coral-500';
    const activeCategory = universalNeeds.find(category => category.name === activeNeedCategory);
    
    return (
      <div className="p-6 min-h-[500px]">
        <div className="mb-6">
          <h2 className="font-['Josefin_Sans:Regular',_sans-serif] text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Which needs are {selection.initialFeeling === 'good' ? 'being met' : 'not being met'}?
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Start with a broad category, then choose up to 5 specific needs.
          </p>
        </div>

        {!activeCategory ? (
          <div className="grid grid-cols-1 gap-3 max-h-[340px] overflow-y-auto pr-2 sm:grid-cols-2">
            {universalNeeds.map((category) => {
              const meta = needCategoryMeta[category.name];
              const selectedCount = category.needs.filter(need => selection.selectedNeeds.includes(need)).length;

              return (
                <button
                  key={category.name}
                  onClick={() => setActiveNeedCategory(category.name)}
                  className="group min-h-24 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-2 text-2xl">{meta?.emoji || '•'}</div>
                      <h3 className="font-['Josefin_Sans:Regular',_sans-serif] text-lg font-bold text-slate-800">
                        {category.name}
                      </h3>
                    </div>
                    {selectedCount > 0 && (
                      <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-bold text-teal-700">
                        {selectedCount}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    {meta?.hint || 'Explore specific needs'}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveNeedCategory(null)}
              className="mb-4 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View all need categories
            </button>

            <div className="mb-4 rounded-xl bg-slate-50 p-4">
              <div className="text-3xl">{needCategoryMeta[activeCategory.name]?.emoji || '•'}</div>
              <h3 className="mt-2 font-['Josefin_Sans:Regular',_sans-serif] text-2xl font-bold text-slate-800">
                {activeCategory.name}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {needCategoryMeta[activeCategory.name]?.hint}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-2">
              {activeCategory.needs.map((need) => {
                const isSelected = selection.selectedNeeds.includes(need);
                return (
                  <button
                    key={need}
                    onClick={() => handleNeedSelection(need)}
                    className={`min-h-12 px-3 rounded-lg font-['Josefin_Sans:Regular',_sans-serif] text-white text-sm font-medium transition-all duration-200 hover:scale-105 text-left ${
                      isSelected 
                        ? 'bg-gradient-to-br from-slate-700 to-slate-800 ring-2 ring-teal-400 shadow-lg' 
                        : `bg-gradient-to-br ${feelingBg} hover:shadow-md`
                    }`}
                  >
                    {need}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-slate-100 rounded-lg p-3 mt-4">
          <p className="text-sm text-slate-600 font-medium">
            Selected ({selection.selectedNeeds.length}/5): 
            <span className="text-slate-800 ml-1">
              {selection.selectedNeeds.join(', ') || 'None yet'}
            </span>
          </p>
        </div>
      </div>
    );
  };

  const renderNeedsSummaryStep = () => {
    const emotionsList = selection.specificEmotions.join(', ');
    const needsList = selection.selectedNeeds.join(', ');
    const needsStatus = selection.initialFeeling === 'good' ? 'are being met' : 'are not being met';
    const feelingColor = selection.initialFeeling === 'good' ? 'text-teal-600' : 'text-coral-600';
    
    return (
      <div className="p-6 min-h-[500px]">
        <h2 className="font-['Josefin_Sans:Regular',_sans-serif] text-2xl md:text-3xl font-bold text-slate-800 mb-6">
          Your Emotional Journey
        </h2>
        
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg border border-slate-200 mb-6">
          <div className="font-['Josefin_Sans:Regular',_sans-serif] text-lg leading-relaxed space-y-4">
            <p className="text-slate-800">
              It seems that you are feeling{' '}
              <span className={`capitalize font-bold ${feelingColor}`}>
                {emotionsList}
              </span>.
            </p>
            
            <p className="text-slate-800">
              Because your needs for{' '}
              <span className="font-bold text-slate-700">
                {needsList}
              </span>, {needsStatus}.
            </p>
            
            <p className="text-slate-600 text-base pt-2 border-t border-slate-200">
              Use this to reflect or share with your friends.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-['Josefin_Sans:Regular',_sans-serif] text-lg font-semibold text-slate-800">
            Share Your Journey:
          </h3>
          <SocialShare 
            emotions={selection.specificEmotions}
            needs={selection.selectedNeeds}
            feelingType={selection.initialFeeling as 'good' | 'bad'}
          />
        </div>
      </div>
    );
  };

  const renderThankYouStep = () => (
    <div className="p-8 min-h-[500px] flex flex-col items-center justify-center text-center">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Heart className="w-10 h-10" />
      </div>
      
      <h2 className="font-['Josefin_Sans:Regular',_sans-serif] text-3xl md:text-4xl font-bold text-slate-800 mb-4">
        Thank you for taking this journey!
      </h2>
      
      <p className="text-lg text-slate-700 mb-6 max-w-md">
        We hope this helped you better understand your emotions and needs.
      </p>

      <p className="text-slate-600 mb-8 max-w-md">
        Taking time to identify and understand your emotions is a powerful step toward emotional wellness and self-awareness.
      </p>

      <button
        onClick={resetJourney}
        className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <RotateCcw className="w-6 h-6" />
        <span className="font-['Josefin_Sans:Regular',_sans-serif] text-xl font-semibold">
          Start Over
        </span>
      </button>

      <p className="text-sm text-slate-500 mt-6 max-w-md">
        If you'd like to explore your emotions again or try a different path, click "Start Over" above.
      </p>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return renderInitialStep();
      case 'categories':
        return renderCategoriesStep();
      case 'specific':
        return renderSpecificStep();
      case 'emotionSummary':
        return renderEmotionSummaryStep();
      case 'needs':
        return renderNeedsStep();
      case 'needsSummary':
        return renderNeedsSummaryStep();
      case 'thankYou':
        return renderThankYouStep();
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Header />
      <div className="bg-white">
        {renderStep()}
      </div>
      <NavigationButtons />
    </div>
  );
}
