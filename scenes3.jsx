// scenes3.jsx — Harita Avı v3 — 60s uzun reklam
// Yeni: gerçek harita oyun ekranları (Şehir, Dağ, Akarsu, Göl, Baraj, Dünya, Orman)
// Final: hlogo.png ile büyük marka kapanışı

const C = {
  navy: '#1C2B38', navyDeep: '#0F1C26', navyMid: '#2D3A45',
  cream: '#F5F2EC', white: '#FFFFFF',
  red: '#E54848', redDeep: '#C0313E',
  blue: '#2563A8', blueDeep: '#1A3A8F', blueLight: '#A4D8F0',
  teal: '#1A8A70', green: '#2D7A3A', greenDark: '#1B5530',
  orange: '#E07020', orangeLight: '#F0902A',
  yellow: '#F2A82A', goldYellow: '#FFC83D',
  brown: '#7A5443', purple: '#8A3AB0', pink: '#D0306E', gray: '#6A7480',
  mapBlue: '#B5DCEC',  // app's map BG
};

const FD = '"Bebas Neue", Impact, "Arial Black", sans-serif';
const FB = '"Inter", system-ui, sans-serif';

const useStageSize = () => window.__STAGE_SIZE || { w: 1080, h: 1920, aspect: 'vertical' };

const fadeIO = (lt, total, inD = 0.3, outD = 0.25) => {
  const fIn = Math.min(lt / inD, 1);
  const fOut = lt < total - outD ? 1 : Math.max(0, 1 - (lt - (total - outD)) / outD);
  return Math.min(fIn, fOut);
};

// ── Phone ──────────────────────────────────────────────────────────
function Phone({ x, y, w = 360, src, rotate = 0, scale = 1, opacity = 1 }) {
  const h = w * 2.06;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: w, height: h,
      transform: `translate(-50%,-50%) rotate(${rotate}deg) scale(${scale})`,
      opacity, filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.5))',
      willChange: 'transform,opacity',
    }}>
      <div style={{ width: '100%', height: '100%', background: '#080c10',
        borderRadius: w * 0.115, padding: w * 0.028, boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: w * 0.09,
          overflow: 'hidden', position: 'relative', background: '#fff' }}>
          {src && <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>}
          <div style={{ position: 'absolute', top: 7, left: '50%',
            transform: 'translateX(-50%)', width: w * 0.3, height: w * 0.042,
            background: '#080c10', borderRadius: 999 }}/>
        </div>
      </div>
    </div>
  );
}

// ── Headline ───────────────────────────────────────────────────────
function H({ text, x, y, size, color = '#fff', font = FD, weight = 800,
  ls = '0.02em', lh = 0.92, maxWidth, lt, total, inD = 0.25, outD = 0.2, uppercase = true }) {
  const op = fadeIO(lt, total, inD, outD);
  const eIn = Easing.easeOutCubic(Math.min(lt/inD, 1));
  const ty = (1 - eIn) * 28;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%,-50%) translateY(${ty}px)`,
      opacity: op, fontFamily: font, fontWeight: weight, fontSize: size,
      color, letterSpacing: ls, lineHeight: lh, textAlign: 'center',
      maxWidth, whiteSpace: maxWidth ? 'normal' : 'pre',
      textTransform: uppercase ? 'uppercase' : 'none', willChange: 'transform,opacity',
    }}>{text}</div>
  );
}

function Grid({ opacity = 0.055 }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}>
      <defs><pattern id="g3" width="72" height="72" patternUnits="userSpaceOnUse">
        <path d="M72 0L0 0 0 72" fill="none" stroke="#fff" strokeWidth="1"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#g3)"/>
    </svg>
  );
}

function Chip({ text, color, x, y, size = 38, lt, delay = 0, v = true }) {
  const e = Easing.easeOutBack(clamp((lt - delay) / 0.4, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%,-50%) scale(${0.5 + e * 0.5})`,
      opacity: clamp((lt - delay) / 0.3, 0, 1),
      background: color, color: '#fff', fontFamily: FB, fontWeight: 700,
      fontSize: size, padding: '14px 28px', borderRadius: 60,
      whiteSpace: 'nowrap', boxShadow: '0 12px 28px rgba(0,0,0,0.22)',
    }}>{text}</div>
  );
}

function Badge({ kind, w = 340, h = 100 }) {
  const apple = kind === 'apple';
  return (
    <div style={{
      width: w, height: h, background: '#000',
      border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 14,
      display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px',
      color: '#fff', fontFamily: FB, flexShrink: 0,
    }}>
      <div style={{ fontSize: h * 0.52, lineHeight: 1 }}>{apple ? '' : '▶'}</div>
      <div style={{ flexDirection: 'column', display: 'flex', lineHeight: 1.1 }}>
        <span style={{ fontSize: h * 0.17, opacity: 0.72, letterSpacing: '0.06em' }}>
          {apple ? 'Download on the' : 'GET IT ON'}</span>
        <span style={{ fontSize: h * 0.31, fontWeight: 700 }}>
          {apple ? 'App Store' : 'Google Play'}</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 1 — HOOK (0-3s) "KPSS'DE COĞRAFYA ZOR MU?"
// ════════════════════════════════════════════════════════════════════════
function S1_Hook({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const phoneE = Easing.easeOutCubic(clamp((lt - 0.6) / 1.0, 0, 1));
        const phoneY = h * 1.5 + (h * 0.6 - h * 1.5) * phoneE;
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 40%, #2D4058 0%, ${C.navy} 65%)`,
              transform: `scale(${1 + (lt/dur)*0.05})` }}/>
            <Grid/>
            {lt > 0.2 && (
              <div style={{ position: 'absolute', left: 0, top: v ? h*0.08 : h*0.08,
                width: `${Math.min((lt-0.2)/0.4, 1) * 100}%`, height: 4, background: C.red }}/>
            )}
            {lt > 0.15 && <H text="KPSS'DE" x={w/2} y={v ? h*0.26 : h*0.24}
              size={v ? 210 : 180} lt={lt-0.15} total={dur-0.15}/>}
            {lt > 0.4 && <H text="COĞRAFYA" x={w/2} y={v ? h*0.37 : h*0.36}
              size={v ? 170 : 148} color={C.yellow} lt={lt-0.4} total={dur-0.4}/>}
            {lt > 0.6 && <H text="ZOR MU?" x={w/2} y={v ? h*0.47 : h*0.47}
              size={v ? 210 : 180} lt={lt-0.6} total={dur-0.6}/>}
            <Phone x={w/2} y={phoneY} w={v ? 460 : 340}
              src="assets2/01-home.jpg"
              scale={0.85 + phoneE * 0.15} opacity={phoneE}/>
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 2 — TÜRKİYE BÖLÜMÜ KEŞFİ (3-8s) — Top + bottom kategori grid
// ════════════════════════════════════════════════════════════════════════
function S2_Bolumler({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const splitT = clamp((lt - 1.5) / 0.7, 0, 1);
        const phoneW = v ? 440 : 350;
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.cream }}>
            {lt > 0.0 && <H text="13 KATEGORİ" x={w/2} y={v ? h*0.1 : h*0.1}
              size={v ? 158 : 130} color={C.navy} lt={lt} total={dur}/>}
            {lt > 0.3 && <H text="TÜRKİYE BÖLÜMÜ" x={w/2} y={v ? h*0.19 : h*0.2}
              size={v ? 60 : 50} color={C.red}
              lt={lt-0.3} total={dur-0.3} font={FB} weight={800} ls="0.06em"/>}

            {/* Two phones — top half + bottom half of category list */}
            {lt > 0.5 && (
              <Phone x={v ? w * (0.32 - splitT * 0.05) : w * 0.32}
                y={v ? h*0.6 : h*0.58} w={phoneW}
                src="assets3/n01-tr-bolum-top.jpg"
                rotate={-3 - splitT * 3}
                scale={Easing.easeOutCubic(clamp((lt-0.5)/0.55, 0, 1))}
                opacity={Math.min((lt-0.5)/0.4, 1)}/>
            )}
            {lt > 0.8 && (
              <Phone x={v ? w * (0.68 + splitT * 0.05) : w * 0.68}
                y={v ? h*0.6 : h*0.58} w={phoneW}
                src="assets3/n02-tr-bolum-bottom.jpg"
                rotate={3 + splitT * 3}
                scale={Easing.easeOutCubic(clamp((lt-0.8)/0.55, 0, 1))}
                opacity={Math.min((lt-0.8)/0.4, 1)}/>
            )}

            {/* Floating chips for ALL categories */}
            {[
              { t: 'Şehir Bul', c: C.red, x: 0.12, y: 0.32, d: 1.6 },
              { t: 'Dağlar', c: C.brown, x: 0.85, y: 0.34, d: 1.75 },
              { t: 'Akarsular', c: C.blue, x: 0.1, y: 0.45, d: 1.9 },
              { t: 'Göller', c: C.blueLight, x: 0.88, y: 0.47, d: 2.05 },
              { t: 'Barajlar', c: C.blueDeep, x: 0.13, y: 0.58, d: 2.2 },
              { t: 'Denizler', c: C.navyDeep, x: 0.85, y: 0.6, d: 2.35 },
              { t: 'Limanlar', c: C.gray, x: 0.1, y: 0.71, d: 2.5 },
              { t: 'Topraklar', c: C.orange, x: 0.88, y: 0.73, d: 2.65 },
              { t: 'Platolar', c: C.orangeLight, x: 0.14, y: 0.84, d: 2.8 },
              { t: 'Ovalar', c: C.green, x: 0.86, y: 0.85, d: 2.95 },
              { t: 'Hayvanlar', c: C.orangeLight, x: 0.5, y: 0.9, d: 3.1 },
              { t: 'Ormanlar', c: C.greenDark, x: 0.5, y: 0.96, d: 3.25 },
            ].map((c, i) => v && (
              <Chip key={i} text={c.t} color={c.c} x={w * c.x} y={h * c.y}
                size={32} lt={lt} delay={c.d} v={v}/>
            ))}
            {!v && [
              { t: 'Şehir', c: C.red, x: 0.04, y: 0.3, d: 1.6 },
              { t: 'Dağlar', c: C.brown, x: 0.94, y: 0.3, d: 1.75 },
              { t: 'Akarsu', c: C.blue, x: 0.04, y: 0.5, d: 1.9 },
              { t: 'Göller', c: C.blueLight, x: 0.94, y: 0.5, d: 2.05 },
              { t: 'Barajlar', c: C.blueDeep, x: 0.04, y: 0.7, d: 2.2 },
              { t: 'Ovalar', c: C.green, x: 0.94, y: 0.7, d: 2.35 },
              { t: 'Ormanlar', c: C.greenDark, x: 0.5, y: 0.92, d: 2.5 },
            ].map((c, i) => (
              <Chip key={i} text={c.t} color={c.c} x={w * c.x} y={h * c.y}
                size={28} lt={lt} delay={c.d} v={v}/>
            ))}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 3 — HARİTA OYUNLARI MONTAJ (8-15s) — Hızlı 5 oyun ekranı kesim
// "Şehir Bul → Dağlar → Akarsular → Göller → Barajlar"
// ════════════════════════════════════════════════════════════════════════
function S3_OyunMontaj({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';

  const SHOTS = [
    { t: 0.0, src: 'assets3/n03-sehir-bul.jpg', label: 'ŞEHİR BUL', sub: '81 İL', color: C.red },
    { t: 1.4, src: 'assets3/n04-daglar.jpg',    label: 'DAĞLAR',    sub: '150+ DAĞ', color: C.brown },
    { t: 2.7, src: 'assets3/n05-akarsu.jpg',    label: 'AKARSULAR', sub: '100+ AKARSU', color: C.blue },
    { t: 4.0, src: 'assets3/n06-goller.jpg',    label: 'GÖLLER',    sub: '50+ GÖL', color: C.blueLight },
    { t: 5.3, src: 'assets3/n07-barajlar.jpg',  label: 'BARAJLAR',  sub: '40+ BARAJ', color: C.blueDeep },
  ];

  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyDeep} 100%)` }}/>
            <Grid/>

            <H text="OYNA · ÖĞREN" x={w/2} y={v ? h*0.07 : h*0.08}
              size={v ? 100 : 84} lt={lt} total={dur}
              font={FB} weight={800} ls="0.05em"/>

            {SHOTS.map((shot, i) => {
              const localStart = shot.t;
              const localEnd = i < SHOTS.length - 1 ? SHOTS[i+1].t : dur - 0.3;
              const slt = lt - localStart;
              const sdur = localEnd - localStart;
              if (slt < -0.1 || slt > sdur + 0.3) return null;

              const eIn = Easing.easeOutBack(clamp(slt / 0.4, 0, 1));
              const eOut = clamp((slt - sdur + 0.25) / 0.25, 0, 1);
              const op = Math.min(Math.max(slt / 0.25, 0), 1) * (1 - eOut);

              return (
                <React.Fragment key={i}>
                  {/* Phone center */}
                  <Phone x={w/2} y={v ? h*0.55 : h*0.55}
                    w={v ? 540 : 400}
                    src={shot.src}
                    scale={0.9 + eIn * 0.1 - eOut * 0.05}
                    opacity={op}/>

                  {/* Big label */}
                  <div style={{
                    position: 'absolute',
                    left: w/2, top: v ? h*0.95 : h*0.93,
                    transform: `translate(-50%,-50%) scale(${0.7 + eIn * 0.3})`,
                    opacity: op,
                    background: shot.color,
                    color: '#fff',
                    fontFamily: FD, fontSize: v ? 80 : 64,
                    letterSpacing: '0.04em',
                    padding: v ? '14px 44px' : '12px 36px',
                    borderRadius: 100,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                  }}>{shot.label}</div>

                  {/* Stat */}
                  <div style={{
                    position: 'absolute',
                    left: w/2, top: v ? h*0.18 : h*0.2,
                    transform: 'translate(-50%,-50%)',
                    color: shot.color, fontFamily: FD,
                    fontSize: v ? 130 : 100, letterSpacing: '0.02em',
                    opacity: op,
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}>{shot.sub}</div>
                </React.Fragment>
              );
            })}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 4 — DÜNYA + DOĞA OYUNLARI (15-20s)
// ════════════════════════════════════════════════════════════════════════
function S4_Dunya({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const phoneW = v ? 440 : 340;
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: `linear-gradient(150deg, ${C.blueDeep} 0%, ${C.navy} 100%)` }}/>
            <Grid/>

            <H text="DÜNYA DA" x={w/2} y={v ? h*0.1 : h*0.1}
              size={v ? 156 : 124} lt={lt} total={dur}/>
            <H text="BURADA" x={w/2} y={v ? h*0.18 : h*0.19}
              size={v ? 156 : 124} color={C.goldYellow}
              lt={lt-0.2} total={dur-0.2}/>

            <H text="ÜLKELER · KITALAR · ORMANLAR · DENİZLER"
              x={w/2} y={v ? h*0.255 : h*0.27}
              size={v ? 30 : 26} color={C.blueLight}
              lt={lt-0.4} total={dur-0.4}
              font={FB} weight={700} ls="0.06em"/>

            {/* 2 dünya phones */}
            <Phone x={v ? w*0.32 : w*0.3} y={v ? h*0.6 : h*0.58}
              w={phoneW} src="assets3/n08-ulke-bul.jpg"
              scale={Easing.easeOutCubic(clamp((lt-0.3)/0.6, 0, 1))}
              opacity={Math.min((lt-0.3)/0.4, 1)} rotate={-5}/>
            <Phone x={v ? w*0.68 : w*0.7} y={v ? h*0.6 : h*0.58}
              w={phoneW} src="assets3/n09-dunya-orman.jpg"
              scale={Easing.easeOutCubic(clamp((lt-0.55)/0.6, 0, 1))}
              opacity={Math.min((lt-0.55)/0.4, 1)} rotate={5}/>

            {/* Stat callouts at bottom */}
            {lt > 1.5 && (
              <div style={{
                position: 'absolute', left: w/2, top: v ? h*0.92 : h*0.92,
                transform: 'translate(-50%,-50%)',
                display: 'flex', gap: v ? 30 : 50,
                opacity: clamp((lt - 1.5) / 0.5, 0, 1),
              }}>
                {[
                  { n: '195+', t: 'ÜLKE' },
                  { n: '7', t: 'KITA' },
                  { n: '50+', t: 'ORMAN' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', color: '#fff', fontFamily: FB }}>
                    <div style={{ fontFamily: FD, fontSize: v ? 80 : 64,
                      color: C.goldYellow, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: v ? 24 : 20, letterSpacing: '0.1em',
                      fontWeight: 700, marginTop: 4 }}>{s.t}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 5 — BİLGİ KARTI FLIP (20-25s)
// ════════════════════════════════════════════════════════════════════════
function S5_FlashCard({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const flipP = clamp((lt - 2.2) / 0.7, 0, 1);
        const flipAngle = flipP * 180;
        const cardW = v ? 760 : 620;
        const cardH = v ? 920 : 700;
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
            background: `linear-gradient(160deg, #F0EDE6 0%, #E6E0D6 100%)` }}>
            <H text="BİLGİ KARTI" x={w/2} y={v ? h*0.07 : h*0.08}
              size={v ? 100 : 82} color={C.navy}
              lt={lt} total={dur} font={FB} weight={800} ls="0.04em"/>
            <H text="SORU → CEVAP → ÖĞREN" x={w/2} y={v ? h*0.13 : h*0.15}
              size={v ? 36 : 30} color={C.gray}
              lt={lt-0.3} total={dur-0.3} font={FB} weight={600} ls="0.06em"/>

            <div style={{ position: 'absolute',
              left: w/2 - cardW/2, top: v ? h*0.2 : h*0.2,
              width: cardW, height: cardH, perspective: 1200,
              opacity: fadeIO(lt, dur, 0.4, 0.4) }}>
              <div style={{ width: '100%', height: '100%', position: 'relative',
                transformStyle: 'preserve-3d', transform: `rotateY(${flipAngle}deg)` }}>
                <div style={{ position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                  borderRadius: 28, overflow: 'hidden',
                  boxShadow: '0 32px 72px rgba(0,0,0,0.28)' }}>
                  <img src="assets2/11-flash-soru.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  <div style={{ position: 'absolute', top: 20, right: 20,
                    background: C.orange, color: '#fff', fontFamily: FB, fontWeight: 800,
                    fontSize: 32, padding: '8px 18px', borderRadius: 999 }}>SORU</div>
                </div>
                <div style={{ position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: 28, overflow: 'hidden',
                  boxShadow: '0 32px 72px rgba(0,0,0,0.28)' }}>
                  <img src="assets2/12-flash-cevap.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  <div style={{ position: 'absolute', top: 20, right: 20,
                    background: C.teal, color: '#fff', fontFamily: FB, fontWeight: 800,
                    fontSize: 32, padding: '8px 18px', borderRadius: 999 }}>CEVAP</div>
                </div>
              </div>
            </div>

            {flipP > 0.7 && (
              <div style={{ position: 'absolute', left: w/2, top: v ? h*0.93 : h*0.93,
                transform: 'translate(-50%,-50%)', fontFamily: FD,
                fontSize: v ? 68 : 56, color: C.teal, letterSpacing: '0.04em',
                opacity: Easing.easeOutCubic(clamp((flipP-0.7)/0.3, 0, 1)) }}>
                ✓ KONUYU PEKIŞTIR
              </div>
            )}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 6 — DİLSİZ HARİTA (25-29s)
// ════════════════════════════════════════════════════════════════════════
function S6_Dilsiz({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const draw = clamp((lt - 1.4) / 0.9, 0, 1);
        const phoneW = v ? 480 : 370;
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#F7F4EE' }}>
            <H text="DİLSİZ" x={w/2} y={v ? h*0.09 : h*0.1}
              size={v ? 178 : 142} color={C.navy} lt={lt} total={dur}/>
            <H text="HARİTA" x={w/2} y={v ? h*0.18 : h*0.2}
              size={v ? 178 : 142} color={C.red}
              lt={lt-0.2} total={dur-0.2}/>

            <Phone x={w/2} y={v ? h*0.58 : h*0.58} w={phoneW}
              src="assets2/15-dilsiz-bos.jpg"
              opacity={fadeIO(lt, 2.5, 0.4, 0.4) * (1 - draw)}
              scale={0.88 + 0.12 * fadeIO(lt, 2.5, 0.4, 0.4)}/>
            <Phone x={w/2} y={v ? h*0.58 : h*0.58} w={phoneW}
              src="assets2/16-dilsiz-cizim.jpg"
              opacity={draw * fadeIO(lt, dur, 0.3, 0.4)}
              scale={0.88 + 0.12 * draw}/>

            {lt > 1.5 && (
              <H text={'KENDİN ÇİZ\nÖĞREN!'}
                x={w/2} y={v ? h*0.93 : h*0.92}
                size={v ? 96 : 78} color={C.navy}
                lt={lt-1.5} total={dur-1.5}
                maxWidth={v ? 900 : 1400}/>
            )}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 7 — DERS NOTLARI + ATLAS (29-34s)
// ════════════════════════════════════════════════════════════════════════
function S7_NotlarAtlas({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const phase2 = lt > 2.5;
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: `linear-gradient(160deg, ${C.navy} 0%, #0F1E2B 100%)` }}/>
            <Grid/>

            {!phase2 && (
              <>
                <H text="DERS NOTLARI" x={w/2} y={v ? h*0.1 : h*0.1}
                  size={v ? 138 : 110} lt={lt} total={2.6}/>
                <H text="17 KONU · TAM METİN" x={w/2} y={v ? h*0.17 : h*0.18}
                  size={v ? 42 : 36} color={C.yellow}
                  lt={lt-0.3} total={2.3} font={FB} weight={700} ls="0.05em"/>
                {lt > 0.5 && <Phone x={v ? w*0.35 : w*0.32} y={v ? h*0.58 : h*0.58}
                  w={v ? 420 : 320} src="assets2/22-ders-notlari.jpg"
                  scale={Easing.easeOutCubic(clamp((lt-0.5)/0.55, 0, 1))}
                  opacity={Math.min((lt-0.5)/0.4, 1)} rotate={-5}/>}
                {lt > 0.8 && <Phone x={v ? w*0.68 : w*0.62} y={v ? h*0.56 : h*0.56}
                  w={v ? 420 : 320} src="assets2/24-not-infografik.jpg"
                  scale={Easing.easeOutCubic(clamp((lt-0.8)/0.55, 0, 1))}
                  opacity={Math.min((lt-0.8)/0.4, 1)} rotate={5}/>}
              </>
            )}

            {phase2 && (() => {
              const lt2 = lt - 2.5; const rem = dur - 2.5;
              return (
                <>
                  <H text="TÜRKİYE ATLASI" x={w/2} y={v ? h*0.1 : h*0.1}
                    size={v ? 128 : 104} color={C.yellow}
                    lt={lt2} total={rem}/>
                  <H text="100+ KAYIT · İLGİNÇ BİLGİLER" x={w/2} y={v ? h*0.18 : h*0.18}
                    size={v ? 38 : 32} color="#fff"
                    lt={lt2-0.2} total={rem-0.2}
                    font={FB} weight={700} ls="0.04em"/>
                  <Phone x={v ? w*0.32 : w*0.3} y={v ? h*0.58 : h*0.58}
                    w={v ? 420 : 320} src="assets2/13-atlas-1.jpg"
                    scale={Easing.easeOutCubic(clamp(lt2/0.55, 0, 1))}
                    opacity={Math.min(lt2/0.35, 1)} rotate={-4}/>
                  <Phone x={v ? w*0.68 : w*0.65} y={v ? h*0.58 : h*0.55}
                    w={v ? 420 : 320} src="assets2/14-atlas-2.jpg"
                    scale={Easing.easeOutCubic(clamp((lt2-0.15)/0.55, 0, 1))}
                    opacity={Math.min((lt2-0.15)/0.35, 1)} rotate={4}/>
                </>
              );
            })()}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 8 — SORU BANKASI + DENEME ANALİZİ (34-39s)
// ════════════════════════════════════════════════════════════════════════
function S8_SoruBank({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const phoneW = v ? 470 : 360;
        const analyP = clamp((lt - 2.2) / 0.55, 0, 1);
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#F4F1EC' }}>
            <H text="SORU BANKASI" x={w/2} y={v ? h*0.09 : h*0.09}
              size={v ? 132 : 108} color={C.navy} lt={lt} total={dur}
              maxWidth={v ? 980 : 1700}/>
            <H text="GERÇEK KPSS SORULARI · 150+ DENEME" x={w/2} y={v ? h*0.17 : h*0.17}
              size={v ? 36 : 30} color={C.gray}
              lt={lt-0.3} total={dur-0.3} font={FB} weight={700} ls="0.04em"/>

            {lt > 0.4 && <Phone x={v ? w*0.5 : w*0.32} y={v ? h*0.55 : h*0.55}
              w={phoneW} src="assets2/20-soru-ekrani.jpg"
              scale={Easing.easeOutBack(clamp((lt-0.4)/0.6, 0, 1))}
              opacity={Math.min((lt-0.4)/0.3, 1)}/>}

            {lt > 2.0 && (
              <div style={{ position: 'absolute',
                left: v ? w*0.5 : w*0.65, top: v ? h*0.69 : h*0.58,
                transform: `translate(-50%,-50%) scale(${Easing.easeOutBack(analyP)})`,
                opacity: analyP, background: '#fff', borderRadius: 24,
                padding: v ? '34px 40px' : '26px 36px', width: v ? 600 : 480,
                boxShadow: '0 24px 60px rgba(0,0,0,0.22)', fontFamily: FB }}>
                <div style={{ fontFamily: FD, fontSize: v ? 50 : 42, color: C.navy,
                  letterSpacing: '0.04em', marginBottom: 18 }}>DENEME ANALİZİ</div>
                <div style={{ fontSize: v ? 34 : 28, color: C.green, fontWeight: 700, marginBottom: 8 }}>
                  ✅ Doğru: 16</div>
                <div style={{ fontSize: v ? 34 : 28, color: C.red, fontWeight: 700, marginBottom: 18 }}>
                  ❌ Yanlış: 4</div>
                <div style={{ background: C.orange, color: '#fff', fontWeight: 800,
                  fontSize: v ? 32 : 26, padding: '12px 0', borderRadius: 14,
                  textAlign: 'center', letterSpacing: '0.04em' }}>HATALARI ÇÖZ</div>
              </div>
            )}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 9 — ÇALIŞMA MASASI + KPSS GERİ SAYIM (39-43s)
// ════════════════════════════════════════════════════════════════════════
function S9_Calisma({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 30%, #2D4058 0%, ${C.navy} 65%)` }}/>
            <Grid/>
            <H text="ÇALIŞMA MASASI" x={w/2} y={v ? h*0.1 : h*0.1}
              size={v ? 130 : 104} color={C.yellow} lt={lt} total={dur}/>
            <H text="KPSS GERİ SAYIM · ODAK · TAKİP" x={w/2} y={v ? h*0.17 : h*0.18}
              size={v ? 36 : 30} color="#fff"
              lt={lt-0.3} total={dur-0.3} font={FB} weight={700} ls="0.04em"/>

            {lt > 0.3 && <Phone x={v ? w*0.32 : w*0.3} y={v ? h*0.58 : h*0.58}
              w={v ? 410 : 320} src="assets2/17-calisma-timer.jpg"
              scale={Easing.easeOutCubic(clamp((lt-0.3)/0.55, 0, 1))}
              opacity={Math.min((lt-0.3)/0.4, 1)} rotate={-4}/>}
            {lt > 0.6 && <Phone x={v ? w*0.68 : w*0.7} y={v ? h*0.58 : h*0.58}
              w={v ? 410 : 320} src="assets2/18-calisma-haftalik.jpg"
              scale={Easing.easeOutCubic(clamp((lt-0.6)/0.55, 0, 1))}
              opacity={Math.min((lt-0.6)/0.4, 1)} rotate={4}/>}
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 10 — FEATURE WALL (43-47s)
// ════════════════════════════════════════════════════════════════════════
const FEATURES = [
  { t: 'TÜRKİYE OYUNU', c: C.red },
  { t: 'DÜNYA OYUNU', c: C.blueDeep },
  { t: 'BİLGİ KARTI', c: C.teal },
  { t: 'TÜRKİYE ATLASI', c: C.yellow },
  { t: 'DİLSİZ HARİTA', c: C.blue },
  { t: 'ÇALIŞMA MASASI', c: C.orange },
  { t: 'SORU BANKASI', c: C.green },
  { t: 'DERS NOTLARI', c: C.orangeLight },
];

function S10_FeatureWall({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  const cols = 2, rows = 4;
  const gridW = v ? w * 0.86 : w * 0.55;
  const gridH = v ? h * 0.6 : h * 0.7;
  const x0 = (w - gridW) / 2;
  const y0 = v ? h * 0.22 : (h - gridH) / 2;
  const cellW = gridW / cols, cellH = gridH / rows, pad = 12;
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.navy }}>
          <Grid/>
          <H text={v ? 'TEK UYGULAMA\n8 GÜÇLÜ MOD' : '8 GÜÇLÜ MOD · TEK UYGULAMA'}
            x={w/2} y={v ? h*0.12 : h*0.13}
            size={v ? 92 : 84} lt={lt} total={dur}/>
          {FEATURES.map((f, i) => {
            const r = Math.floor(i / cols), c = i % cols;
            const fx = x0 + c * cellW + pad, fy = y0 + r * cellH + pad;
            const enter = i * 0.06;
            const slt = lt - enter;
            const e = Easing.easeOutBack(clamp(slt / 0.4, 0, 1));
            const op = Math.min(slt / 0.3, 1);
            return (
              <div key={i} style={{
                position: 'absolute', left: fx, top: fy,
                width: cellW - pad * 2, height: cellH - pad * 2,
                background: f.c, borderRadius: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: FD, fontSize: v ? 50 : 40,
                letterSpacing: '0.03em', textAlign: 'center', padding: 16,
                transform: `scale(${0.5 + e * 0.5})`, opacity: op > 0 ? op : 0,
                boxShadow: '0 16px 36px rgba(0,0,0,0.25)',
              }}>{f.t}</div>
            );
          })}
        </div>
      )}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 11 — TESTIMONIAL / SOCIAL PROOF (47-51s)
// ════════════════════════════════════════════════════════════════════════
function S11_Proof({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
          background: `linear-gradient(160deg, #F0EDE6 0%, #DCD5C8 100%)` }}>

          <H text="KPSS ADAYLARININ" x={w/2} y={v ? h*0.1 : h*0.12}
            size={v ? 78 : 64} color={C.navy}
            lt={lt} total={dur} font={FB} weight={800} ls="0.02em"/>
          <H text="YENİ FAVORİSİ" x={w/2} y={v ? h*0.17 : h*0.21}
            size={v ? 130 : 104} color={C.red}
            lt={lt-0.2} total={dur-0.2}/>

          {/* Stars */}
          <div style={{
            position: 'absolute', left: w/2, top: v ? h*0.27 : h*0.32,
            transform: 'translate(-50%,-50%)',
            fontSize: v ? 80 : 64, color: C.yellow, letterSpacing: '0.05em',
            opacity: clamp((lt - 0.5) / 0.3, 0, 1),
          }}>★★★★★</div>
          <div style={{
            position: 'absolute', left: w/2, top: v ? h*0.32 : h*0.42,
            transform: 'translate(-50%,-50%)',
            fontFamily: FB, fontWeight: 700, fontSize: v ? 32 : 26,
            color: C.gray, letterSpacing: '0.06em',
            opacity: clamp((lt - 0.7) / 0.3, 0, 1),
          }}>4.8 / 5.0 · BİNLERCE KULLANICI</div>

          {/* 3 quote cards */}
          {[
            { q: '"Ezberden çıkıp oyunla öğrenmek harika. Coğrafya artık kabusum değil!"', a: '— Ayşe K., KPSS aday', d: 1.0, c: C.red },
            { q: '"Dilsiz harita modu o kadar bağımlılık yapıyor ki, her gün açıyorum."', a: '— Mehmet T., öğretmen', d: 1.5, c: C.blue },
            { q: '"150+ deneme + analiz = tam ihtiyacım olan şey."', a: '— Zeynep B., KPSS aday', d: 2.0, c: C.teal },
          ].map((t, i) => {
            const slt = lt - t.d;
            const e = Easing.easeOutCubic(clamp(slt / 0.5, 0, 1));
            const op = Math.min(slt / 0.3, 1);
            const yPos = v ? h * (0.45 + i * 0.16) : h * (0.5 + i * 0.15);
            return (
              <div key={i} style={{
                position: 'absolute',
                left: w/2, top: yPos,
                transform: `translate(-50%,-50%) translateX(${(1-e) * (i % 2 ? 60 : -60)}px)`,
                opacity: op > 0 ? op : 0,
                background: '#fff',
                borderLeft: `6px solid ${t.c}`,
                borderRadius: 16,
                padding: v ? '22px 30px' : '18px 26px',
                width: v ? w * 0.84 : w * 0.55,
                fontFamily: FB,
                boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              }}>
                <div style={{ fontSize: v ? 30 : 24, fontWeight: 600, color: C.navy,
                  fontStyle: 'italic', lineHeight: 1.3, marginBottom: 8 }}>{t.q}</div>
                <div style={{ fontSize: v ? 22 : 18, color: C.gray, fontWeight: 700,
                  letterSpacing: '0.04em' }}>{t.a}</div>
              </div>
            );
          })}
        </div>
      )}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 12 — STATS / NEDEN HARİTA AVI (51-55s)
// ════════════════════════════════════════════════════════════════════════
function S12_Neden({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            background: `linear-gradient(160deg, ${C.red} 0%, ${C.redDeep} 100%)` }}/>
          <Grid opacity={0.08}/>
          <H text="NEDEN HARİTA AVI?" x={w/2} y={v ? h*0.1 : h*0.12}
            size={v ? 100 : 84} lt={lt} total={dur}/>

          {[
            { n: '13', t: 'TÜRKİYE\nKATEGORİSİ', d: 0.3 },
            { n: '195+', t: 'DÜNYA\nÜLKESİ', d: 0.55 },
            { n: '17', t: 'DERS\nNOTU', d: 0.8 },
            { n: '150+', t: 'DENEME\nSORUSU', d: 1.05 },
            { n: '100+', t: 'ATLAS\nKAYDI', d: 1.3 },
            { n: '∞', t: 'TEKRAR\nİMKÂNI', d: 1.55 },
          ].map((s, i) => {
            const cols = 2; const r = Math.floor(i / cols); const c = i % cols;
            const cx = v ? w * (0.28 + c * 0.44) : w * (0.32 + c * 0.36);
            const cy = v ? h * (0.28 + r * 0.18) : h * (0.32 + r * 0.22);
            const slt = lt - s.d;
            const e = Easing.easeOutBack(clamp(slt / 0.5, 0, 1));
            const op = Math.min(slt / 0.3, 1);
            return (
              <div key={i} style={{
                position: 'absolute', left: cx, top: cy,
                transform: `translate(-50%,-50%) scale(${0.5 + e * 0.5})`,
                opacity: op > 0 ? op : 0,
                textAlign: 'center', color: '#fff',
              }}>
                <div style={{ fontFamily: FD, fontSize: v ? 130 : 112,
                  color: C.goldYellow, lineHeight: 1, letterSpacing: '0.02em',
                  textShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>{s.n}</div>
                <div style={{ fontFamily: FB, fontWeight: 800, fontSize: v ? 26 : 22,
                  letterSpacing: '0.08em', marginTop: 6, lineHeight: 1.15,
                  whiteSpace: 'pre' }}>{s.t}</div>
              </div>
            );
          })}
        </div>
      )}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 13 — LOGO REVEAL + CTA (55-60s)
// FINAL: hlogo.png büyük zoom + tagline + badges
// ════════════════════════════════════════════════════════════════════════
function S13_LogoCTA({ start, end }) {
  const { w, h, aspect } = useStageSize();
  const v = aspect === 'vertical';
  return (
    <Sprite start={start} end={end}>
      {({ localTime: lt, duration: dur }) => {
        const logoE = Easing.easeOutBack(clamp(lt / 0.9, 0, 1));
        const titleE = clamp((lt - 0.7) / 0.5, 0, 1);
        const tagE = clamp((lt - 1.2) / 0.5, 0, 1);
        const ctaE = Easing.easeOutBack(clamp((lt - 1.7) / 0.6, 0, 1));
        const badgeE = Easing.easeOutBack(clamp((lt - 2.3) / 0.6, 0, 1));

        // Pulsing glow
        const glowPulse = (Math.sin(lt * 2) + 1) / 2;

        return (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 35%, #2D4058 0%, ${C.navy} 60%, ${C.navyDeep} 100%)` }}/>
            <Grid/>

            {/* Radiating rays behind logo */}
            <div style={{
              position: 'absolute', left: w/2, top: v ? h*0.32 : h*0.34,
              width: v ? 900 : 760, height: v ? 900 : 760,
              transform: `translate(-50%,-50%) rotate(${lt * 8}deg) scale(${0.7 + logoE * 0.3})`,
              opacity: logoE * 0.4,
              background: `conic-gradient(from 0deg, transparent 0deg, ${C.goldYellow}40 30deg, transparent 60deg, ${C.red}30 120deg, transparent 150deg, ${C.goldYellow}40 240deg, transparent 270deg)`,
              borderRadius: '50%',
              filter: 'blur(20px)',
            }}/>

            {/* KPSS tag */}
            <div style={{
              position: 'absolute', left: w/2, top: v ? h*0.06 : h*0.06,
              transform: 'translate(-50%,-50%)',
              color: C.red, fontFamily: FB, fontWeight: 800,
              fontSize: v ? 32 : 26, letterSpacing: '0.2em',
              border: `2px solid ${C.red}`, padding: '7px 20px', borderRadius: 4,
              opacity: Math.min(lt * 3, 1),
            }}>KPSS · 2026</div>

            {/* hlogo.png - the real brand */}
            <div style={{
              position: 'absolute', left: w/2, top: v ? h*0.32 : h*0.34,
              width: v ? 580 : 460, height: v ? 580 : 460,
              transform: `translate(-50%,-50%) scale(${0.4 + logoE * 0.6})`,
              opacity: logoE,
              filter: `drop-shadow(0 24px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 ${20 + glowPulse * 30}px ${C.goldYellow}80)`,
            }}>
              <img src="assets3/hlogo.png" alt="Harita Avı"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
            </div>

            {/* Tagline */}
            <div style={{
              position: 'absolute', left: w/2, top: v ? h*0.62 : h*0.68,
              transform: `translate(-50%,-50%) translateY(${(1-tagE)*20}px)`,
              opacity: tagE,
              fontFamily: FB, fontWeight: 700, fontSize: v ? 40 : 32,
              color: C.blueLight, letterSpacing: '0.04em',
              whiteSpace: 'nowrap', textTransform: 'uppercase',
            }}>KPSS COĞRAFYA · OYUNLAŞTIRILMIŞ</div>

            {/* CTA */}
            <div style={{
              position: 'absolute', left: w/2, top: v ? h*0.72 : h*0.78,
              transform: `translate(-50%,-50%) scale(${0.7 + ctaE * 0.3})`,
              opacity: ctaE, fontFamily: FD, fontSize: v ? 88 : 72,
              color: C.goldYellow, letterSpacing: '0.04em',
              whiteSpace: 'nowrap', textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}>HEMEN İNDİR · ÜCRETSİZ</div>

            {/* Badges */}
            <div style={{
              position: 'absolute', left: w/2, top: v ? h*0.85 : h*0.9,
              transform: `translate(-50%,-50%) scale(${badgeE})`,
              opacity: badgeE, display: 'flex',
              flexDirection: v ? 'column' : 'row',
              gap: v ? 18 : 24, alignItems: 'center',
            }}>
              <Badge kind="apple" w={v ? 380 : 320} h={v ? 108 : 92}/>
              <Badge kind="google" w={v ? 380 : 320} h={v ? 108 : 92}/>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// ROOT — 60 saniyelik kompozisyon
// ════════════════════════════════════════════════════════════════════════
function Ad3() {
  return (
    <>
      <S1_Hook         start={0}   end={3}/>
      <S2_Bolumler     start={3}   end={8}/>
      <S3_OyunMontaj   start={8}   end={15}/>
      <S4_Dunya        start={15}  end={20}/>
      <S5_FlashCard    start={20}  end={25}/>
      <S6_Dilsiz       start={25}  end={29}/>
      <S7_NotlarAtlas  start={29}  end={34}/>
      <S8_SoruBank     start={34}  end={39}/>
      <S9_Calisma      start={39}  end={43}/>
      <S10_FeatureWall start={43}  end={47}/>
      <S11_Proof       start={47}  end={51}/>
      <S12_Neden       start={51}  end={55}/>
      <S13_LogoCTA     start={55}  end={60}/>
    </>
  );
}

Object.assign(window, { Ad3 });
