import { useState, useEffect } from 'react';
import GoogleCalendarButton from './components/GoogleCalendarButton';

export default function App() {
  const [step, setStep] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [recommendation, setRecommendation] = useState('');

  const moveNoButton = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 60;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  useEffect(() => {
    if (step === 1) {
      moveNoButton();
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-200 to-pink-200 p-4">
      {step === 1 && <StepOne onYes={() => setStep(2)} onNoHover={moveNoButton} noButtonPos={noButtonPos} />}
      {step === 2 && <StepTwo onNext={() => setStep(3)} />}
      {step === 3 && <StepThree onNext={() => setStep(4)} recommendation={recommendation} setRecommendation={setRecommendation} />}
      {step === 4 && <StepFour />}
    </div>
  );
}

function StepOne({ onYes, onNoHover, noButtonPos }: { onYes: () => void; onNoHover: () => void; noButtonPos: { x: number; y: number } }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative max-w-2xl">
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="mb-8 text-8xl">🎬</div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-pink-700">
            Movie Date?
          </h1>
          <p className="mb-12 text-2xl font-semibold text-gray-700">
            Will you like to go see a movie with me?
          </p>
          
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={onYes}
              className="glass-button rounded-2xl px-12 py-6 text-2xl font-bold text-white transition-transform hover:scale-105 active:scale-95"
            >
              Yes! 💕
            </button>
          </div>
        </div>

        {/* Floating No Button */}
        <button
          onMouseEnter={onNoHover}
          onTouchStart={onNoHover}
          className="glass-button-gray fixed rounded-xl px-8 py-4 text-xl font-bold text-white transition-all duration-300"
          style={{
            left: `${noButtonPos.x}px`,
            top: `${noButtonPos.y}px`,
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

function StepTwo({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-2xl">
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="mb-8 text-8xl">📅</div>
          <h2 className="mb-8 text-5xl font-bold text-pink-700">
            Save the Date!
          </h2>
          
          <div className="glass-card mb-8 rounded-2xl p-8">
            <p className="mb-2 text-xl font-semibold text-gray-700">Mark your calendar for</p>
            <p className="text-6xl font-bold text-pink-600">October 1st</p>
            <p className="mt-4 text-2xl font-semibold text-gray-700">2026</p>
          </div>

          <p className="mb-8 text-xl font-semibold text-gray-700">
            It's going to be amazing! ✨
          </p>

          <button
            onClick={onNext}
            className="glass-button rounded-2xl px-12 py-6 text-2xl font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            Next 💖
          </button>
        </div>
      </div>
    </div>
  );
}

function StepThree({ onNext, recommendation, setRecommendation }: { 
  onNext: () => void; 
  recommendation: string; 
  setRecommendation: (value: string) => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="max-w-3xl">
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="mb-8 text-6xl">🍿</div>
          <h2 className="mb-8 text-4xl font-bold text-pink-700">
            What Should We Watch?
          </h2>

          <div className="mb-8">
            <p className="mb-4 text-xl font-semibold text-gray-700">I was thinking...</p>
            <div className="glass-card rounded-2xl p-6">
              <img 
                src="https://i.ibb.co/twT3Bm9m/Agbara-nla.png" 
                alt="Agbara-nla Movie" 
                className="mx-auto mb-4 max-h-96 rounded-xl shadow-lg"
              />
              <p className="text-2xl font-bold text-pink-600">AGBARA NLA</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-4 text-lg font-semibold text-gray-700">
              Or do you have another movie in mind? 🤔
            </p>
            <textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Type your movie recommendation here..."
              className="glass-input w-full resize-none rounded-xl p-4 text-lg font-medium text-gray-800 placeholder-gray-500"
              rows={3}
            />
            {recommendation.trim() && (
              <a
                href={`https://wa.me/+2347039170142?text=${encodeURIComponent(`Hey Josh\nhere is my movie suggestion: ${recommendation}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button-green mt-4 inline-block rounded-xl px-8 py-4 text-xl font-bold text-white transition-transform hover:scale-105 active:scale-95"
              >
                Send via WhatsApp 💬
              </a>
            )}
          </div>

          <button
            onClick={onNext}
            className="glass-button rounded-2xl px-12 py-6 text-2xl font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            Continue 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

function StepFour() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="max-w-3xl space-y-8">
        {/* First Card - Come Looking Stunning */}
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="mb-8 text-8xl">✨</div>
          <h2 className="mb-8 text-5xl font-bold text-pink-700">
            One More Thing...
          </h2>

          <div className="glass-card mb-8 rounded-2xl p-8">
            <p className="mb-4 text-3xl font-bold text-gray-800">
              Come Looking Stunning! 💃
            </p>
            <p className="text-xl font-semibold text-gray-700">
              (Not that you need to try hard 😉)
            </p>
          </div>

          <div className="space-y-4 text-left text-lg font-semibold text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-2xl">💕</span>
              <span>Dress to impress (yourself first!)</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">😊</span>
              <span>Bring your beautiful smile</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">🎬</span>
              <span>Get ready for an amazing time!</span>
            </p>
          </div>
        </div>

        {/* Second Card - Calendar Integration */}
        <div className="glass-card rounded-3xl p-12 text-center">
          <p className="mb-8 text-2xl font-semibold text-gray-700">
            One last thing... let's make sure we don't forget this little moment 💕
          </p>

          {/* Date Confirmation Card */}
          <div className="mb-8 border-4 border-black bg-gradient-to-br from-pink-100 to-pink-50 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-6 text-6xl">🎬</div>
            <h3 className="mb-6 text-3xl font-black uppercase text-pink-600">
              MOVIE DATE CONFIRMED
            </h3>

            <div className="space-y-4 text-left">
              <div className="flex items-start justify-between border-b-4 border-pink-300 pb-3">
                <span className="font-bold text-gray-700">Movie:</span>
                <span className="font-black text-gray-900">Agbara Nla</span>
              </div>

              <div className="flex items-start justify-between border-b-4 border-pink-300 pb-3">
                <span className="font-bold text-gray-700">Date:</span>
                <span className="font-black text-gray-900">Thursday, October 1st, 2026</span>
              </div>

              <div className="flex items-start justify-between border-b-4 border-pink-300 pb-3">
                <span className="font-bold text-gray-700">Time:</span>
                <span className="font-black text-gray-900">6:00 PM - 9:00 PM</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="font-bold text-gray-700">Status:</span>
                <span className="font-black text-pink-600">✨ Confirmed</span>
              </div>
            </div>
          </div>

          {/* Google Calendar Button */}
          <div className="flex flex-col items-center gap-4">
            <GoogleCalendarButton
              title="Movie Date With You 🍿❤️"
              date="2026-10-01"
              startTime="18:00"
              endTime="21:00"
              description="Can't wait to spend this special evening with you ❤️

Movie night, good conversation, and creating a beautiful memory together.

See you soon ✨"
              location="Cinema 🎬"
            />
            
            <p className="rotate-1 text-sm font-black uppercase text-gray-700">
              ⬆️ Save Our Date 📅💕
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="text-2xl font-bold text-pink-600">
              Can't wait to see you! 💖
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
