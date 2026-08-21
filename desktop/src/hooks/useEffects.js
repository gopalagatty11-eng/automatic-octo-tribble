/**
 * useEffects — Haptic feedback + gold particle trigger hook
 * 
 * Desktop: navigator.vibrate for web preview, visual pulse as fallback
 * Particles: spawns gold particles from any element's position
 */
import { useCallback, useRef } from 'react';

// ── Haptic feedback ────────────────────────────────────────
// Uses Web Vibration API where available (Android, some desktops)
// Falls back to a brief CSS pulse on the body
function triggerHaptic(pattern = 'light') {
  const patterns = {
    light: [10],
    medium: [20],
    heavy: [40],
    success: [10, 30, 10],
    error: [50, 50, 50],
    calc: [5],
    save: [10, 20, 10],
  };

  const ms = patterns[pattern] || patterns.light;

  // Web Vibration API (works on Android Chrome, some Electron builds)
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(ms);
  }

  // Visual pulse fallback — brief gold flash on body
  if (typeof document !== 'undefined') {
    document.body.classList.add('haptic-pulse');
    setTimeout(() => document.body.classList.remove('haptic-pulse'), 150);
  }
}

export function useHaptic() {
  const trigger = useCallback((pattern) => {
    triggerHaptic(pattern);
  }, []);

  return { trigger };
}

// ── Gold Particle Spawner ──────────────────────────────────
// Spawns particles from a screen-space coordinate using a global canvas
let canvas = null;
let ctx = null;
let particles = [];
let rafId = null;

function ensureCanvas() {
  if (canvas) return;
  
  canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 99999;
  `;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Start animation loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles = particles.filter((p) => p.life > 0);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.life -= p.decay;
      p.size *= 0.995;

      const alpha = Math.max(0, p.life);
      ctx.globalAlpha = alpha;

      if (p.type === 'spark') {
        // Small bright spark
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'ring') {
        // Expanding ring
        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(0.5, p.size * 0.3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.initialSize * (1 - alpha) * 2 + 5, 0, Math.PI * 2);
        ctx.stroke();
      } else if (p.type === 'shimmer') {
        // Soft glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;

    if (particles.length > 0) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  }

  rafId = requestAnimationFrame(loop);
}

// Gold color palette
const GOLD_COLORS = [
  '#C9A96E', '#E8D5A8', '#A88B4A', '#D4B87A',
  '#FFE4B5', '#FFD700', '#DAA520',
];

function randomGold() {
  return GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
}

/**
 * Spawn particles from a screen coordinate
 * @param {number} x - screen X
 * @param {number} y - screen Y
 * @param {object} opts - configuration
 */
export function spawnParticles(x, y, opts = {}) {
  ensureCanvas();

  const {
    count = 20,
    spread = 80,
    type = 'burst',       // burst | shimmer | sparkle | celebration
  } = opts;

  const newParticles = [];

  if (type === 'burst') {
    // Radial burst of sparks
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 1 + Math.random() * 4;
      newParticles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 2.5,
        life: 0.6 + Math.random() * 0.4,
        decay: 0.015 + Math.random() * 0.01,
        gravity: 0.03,
        friction: 0.98,
        color: randomGold(),
        type: Math.random() > 0.7 ? 'shimmer' : 'spark',
        initialSize: 2,
      });
    }
    // Central ring
    newParticles.push({
      x, y, vx: 0, vy: 0,
      size: 12, initialSize: 12,
      life: 1, decay: 0.04,
      gravity: 0, friction: 1,
      color: 'rgba(201,169,110,0.3)',
      type: 'ring',
    });
  } else if (type === 'shimmer') {
    // Soft upward floating particles
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.5 - Math.random() * 1.5,
        size: 1 + Math.random() * 3,
        life: 0.7 + Math.random() * 0.3,
        decay: 0.008 + Math.random() * 0.005,
        gravity: -0.02,
        friction: 0.995,
        color: randomGold(),
        type: 'shimmer',
        initialSize: 3,
      });
    }
  } else if (type === 'sparkle') {
    // Quick sparkle — few bright dots
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2;
      newParticles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2,
        life: 0.8 + Math.random() * 0.2,
        decay: 0.03 + Math.random() * 0.02,
        gravity: 0,
        friction: 0.96,
        color: randomGold(),
        type: 'spark',
        initialSize: 2,
      });
    }
  } else if (type === 'celebration') {
    // Big celebration — lots of particles + rings + shimmer
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 6;
      newParticles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 2 + Math.random() * 3,
        life: 0.8 + Math.random() * 0.2,
        decay: 0.008 + Math.random() * 0.005,
        gravity: 0.06,
        friction: 0.985,
        color: randomGold(),
        type: Math.random() > 0.5 ? 'shimmer' : 'spark',
        initialSize: 4,
      });
    }
    // Triple ring
    for (let r = 0; r < 3; r++) {
      newParticles.push({
        x, y, vx: 0, vy: 0,
        size: 10 + r * 5, initialSize: 10 + r * 5,
        life: 1, decay: 0.02 + r * 0.01,
        gravity: 0, friction: 1,
        color: `rgba(201,169,110,${0.25 - r * 0.06})`,
        type: 'ring',
      });
    }
  }

  particles.push(...newParticles);

  // Ensure loop is running
  if (!rafId) {
    rafId = requestAnimationFrame(function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles = particles.filter((p) => p.life > 0);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.life -= p.decay;
        p.size *= 0.995;

        const alpha = Math.max(0, p.life);
        ctx.globalAlpha = alpha;

        if (p.type === 'spark') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'ring') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(0.5, p.size * 0.3);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.initialSize * (1 - alpha) * 2 + 5, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.type === 'shimmer') {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (particles.length > 0) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    });
  }
}

/**
 * Convenience: spawn from a click event's target element
 */
export function spawnFromEvent(e, opts) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  spawnParticles(x, y, opts);
}

/**
 * Combined hook: returns a handler that triggers haptic + particles
 */
export function useEffects() {
  const trigger = useCallback((e, opts = {}) => {
    const {
      haptic = 'light',
      particles = 'burst',
      particleCount,
      ...particleOpts
    } = opts;

    // Haptic
    triggerHaptic(haptic);

    // Particles from click position
    if (e && e.currentTarget) {
      spawnFromEvent(e, {
        type: particles,
        count: particleCount,
        ...particleOpts,
      });
    }
  }, []);

  return { trigger, spawnParticles, spawnFromEvent, haptic: triggerHaptic };
}
