export default function StyleTest() {
  return (
    <div className="min-h-screen p-8 gradient-bg-dark">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8">Style Test Page</h1>
        
        {/* Glass Card */}
        <div className="glass p-6 rounded-3xl mb-6 hover-lift">
          <h2 className="text-2xl font-bold text-white mb-4">Glass Effect Test</h2>
          <p className="text-gray-300">This card should have a frosted glass effect with blur.</p>
        </div>

        {/* Glass Dark Card */}
        <div className="glass-dark p-6 rounded-3xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Dark Glass Effect</h2>
          <p className="text-gray-300">This card has a darker glass effect.</p>
        </div>

        {/* Floating Animation */}
        <div className="glass p-6 rounded-3xl mb-6 floating">
          <h2 className="text-2xl font-bold text-white mb-4">Floating Animation</h2>
          <p className="text-gray-300">This card should float up and down.</p>
        </div>

        {/* Pulse Glow */}
        <div className="inline-block">
          <div className="w-4 h-4 bg-purple-500 rounded-full pulse-glow"></div>
        </div>
        <span className="text-white ml-4">← Pulsing glow effect</span>

        {/* Slide In */}
        <div className="glass p-6 rounded-3xl mt-6 slide-in">
          <h2 className="text-2xl font-bold text-white mb-4">Slide In Animation</h2>
          <p className="text-gray-300">This card should have slid in from the left.</p>
        </div>

        {/* Grid Pattern Background */}
        <div className="grid-pattern p-6 rounded-3xl mt-6 bg-gray-900">
          <h2 className="text-2xl font-bold text-white mb-4">Grid Pattern</h2>
          <p className="text-gray-300">Background has a subtle grid pattern.</p>
        </div>

        {/* AI Thinking */}
        <div className="glass-dark p-6 rounded-3xl mt-6 ai-thinking">
          <h2 className="text-2xl font-bold text-white mb-4">AI Thinking Shimmer</h2>
          <p className="text-gray-300">Watch for the shimmer effect passing over this card.</p>
        </div>
      </div>
    </div>
  );
}
