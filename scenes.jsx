// scenes.jsx — Harita Avı reklam sahneleri
// Hem dikey hem yatay aspect'lerde çalışacak şekilde, layout fonksiyonu üzerinden
// sahne pozisyonlarını okur. Bütün sprite'lar Stage'in içinde render edilir.

const BRAND = {
  navy: '#2D3A45',         // app splash
  navyDeep: '#1F2A33',
  navyDark: '#162028',
  cream: '#F4F1EA',
  white: '#FFFFFF',
  red: '#E54848',          // Şehir Bul kartı
  redDeep: '#C8333F',
  blue: '#1E3A8B',          // Oyun Dünya
  blueMid: '#2563A8',       // Akarsular
  blueLight: '#3DA4D8',     // Göller
  green: '#1F8A6E',         // Bilgi Kartı
  greenDark: '#206B43',     // Ormanlar
  orange: '#E76A26',        // Çalışma Masası
  orangeLight: '#F18A2C',   // Topraklar
  yellow: '#F2A93B',        // Atlas / sarı
  brown: '#7A5443',         // Dağlar
  purple: '#8E3FB3',        // Sınur Kapıları
  pink: '#E0337E',          // Turizm
  gray: '#6B7480',
  grayLight: '#B8BFC6',
};

const FONT_DISPLAY = '"Bebas Neue", Impact, "Arial Black", sans-serif';
const FONT_BODY = '"Inter", system-ui, -apple-system, sans-serif';

// ── Helpers ──────────────────────────────────────────────────────────────────

function useStageSize() {
  // Read aspect from a global the Stage host writes
  return window.__STAGE_SIZE || { w: 1080, h: 1920, aspect: 'vertical' };
}

const isVertical = () => useStageSize().aspect === 'vertical';

// ── Phone frame ──────────────────────────────────────────────────────────────
// Wraps a screen image in an iPhone-ish bezel, scaled.

function PhoneFrame({ x, y, screenSrc, width = 380, rotate = 0, screenStyle = {}, children, opacity = 1, scale = 1 }) {
  const radius = width * 0.12;
  const height = width * 2.05;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width, height,
      transform: `translate(-50%,-50%) rotate(${rotate}deg) scale(${scale})`,
      transformOrigin: 'center',
      opacity,
      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45))',
      willChange: 'transform, opacity',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: '#0a0a0a',
        borderRadius: radius,
        padding: width * 0.025,
        boxSizing: 'border-box',
      }}>
        <div style={{
          width: '100%', height: '100%',
          background: '#fff',
          borderRadius: radius * 0.85,
          overflow: 'hidden',
          position: 'relative',
          ...screenStyle,
        }}>
          {screenSrc && <img src={screenSrc} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }}/>}
          {children}
          {/* Notch */}
          <div style={{
            position: 'absolute', top: 8, left: '50%',
            transform: 'translateX(-50%)',
            width: width * 0.32, height: width * 0.045,
            background: '#0a0a0a',
            borderRadius: 999,
          }}/>
        </div>
      </div>
    </div>
  );
}

// ── Big text title with mask reveal ──────────────────────────────────────────

function BeatTitle({ text, color = '#fff', size = 140, x, y, align = 'center', font = FONT_DISPLAY, weight = 800, ls = '0.02em', lh = 0.95, maxWidth }) {
  const { localTime, duration } = useSprite();
  const { w } = useStageSize();
  // Default wrap-width: 86% of stage so titles never clip
  const effectiveMaxWidth = maxWidth != null ? maxWidth : w * 0.86;
  const entry = 0.25;
  const exit = 0.2;
  const exitStart = duration - exit;

  let opacity = 1, ty = 0, scale = 1;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    opacity = t;
    ty = (1 - t) * 30;
    scale = 0.92 + 0.08 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t;
    ty = -t * 14;
  }
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(-50%, -50%) translateY(${ty}px) scale(${scale})`,
      opacity,
      fontFamily: font,
      fontWeight: weight,
      fontSize: size,
      color,
      letterSpacing: ls,
      lineHeight: lh,
      textAlign: align,
      maxWidth: effectiveMaxWidth,
      whiteSpace: 'pre-line',
      textTransform: 'uppercase',
      willChange: 'transform, opacity',
    }}>{text}</div>
  );
} (logo-ish: HARİTA AVI with red dash) ─────────────────────────

function HaritaAviLogo({ x, y, size = 1, color = '#fff', accent = '#E54848' }) {
  const titleSize = 64 * size;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontFamily: FONT_DISPLAY,
      color,
      lineHeight: 0.95,
    }}>
      <div style={{ fontSize: titleSize, letterSpacing: '0.05em', fontWeight: 800 }}>HARİTA AVI</div>
      <div style={{
        width: 28 * size, height: 6 * size,
        background: accent,
        margin: `${10 * size}px auto 0`,
      }}/>
    </div>
  );
}

// ── App icon (rounded square brand) ─────────────────────────────────────────

function AppIcon({ x, y, size = 200, opacity = 1, scale = 1 }) {
  const r = size * 0.22;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: size, height: size,
      transform: `translate(-50%,-50%) scale(${scale})`,
      opacity,
      borderRadius: r,
      background: `linear-gradient(160deg, ${BRAND.blue} 0%, ${BRAND.navy} 60%, ${BRAND.navyDark} 100%)`,
      boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      gap: size * 0.04,
      color: '#fff',
      fontFamily: FONT_DISPLAY,
      letterSpacing: '0.04em',
      willChange: 'transform, opacity',
    }}>
      <div style={{ fontSize: size * 0.16, lineHeight: 1 }}>HARİTA</div>
      <div style={{ fontSize: size * 0.16, lineHeight: 1 }}>AVI</div>
      <div style={{
        width: size * 0.18, height: size * 0.04,
        background: BRAND.red,
        borderRadius: 2,
        marginTop: size * 0.04,
      }}/>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0–3s)
// "KPSS'de coğrafyada zorlanıyor musun?"
// ───────────────────────────────────────────────────────────────────────────

function Scene_Hook({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const cx = w / 2;
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        // Camera zoom in slowly
        const zoom = 1 + (localTime / duration) * 0.06;
        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: BRAND.navy,
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
            overflow: 'hidden',
          }}>
            {/* Subtle grid */}
            <Grid />
            {/* Pulsing red dot */}
            <PulseDot x={cx} y={v ? h * 0.78 : h * 0.78} size={v ? 14 : 10}/>
          </div>
        );
      }}
    </Sprite>
  );
}

function HookCopy({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  const cx = w / 2;

  // Two beats: "KPSS'de" -> "coğrafya zor mu?"
  return (
    <>
      <Sprite start={start} end={start + 1.4}>
        <BeatTitle
          text="KPSS'DE"
          color="#fff"
          size={v ? 160 : 180}
          x={cx} y={v ? h * 0.42 : h * 0.42}
        />
      </Sprite>
      <Sprite start={start + 1.3} end={end}>
        <BeatTitle
          text={'COĞRAFYA\nZOR MU?'}
          color="#fff"
          size={v ? 150 : 160}
          x={cx} y={v ? h * 0.45 : h * 0.45}
          maxWidth={v ? 900 : 1400}
        />
        <BeatTitle
          text=""
          x={0} y={0} size={1}
        />
      </Sprite>
    </>
  );
}

function Grid() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#fff" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  );
}

function PulseDot({ x, y, size = 14 }) {
  const t = useTime();
  const pulse = (Math.sin(t * 4) + 1) / 2;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      transform: 'translate(-50%, -50%)',
      background: BRAND.red, borderRadius: 999,
      boxShadow: `0 0 ${20 + pulse * 30}px ${BRAND.red}`,
    }}/>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 2 — PROBLEM MONTAGE (3–6s)
// "150+ dağ. 100+ akarsu. 81 il. Ezberlenecek bir sürü şey..."
// ───────────────────────────────────────────────────────────────────────────

const PROBLEM_WORDS = [
  { t: 0.0,  txt: '150+ DAĞ',          color: BRAND.brown },
  { t: 0.35, txt: '100+ AKARSU',       color: BRAND.blueMid },
  { t: 0.70, txt: '81 İL',             color: BRAND.red },
  { t: 1.05, txt: '50+ GÖL',           color: BRAND.blueLight },
  { t: 1.40, txt: 'OVALAR',            color: BRAND.green },
  { t: 1.75, txt: 'PLATOLAR',          color: BRAND.orange },
  { t: 2.10, txt: 'BARAJLAR',          color: BRAND.blue },
  { t: 2.45, txt: 'İKLİMLER',          color: BRAND.purple },
];

function Scene_Problem({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  const dur = end - start;

  return (
    <Sprite start={start} end={end}>
      <div style={{
        position: 'absolute', inset: 0,
        background: BRAND.cream,
        overflow: 'hidden',
      }}/>
      {/* Floating "ezberlenecek" labels with cuts */}
      {PROBLEM_WORDS.map((wObj, i) => {
        const localStart = start + wObj.t;
        const localEnd = localStart + 0.55;
        const seedX = (i * 137) % 100;
        const seedY = (i * 71) % 100;
        const x = v ? (10 + seedX * 0.8) + '%' : (10 + seedX * 0.8) + '%';
        const y = v ? (15 + seedY * 0.7) + '%' : (15 + seedY * 0.7) + '%';
        const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i * 7) % 6);
        return (
          <Sprite key={i} start={localStart} end={localEnd}>
            <FlashWord text={wObj.txt} color={wObj.color} x={x} y={y} rotate={rot} size={v ? 110 : 90}/>
          </Sprite>
        );
      })}
      {/* Final beat: stress confession line */}
      <Sprite start={start + 2.2} end={end}>
        <FinalProblem v={v} w={w} h={h}/>
      </Sprite>
    </Sprite>
  );
}

function FlashWord({ text, color, x, y, rotate = 0, size = 100 }) {
  const { progress } = useSprite();
  const opacity = progress < 0.15 ? progress / 0.15 : progress > 0.85 ? (1 - progress) / 0.15 : 1;
  const scale = 0.85 + Math.min(progress * 2, 1) * 0.15;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%,-50%) rotate(${rotate}deg) scale(${scale})`,
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: size,
      color,
      letterSpacing: '0.02em',
      opacity,
      whiteSpace: 'nowrap',
      textTransform: 'uppercase',
    }}>{text}</div>
  );
}

function FinalProblem({ v, w, h }) {
  const { progress } = useSprite();
  const op = Math.min(progress * 4, 1);
  return (
    <div style={{
      position: 'absolute',
      left: '50%', top: '50%',
      transform: 'translate(-50%,-50%)',
      background: BRAND.navy,
      color: '#fff',
      padding: v ? '40px 60px' : '32px 56px',
      borderRadius: 22,
      fontFamily: FONT_DISPLAY,
      fontSize: v ? 110 : 88,
      fontWeight: 800,
      letterSpacing: '0.02em',
      textAlign: 'center',
      lineHeight: 1.0,
      opacity: op,
      boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
      maxWidth: v ? 880 : 1300,
    }}>
      EZBER DEĞİL,<br/>
      <span style={{ color: BRAND.red }}>OYUN!</span>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 3 — APP REVEAL (6–9s)
// Logo açılır + telefon ekranı (home) yukarı sürer
// ───────────────────────────────────────────────────────────────────────────

function Scene_Reveal({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  const cx = w / 2;
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.navy }}/>
      <Grid/>
      {/* App icon zoom in */}
      <Sprite start={start} end={start + 1.2}>
        {({ progress }) => (
          <AppIcon
            x={cx} y={v ? h * 0.42 : h * 0.4}
            size={v ? 360 : 280}
            scale={0.6 + Easing.easeOutBack(progress) * 0.4}
            opacity={Math.min(progress * 3, 1)}
          />
        )}
      </Sprite>
      {/* Title under icon */}
      <Sprite start={start + 0.5} end={start + 2.4}>
        <BeatTitle
          text="HARİTA AVI"
          color="#fff"
          size={v ? 120 : 110}
          x={cx} y={v ? h * 0.66 : h * 0.7}
          ls="0.05em"
        />
        <Sprite start={start + 0.7} end={start + 2.4}>
          {({ progress }) => (
            <div style={{
              position: 'absolute',
              left: cx, top: v ? h * 0.74 : h * 0.78,
              transform: 'translate(-50%,-50%)',
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: v ? 38 : 32,
              color: BRAND.cream,
              opacity: Math.min(progress * 2, 1),
              letterSpacing: '0.04em',
            }}>
              KPSS COĞRAFYA · OYUNLAŞTIRILMIŞ
            </div>
          )}
        </Sprite>
      </Sprite>
      {/* Then home phone slides up */}
      <Sprite start={start + 1.8} end={end}>
        {({ progress }) => {
          const tEase = Easing.easeOutCubic(Math.min(progress * 1.5, 1));
          const phoneW = v ? 540 : 380;
          const yFrom = h + phoneW;
          const yTo = v ? h * 0.55 : h * 0.55;
          const py = yFrom + (yTo - yFrom) * tEase;
          return (
            <PhoneFrame
              x={cx}
              y={py}
              width={phoneW}
              screenSrc="assets/02-home.jpg"
            />
          );
        }}
      </Sprite>
      <Sprite start={start + 2.2} end={end}>
        <BeatTitle
          text="BÜTÜN COĞRAFYA, CEBİNDE"
          color="#fff"
          size={v ? 60 : 52}
          x={cx} y={v ? h * 0.12 : h * 0.12}
          ls="0.03em"
          font={FONT_BODY}
          weight={700}
        />
      </Sprite>
    </Sprite>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 4 — FEATURE: TÜRKİYE OYUNU (9–14s)
// Kategori kartları, parmak dokunuyor
// ───────────────────────────────────────────────────────────────────────────

function Scene_TurkiyeOyun({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.cream }}/>

      {/* Title */}
      <Sprite start={start} end={start + 1.0}>
        <BeatTitle
          text="OYUNLA ÖĞREN"
          color={BRAND.navy}
          size={v ? 110 : 110}
          x={w / 2} y={v ? h * 0.1 : h * 0.12}
        />
      </Sprite>
      <Sprite start={start + 0.9} end={end}>
        <BeatTitle
          text="TÜRKİYE BÖLÜMÜ"
          color={BRAND.navy}
          size={v ? 76 : 72}
          x={w / 2} y={v ? h * 0.1 : h * 0.12}
          ls="0.04em"
        />
      </Sprite>

      {/* Phone with screen 03/04 */}
      <Sprite start={start + 0.3} end={start + 2.8}>
        {({ progress }) => {
          const tEase = Easing.easeOutCubic(Math.min(progress * 1.5, 1));
          const phoneW = v ? 500 : 420;
          return (
            <PhoneFrame
              x={v ? w * 0.3 : w * 0.3}
              y={v ? h * 0.55 : h * 0.55}
              width={phoneW}
              screenSrc="assets/03-tr-1.jpg"
              opacity={tEase}
              scale={0.9 + tEase * 0.1}
            />
          );
        }}
      </Sprite>
      {/* Phone swap second screen */}
      <Sprite start={start + 2.7} end={end}>
        {({ progress }) => {
          const tEase = Easing.easeOutCubic(Math.min(progress * 2, 1));
          const phoneW = v ? 500 : 420;
          return (
            <PhoneFrame
              x={v ? w * 0.3 : w * 0.3}
              y={v ? h * 0.55 : h * 0.55}
              width={phoneW}
              screenSrc="assets/04-tr-2.jpg"
              opacity={tEase}
              scale={0.95 + tEase * 0.05}
            />
          );
        }}
      </Sprite>

      {/* Floating category chips on the right */}
      <Sprite start={start + 1.0} end={end}>
        <CategoryChips v={v} w={w} h={h}/>
      </Sprite>
    </Sprite>
  );
}

const CATEGORIES = [
  { txt: 'Şehir Bul',       color: BRAND.red,       icon: '🏙' },
  { txt: 'Dağlar',          color: BRAND.brown,     icon: '⛰' },
  { txt: 'Akarsular',       color: BRAND.blueMid,   icon: '〜' },
  { txt: 'Göller',          color: BRAND.blueLight, icon: '◐' },
  { txt: 'Barajlar',        color: BRAND.blue,      icon: '⛅' },
  { txt: 'Ovalar',          color: BRAND.green,     icon: '☘' },
  { txt: 'Madenler',        color: BRAND.gray,      icon: '⚙' },
  { txt: 'Doğal Afetler',   color: BRAND.orange,    icon: '⚠' },
];

function CategoryChips({ v, w, h }) {
  const { localTime } = useSprite();
  const baseX = v ? w * 0.66 : w * 0.66;
  const baseY = v ? h * 0.32 : h * 0.22;
  const stepY = v ? 110 : 100;
  return (
    <>
      {CATEGORIES.map((c, i) => {
        const enter = i * 0.18;
        const t = clamp((localTime - enter) / 0.4, 0, 1);
        const e = Easing.easeOutBack(t);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: baseX,
            top: baseY + i * stepY,
            transform: `translate(-50%, -50%) translateX(${(1 - e) * -120}px) scale(${0.7 + e * 0.3})`,
            opacity: t,
            background: c.color,
            color: '#fff',
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: v ? 34 : 32,
            padding: v ? '14px 28px' : '14px 28px',
            borderRadius: 18,
            boxShadow: '0 14px 30px rgba(0,0,0,0.18)',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ fontSize: v ? 28 : 26, opacity: 0.9 }}>●</span>
            {c.txt}
          </div>
        );
      })}
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 5 — ATLAS + BİLGİ KARTI (14–19s)
// 3 telefon paralel, içerik akışı
// ───────────────────────────────────────────────────────────────────────────

function Scene_Atlas({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, ${BRAND.navy} 0%, ${BRAND.navyDark} 100%)`,
      }}/>
      <Grid/>

      <Sprite start={start} end={start + 1.5}>
        <BeatTitle
          text="HER KONU,"
          color="#fff"
          size={v ? 110 : 100}
          x={w / 2} y={v ? h * 0.12 : h * 0.1}
        />
      </Sprite>
      <Sprite start={start + 1.2} end={end}>
        <BeatTitle
          text={'TEK\nUYGULAMA'}
          color="#fff"
          size={v ? 110 : 100}
          x={w / 2} y={v ? h * 0.12 : h * 0.1}
        />
      </Sprite>

      {/* 3 phones in parallax */}
      <Sprite start={start + 0.4} end={end}>
        {({ progress }) => {
          const drift = progress * 30;
          const phoneW = v ? 360 : 300;
          const baseY = v ? h * 0.55 : h * 0.55;
          return (
            <>
              <PhoneFrame x={v ? w * 0.22 : w * 0.22} y={baseY + drift} width={phoneW} screenSrc="assets/06-bilgi-1.jpg" rotate={-6}/>
              <PhoneFrame x={v ? w * 0.50 : w * 0.50} y={baseY - drift * 0.6} width={phoneW * 1.05} screenSrc="assets/09-atlas.jpg"/>
              <PhoneFrame x={v ? w * 0.78 : w * 0.78} y={baseY + drift * 0.8} width={phoneW} screenSrc="assets/08-hayvan-atlas.jpg" rotate={6}/>
            </>
          );
        }}
      </Sprite>

      {/* Stat callouts */}
      <Sprite start={start + 1.8} end={end}>
        <Stat label="BİLGİ KARTI" value="19" suffix="KONU" x={v ? w * 0.22 : w * 0.22} y={v ? h * 0.88 : h * 0.88} v={v}/>
        <Stat label="TÜRKİYE ATLASI" value="100+" suffix="KAYIT" x={v ? w * 0.50 : w * 0.50} y={v ? h * 0.88 : h * 0.88} v={v}/>
        <Stat label="HAYVANLAR" value="50+" suffix="TÜR" x={v ? w * 0.78 : w * 0.78} y={v ? h * 0.88 : h * 0.88} v={v}/>
      </Sprite>
    </Sprite>
  );
}

function Stat({ label, value, suffix, x, y, v }) {
  const { localTime } = useSprite();
  const t = clamp(localTime / 0.5, 0, 1);
  const e = Easing.easeOutCubic(t);
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(-50%, -50%) translateY(${(1 - e) * 20}px)`,
      opacity: e,
      textAlign: 'center',
      color: '#fff',
      fontFamily: FONT_BODY,
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: v ? 90 : 76, lineHeight: 1, color: BRAND.yellow }}>{value}</div>
      <div style={{ fontSize: v ? 26 : 22, fontWeight: 700, letterSpacing: '0.08em', marginTop: 6 }}>{suffix}</div>
      <div style={{ fontSize: v ? 22 : 18, fontWeight: 500, opacity: 0.7, letterSpacing: '0.06em', marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 6 — DÜNYA + DİLSİZ HARİTA (19–23s)
// ───────────────────────────────────────────────────────────────────────────

function Scene_World({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.cream }}/>

      <Sprite start={start} end={end}>
        <BeatTitle
          text="SADECE TÜRKİYE Mİ?"
          color={BRAND.navy}
          size={v ? 90 : 76}
          x={w / 2} y={v ? h * 0.1 : h * 0.1}
          font={FONT_BODY}
          weight={700}
          ls="0"
        />
      </Sprite>
      <Sprite start={start + 0.7} end={end}>
        <BeatTitle
          text="DÜNYA DA BURADA"
          color={BRAND.red}
          size={v ? 100 : 110}
          x={w / 2} y={v ? h * 0.18 : h * 0.2}
          ls="0.02em"
        />
      </Sprite>

      <Sprite start={start + 0.4} end={end}>
        {({ progress }) => {
          const e = Easing.easeOutCubic(Math.min(progress * 1.5, 1));
          const phoneW = v ? 480 : 380;
          return (
            <>
              <PhoneFrame
                x={v ? w * 0.32 : w * 0.32}
                y={v ? h * 0.6 : h * 0.6}
                width={phoneW}
                screenSrc="assets/05-world.jpg"
                rotate={-3}
                opacity={e}
                scale={0.9 + e * 0.1}
              />
              <PhoneFrame
                x={v ? w * 0.68 : w * 0.68}
                y={v ? h * 0.6 : h * 0.6}
                width={phoneW}
                screenSrc="assets/07-bilgi-2.jpg"
                rotate={3}
                opacity={e}
                scale={0.9 + e * 0.1}
              />
            </>
          );
        }}
      </Sprite>

      {/* Bottom row: dilsiz harita callout */}
      <Sprite start={start + 1.4} end={end}>
        {({ progress }) => {
          const e = Easing.easeOutBack(Math.min(progress * 2, 1));
          return (
            <div style={{
              position: 'absolute',
              left: w / 2, top: v ? h * 0.93 : h * 0.92,
              transform: `translate(-50%, -50%) scale(${0.8 + e * 0.2})`,
              opacity: Math.min(progress * 3, 1),
              background: BRAND.navy,
              color: '#fff',
              padding: v ? '22px 40px' : '18px 36px',
              borderRadius: 18,
              fontFamily: FONT_BODY,
              fontWeight: 700,
              fontSize: v ? 36 : 30,
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ color: BRAND.yellow }}>+</span> DİLSİZ HARİTA · SORU BANKASI · DERS NOTLARI
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 7 — FEATURE GRID (23–26s)
// Tüm özellikler aynı anda parlar
// ───────────────────────────────────────────────────────────────────────────

const FEATURES = [
  { t: 'OYUN: TÜRKİYE',    c: BRAND.red },
  { t: 'OYUN: DÜNYA',       c: BRAND.blue },
  { t: 'BİLGİ KARTI',       c: BRAND.green },
  { t: 'TÜRKİYE ATLASI',    c: BRAND.yellow },
  { t: 'DİLSİZ HARİTA',     c: BRAND.blueMid },
  { t: 'ÇALIŞMA MASASI',    c: BRAND.orange },
  { t: 'SORU BANKASI',      c: BRAND.greenDark },
  { t: 'DERS NOTLARI',      c: BRAND.orangeLight },
];

function Scene_FeatureGrid({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  const cols = 2;
  const rows = 4;
  const gridW = v ? w * 0.86 : w * 0.6;
  const gridH = v ? h * 0.6 : h * 0.7;
  const x0 = (w - gridW) / 2;
  const y0 = v ? h * 0.22 : (h - gridH) / 2;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const pad = v ? 14 : 14;

  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.navy }}/>
      <Grid/>

      <Sprite start={start} end={end}>
        <BeatTitle
          text={v ? '8 MOD\nTEK UYGULAMA' : '8 MOD · TEK UYGULAMA'}
          color="#fff"
          size={v ? 88 : 88}
          x={w / 2} y={v ? h * 0.12 : h * 0.13}
        />
      </Sprite>

      {FEATURES.map((f, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const fx = x0 + c * cellW + pad;
        const fy = y0 + r * cellH + pad;
        const enter = i * 0.06;
        return (
          <Sprite key={i} start={start + enter} end={end}>
            {({ progress }) => {
              const e = Easing.easeOutBack(Math.min(progress * 4, 1));
              return (
                <div style={{
                  position: 'absolute',
                  left: fx, top: fy,
                  width: cellW - pad * 2, height: cellH - pad * 2,
                  background: f.c,
                  borderRadius: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff',
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: v ? 52 : 44,
                  letterSpacing: '0.03em',
                  textAlign: 'center',
                  padding: 16,
                  transform: `scale(${0.5 + e * 0.5})`,
                  opacity: Math.min(progress * 4, 1),
                  boxShadow: '0 16px 36px rgba(0,0,0,0.25)',
                }}>{f.t}</div>
              );
            }}
          </Sprite>
        );
      })}
    </Sprite>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SCENE 8 — CTA (26–30s)
// Logo + indirme rozetleri
// ───────────────────────────────────────────────────────────────────────────

function Scene_CTA({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  const cx = w / 2;
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.navy }}/>
      <Grid/>

      <Sprite start={start} end={end}>
        {({ progress }) => {
          const e = Easing.easeOutBack(Math.min(progress * 2, 1));
          return (
            <div style={{
              position: 'absolute',
              left: cx, top: v ? h * 0.32 : h * 0.32,
              transform: `translate(-50%, -50%) scale(${0.7 + e * 0.3})`,
              opacity: Math.min(progress * 3, 1),
            }}>
              <AppIcon x={0} y={0} size={v ? 320 : 240}/>
            </div>
          );
        }}
      </Sprite>

      <Sprite start={start + 0.4} end={end}>
        <BeatTitle
          text="HARİTA AVI"
          color="#fff"
          size={v ? 130 : 130}
          x={cx} y={v ? h * 0.55 : h * 0.55}
          ls="0.05em"
        />
      </Sprite>

      <Sprite start={start + 0.7} end={end}>
        <BeatTitle
          text="HEMEN İNDİR · ÜCRETSİZ"
          color={BRAND.yellow}
          size={v ? 56 : 44}
          x={cx} y={v ? h * 0.64 : h * 0.65}
          font={FONT_BODY}
          weight={700}
          ls="0.06em"
        />
      </Sprite>

      {/* Store badges */}
      <Sprite start={start + 1.0} end={end}>
        {({ progress }) => {
          const e = Easing.easeOutBack(Math.min(progress * 2.5, 1));
          const gap = v ? 36 : 32;
          const badgeW = v ? 360 : 300;
          const badgeH = v ? 110 : 92;
          return (
            <div style={{
              position: 'absolute',
              left: cx, top: v ? h * 0.78 : h * 0.82,
              transform: `translate(-50%, -50%) translateY(${(1 - e) * 30}px)`,
              opacity: Math.min(progress * 3, 1),
              display: 'flex', flexDirection: v ? 'column' : 'row', gap,
            }}>
              <StoreBadge kind="apple" w={badgeW} h={badgeH} v={v}/>
              <StoreBadge kind="google" w={badgeW} h={badgeH} v={v}/>
            </div>
          );
        }}
      </Sprite>

      {/* KPSS tag */}
      <Sprite start={start + 0.2} end={end}>
        <div style={{
          position: 'absolute',
          left: cx, top: v ? h * 0.05 : h * 0.07,
          transform: 'translate(-50%, -50%)',
          color: BRAND.red,
          fontFamily: FONT_BODY,
          fontWeight: 800,
          fontSize: v ? 34 : 28,
          letterSpacing: '0.2em',
          padding: '8px 18px',
          border: `2px solid ${BRAND.red}`,
          borderRadius: 4,
        }}>KPSS · 2026</div>
      </Sprite>
    </Sprite>
  );
}

function StoreBadge({ kind, w, h, v }) {
  const isApple = kind === 'apple';
  return (
    <div style={{
      width: w, height: h,
      background: '#000',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: 14,
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '0 22px',
      color: '#fff',
      fontFamily: FONT_BODY,
    }}>
      <div style={{ fontSize: h * 0.55, lineHeight: 1 }}>
        {isApple ? '' : '▶'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span style={{ fontSize: h * 0.18, opacity: 0.7, letterSpacing: '0.06em' }}>
          {isApple ? 'Download on the' : 'GET IT ON'}
        </span>
        <span style={{ fontSize: h * 0.32, fontWeight: 700, letterSpacing: '0.01em' }}>
          {isApple ? 'App Store' : 'Google Play'}
        </span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// MAIN COMPOSITION
// ───────────────────────────────────────────────────────────────────────────

function Ad() {
  const t = useTime();
  // Update screen-label with rounded second for comment context
  React.useEffect(() => {
    const root = document.querySelector('[data-screen-label]');
    if (root) root.setAttribute('data-screen-label', `t=${t.toFixed(0)}s`);
  }, [Math.floor(t)]);

  return (
    <>
      <Scene_Hook         start={0}  end={3.0}/>
      <HookCopy           start={0.2} end={3.0}/>
      <Scene_Problem      start={3.0} end={6.0}/>
      <Scene_Reveal       start={6.0} end={9.0}/>
      <Scene_TurkiyeOyun  start={9.0} end={14.0}/>
      <Scene_Atlas        start={14.0} end={19.0}/>
      <Scene_World        start={19.0} end={23.0}/>
      <Scene_FeatureGrid  start={23.0} end={26.0}/>
      <Scene_CTA          start={26.0} end={30.0}/>
    </>
  );
}

Object.assign(window, {
  Ad, BRAND, FONT_DISPLAY, FONT_BODY,
  Scene_Hook, Scene_Problem, Scene_Reveal,
  Scene_TurkiyeOyun, Scene_Atlas, Scene_World,
  Scene_FeatureGrid, Scene_CTA, HookCopy,
  PhoneFrame, AppIcon, BeatTitle, HaritaAviLogo,
});
