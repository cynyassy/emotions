import React, { forwardRef } from 'react';
import { Heart, Brain } from 'lucide-react';

interface ScreenshotCardProps {
  emotions: string[];
  needs: string[];
  feelingType: 'good' | 'bad';
}

const ScreenshotCard = forwardRef<HTMLDivElement, ScreenshotCardProps>(
  ({ emotions, needs, feelingType }, ref) => {
    const emotionsList = emotions.join(', ');
    const needsList = needs.join(', ');
    const needsStatus = feelingType === 'good' ? 'are being met' : 'are not being met';
    const bgGradient = feelingType === 'good' 
      ? 'bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700' 
      : 'bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700';

    return (
      <div
        ref={ref}
        className={`w-[500px] h-[400px] ${bgGradient} rounded-3xl shadow-2xl text-white relative overflow-hidden`}
        style={feelingType === 'bad' ? {
          background: 'linear-gradient(135deg, #f48071 0%, #e56b5a 50%, #d45a49 100%)'
        } : undefined}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white"></div>
          <div className="absolute top-[45px] left-[397px] w-[22px] h-[22px] rounded-full bg-white"></div>
          <div className="absolute bottom-12 left-12 w-12 h-12 rounded-full bg-white"></div>
          <div className="absolute bottom-[25px] left-[417px] w-[18px] h-[18px] rounded-full bg-white"></div>
          <div className="absolute top-[190px] left-[156px] w-10 h-10 rounded-full bg-white"></div>
        </div>

        {/* Header */}
        <div className="absolute left-10 top-10 z-10">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8" />
            <Brain className="w-8 h-8" />
          </div>
          <h1 className="mt-[22px] font-sans text-2xl font-bold">
            My Emotional Journey
          </h1>
        </div>

        {/* Content */}
        <div className="absolute left-[70px] top-[155px] z-10 h-[112px] w-[360px] rounded-xl bg-white/10 p-5 font-sans text-lg font-bold leading-6">
            <p>
              It seems that you are feeling <span className="capitalize">{emotionsList}</span>.
            </p>

            <p className="mt-2">
              Because your needs for {needsList}, {needsStatus}.
            </p>
        </div>

        {/* Footer */}
        <div className="absolute left-10 right-10 top-[330px] z-10 border-t border-white/30 pt-[18px]">
          <p className="font-sans text-sm opacity-90">
            The Emotion Identifier
          </p>
          <p className="mt-1 font-sans text-xs opacity-75">
            Expand your emotional vocabulary
          </p>
        </div>
      </div>
    );
  }
);

ScreenshotCard.displayName = 'ScreenshotCard';

export default ScreenshotCard;
