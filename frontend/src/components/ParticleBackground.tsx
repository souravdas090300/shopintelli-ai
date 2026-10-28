import { useEffect } from 'react';

export default function ParticleBackground() {
  useEffect(() => {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    // Create animated particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animation = `floating ${Math.random() * 6 + 4}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      id="particles-container"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: 'hidden' }}
    />
  );
}
