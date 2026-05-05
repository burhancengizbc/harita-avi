// scenes2.jsx — Harita Avı v2 reklam sahneleri
// Yeni görseller: gerçek oyun ekranları, flashcard flip, dilsiz harita, ders notları

const B = {
  navy: '#1C2B38',
  navyMid: '#2D3A45',
  navyLight: '#3A4D5C',
  cream: '#F5F2EC',
  white: '#FFFFFF',
  red: '#E03E3E',
  redDeep: '#C0313E',
  blue: '#1A3A8F',
  blueMid: '#2563A8',
  blueLight: '#3DA4D8',
  teal: '#1A8A70',
  green: '#2D7A3A',
  orange: '#E07020',
  orangeLight: '#F0902A',
  yellow: '#F2A82A',
  brown: '#7A5443',
  purple: '#8A3AB0',
  pink: '#D0306E',
  gray: '#6A7480'
};

const FD = '"Bebas Neue", Impact, "Arial Black", sans-serif';
const FB = '"Inter", system-ui, -apple-system, sans-serif';

function useStageSize() {
  return window.__STAGE_SIZE || { w: 1080, h: 1920, aspect: 'vertical' };
}

// ── helpers ──────────────────────────────────────────────────────────────────

function fadeIn(lt, dur = 0.3) {
  return Math.min(lt / dur, 1);
}
function fadeOut(lt, total, dur = 0.25) {
  const start = total - dur;
  if (lt < start) return 1;
  return Math.max(0, 1 - (lt - start) / dur);
}
function fio(lt, total, inD = 0.3, outD = 0.25) {
  return Math.min(fadeIn(lt, inD), fadeOut(lt, total, outD));
}

// ── Phone frame ───────────────────────────────────────────────────────────────
function Phone({ x, y, w = 360, src, rotate = 0, scale = 1, opacity = 1, children }) {
  const h = w * 2.06;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: w, height: h,
      transform: `translate(-50%,-50%) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))',
      willChange: 'transform,opacity'
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: '#080c10',
        borderRadius: w * 0.115,
        padding: w * 0.028,
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: w * 0.09,
          overflow: 'hidden',
          position: 'relative',
          background: '#fff'
        }}>
          {src && <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          {children}
          {/* Notch */}
          <div style={{
            position: 'absolute', top: 7, left: '50%',
            transform: 'translateX(-50%)',
            width: w * 0.3, height: w * 0.042,
            background: '#080c10', borderRadius: 999
          }} />
        </div>
      </div>
    </div>);

}

// ── Big headline ──────────────────────────────────────────────────────────────
function H({ text, x, y, size, color = '#fff', font = FD, weight = 800, ls = '0.02em', lh = 0.92,
  maxWidth, align = 'center', lt, total, inD = 0.25, outD = 0.2, uppercase = true }) {
  const op = fio(lt, total, inD, outD);
  const ty = (1 - Math.min(lt / inD, 1)) * 28;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%,-50%) translateY(${Easing.easeOutCubic(Math.min(lt / inD, 1)) ? ty * (1 - Easing.easeOutCubic(Math.min(lt / inD, 1))) : ty}px)`,
      opacity: op,
      fontFamily: font,
      fontWeight: weight,
      fontSize: size,
      color,
      letterSpacing: ls,
      lineHeight: lh,
      textAlign: align,
      maxWidth,
      whiteSpace: maxWidth ? 'normal' : 'pre',
      textTransform: uppercase ? 'uppercase' : 'none',
      willChange: 'transform,opacity'
    }}>{text}</div>);

}

// ── Subtle grid bg ────────────────────────────────────────────────────────────
function Grid({ opacity = 0.055 }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}>
      <defs>
        <pattern id="g2" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0L0 0 0 72" fill="none" stroke="#fff" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g2)" />
    </svg>);

}

// ── Pill chip ─────────────────────────────────────────────────────────────────
function Chip({ text, color, x, y, size = 44, lt, delay = 0, v = true }) {
  const e = Easing.easeOutBack(clamp((lt - delay) / 0.4, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%,-50%) scale(${0.5 + e * 0.5}) translateY(${(1 - e) * 40}px)`,
      opacity: clamp((lt - delay) / 0.3, 0, 1),
      background: color,
      color: '#fff',
      fontFamily: FB,
      fontWeight: 700,
      fontSize: size,
      padding: v ? '18px 36px' : '14px 30px',
      borderRadius: 60,
      whiteSpace: 'nowrap',
      boxShadow: '0 12px 28px rgba(0,0,0,0.22)',
      letterSpacing: '0.01em'
    }}>{text}</div>);

}

// ── App icon ──────────────────────────────────────────────────────────────────
function AppIcon({ x, y, size = 200, scale = 1, opacity = 1 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      transform: `translate(-50%,-50%) scale(${scale})`,
      opacity,
      borderRadius: size * 0.22,
      background: `linear-gradient(150deg, #1A3A8F 0%, #1C2B38 55%, #0F1C26 100%)`,
      boxShadow: '0 24px 56px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: size * 0.04,
      color: '#fff', fontFamily: FD, letterSpacing: '0.04em'
    }}>
      <div style={{ fontSize: size * 0.16, lineHeight: 1 }}>
</div>
      <div style={{ fontSize: size * 0.16, lineHeight: 1 }}>
</div>
      <div style={{ width: size * 0.18, height: size * 0.042, background: B.red, borderRadius: 2, marginTop: size * 0.04 }} />
    </div>);}

// ── Store badge ───────────────────────────────────────────────────────────────
function Badge({ kind, w = 340, h = 100 }) {
  const apple = kind === 'apple';
  return (
    <div style={{
      width: w, height: h,
      background: '#000',
      border: '1.5px solid rgba(255,255,255,0.2)',
      borderRadius: 14,
      display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px',
      color: '#fff', fontFamily: FB,
      flexShrink: 0
    }}>
      <div style={{ fontSize: h * 0.52, lineHeight: 1 }}>{apple ? '' : '▶'}</div>
      <div style={{ flexDirection: 'column', display: 'flex', lineHeight: 1.1 }}>
        <span style={{ fontSize: h * 0.17, opacity: 0.72, letterSpacing: '0.06em' }}>
          {apple ? 'Download on the' : 'GET IT ON'}
        </span>
        <span style={{ fontSize: h * 0.31, fontWeight: 700 }}>
          {apple ? 'App Store' : 'Google Play'}
        </span>
      </div>
    </div>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 1 — HOOK  (0 – 3s)
// "KPSS'DE COĞRAFYA ZOR MU?" + home ekranı uzaktan yaklaşıyor
// ══════════════════════════════════════════════════════════════════════════════
function S1_Hook({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const zoom = 1 + lt / dur * 0.05;
        const phoneScale = Easing.easeOutCubic(clamp((lt - 0.6) / 1.0, 0, 1));
        const phoneY_from = h * 1.5;
        const phoneY_to = v ? h * 0.58 : h * 0.58;
        const phoneY = phoneY_from + (phoneY_to - phoneY_from) * phoneScale;

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {/* BG */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 40%, #2D4058 0%, ${B.navy} 65%)`,
              transform: `scale(${zoom})`
            }} />
            <Grid />

            {/* Red accent line top */}
            {lt > 0.2 &&
            <div style={{
              position: 'absolute', left: 0, top: v ? h * 0.08 : h * 0.08,
              width: `${Math.min((lt - 0.2) / 0.4, 1) * 100}%`,
              height: 4, background: B.red
            }} />
            }

            {/* KPSS'DE */}
            {lt > 0.15 &&
            <H text="KPSS'DE" x={w / 2} y={v ? h * 0.26 : h * 0.24}
            size={v ? 210 : 180} lt={lt - 0.15} total={dur - 0.15} />
            }
            {/* COĞRAFYA */}
            {lt > 0.4 &&
            <H text="COĞRAFYA" x={w / 2} y={v ? h * 0.37 : h * 0.36}
            size={v ? 170 : 148} color={B.yellow} lt={lt - 0.4} total={dur - 0.4} />
            }
            {/* ZOR MU? */}
            {lt > 0.6 &&
            <H text="ZOR MU?" x={w / 2} y={v ? h * 0.47 : h * 0.47}
            size={v ? 210 : 180} lt={lt - 0.6} total={dur - 0.6} />
            }

            {/* Home phone slides up */}
            <Phone
              x={w / 2} y={phoneY}
              w={v ? 460 : 340}
              src="assets2/01-home.jpg"
              scale={0.85 + phoneScale * 0.15}
              opacity={phoneScale} />
            
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 2 — TÜRKİYE OYUNU  (3 – 8s)
// Renkli kategori grid'i, sonra 3 oyun ekranı hızlı cut
// ══════════════════════════════════════════════════════════════════════════════
function S2_TurkiyeOyun({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        // Phase 1: 0-2s — category grid + label
        // Phase 2: 2-5s — 3 game phones side by side
        const phase2 = lt > 2.0;

        const p1Op = fio(lt, 2.2, 0.3, 0.3);
        const p2Op = fio(lt - 2.0, dur - 2.0, 0.35, 0.3);

        const phoneW = v ? 310 : 270;
        const phoneBaseY = v ? h * 0.58 : h * 0.58;
        const p2entry = Easing.easeOutCubic(clamp((lt - 2.0) / 0.6, 0, 1));

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: B.cream }}>

            {/* PHASE 1: Category showcase */}
            <div style={{ position: 'absolute', inset: 0, opacity: p1Op }}>
              {/* BG: colorful category grid full-bleed behind */}
              <img src="assets2/02-turkiye-bolum-1.jpg" alt="" style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.35) saturate(0.8)'
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(28,43,56,0.7) 0%, rgba(28,43,56,0.4) 50%, rgba(28,43,56,0.85) 100%)'
              }} />

              {/* Title */}
              <H text="TÜRKİYE" x={w / 2} y={v ? h * 0.14 : h * 0.14}
              size={v ? 200 : 160} lt={lt} total={2.2} />
              <H text="BÖLÜMÜ" x={w / 2} y={v ? h * 0.24 : h * 0.27}
              size={v ? 200 : 160} color={B.red} lt={lt - 0.15} total={2.2 - 0.15} />

              {/* Chips */}
              {[
              { t: 'ŞEHİR BUL', c: B.red, d: 0.4 },
              { t: 'DAĞLAR', c: B.brown, d: 0.55 },
              { t: 'AKARSULAR', c: B.blueMid, d: 0.7 },
              { t: 'GÖLLER', c: B.blueLight, d: 0.85 },
              { t: 'BARAJLAR', c: B.blue, d: 1.0 },
              { t: 'OVALAR', c: B.teal, d: 1.15 }].
              map((c, i) => {
                const cols = 2;
                const row = Math.floor(i / cols);
                const col = i % cols;
                const cx = v ? w * 0.27 + col * w * 0.46 : w * 0.22 + col * w * 0.38;
                const cy = v ? h * 0.42 + row * (v ? 160 : 120) : h * 0.42 + row * 110;
                return <Chip key={i} text={c.t} color={c.c} x={cx} y={cy}
                size={v ? 44 : 36} lt={lt} delay={c.d} v={v} />;
              })}

              {/* Phone with category grid */}
              {lt > 0.8 &&
              <Phone
                x={v ? w * 0.5 : w * 0.72}
                y={v ? h * 0.79 : h * 0.58}
                w={v ? 480 : 340}
                src="assets2/02-turkiye-bolum-1.jpg"
                scale={Easing.easeOutBack(clamp((lt - 0.8) / 0.6, 0, 1))}
                opacity={Easing.easeOutCubic(clamp((lt - 0.8) / 0.4, 0, 1))} />

              }
            </div>

            {/* PHASE 2: 3 game phones */}
            <div style={{ position: 'absolute', inset: 0, opacity: p2Op, background: B.navy, overflow: 'hidden' }}>
              <Grid />
              {/* Heading */}
              <H text={'HADİ\nOYNAYALIM'} x={w / 2} y={v ? h * 0.12 : h * 0.12}
              size={v ? 160 : 128} lt={lt - 2.0} total={dur - 2.0} />

              {/* 3 game phones */}
              {[
              { src: 'assets2/06-game-sehir.jpg', label: 'ŞEHİR BUL', dx: v ? -0.33 : -0.3, rot: -8 },
              { src: 'assets2/04-game-akarsu.jpg', label: 'AKARSULAR', dx: 0, rot: 0 },
              { src: 'assets2/05-game-gol.jpg', label: 'GÖLLER', dx: v ? 0.33 : 0.3, rot: 8 }].
              map((p, i) => {
                const e = Easing.easeOutBack(clamp((lt - 2.0 - i * 0.12) / 0.55, 0, 1));
                const baseX = w / 2 + p.dx * w;
                const drift = lt > 2.0 ? (lt - 2.0) * 12 : 0;
                const yOff = i === 1 ? 0 : i === 0 ? -drift * 0.5 : drift * 0.5;
                return (
                  <React.Fragment key={i}>
                    <Phone
                      x={baseX}
                      y={v ? h * 0.56 + yOff : h * 0.58 + yOff}
                      w={i === 1 ? phoneW * 1.08 : phoneW}
                      src={p.src}
                      rotate={p.rot}
                      scale={0.6 + e * 0.4}
                      opacity={Math.min((lt - 2.0 - i * 0.12) / 0.3, 1)} />
                    
                    {/* Label */}
                    <div style={{
                      position: 'absolute',
                      left: baseX, top: v ? h * 0.88 : h * 0.92,
                      transform: 'translate(-50%,-50%)',
                      color: '#fff',
                      fontFamily: FB, fontWeight: 800,
                      fontSize: v ? 34 : 28,
                      letterSpacing: '0.05em',
                      opacity: Math.min((lt - 2.0 - i * 0.15) / 0.3, 1),
                      background: i === 0 ? B.red : i === 1 ? B.blueMid : B.blueLight,
                      padding: '10px 22px', borderRadius: 999,
                      whiteSpace: 'nowrap'
                    }}>{p.label}</div>
                  </React.Fragment>);

              })}
            </div>
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 3 — BİLGİ KARTI FLIP  (8 – 12s)
// Flashcard: SORU tarafı → 3D flip → CEVAP tarafı
// ══════════════════════════════════════════════════════════════════════════════
function S3_FlashCard({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        // Flip at t=2.0 — 0.6s duration
        const flipProgress = clamp((lt - 2.0) / 0.6, 0, 1);
        const flipAngle = flipProgress * 180; // 0 → 180 degrees

        // Front (soru) visible when angle < 90
        const showFront = flipAngle < 90;
        // Back (cevap) visible when angle >= 90
        const cardAngle = flipAngle > 90 ? flipAngle - 180 : flipAngle;

        const cardW = v ? 760 : 640;
        const cardH = v ? 920 : 720;

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {/* BG */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(160deg, #F0EDE6 0%, #E6E0D6 100%)`
            }} />

            {/* Top label */}
            {lt > 0.2 &&
            <H text="BİLGİ KARTI" x={w / 2} y={v ? h * 0.08 : h * 0.08}
            size={v ? 100 : 82} color={B.navy} lt={lt - 0.2} total={dur - 0.2}
            font={FB} weight={800} ls="0.04em" />
            }
            {lt > 0.4 &&
            <H text="SORU → CEVAP → ÖĞREN" x={w / 2} y={v ? h * 0.14 : h * 0.15}
            size={v ? 40 : 34} color={B.gray}
            lt={lt - 0.4} total={dur - 0.4}
            font={FB} weight={600} ls="0.06em" />
            }

            {/* 3D flip card */}
            <div style={{
              position: 'absolute',
              left: w / 2 - cardW / 2, top: v ? h * 0.22 : h * 0.2,
              width: cardW, height: cardH,
              perspective: 1200,
              opacity: fio(lt, dur, 0.4, 0.4)
            }}>
              <div style={{
                width: '100%', height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${flipAngle}deg)`,
                transition: 'none'
              }}>
                {/* FRONT — SORU */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  borderRadius: 28,
                  overflow: 'hidden',
                  boxShadow: '0 32px 72px rgba(0,0,0,0.28)'
                }}>
                  <img src="assets2/11-flash-soru.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: B.orange, color: '#fff',
                    fontFamily: FB, fontWeight: 800, fontSize: 32,
                    padding: '8px 18px', borderRadius: 999,
                    letterSpacing: '0.06em'
                  }}>SORU</div>
                </div>

                {/* BACK — CEVAP */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: 28,
                  overflow: 'hidden',
                  boxShadow: '0 32px 72px rgba(0,0,0,0.28)'
                }}>
                  <img src="assets2/12-flash-cevap.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: B.teal, color: '#fff',
                    fontFamily: FB, fontWeight: 800, fontSize: 32,
                    padding: '8px 18px', borderRadius: 999,
                    letterSpacing: '0.06em'
                  }}>CEVAP</div>
                </div>
              </div>
            </div>

            {/* "Tap to flip" hint */}
            {lt < 2.1 && lt > 0.8 &&
            <div style={{
              position: 'absolute',
              left: w / 2, top: v ? h * 0.92 : h * 0.92,
              transform: 'translate(-50%,-50%)',
              color: B.navy, fontFamily: FB, fontWeight: 700,
              fontSize: v ? 38 : 32, letterSpacing: '0.04em',
              opacity: 0.5 + 0.5 * Math.sin(lt * 4)
            }}>👆 ÇEVIR</div>
            }

            {/* Post-flip tag */}
            {flipProgress > 0.7 &&
            <div style={{
              position: 'absolute',
              left: w / 2, top: v ? h * 0.92 : h * 0.92,
              transform: 'translate(-50%,-50%)',
              fontFamily: FB, fontWeight: 800, fontSize: v ? 44 : 36,
              color: B.teal, letterSpacing: '0.03em',
              opacity: Easing.easeOutCubic(clamp((flipProgress - 0.7) / 0.3, 0, 1))
            }}>✓ KIŞ.</div>
            }
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 4 — DİLSİZ HARİTA  (12 – 16s)
// Boş harita → üzerinde çizim beliriyor → "KENDİN ÇALIŞ"
// ══════════════════════════════════════════════════════════════════════════════
function S4_Dilsiz({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const drawReveal = clamp((lt - 1.4) / 0.9, 0, 1);
        const phoneW = v ? 500 : 380;

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#F7F4EE' }} />

            {/* Big title */}
            {lt > 0.1 &&
            <H text="DİLSİZ" x={w / 2} y={v ? h * 0.1 : h * 0.1}
            size={v ? 190 : 150} color={B.navy}
            lt={lt - 0.1} total={dur - 0.1} />
            }
            {lt > 0.3 &&
            <H text="HARİTA" x={w / 2} y={v ? h * 0.2 : h * 0.2}
            size={v ? 190 : 150} color={B.red}
            lt={lt - 0.3} total={dur - 0.3} />
            }

            {/* Phones: blank → drawn */}
            <div style={{
              position: 'absolute',
              left: w / 2, top: v ? h * 0.58 : h * 0.58,
              width: 0, height: 0
            }}>
              {/* Blank map phone fades out as drawn fades in */}
              <Phone
                x={0} y={0}
                w={phoneW}
                src="assets2/15-dilsiz-bos.jpg"
                opacity={fio(lt, 2.5, 0.5, 0.5) * (1 - drawReveal)}
                scale={0.88 + 0.12 * fio(lt, 2.5, 0.5, 0.5)} />
              
              <Phone
                x={0} y={0}
                w={phoneW}
                src="assets2/16-dilsiz-cizim.jpg"
                opacity={drawReveal * fio(lt, dur, 0.5, 0.4)}
                scale={0.88 + 0.12 * drawReveal} />
              
            </div>

            {/* "KENDİN ÇALIŞI YARAT" */}
            {lt > 1.6 &&
            <H
              text={'KENDİN\nÇALIŞ!'}
              x={w / 2} y={v ? h * 0.9 : h * 0.9}
              size={v ? 118 : 94} color={B.navy}
              lt={lt - 1.6} total={dur - 1.6}
              maxWidth={v ? 900 : 1400} />

            }
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 5 — DERS NOTLARI + ATLAS  (16 – 20s)
// Notes list + infographic slide
// ══════════════════════════════════════════════════════════════════════════════
function S5_DersAtlas({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const phase2 = lt > 2.2;

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(160deg, ${B.navy} 0%, #0F1E2B 100%)`
            }} />
            <Grid />

            {/* Phase 1: Ders Notları */}
            {!phase2 &&
            <>
                <H text={'DERS NOTLARI'} x={w / 2} y={v ? h * 0.1 : h * 0.1}
              size={v ? 140 : 116} lt={lt} total={2.4} />
                <H text={'17 KONU · TAM METİN'} x={w / 2} y={v ? h * 0.17 : h * 0.18}
              size={v ? 46 : 38} color={B.yellow}
              lt={lt - 0.3} total={2.1} font={FB} weight={700} ls="0.05em" />

                {lt > 0.5 &&
              <Phone
                x={v ? w * 0.35 : w * 0.32} y={v ? h * 0.58 : h * 0.58}
                w={v ? 420 : 330}
                src="assets2/22-ders-notlari.jpg"
                scale={Easing.easeOutCubic(clamp((lt - 0.5) / 0.55, 0, 1))}
                opacity={Easing.easeOutCubic(clamp((lt - 0.5) / 0.4, 0, 1))}
                rotate={-5} />

              }
                {lt > 0.8 &&
              <Phone
                x={v ? w * 0.68 : w * 0.62} y={v ? h * 0.56 : h * 0.54}
                w={v ? 420 : 330}
                src="assets2/24-not-infografik.jpg"
                scale={Easing.easeOutCubic(clamp((lt - 0.8) / 0.55, 0, 1))}
                opacity={Easing.easeOutCubic(clamp((lt - 0.8) / 0.4, 0, 1))}
                rotate={5} />

              }
              </>
            }

            {/* Phase 2: Atlas */}
            {phase2 &&
            <>
                {(() => {
                const lt2 = lt - 2.2;
                const rem = dur - 2.2;
                return (
                  <>
                      <H text="TÜRKİYE ATLASI" x={w / 2} y={v ? h * 0.1 : h * 0.1}
                    size={v ? 130 : 105} color={B.yellow}
                    lt={lt2} total={rem} />
                      <H text={'100+ KAYIT · İLGİNÇ BİLGİLER'} x={w / 2} y={v ? h * 0.18 : h * 0.18}
                    size={v ? 44 : 36} color={B.white}
                    lt={lt2 - 0.2} total={rem - 0.2}
                    font={FB} weight={700} ls="0.04em" />

                      <Phone
                      x={v ? w * 0.32 : w * 0.3} y={v ? h * 0.57 : h * 0.57}
                      w={v ? 430 : 330}
                      src="assets2/13-atlas-1.jpg"
                      scale={Easing.easeOutCubic(clamp(lt2 / 0.55, 0, 1))}
                      opacity={Math.min(lt2 / 0.35, 1)}
                      rotate={-4} />
                    
                      <Phone
                      x={v ? w * 0.68 : w * 0.65} y={v ? h * 0.57 : h * 0.55}
                      w={v ? 430 : 330}
                      src="assets2/14-atlas-2.jpg"
                      scale={Easing.easeOutCubic(clamp((lt2 - 0.15) / 0.55, 0, 1))}
                      opacity={Math.min((lt2 - 0.15) / 0.35, 1)}
                      rotate={4} />
                    
                    </>);

              })()}
              </>
            }
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 6 — SORU BANKASI  (20 – 24s)
// Soru ekranı + Deneme Analizi popup + "HATALARINI ÇÖZ"
// ══════════════════════════════════════════════════════════════════════════════
function S6_SoruBankasi({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const phoneW = v ? 480 : 370;
        const analizeReveal = clamp((lt - 2.0) / 0.55, 0, 1);

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#F4F1EC' }}>

            <H text="SORU BANKASI" x={w / 2} y={v ? h * 0.09 : h * 0.09}
            size={v ? 132 : 108} color={B.navy}
            lt={lt} total={dur} maxWidth={v ? 960 : 1700} />
            <H text={'150+ DENEME · HERKESİN SEVİYESİNE'} x={w / 2} y={v ? h * 0.17 : h * 0.17}
            size={v ? 40 : 34} color={B.gray}
            lt={lt - 0.3} total={dur - 0.3}
            font={FB} weight={700} ls="0.04em" />

            {/* Soru ekranı phone */}
            {lt > 0.4 &&
            <Phone
              x={v ? w * 0.5 : w * 0.35} y={v ? h * 0.55 : h * 0.55}
              w={phoneW}
              src="assets2/20-soru-ekrani.jpg"
              scale={Easing.easeOutBack(clamp((lt - 0.4) / 0.6, 0, 1))}
              opacity={Math.min((lt - 0.4) / 0.3, 1)} />

            }

            {/* Deneme Analizi card overlaid */}
            {lt > 1.8 &&
            <div style={{
              position: 'absolute',
              left: v ? w * 0.5 : w * 0.62,
              top: v ? h * 0.67 : h * 0.58,
              transform: `translate(-50%,-50%) scale(${Easing.easeOutBack(analizeReveal)})`,
              opacity: analizeReveal,
              background: '#fff',
              borderRadius: 24,
              padding: v ? '36px 44px' : '28px 38px',
              width: v ? 620 : 500,
              boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
              fontFamily: FB
            }}>
                <div style={{ fontFamily: FD, fontSize: v ? 52 : 44, color: B.navy, letterSpacing: '0.04em', marginBottom: 20 }}>
                  DENEME ANALİZİ
                </div>
                <div style={{ fontSize: v ? 36 : 30, color: B.green, fontWeight: 700, marginBottom: 10 }}>
                  ✅ Doğru: 4
                </div>
                <div style={{ fontSize: v ? 36 : 30, color: B.red, fontWeight: 700, marginBottom: 20 }}>
                  ❌ Yanlış: 16
                </div>
                <div style={{
                background: B.orange,
                color: '#fff',
                fontWeight: 800,
                fontSize: v ? 34 : 28,
                padding: '14px 0',
                borderRadius: 14,
                textAlign: 'center',
                letterSpacing: '0.04em'
              }}>HATALARI ÇÖZ</div>
              </div>
            }
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 7 — DÜNYA + ÇALIŞMA  (24 – 27s)
// Hızlı ikili: Dünya bölümü + Çalışma masası
// ══════════════════════════════════════════════════════════════════════════════
function S7_DunyaCalisma({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const half = lt < 1.5;
        const lt2 = lt - 1.5;
        const phoneW = v ? 440 : 340;

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(150deg, ${B.blue} 0%, ${B.navy} 100%)`
            }} />
            <Grid />

            {/* Dünya */}
            <div style={{ opacity: fio(lt, 1.7, 0.3, 0.3), position: 'absolute', inset: 0 }}>
              <H text="OYUN: DÜNYA" x={w / 2} y={v ? h * 0.12 : h * 0.12}
              size={v ? 138 : 112} lt={lt} total={1.8} />
              <H text="ÜLKELERİ, KITALARI, OKYANUSLARI" x={w / 2} y={v ? h * 0.19 : h * 0.2}
              size={v ? 38 : 32} color={B.blueLight}
              lt={lt - 0.2} total={1.6}
              font={FB} weight={700} ls="0.03em" />
              <Phone x={v ? w * 0.38 : w * 0.35} y={v ? h * 0.57 : h * 0.58}
              w={phoneW} src="assets2/07-dunya-1.jpg"
              scale={Easing.easeOutCubic(clamp(lt / 0.6, 0, 1))}
              opacity={Math.min(lt / 0.4, 1)} rotate={-4} />
              <Phone x={v ? w * 0.65 : w * 0.63} y={v ? h * 0.57 : h * 0.55}
              w={phoneW} src="assets2/08-dunya-2.jpg"
              scale={Easing.easeOutCubic(clamp((lt - 0.15) / 0.6, 0, 1))}
              opacity={Math.min((lt - 0.15) / 0.4, 1)} rotate={4} />
            </div>

            {/* Çalışma masası */}
            {lt > 1.4 &&
            <div style={{ opacity: fio(lt2, dur - 1.5, 0.3, 0.3), position: 'absolute', inset: 0 }}>
                <H text="ÇALIŞMA MASASI" x={w / 2} y={v ? h * 0.12 : h * 0.12}
              size={v ? 128 : 104} color={B.yellow} lt={lt2} total={dur - 1.5} />
                <H text="KPSS GERİ SAYIM · ODAK TAKİBİ" x={w / 2} y={v ? h * 0.19 : h * 0.2}
              size={v ? 38 : 32} color={B.white}
              lt={lt2 - 0.2} total={dur - 1.7}
              font={FB} weight={700} ls="0.03em" />
                <Phone key="timer-phone" x={w * 0.5} y={v ? h * 0.57 : h * 0.57}
              w={v ? 460 : 360}
              src={"assets2/17-calisma-timer.jpg"}
              scale={Easing.easeOutBack(clamp(lt2 / 0.55, 0, 1))}
              opacity={Math.min(lt2 / 0.4, 1)} />
              </div>
            }
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 8 — CTA  (27 – 30s)
// Logo + "HEMEN İNDİR · ÜCRETSİZ" + badges
// ══════════════════════════════════════════════════════════════════════════════
function S8_CTA({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const iconE = Easing.easeOutBack(clamp(lt / 0.7, 0, 1));
        const titleE = clamp((lt - 0.4) / 0.5, 0, 1);
        const badgeE = Easing.easeOutBack(clamp((lt - 0.9) / 0.55, 0, 1));

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 35%, #2D4058 0%, ${B.navy} 70%)`
            }} />
            <Grid />

            {/* KPSS tag */}
            <div style={{
              position: 'absolute', left: w / 2, top: v ? h * 0.06 : h * 0.06,
              transform: 'translate(-50%,-50%)',
              color: B.red, fontFamily: FB, fontWeight: 800,
              fontSize: v ? 32 : 26,
              letterSpacing: '0.2em',
              border: `2px solid ${B.red}`,
              padding: '7px 20px', borderRadius: 4,
              opacity: Math.min(lt * 3, 1)
            }}>KPSS · 2026</div>

            {/* App icon */}
            <AppIcon
              x={w / 2} y={v ? h * 0.28 : h * 0.28}
              size={v ? 300 : 230}
              scale={0.5 + iconE * 0.5}
              opacity={iconE} />
            

            {/* HARİTA AVI */}
            <div style={{
              position: 'absolute',
              left: w / 2, top: v ? h * 0.47 : h * 0.48,
              transform: 'translate(-50%,-50%)',
              fontFamily: FD, fontWeight: 800,
              fontSize: v ? 160 : 124,
              color: '#fff', letterSpacing: '0.05em',
              opacity: titleE,
              textTransform: 'uppercase', textAlign: "center"
            }}>HARİTA
AVI</div>

            {/* Tagline */}
            <div style={{ position: 'absolute',
                left: w / 2, top: v ? h * 0.555 : h * 0.565,
                transform: 'translate(-50%,-50%)',
                fontFamily: FB, fontWeight: 600,
                fontSize: v ? 38 : 32,
                color: B.blueLight, letterSpacing: '0.04em',
                opacity: Easing.easeOutCubic(clamp((lt - 0.6) / 0.5, 0, 1)),
                whiteSpace: 'nowrap'
              }}>

KPSS COĞRAFYA · OYUNLAŞTIRILMIŞ</div>

            {/* HEMEN İNDİR */}
            <div style={{ position: 'absolute', left: w / 2, top: v ? h * 0.65 : h * 0.66,
              transform: `translate(-50%,-50%) scale(${0.7 + badgeE * 0.3})`,
              fontFamily: FD, fontSize: v ? 80 : 68,
              color: B.yellow, letterSpacing: '0.04em',
              opacity: badgeE,
              whiteSpace: 'nowrap',
              textTransform: 'uppercase'
            }}>  HEMEN ÜCRETSİZ İNDİR
</div>

            {/* Badges */}
            <div style={{ position: 'absolute',
              left: w / 2, top: v ? h * 0.79 : h * 0.82,
              transform: `translate(-50%,-50%) scale(${badgeE})`,
              opacity: badgeE,
              display: 'flex',
              flexDirection: v ? 'column' : 'row',
              gap: v ? 22 : 24,
              alignItems: 'center'
            }}>
              <Badge kind="apple" w={v ? 380 : 320} h={v ? 112 : 96} />
              <Badge kind="google" w={v ? 380 : 320} h={v ? 112 : 96} />
            </div>
          </div>);

      }}
    </Sprite>);

}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT COMPOSITION
// ══════════════════════════════════════════════════════════════════════════════
function Ad2() {
  return (
    <>
      <S1_Hook start={0} end={3.0} />
      <S2_TurkiyeOyun start={3.0} end={8.0} />
      <S3_FlashCard start={8.0} end={12.0} />
      <S4_Dilsiz start={12.0} end={16.0} />
      <S5_DersAtlas start={16.0} end={20.0} />
      <S6_SoruBankasi start={20.0} end={24.0} />
      <S7_DunyaCalisma start={24.0} end={27.0} />
      <S8_CTA start={27.0} end={30.0} />
    </>);

}

Object.assign(window, { Ad2, B, FD, FB, Phone, AppIcon, Badge, H, Grid, Chip });