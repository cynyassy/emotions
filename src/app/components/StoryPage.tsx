import { ArrowRight, BookOpen, Brain, Heart, MessageCircle, Sparkles } from 'lucide-react';
import abstractFlowerArt from '../../assets/emotion-art/abstract-flower.png';
import dualEmotionDotsArt from '../../assets/emotion-art/dual-emotion-dots.png';
import friendlyFaceArt from '../../assets/emotion-art/friendly-face.png';
import groundYourselfPlantArt from '../../assets/emotion-art/ground-yourself-plant.png';
import redHeartPathArt from '../../assets/emotion-art/red-heart-path.png';

interface StoryPageProps {
  onStartTool: () => void;
}

const storySteps = [
  {
    label: 'Start Familiar',
    title: 'Begin with good or bad',
    body: 'The tool starts where everyday conversation often starts. Sometimes all we know is that something feels good, bad, off, or not okay.',
    accent: 'bg-teal-600',
    mock: 'Good / Bad',
    art: friendlyFaceArt,
  },
  {
    label: 'Find language',
    title: 'Move into emotional vocabulary',
    body: 'Broad categories help narrow the field before the tool offers more specific words. The goal is not perfection; it is recognition.',
    accent: 'bg-coral-500',
    mock: 'Calm, worried, hopeful',
    art: dualEmotionDotsArt,
  },
  {
    label: 'Connect needs',
    title: 'Link feelings to needs',
    body: 'Inspired by NVC, the tool connects feelings with needs that may be met or unmet, turning emotion into something easier to understand.',
    accent: 'bg-amber-500',
    mock: 'Connection, rest, clarity',
    art: groundYourselfPlantArt,
  },
  {
    label: 'Share gently',
    title: 'Create a reflection to share',
    body: 'The share output helps someone communicate what they are feeling without having to write from a blank page.',
    accent: 'bg-sky-600',
    mock: 'My Emotional Journey',
    art: redHeartPathArt,
  },
];

function StoryMockup({ title, accent, art }: { title: string; accent: string; art: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className={`${accent} flex h-20 items-center justify-between px-5 text-white`}>
        <div className="flex gap-2">
          <Heart className="h-5 w-5" />
          <Brain className="h-5 w-5" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide">Preview</span>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <div className="h-3 w-2/3 rounded-full bg-slate-200" />
          <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50">
            <img
              src={art}
              alt=""
              className="max-h-14 max-w-16 object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className={`${accent} rounded-xl px-3 py-5 text-center text-sm font-bold text-white`}>
            {title.split(',')[0]}
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-5 text-center text-sm font-semibold text-slate-700">
            {title.includes(',') ? title.split(',').slice(1).join(',').trim() : 'Explore'}
          </div>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-100" />
        <div className="h-3 w-4/5 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

export default function StoryPage({ onStartTool }: StoryPageProps) {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-h-[92vh] max-w-6xl gap-10 px-5 py-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
              <Sparkles className="h-4 w-4" />
              An NVC-inspired learning tool
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
              Learning to name what we feel.
            </h1>

            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-700">
              <p>
                When I was diagnosed with depression at 23, I did not know how to express it. I just knew something was "bad" and I was not feeling "good".
              </p>
              <p>
                To express myself better, I first had to expand my emotional vocabulary. Mapping emotions to words helped me name and identify what was going through my mind.
              </p>
              <p>
                Acknowledging also meant admission. This tool exists to help people identify and share the emotions they are feeling with others.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onStartTool}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-teal-800"
              >
                Open the tool
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="#story"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Read the story
                <BookOpen className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-32 w-3 bg-coral-500 md:block" />
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-[#fffaf0] p-5 shadow-xl">
              <div className="flex justify-end">
                <img
                  src={friendlyFaceArt}
                  alt="Hand-drawn smiling face"
                  className="h-24 w-24 rounded-full bg-amber-100 object-contain p-2"
                />
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">The first question</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">How are you feeling right now?</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-teal-600 p-5 text-center text-2xl font-bold text-white">Good</div>
                  <div className="rounded-xl bg-coral-500 p-5 text-center text-2xl font-bold text-white">Bad</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-sm font-semibold text-slate-700">
                <div className="rounded-lg bg-white p-3">Name</div>
                <div className="rounded-lg bg-white p-3">Connect</div>
                <div className="rounded-lg bg-white p-3">Share</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[0.85fr_1.15fr] md:items-center md:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <img
              src={groundYourselfPlantArt}
              alt=""
              className="mb-5 h-28 w-full object-contain"
              loading="lazy"
            />
            <p className="text-sm font-bold uppercase tracking-wide text-teal-200">Why naming matters</p>
            <blockquote className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              "If you can name the fear, you can begin to face it."
            </blockquote>
          </div>
          <div className="space-y-4 text-lg leading-8 text-slate-200">
            <p>
              When an emotion has no name, it can feel larger than it is. It can turn into overthinking, and overthinking can make the feeling even more overwhelming.
            </p>
            <p>
              Naming the emotion does not make it disappear. But it gives the mind a handle. It turns a cloud of "something is wrong" into a word you can notice, question, share, and work with.
            </p>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-teal-700">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">A small journey from vague feeling to clearer language.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {storySteps.map((step, index) => (
            <article key={step.title} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{step.label}</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.body}</p>
              </div>
              <StoryMockup title={step.mock} accent={step.accent} art={step.art} />
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex max-w-2xl gap-4">
            <img
              src={abstractFlowerArt}
              alt=""
              className="hidden h-24 w-24 shrink-0 object-contain sm:block"
              loading="lazy"
            />
            <div>
            <div className="mb-3 flex items-center gap-2 text-teal-700">
              <MessageCircle className="h-5 w-5" />
              <span className="font-bold">The sharing piece matters</span>
            </div>
            <p className="text-xl leading-8 text-slate-700">
              The output is designed to help someone say, "This is what I am feeling, and this might be why," without starting from a blank page.
            </p>
            </div>
          </div>
          <button
            onClick={onStartTool}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Try the tool
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
