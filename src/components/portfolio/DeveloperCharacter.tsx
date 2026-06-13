export function DeveloperCharacter() {
  return (
    <div
      style={{
        animation: "character-float 4s ease-in-out infinite",
      }}
    >
      <svg
        viewBox="0 0 300 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", maxWidth: 300 }}
      >
        <defs>
          <filter id="char-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="10"
              floodColor="#000"
              floodOpacity="0.35"
            />
          </filter>
          <linearGradient id="screen-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
          {/* Hair gradients for pompadour */}
          <linearGradient id="hair-main" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#2a1a0e" />
            <stop offset="50%" stopColor="#1a1008" />
            <stop offset="100%" stopColor="#0f0904" />
          </linearGradient>
          <linearGradient id="hair-highlight" x1="0.2" y1="0" x2="0.8" y2="0.6">
            <stop offset="0%" stopColor="#3d2a16" />
            <stop offset="100%" stopColor="#2a1a0e" />
          </linearGradient>
          <linearGradient id="hair-side" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#1a1008" />
            <stop offset="100%" stopColor="#110b05" />
          </linearGradient>
          {/* Jacket gradient */}
          <linearGradient id="jacket-grad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0f0f1a" />
          </linearGradient>
          <linearGradient id="jacket-lapel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#222240" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          {/* Hoodie gradient */}
          <linearGradient id="hoodie-inner" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#b8b8b8" />
            <stop offset="100%" stopColor="#9a9a9a" />
          </linearGradient>
          {/* Skin */}
          <radialGradient id="skin-grad" cx="0.45" cy="0.35" r="0.55">
            <stop offset="0%" stopColor="#dda07a" />
            <stop offset="100%" stopColor="#d4956a" />
          </radialGradient>
        </defs>

        {/* ══════════════════════════════════════════
            Layer 1: BODY — Jacket over Hoodie
            ══════════════════════════════════════════ */}
        <g filter="url(#char-shadow)">
          {/* Jacket body — dark navy blazer */}
          <path
            d="M92,305 Q90,285 115,272 L185,272 Q210,285 208,305 L212,440 Q212,460 190,465 L110,465 Q88,460 88,440 Z"
            fill="url(#jacket-grad)"
          />
          {/* Jacket left shoulder */}
          <path
            d="M92,305 Q75,295 68,310 Q62,330 65,365 L88,365 Q86,330 88,310 Z"
            fill="url(#jacket-grad)"
          />
          {/* Jacket right shoulder */}
          <path
            d="M208,305 Q225,295 232,310 Q238,330 235,365 L212,365 Q214,330 212,310 Z"
            fill="url(#jacket-grad)"
          />
          {/* Left arm sleeve */}
          <path
            d="M65,365 Q60,390 62,410 Q64,425 72,435 L88,430 Q82,415 80,400 Q78,385 88,365 Z"
            fill="#0f0f1a"
          />
          {/* Right arm sleeve */}
          <path
            d="M235,365 Q240,385 238,405 Q236,420 228,430 L212,425 Q218,410 220,395 Q222,380 212,365 Z"
            fill="#0f0f1a"
          />

          {/* Jacket lapels — left */}
          <path
            d="M115,272 L140,272 L132,340 L108,320 Q98,310 100,295 Z"
            fill="url(#jacket-lapel)"
          />
          {/* Jacket lapels — right */}
          <path
            d="M185,272 L160,272 L168,340 L192,320 Q202,310 200,295 Z"
            fill="url(#jacket-lapel)"
          />
          {/* Lapel fold lines */}
          <path
            d="M115,275 L108,318"
            stroke="#2d2d4a"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M185,275 L192,318"
            stroke="#2d2d4a"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />

          {/* Hoodie visible inside jacket — V-neck area */}
          <path d="M132,272 L150,310 L168,272 Z" fill="url(#hoodie-inner)" />
          {/* Hoodie collar/hood visible behind neck */}
          <path
            d="M122,265 Q130,255 150,252 Q170,255 178,265 Q175,270 170,272 L130,272 Q125,270 122,265 Z"
            fill="#c0c0c0"
          />
          {/* Hoodie hood edge */}
          <path
            d="M122,265 Q118,260 120,252 Q130,242 150,240 Q170,242 180,252 Q182,260 178,265"
            stroke="#b0b0b0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          {/* Hoodie texture — speckle dots */}
          <circle cx="143" cy="285" r="0.6" fill="#a0a0a0" opacity="0.3" />
          <circle cx="148" cy="290" r="0.5" fill="#a0a0a0" opacity="0.25" />
          <circle cx="155" cy="283" r="0.6" fill="#a0a0a0" opacity="0.3" />
          <circle cx="150" cy="298" r="0.5" fill="#a0a0a0" opacity="0.2" />
          <circle cx="157" cy="295" r="0.6" fill="#a0a0a0" opacity="0.25" />

          {/* Jacket button */}
          <circle
            cx="150"
            cy="345"
            r="3"
            fill="#2a2a45"
            stroke="#3a3a5a"
            strokeWidth="0.5"
          />
          <circle
            cx="150"
            cy="375"
            r="3"
            fill="#2a2a45"
            stroke="#3a3a5a"
            strokeWidth="0.5"
          />

          {/* Jacket pocket lines */}
          <path
            d="M105,370 Q110,372 125,372"
            stroke="#2a2a45"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M195,370 Q190,372 175,372"
            stroke="#2a2a45"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* ══════════════════════════════════════════
            Layer 2: Neck
            ══════════════════════════════════════════ */}
        <rect x="137" y="248" width="26" height="18" rx="6" fill="#d4956a" />
        <rect
          x="137"
          y="258"
          width="26"
          height="7"
          rx="3"
          fill="#c07850"
          opacity="0.25"
        />

        {/* ══════════════════════════════════════════
            Layer 3: Head
            ══════════════════════════════════════════ */}
        <ellipse cx="150" cy="190" rx="60" ry="70" fill="url(#skin-grad)" />
        {/* Jaw definition */}
        <path
          d="M100,210 Q110,250 150,258 Q190,250 200,210"
          stroke="#c07850"
          strokeWidth="0.5"
          fill="none"
          opacity="0.15"
        />

        {/* ══════════════════════════════════════════
            Layer 4: Facial Features
            ══════════════════════════════════════════ */}
        {/* Left eye */}
        <g>
          <ellipse cx="130" cy="192" rx="14" ry="11" fill="#f5f5f0" />
          <circle cx="132" cy="193" r="6.5" fill="#3d2b1f" />
          <circle cx="132" cy="193" r="3.2" fill="#1a0f08" />
          <circle cx="134" cy="190" r="2" fill="#fff" opacity="0.85" />
          <circle cx="129" cy="195" r="0.8" fill="#fff" opacity="0.4" />
          <path
            d="M117,186 Q130,179 144,186"
            stroke="#c07850"
            strokeWidth="0.8"
            fill="none"
            opacity="0.2"
          />
        </g>
        {/* Right eye */}
        <g>
          <ellipse cx="170" cy="192" rx="14" ry="11" fill="#f5f5f0" />
          <circle cx="172" cy="193" r="6.5" fill="#3d2b1f" />
          <circle cx="172" cy="193" r="3.2" fill="#1a0f08" />
          <circle cx="174" cy="190" r="2" fill="#fff" opacity="0.85" />
          <circle cx="169" cy="195" r="0.8" fill="#fff" opacity="0.4" />
          <path
            d="M156,186 Q170,179 184,186"
            stroke="#c07850"
            strokeWidth="0.8"
            fill="none"
            opacity="0.2"
          />
        </g>

        {/* Eyebrows — slightly thick, well-groomed */}
        <path
          d="M115,176 Q123,170 132,172 Q140,174 144,178"
          stroke="#1a1008"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M156,178 Q160,174 168,172 Q177,170 185,176"
          stroke="#1a1008"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Nose */}
        <path
          d="M148,205 Q150,215 153,205"
          stroke="#c07850"
          strokeWidth="1.5"
          fill="none"
          opacity="0.45"
          strokeLinecap="round"
        />
        <path
          d="M144,214 Q150,218 156,214"
          stroke="#c07850"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        />

        {/* Mouth — confident smile */}
        <path
          d="M136,230 Q143,240 150,241 Q157,240 164,230"
          stroke="#c07850"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="150"
          cy="237"
          rx="9"
          ry="3.5"
          fill="#c07850"
          opacity="0.25"
        />

        {/* Ears */}
        <ellipse cx="90" cy="197" rx="8" ry="14" fill="#d4956a" />
        <ellipse cx="90" cy="197" rx="4" ry="8" fill="#c07850" opacity="0.25" />
        <ellipse cx="210" cy="197" rx="8" ry="14" fill="#d4956a" />
        <ellipse
          cx="210"
          cy="197"
          rx="4"
          ry="8"
          fill="#c07850"
          opacity="0.25"
        />

        {/* ══════════════════════════════════════════
            Layer 5: HAIR — Modern Pompadour / Quiff
            Swept up and back with volume on top,
            shorter faded sides
            ══════════════════════════════════════════ */}

        {/* Side hair — short/faded, left */}
        <path
          d="M90,175 Q88,185 90,200 Q92,195 93,180 Q92,170 90,175 Z"
          fill="url(#hair-side)"
        />
        {/* Side fade texture — left */}
        <path
          d="M90,180 Q91,190 90,198"
          stroke="#1a1008"
          strokeWidth="0.6"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M92,178 Q92,188 91,196"
          stroke="#1a1008"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />

        {/* Side hair — short/faded, right */}
        <path
          d="M210,175 Q212,185 210,200 Q208,195 207,180 Q208,170 210,175 Z"
          fill="url(#hair-side)"
        />
        {/* Side fade texture — right */}
        <path
          d="M210,180 Q209,190 210,198"
          stroke="#1a1008"
          strokeWidth="0.6"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M208,178 Q208,188 209,196"
          stroke="#1a1008"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />

        {/* Main hair mass — pompadour base covering top of head */}
        <path
          d="M90,172 
             Q88,155 95,138 
             Q105,118 130,110 
             Q150,105 170,110 
             Q195,118 205,138 
             Q212,155 210,172
             Q208,160 198,148
             Q185,132 150,126
             Q115,132 102,148
             Q92,160 90,172 Z"
          fill="url(#hair-main)"
        />

        {/* Pompadour volume — the big swept-up-and-back top section */}
        <path
          d="M95,160 
             Q90,135 100,115 
             Q112,95 140,88 
             Q160,85 178,92 
             Q200,100 210,120 
             Q215,135 212,155
             Q208,132 198,118
             Q185,100 160,94
             Q140,92 120,100
             Q105,108 98,125
             Q93,140 95,160 Z"
          fill="url(#hair-highlight)"
        />

        {/* Top pompadour crest — the highest swept-back part */}
        <path
          d="M105,140
             Q100,118 112,100
             Q125,85 148,80
             Q170,82 185,95
             Q198,108 200,130
             Q195,112 182,100
             Q168,88 148,86
             Q128,88 118,98
             Q108,112 105,140 Z"
          fill="#2a1a0e"
        />

        {/* Very top crest highlight — shows the swept peak */}
        <path
          d="M115,125
             Q112,108 122,95
             Q135,82 152,80
             Q168,82 180,92
             Q190,102 192,118
             Q186,104 175,94
             Q162,85 148,84
             Q134,85 125,93
             Q117,104 115,125 Z"
          fill="#3d2a16"
          opacity="0.7"
        />

        {/* Hair strand detail lines — swept back direction */}
        <path
          d="M115,130 Q135,108 158,105"
          stroke="#3d2a16"
          strokeWidth="1"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M110,138 Q130,115 155,110"
          stroke="#2d1f0e"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M120,122 Q140,102 165,100"
          stroke="#3d2a16"
          strokeWidth="0.7"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M108,145 Q128,120 150,115"
          stroke="#2d1f0e"
          strokeWidth="0.6"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M125,118 Q145,98 170,96"
          stroke="#3d2a16"
          strokeWidth="0.6"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M118,128 Q142,106 168,104"
          stroke="#2d1f0e"
          strokeWidth="0.5"
          fill="none"
          opacity="0.25"
        />

        {/* Right side swept strands */}
        <path
          d="M190,115 Q195,125 198,140"
          stroke="#2d1f0e"
          strokeWidth="0.7"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M185,110 Q192,120 196,135"
          stroke="#1a1008"
          strokeWidth="0.6"
          fill="none"
          opacity="0.25"
        />

        {/* Hairline edge — natural, slightly irregular where hair meets forehead */}
        <path
          d="M95,165 Q100,155 115,148 Q130,142 150,140 Q170,142 185,148 Q200,155 205,165"
          stroke="#1a1008"
          strokeWidth="1.2"
          fill="none"
          opacity="0.3"
        />

        {/* ══════════════════════════════════════════
            Layer 6: Laptop
            ══════════════════════════════════════════ */}
        <g>
          <rect x="55" y="380" width="82" height="52" rx="5" fill="#1e1e1e" />
          <rect
            x="60"
            y="385"
            width="72"
            height="40"
            rx="3"
            fill="url(#screen-glow)"
          />
          {/* Code lines */}
          <rect
            x="66"
            y="392"
            width="28"
            height="2"
            rx="1"
            fill="#6366f1"
            opacity="0.5"
          />
          <rect
            x="66"
            y="398"
            width="42"
            height="2"
            rx="1"
            fill="#818cf8"
            opacity="0.3"
          />
          <rect
            x="66"
            y="404"
            width="22"
            height="2"
            rx="1"
            fill="#6366f1"
            opacity="0.4"
          />
          <rect
            x="66"
            y="410"
            width="36"
            height="2"
            rx="1"
            fill="#818cf8"
            opacity="0.25"
          />
          <rect
            x="66"
            y="416"
            width="18"
            height="2"
            rx="1"
            fill="#6366f1"
            opacity="0.35"
          />
          {/* Hinge */}
          <rect x="55" y="431" width="82" height="3" rx="1.5" fill="#161616" />
          {/* Keyboard */}
          <path d="M52,434 L140,434 L145,455 L47,455 Z" fill="#141414" />
        </g>

        {/* ══════════════════════════════════════════
            Layer 7: Hands
            ══════════════════════════════════════════ */}
        {/* Left hand on laptop */}
        <g>
          <ellipse cx="82" cy="395" rx="13" ry="9" fill="#d4956a" />
          <rect
            x="70"
            y="390"
            width="5.5"
            height="11"
            rx="2.8"
            fill="#d4956a"
          />
          <rect x="77" y="388" width="5" height="12" rx="2.5" fill="#d4956a" />
          <rect x="83" y="387" width="5" height="12" rx="2.5" fill="#d4956a" />
          <rect x="89" y="388" width="5" height="11" rx="2.5" fill="#d4956a" />
        </g>

        {/* Right hand — thumbs up */}
        <g>
          <ellipse cx="228" cy="370" rx="11" ry="13" fill="#d4956a" />
          <rect x="220" y="375" width="16" height="12" rx="5" fill="#d4956a" />
          {/* Thumb pointing up */}
          <rect x="223" y="350" width="8" height="22" rx="4" fill="#d4956a" />
          <rect
            x="225"
            y="352"
            width="4"
            height="10"
            rx="2"
            fill="#dda07a"
            opacity="0.45"
          />
          {/* Jacket cuff at wrist */}
          <rect x="218" y="425" width="18" height="6" rx="2" fill="#1a1a2e" />
          <rect x="62" y="425" width="18" height="6" rx="2" fill="#1a1a2e" />
        </g>
      </svg>
    </div>
  );
}
