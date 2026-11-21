// Pigeon City - HTML5 Canvas Arcade Flight Game
(function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Virtual Game Dimensions (designed for crisp scaling in any aspect ratio)
  const VW = 360;
  let VH = 400;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;

  // Sound Engine using Web Audio API
  let audioCtx = null;
  let isMuted = localStorage.getItem('pigeon_city_muted') === 'true';

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'flap') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'crumb') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.06); // A5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'treat') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.setValueAtTime(987.77, now + 0.06); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.12); // E6
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);
        osc.start(now);
        osc.stop(now + 0.24);
      } else if (type === 'score') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      // Audio not permitted or interrupted
    }
  }

  // High Score
  let highScore = parseInt(localStorage.getItem('pigeon_city_highscore') || '0', 10);

  // Game States: 'START', 'PLAYING', 'GAMEOVER'
  let state = 'START';
  let score = 0;
  let foodCount = 0;
  let distance = 0;
  let frameCount = 0;

  // Camera & Speed (pleasant, balanced arcade pace)
  let scrollSpeed = 1.75;

  // Sound Button Hitbox in Virtual Coordinates
  const soundBtn = { x: VW - 38, y: 12, w: 26, h: 26 };

  // Pigeon Player
  const pigeon = {
    x: 80,
    y: 190,
    w: 32,
    h: 24,
    vy: 0,
    gravity: 0.28,
    flapPower: -5.7,
    rotation: 0,
    wingAngle: 0,
    isFlapping: false,
    flapTimer: 0,
    trail: [],
    reset() {
      this.x = 80;
      this.y = VH * 0.45;
      this.vy = 0;
      this.rotation = 0;
      this.wingAngle = 0;
      this.isFlapping = false;
      this.flapTimer = 0;
      this.trail = [];
    },
    flap() {
      this.vy = this.flapPower;
      this.isFlapping = true;
      this.flapTimer = 12;
      this.wingAngle = -0.7;
      playSound('flap');
      createFeathers(this.x - 4, this.y + 4, 3);
    },
    update() {
      if (state === 'START') {
        // Gentle bobbing motion in start screen
        this.y = VH * 0.45 + Math.sin(frameCount * 0.08) * 8;
        this.rotation = Math.sin(frameCount * 0.08) * 0.1;
        this.wingAngle = Math.sin(frameCount * 0.2) * 0.4;
        return;
      }

      this.vy += this.gravity;
      if (this.vy > 6.8) this.vy = 6.8;
      this.y += this.vy;

      // Rotation pitch
      if (this.vy < 0) {
        this.rotation = Math.max(-0.45, this.vy * 0.06);
      } else {
        this.rotation = Math.min(0.9, this.vy * 0.08);
      }

      // Wing animation
      if (this.flapTimer > 0) {
        this.flapTimer--;
        this.wingAngle = Math.sin(this.flapTimer * 0.6) * 0.8;
      } else {
        this.wingAngle = Math.sin(frameCount * 0.15) * 0.2;
      }

      // Ceiling & Floor Collision
      if (this.y < 12) {
        this.y = 12;
        this.vy = 0;
      }

      const floorY = VH - 28;
      if (this.y + this.h * 0.5 >= floorY) {
        this.y = floorY - this.h * 0.5;
        triggerGameOver();
      }
    },
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Shadow on floor if near bottom
      const floorDist = (VH - 28) - this.y;
      if (floorDist < 100 && floorDist > 0) {
        ctx.save();
        ctx.rotate(-this.rotation);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        const shadowScale = Math.max(0.2, 1 - floorDist / 100);
        ctx.beginPath();
        ctx.ellipse(0, floorDist, 14 * shadowScale, 4 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Pigeon Tail Feathers
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(-12, 2);
      ctx.lineTo(-20, -1);
      ctx.lineTo(-22, 5);
      ctx.lineTo(-12, 6);
      ctx.closePath();
      ctx.fill();

      // Pigeon Feet (pink)
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.moveTo(-2, 10);
      ctx.lineTo(-4, 14);
      ctx.lineTo(2, 14);
      ctx.lineTo(1, 10);
      ctx.fill();

      // Pigeon Body (slate grey gradient)
      const bodyGrad = ctx.createRadialGradient(-2, 0, 2, 0, 0, 16);
      bodyGrad.addColorStop(0, '#94a3b8');
      bodyGrad.addColorStop(0.6, '#64748b');
      bodyGrad.addColorStop(1, '#475569');
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(0, 2, 14, 10, -0.08, 0, Math.PI * 2);
      ctx.fill();

      // Iridescent Neck Collar (Green & Purple Sheen)
      const neckGrad = ctx.createLinearGradient(4, -6, 12, 4);
      neckGrad.addColorStop(0, '#10b981'); // Emerald green
      neckGrad.addColorStop(0.6, '#a855f7'); // Violet purple
      neckGrad.addColorStop(1, '#6366f1'); // Indigo
      ctx.fillStyle = neckGrad;
      ctx.beginPath();
      ctx.ellipse(7, -1, 6, 6, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Pigeon Head
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(10, -4, 7, 0, Math.PI * 2);
      ctx.fill();

      // Eye (Amber + Black Pupil + White Highlight)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(12, -5, 2.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(12.3, -5, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(11.8, -5.6, 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Beak (Yellow/Orange with tiny cere)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(15, -4);
      ctx.lineTo(21, -2.5);
      ctx.lineTo(15, -1);
      ctx.closePath();
      ctx.fill();

      // Cere (White dot on top of beak)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(15.5, -3.8, 1, 0, Math.PI * 2);
      ctx.fill();

      // Wing (Animated with wingAngle)
      ctx.save();
      ctx.translate(-2, 0);
      ctx.rotate(this.wingAngle);
      const wingGrad = ctx.createLinearGradient(-10, -8, 8, 6);
      wingGrad.addColorStop(0, '#475569');
      wingGrad.addColorStop(0.5, '#334155');
      wingGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = wingGrad;
      ctx.beginPath();
      ctx.ellipse(0, 1, 10, 6, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Wing Feathers detail
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-6, 2);
      ctx.lineTo(4, 2);
      ctx.moveTo(-4, 4);
      ctx.lineTo(6, 4);
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    }
  };

  // Particles (Feathers & Food Sparkles)
  let particles = [];
  function createFeathers(x, y, count) {
    for (let i = 0; i < count; i++) {
      particles.push({
        type: 'feather',
        x,
        y,
        vx: -Math.random() * 2 - 1,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#cbd5e1' : '#94a3b8',
        life: 25 + Math.random() * 15,
        maxLife: 40,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function createSparkles(x, y, text) {
    for (let i = 0; i < 7; i++) {
      const angle = (Math.PI * 2 / 7) * i;
      particles.push({
        type: 'sparkle',
        x,
        y,
        vx: Math.cos(angle) * (Math.random() * 2 + 1),
        vy: Math.sin(angle) * (Math.random() * 2 + 1),
        size: Math.random() * 3 + 2,
        color: ['#fbbf24', '#f59e0b', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 4)],
        life: 20,
        maxLife: 20
      });
    }
    if (text) {
      particles.push({
        type: 'floatText',
        x,
        y: y - 8,
        text,
        vy: -1.2,
        life: 30,
        maxLife: 30
      });
    }
  }

  // Obstacles (Buildings, Rooftop Chimneys, Water Towers, Antennas)
  let obstacles = [];
  let obstacleTimer = 0;
  const OBSTACLE_INTERVAL = 125; // comfortable breathing room between buildings
  const GAP_SIZE = 148; // generous, fun flight gap size

  function spawnObstacle() {
    const minHeight = 45;
    const maxHeight = VH - GAP_SIZE - minHeight - 35;
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    const bottomY = topHeight + GAP_SIZE;
    const bottomHeight = VH - bottomY - 26;

    // Type styling: 0 = Modern Blue Skyscraper, 1 = Red Brick Rooftop & Chimney, 2 = Industrial Metal
    const theme = Math.floor(Math.random() * 3);

    obstacles.push({
      x: VW + 20,
      w: 52,
      topH: topHeight,
      bottomY: bottomY,
      bottomH: bottomHeight,
      passed: false,
      theme,
      antenna: Math.random() > 0.4,
      waterTower: Math.random() > 0.6
    });

    // Also spawn a collectible treat in the gap or just before/after
    const foodType = Math.random() < 0.6 ? 'crumb' : (Math.random() < 0.85 ? 'fry' : 'bagel');
    const foodY = topHeight + GAP_SIZE * 0.5 + (Math.random() - 0.5) * 40;
    foods.push({
      x: VW + 52 + 25,
      y: foodY,
      type: foodType,
      collected: false,
      bobOffset: Math.random() * Math.PI * 2
    });
  }

  // Food Collectibles (Breadcrumb, French Fry, Golden Bagel)
  let foods = [];

  // Parallax City Background Elements
  const clouds = [
    { x: 30, y: 35, w: 65, speed: 0.3 },
    { x: 170, y: 70, w: 80, speed: 0.2 },
    { x: 290, y: 40, w: 55, speed: 0.35 }
  ];

  // Distant Skyline Silhouettes
  const distantBuildings = [];
  for (let x = 0; x < VW + 120; x += 28) {
    distantBuildings.push({
      x,
      w: 24 + Math.random() * 16,
      h: 80 + Math.random() * 80,
      windows: Math.random() > 0.3
    });
  }

  // Midground Buildings
  const midBuildings = [];
  for (let x = 0; x < VW + 120; x += 45) {
    midBuildings.push({
      x,
      w: 38 + Math.random() * 20,
      h: 120 + Math.random() * 90
    });
  }

  function resetGame() {
    state = 'PLAYING';
    score = 0;
    foodCount = 0;
    distance = 0;
    obstacles = [];
    foods = [];
    particles = [];
    obstacleTimer = 20;
    pigeon.reset();
    pigeon.flap();
  }

  function triggerGameOver() {
    if (state === 'GAMEOVER') return;
    state = 'GAMEOVER';
    playSound('hit');
    createFeathers(pigeon.x, pigeon.y, 8);

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('pigeon_city_highscore', highScore.toString());
      playSound('score');
    }
  }

  // Input Handlers
  function handleAction() {
    initAudio();
    if (state === 'START') {
      resetGame();
    } else if (state === 'PLAYING') {
      pigeon.flap();
    } else if (state === 'GAMEOVER') {
      resetGame();
    }
  }

  function checkSoundClick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const clickX = (clientX - rect.left - offsetX) / scale;
    const clickY = (clientY - rect.top - offsetY) / scale;

    if (
      clickX >= soundBtn.x - 6 &&
      clickX <= soundBtn.x + soundBtn.w + 6 &&
      clickY >= soundBtn.y - 6 &&
      clickY <= soundBtn.y + soundBtn.h + 6
    ) {
      isMuted = !isMuted;
      localStorage.setItem('pigeon_city_muted', isMuted ? 'true' : 'false');
      initAudio();
      return true;
    }
    return false;
  }

  canvas.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    if (checkSoundClick(e.clientX, e.clientY)) {
      return;
    }
    handleAction();
  });

  window.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      handleAction();
    } else if (e.code === 'KeyM') {
      isMuted = !isMuted;
      localStorage.setItem('pigeon_city_muted', isMuted ? 'true' : 'false');
    }
  });

  // Responsive Resize
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth || 360;
    const h = rect.height || window.innerHeight || 400;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    // Dynamic virtual height to preserve aspect ratio
    const currentAspect = h / w;
    VH = Math.max(340, Math.round(VW * currentAspect));

    scale = (w * dpr) / VW;
    offsetX = 0;
    offsetY = 0;
  }

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);
  setTimeout(resize, 50);

  // Main Update Loop
  function update() {
    frameCount++;

    // Clouds
    for (let c of clouds) {
      c.x -= c.speed;
      if (c.x + c.w < 0) c.x = VW + 20;
    }

    // Distant & Mid Buildings scroll in playing mode
    if (state === 'PLAYING') {
      distance += scrollSpeed;

      for (let b of distantBuildings) {
        b.x -= scrollSpeed * 0.2;
        if (b.x + b.w < 0) {
          b.x = VW + Math.random() * 15;
          b.h = 80 + Math.random() * 80;
        }
      }

      for (let b of midBuildings) {
        b.x -= scrollSpeed * 0.45;
        if (b.x + b.w < 0) {
          b.x = VW + Math.random() * 20;
          b.h = 120 + Math.random() * 90;
        }
      }

      // Obstacle Generation
      obstacleTimer++;
      if (obstacleTimer >= OBSTACLE_INTERVAL) {
        obstacleTimer = 0;
        spawnObstacle();
      }

      // Obstacle Updates & Collision
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= scrollSpeed;

        // Check scoring pass
        if (!obs.passed && obs.x + obs.w < pigeon.x) {
          obs.passed = true;
          score += 1;
          playSound('score');
        }

        // Hitbox collision check (forgiving circle/box collision)
        const pr = 7.5; // forgiving pigeon collision radius (fair near-misses)
        const px = pigeon.x;
        const py = pigeon.y;

        // Top building collision
        if (px + pr > obs.x && px - pr < obs.x + obs.w && py - pr < obs.topH) {
          triggerGameOver();
        }

        // Bottom building collision
        if (px + pr > obs.x && px - pr < obs.x + obs.w && py + pr > obs.bottomY) {
          triggerGameOver();
        }

        // Remove off-screen
        if (obs.x + obs.w < -20) {
          obstacles.splice(i, 1);
        }
      }

      // Food Treats Update & Collection
      for (let i = foods.length - 1; i >= 0; i--) {
        const f = foods[i];
        f.x -= scrollSpeed;
        const bobY = f.y + Math.sin(frameCount * 0.1 + f.bobOffset) * 4;

        // Distance check for collection
        const dx = pigeon.x - f.x;
        const dy = pigeon.y - bobY;
        const dist = Math.hypot(dx, dy);

        if (!f.collected && dist < 22) {
          f.collected = true;
          foodCount++;
          let points = 10;
          let label = '+10';
          if (f.type === 'fry') {
            points = 25;
            label = '+25';
            playSound('treat');
          } else if (f.type === 'bagel') {
            points = 50;
            label = '+50';
            playSound('treat');
          } else {
            playSound('crumb');
          }
          score += points;
          createSparkles(f.x, bobY, label);
        }

        if (f.x < -30 || f.collected) {
          foods.splice(i, 1);
        }
      }
    }

    pigeon.update();

    // Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life--;
      p.x += p.vx || 0;
      p.y += p.vy || 0;
      if (p.rot !== undefined) p.rot += p.vrot || 0;
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  // Render Everything
  function draw() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(scale, scale);
    ctx.translate(offsetX, offsetY);

    // 1. Sky Gradient (City Sunset Glow)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, VH);
    skyGrad.addColorStop(0, '#0f172a'); // Midnight slate
    skyGrad.addColorStop(0.4, '#1e293b'); // Dark blue
    skyGrad.addColorStop(0.75, '#334155'); // Dusk indigo
    skyGrad.addColorStop(0.92, '#f97316'); // Warm sunset glow
    skyGrad.addColorStop(1, '#ea580c'); // Deep orange horizon
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, VW, VH);

    // 2. Sunset Sun
    ctx.save();
    ctx.fillStyle = 'rgba(254, 215, 170, 0.25)';
    ctx.beginPath();
    ctx.arc(VW * 0.72, VH * 0.65, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(VW * 0.72, VH * 0.65, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let c of clouds) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.w * 0.28, 0, Math.PI * 2);
      ctx.arc(c.x + c.w * 0.3, c.y - 4, c.w * 0.35, 0, Math.PI * 2);
      ctx.arc(c.x + c.w * 0.65, c.y, c.w * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Distant City Skyline
    ctx.fillStyle = '#1e1b4b'; // Deep violet silhouette
    for (let b of distantBuildings) {
      ctx.fillRect(b.x, VH - b.h - 26, b.w, b.h);
      // Windows
      if (b.windows) {
        ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
        for (let wy = VH - b.h - 16; wy < VH - 36; wy += 14) {
          ctx.fillRect(b.x + 4, wy, 3, 4);
          ctx.fillRect(b.x + b.w - 7, wy, 3, 4);
        }
        ctx.fillStyle = '#1e1b4b';
      }
    }

    // 5. Midground Buildings
    ctx.fillStyle = '#111827';
    for (let b of midBuildings) {
      ctx.fillRect(b.x, VH - b.h - 26, b.w, b.h);
      // Blinking red beacon on tall roofs
      if (Math.floor(b.x / 50) % 2 === 0) {
        ctx.fillStyle = frameCount % 60 < 30 ? '#ef4444' : 'rgba(239, 68, 68, 0.2)';
        ctx.beginPath();
        ctx.arc(b.x + b.w * 0.5, VH - b.h - 29, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#111827';
      }
    }

    // 6. Obstacles (Foreground Buildings & Structures)
    for (let obs of obstacles) {
      drawBuilding(obs.x, 0, obs.w, obs.topH, true, obs.theme, obs.antenna);
      drawBuilding(obs.x, obs.bottomY, obs.w, obs.bottomH, false, obs.theme, obs.waterTower);
    }

    // 7. Food Collectibles
    for (let f of foods) {
      const bobY = f.y + Math.sin(frameCount * 0.1 + f.bobOffset) * 4;
      drawFood(f.x, bobY, f.type);
    }

    // 8. Ground / Rooftop Base
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, VH - 26, VW, 26);
    // Ground neon edge line
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(0, VH - 26, VW, 2);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, VH - 24, VW, 1);

    // 9. Particles
    for (let p of particles) {
      ctx.save();
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = Math.max(0, alpha);

      if (p.type === 'feather') {
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'sparkle') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'floatText') {
        ctx.font = 'bold 13px system-ui, sans-serif';
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = 6;
        ctx.textAlign = 'center';
        ctx.fillText(p.text, p.x, p.y);
      }
      ctx.restore();
    }

    // 10. Pigeon Character
    pigeon.draw();

    // 11. HUD Overlay
    drawHUD();

    ctx.restore();
  }

  // Draw Themed Building Obstacle
  function drawBuilding(x, y, w, h, isTop, theme, hasExtra) {
    ctx.save();

    // Colors by theme
    let mainColor = '#1e293b';
    let trimColor = '#334155';
    let windowColor = 'rgba(254, 240, 138, 0.7)';

    if (theme === 1) {
      mainColor = '#881337'; // Brick red
      trimColor = '#9f1239';
      windowColor = 'rgba(253, 230, 138, 0.65)';
    } else if (theme === 2) {
      mainColor = '#0f766e'; // Teal industrial
      trimColor = '#115e59';
      windowColor = 'rgba(165, 243, 252, 0.7)';
    }

    // Body
    ctx.fillStyle = mainColor;
    ctx.fillRect(x, y, w, h);

    // Decorative ledge/cornice at the opening
    ctx.fillStyle = trimColor;
    if (isTop) {
      ctx.fillRect(x - 3, y + h - 8, w + 6, 8);
    } else {
      ctx.fillRect(x - 3, y, w + 6, 8);
    }

    // Windows Grid
    ctx.fillStyle = windowColor;
    const startY = isTop ? y + 8 : y + 16;
    const endY = isTop ? y + h - 14 : y + h - 8;

    for (let wy = startY; wy < endY; wy += 15) {
      ctx.fillRect(x + 7, wy, 8, 7);
      ctx.fillRect(x + w - 15, wy, 8, 7);
      if (w >= 50) {
        ctx.fillRect(x + (w - 8) * 0.5, wy, 8, 7);
      }
    }

    // Antenna on roof
    if (hasExtra && !isTop && theme === 0) {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y);
      ctx.lineTo(x + w * 0.5, y - 16);
      ctx.stroke();
      // Red blinking light
      ctx.fillStyle = frameCount % 40 < 20 ? '#ef4444' : '#7f1d1d';
      ctx.beginPath();
      ctx.arc(x + w * 0.5, y - 17, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Draw Food Items (Breadcrumb, Fry, Bagel)
  function drawFood(x, y, type) {
    ctx.save();
    ctx.translate(x, y);

    // Soft aura
    ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();

    if (type === 'fry') {
      // Golden French Fry 🍟
      ctx.fillStyle = '#f59e0b';
      ctx.rotate(0.3);
      ctx.fillRect(-3, -9, 6, 18);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-2, -8, 2, 16);
    } else if (type === 'bagel') {
      // NYC Sesame Bagel 🥯
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      // Sesame seeds
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(-4, -4, 1.5, 1.5);
      ctx.fillRect(3, -2, 1.5, 1.5);
      ctx.fillRect(-2, 4, 1.5, 1.5);
    } else {
      // Warm Breadcrumb 🍞
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(-1, -1, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Draw UI / HUD
  function drawHUD() {
    // Sound Button
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    ctx.beginPath();
    ctx.roundRect(soundBtn.x, soundBtn.y, soundBtn.w, soundBtn.h, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isMuted ? '🔇' : '🔊', soundBtn.x + soundBtn.w * 0.5, soundBtn.y + soundBtn.h * 0.5);
    ctx.restore();

    if (state === 'START') {
      // Start Screen
      ctx.save();
      // Title Banner
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.beginPath();
      ctx.roundRect(VW * 0.5 - 110, VH * 0.18, 220, 56, 12);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 10;
      ctx.fillText('PIGEON CITY', VW * 0.5, VH * 0.18 + 32);

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 10px system-ui, sans-serif';
      ctx.fillText('ARCADE FLIGHT', VW * 0.5, VH * 0.18 + 48);

      // Play prompt (pulsing)
      const pulse = Math.sin(frameCount * 0.1) * 0.15 + 0.85;
      ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
      ctx.font = '700 14px system-ui, sans-serif';
      ctx.fillText('TAP OR [SPACE] TO FLY', VW * 0.5, VH * 0.68);

      // Best Score
      ctx.fillStyle = '#fbbf24';
      ctx.font = '600 12px system-ui, sans-serif';
      ctx.fillText(`🏆 BEST: ${highScore}`, VW * 0.5, VH * 0.75);

      ctx.restore();
    } else if (state === 'PLAYING') {
      // Live Score Counter
      ctx.save();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 32px system-ui, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 8;
      ctx.fillText(score.toString(), VW * 0.5, 46);

      // Food counter pill
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.beginPath();
      ctx.roundRect(14, 12, 68, 24, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();

      ctx.font = '12px system-ui, sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.textAlign = 'left';
      ctx.fillText(`🍞 ${foodCount}`, 22, 28);
      ctx.restore();
    } else if (state === 'GAMEOVER') {
      // Game Over Screen
      ctx.save();

      // Modal Background Card
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.beginPath();
      ctx.roundRect(VW * 0.5 - 120, VH * 0.22, 240, 175, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#f43f5e';
      ctx.font = '900 22px system-ui, sans-serif';
      ctx.shadowColor = 'rgba(244, 63, 94, 0.5)';
      ctx.shadowBlur = 8;
      ctx.fillText('GAME OVER', VW * 0.5, VH * 0.22 + 34);

      // Score details
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px system-ui, sans-serif';
      ctx.fillText('SCORE', VW * 0.5 - 50, VH * 0.22 + 62);
      ctx.fillText('BEST', VW * 0.5 + 50, VH * 0.22 + 62);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 22px system-ui, sans-serif';
      ctx.fillText(score.toString(), VW * 0.5 - 50, VH * 0.22 + 88);

      ctx.fillStyle = '#fbbf24';
      ctx.fillText(highScore.toString(), VW * 0.5 + 50, VH * 0.22 + 88);

      // Medal Award
      let medal = '🥉 City Roost';
      if (score >= 60) medal = '💎 Sky Legend';
      else if (score >= 35) medal = '🥇 Golden Pigeon';
      else if (score >= 15) medal = '🥈 Park Regular';

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 12px system-ui, sans-serif';
      ctx.fillText(medal, VW * 0.5, VH * 0.22 + 118);

      // Play Again Prompt
      const pulse = Math.sin(frameCount * 0.12) * 0.2 + 0.8;
      ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
      ctx.font = '700 13px system-ui, sans-serif';
      ctx.fillText('TAP TO PLAY AGAIN', VW * 0.5, VH * 0.22 + 152);

      ctx.restore();
    }
  }

  // Animation Loop with Fixed Timestep (60 FPS Physics Normalizer)
  // Guarantees smooth, identical speed on 60Hz, 120Hz ProMotion, 144Hz, and mobile displays
  let lastTime = 0;
  let accumulator = 0;
  const TIMESTEP = 1000 / 60; // 16.667ms per physics tick

  function loop(currentTime) {
    if (!lastTime) lastTime = currentTime;
    let delta = currentTime - lastTime;
    lastTime = currentTime;

    // Guard against tab switching spikes
    if (delta > 100) delta = 100;
    if (delta < 0) delta = 0;

    accumulator += delta;

    // Run exact 60fps physics step
    while (accumulator >= TIMESTEP) {
      update();
      accumulator -= TIMESTEP;
    }

    draw();
    requestAnimationFrame(loop);
  }

  // Start Loop
  requestAnimationFrame(loop);
})();
