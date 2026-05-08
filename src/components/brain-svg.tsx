"use client";

import { useMemo } from "react";

type BrainSvgProps = {
  frame: number;
  isComplete?: boolean;
};

export function BrainSvg({ frame, isComplete = false }: BrainSvgProps) {
  // Neural activity hotspots that pulse
  const hotspots = useMemo(() => {
    return [
      { cx: 250, cy: 160, r: 12 + Math.sin(frame * 0.3) * 5 },
      { cx: 310, cy: 200, r: 10 + Math.sin(frame * 0.4 + 1) * 4 },
      { cx: 200, cy: 220, r: 11 + Math.sin(frame * 0.35 + 2) * 5 },
      { cx: 280, cy: 280, r: 9 + Math.sin(frame * 0.5 + 3) * 4 },
      { cx: 220, cy: 310, r: 8 + Math.sin(frame * 0.45 + 4) * 4 },
      { cx: 330, cy: 140, r: 10 + Math.sin(frame * 0.38 + 5) * 5 },
      { cx: 180, cy: 280, r: 9 + Math.sin(frame * 0.42 + 6) * 3 },
      { cx: 350, cy: 250, r: 8 + Math.sin(frame * 0.48 + 7) * 4 }
    ];
  }, [frame]);

  // Synaptic connections that light up
  const synapseOpacity = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) =>
      0.2 + Math.abs(Math.sin((frame * 0.4) + i * 1.2)) * 0.6
    );
  }, [frame]);

  return (
    <div className={`brain-svg-container ${isComplete ? "brain-complete" : ""}`}>
      <svg
        className="brain-main-svg"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="brainCoreGrad" cx="50%" cy="45%" r="48%">
            <stop offset="0%" stopColor="rgba(84, 215, 255, 0.12)" />
            <stop offset="50%" stopColor="rgba(62, 120, 255, 0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="hotspotGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(84, 215, 255, 0.9)" />
            <stop offset="60%" stopColor="rgba(84, 215, 255, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="hotspotGradComplete" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(98, 241, 212, 0.9)" />
            <stop offset="60%" stopColor="rgba(98, 241, 212, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="brainGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(84, 215, 255, 0)" />
            <stop offset="40%" stopColor="rgba(84, 215, 255, 0.5)" />
            <stop offset="60%" stopColor="rgba(84, 215, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(84, 215, 255, 0)" />
          </linearGradient>
          <linearGradient id="brainFill" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="rgba(84, 215, 255, 0.06)" />
            <stop offset="50%" stopColor="rgba(62, 120, 255, 0.04)" />
            <stop offset="100%" stopColor="rgba(98, 241, 212, 0.03)" />
          </linearGradient>
        </defs>

        {/* Ambient glow behind brain */}
        <ellipse cx="260" cy="250" rx="160" ry="170" fill="url(#brainCoreGrad)" />

        {/* Left hemisphere */}
        <path
          className="brain-hemisphere"
          d="M 250 70
             C 210 70, 170 85, 145 110
             C 120 135, 108 165, 105 195
             C 100 230, 108 260, 115 285
             C 122 310, 135 340, 155 365
             C 175 390, 200 405, 225 415
             C 240 420, 248 418, 255 415
             L 255 400
             C 248 395, 240 385, 235 370
             C 228 350, 222 325, 220 300
             C 218 275, 220 250, 225 225
             C 230 200, 238 178, 248 160
             C 252 152, 255 145, 255 135
             L 255 75
             C 253 72, 251 70, 250 70 Z"
          fill="url(#brainFill)"
          stroke="rgba(84, 215, 255, 0.55)"
          strokeWidth="1.5"
        />

        {/* Right hemisphere */}
        <path
          className="brain-hemisphere"
          d="M 260 70
             C 300 70, 340 85, 365 110
             C 390 135, 402 165, 405 195
             C 410 230, 402 260, 395 285
             C 388 310, 375 340, 355 365
             C 335 390, 310 405, 285 415
             C 270 420, 262 418, 255 415
             L 255 400
             C 262 395, 270 385, 275 370
             C 282 350, 288 325, 290 300
             C 292 275, 290 250, 285 225
             C 280 200, 272 178, 262 160
             C 258 152, 255 145, 255 135
             L 255 75
             C 257 72, 259 70, 260 70 Z"
          fill="url(#brainFill)"
          stroke="rgba(84, 215, 255, 0.55)"
          strokeWidth="1.5"
        />

        {/* Central fissure */}
        <path
          d="M 255 75 L 255 415"
          fill="none"
          stroke="rgba(84, 215, 255, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Left hemisphere sulci (brain folds) */}
        <path className="brain-sulcus" d="M 145 150 C 170 145, 200 148, 230 155 C 240 158, 248 160, 252 158" fill="none" stroke="rgba(84, 215, 255, 0.3)" strokeWidth="1" />
        <path className="brain-sulcus" d="M 125 200 C 155 192, 185 195, 215 205 C 235 212, 245 218, 252 215" fill="none" stroke="rgba(84, 215, 255, 0.25)" strokeWidth="0.8" />
        <path className="brain-sulcus" d="M 120 255 C 150 248, 180 252, 210 260 C 230 266, 242 270, 250 268" fill="none" stroke="rgba(84, 215, 255, 0.25)" strokeWidth="0.8" />
        <path className="brain-sulcus" d="M 130 310 C 158 302, 188 308, 218 318 C 235 324, 245 328, 252 325" fill="none" stroke="rgba(84, 215, 255, 0.22)" strokeWidth="0.8" />
        <path className="brain-sulcus" d="M 155 360 C 178 354, 205 358, 230 365 C 242 369, 250 372, 254 370" fill="none" stroke="rgba(84, 215, 255, 0.2)" strokeWidth="0.7" />

        {/* Right hemisphere sulci */}
        <path className="brain-sulcus" d="M 365 150 C 340 145, 310 148, 280 155 C 270 158, 262 160, 258 158" fill="none" stroke="rgba(84, 215, 255, 0.3)" strokeWidth="1" />
        <path className="brain-sulcus" d="M 385 200 C 355 192, 325 195, 295 205 C 275 212, 265 218, 258 215" fill="none" stroke="rgba(84, 215, 255, 0.25)" strokeWidth="0.8" />
        <path className="brain-sulcus" d="M 390 255 C 360 248, 330 252, 300 260 C 280 266, 268 270, 260 268" fill="none" stroke="rgba(84, 215, 255, 0.25)" strokeWidth="0.8" />
        <path className="brain-sulcus" d="M 380 310 C 352 302, 322 308, 292 318 C 275 324, 265 328, 258 325" fill="none" stroke="rgba(84, 215, 255, 0.22)" strokeWidth="0.8" />
        <path className="brain-sulcus" d="M 355 360 C 332 354, 305 358, 280 365 C 268 369, 260 372, 256 370" fill="none" stroke="rgba(84, 215, 255, 0.2)" strokeWidth="0.7" />

        {/* Frontal lobe detail curves */}
        <path className="brain-sulcus" d="M 180 110 C 200 105, 225 108, 250 115" fill="none" stroke="rgba(84, 215, 255, 0.2)" strokeWidth="0.7" />
        <path className="brain-sulcus" d="M 330 110 C 310 105, 285 108, 260 115" fill="none" stroke="rgba(84, 215, 255, 0.2)" strokeWidth="0.7" />

        {/* Cerebellum (bottom) */}
        <path
          className="brain-cerebellum"
          d="M 200 400 C 210 410, 225 418, 250 420 C 275 418, 290 410, 310 400"
          fill="none"
          stroke="rgba(98, 241, 212, 0.35)"
          strokeWidth="1.2"
        />
        <path className="brain-sulcus" d="M 210 408 C 225 414, 245 416, 255 416 C 265 416, 285 414, 300 408" fill="none" stroke="rgba(98, 241, 212, 0.2)" strokeWidth="0.6" />
        <path className="brain-sulcus" d="M 220 412 C 235 416, 250 417, 265 416 C 280 415, 290 412, 295 410" fill="none" stroke="rgba(98, 241, 212, 0.15)" strokeWidth="0.5" />

        {/* Brain stem */}
        <path
          d="M 245 415 C 245 430, 248 440, 250 450 C 252 440, 255 430, 265 415"
          fill="none"
          stroke="rgba(84, 215, 255, 0.3)"
          strokeWidth="1.2"
        />

        {/* Synaptic connections (animated lines between hotspots) */}
        <line x1="250" y1="160" x2="310" y2="200" stroke="rgba(84, 215, 255, 0.5)" strokeWidth="0.8" opacity={synapseOpacity[0]} filter="url(#brainGlow)" />
        <line x1="310" y1="200" x2="280" y2="280" stroke="rgba(98, 241, 212, 0.5)" strokeWidth="0.8" opacity={synapseOpacity[1]} filter="url(#brainGlow)" />
        <line x1="200" y1="220" x2="280" y2="280" stroke="rgba(84, 215, 255, 0.4)" strokeWidth="0.8" opacity={synapseOpacity[2]} filter="url(#brainGlow)" />
        <line x1="250" y1="160" x2="200" y2="220" stroke="rgba(255, 122, 198, 0.4)" strokeWidth="0.8" opacity={synapseOpacity[3]} filter="url(#brainGlow)" />
        <line x1="330" y1="140" x2="350" y2="250" stroke="rgba(84, 215, 255, 0.4)" strokeWidth="0.8" opacity={synapseOpacity[4]} filter="url(#brainGlow)" />
        <line x1="180" y1="280" x2="220" y2="310" stroke="rgba(98, 241, 212, 0.4)" strokeWidth="0.8" opacity={synapseOpacity[5]} filter="url(#brainGlow)" />

        {/* Neural activity hotspots */}
        {hotspots.map((spot, i) => (
          <circle
            key={i}
            cx={spot.cx}
            cy={spot.cy}
            r={isComplete ? spot.r * 1.3 : spot.r}
            fill={isComplete ? "url(#hotspotGradComplete)" : "url(#hotspotGrad)"}
            filter="url(#softGlow)"
            className="neural-hotspot"
          />
        ))}

        {/* Scan beam - only during scanning */}
        {!isComplete && (
          <rect
            className="scan-beam-rect"
            x="100"
            width="310"
            height="20"
            fill="url(#beamGrad)"
            rx="10"
            opacity="0.7"
          />
        )}

        {/* Completion checkmark */}
        {isComplete && (
          <g className="scan-complete-check" transform="translate(210, 190)">
            <circle cx="45" cy="45" r="40" fill="rgba(98, 241, 212, 0.12)" stroke="rgba(98, 241, 212, 0.6)" strokeWidth="2" />
            <path
              d="M 25 45 L 40 60 L 65 32"
              fill="none"
              stroke="rgba(98, 241, 212, 0.9)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
