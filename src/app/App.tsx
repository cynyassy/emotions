import { useState } from "react";
import EmotionIdentifier from "./components/EmotionIdentifier";
import StoryPage from "./components/StoryPage";

export default function App() {
  const [view, setView] = useState<'story' | 'tool'>('story');

  if (view === 'story') {
    return <StoryPage onStartTool={() => setView('tool')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full">
        <div className="mx-auto mb-4 flex max-w-2xl justify-start">
          <button
            onClick={() => setView('story')}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Back to story
          </button>
        </div>
        <EmotionIdentifier />
      </div>
    </div>
  );
}
