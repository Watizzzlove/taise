import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import gsap from 'gsap';

export class HeroBuildingScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0d13);
    this.scene.fog = new THREE.FogExp2(0x0a0d13, 0.022);

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    // Perspective Camera matching 3d-rakurs.png
    this.camera = new THREE.PerspectiveCamera(36, this.width / this.height, 0.1, 100);
    this.initialCamPos = new THREE.Vector3(1.0, 3.9, 17.6);
    this.initialTarget = new THREE.Vector3(3.2, 2.6, -0.3);
    this.camera.position.copy(this.initialCamPos);
    this.camera.lookAt(this.initialTarget);

    // WebGL Renderer - Optimized pixel ratio to eliminate GPU strain and hover lag
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // Mouse Parallax Values
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isTransitioning = false;
    this.isPaused = false;

    // Root Group for the Building
    this.buildingGroup = new THREE.Group();
    // Rotate so the 90° corner faces the camera, exactly like in the real photo and 3d-rakurs.png
    this.buildingGroup.position.set(0.0, -0.4, 0.0);
    this.buildingGroup.rotation.y = 0.52; // ~30 degrees
    this.scene.add(this.buildingGroup);

    window.__heroScene = this;

    this.initMaterials();
    this.initLights();
    this.buildGround();
    this.buildBuilding();
    this.addEventListeners();
    this.animate();
  }

  /**
   * Helper to create authentic 60x60cm porcelain stoneware cassette panel textures
   * matching the evening real photo of Taise bistro
   */
  createPorcelainTileTexture(repeatX, repeatY) {
    const tileCanvas = document.createElement('canvas');
    tileCanvas.width = 1024;
    tileCanvas.height = 1024;
    const ctx = tileCanvas.getContext('2d');

    // Base evening latte porcelain stoneware
    ctx.fillStyle = '#9b8779';
    ctx.fillRect(0, 0, 1024, 1024);

    const numTiles = 8;
    const tileSize = 1024 / numTiles; // 128px per 60x60cm cassette panel

    for (let ty = 0; ty < numTiles; ty++) {
      for (let tx = 0; tx < numTiles; tx++) {
        const x = tx * tileSize;
        const y = ty * tileSize;

        // Subtle per-panel ceramic tone variation (+-3%)
        const varVal = (Math.random() - 0.5) * 8;
        const r = Math.min(255, Math.max(0, 160 + varVal));
        const g = Math.min(255, Math.max(0, 142 + varVal * 0.9));
        const b = Math.min(255, Math.max(0, 128 + varVal * 0.8));

        // Satin bevel gradient on each panel
        const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
        grad.addColorStop(0, `rgb(${Math.min(255, r + 15)}, ${Math.min(255, g + 13)}, ${Math.min(255, b + 11)})`);
        grad.addColorStop(0.5, `rgb(${r}, ${g}, ${b})`);
        grad.addColorStop(1, `rgb(${Math.max(0, r - 12)}, ${Math.max(0, g - 12)}, ${Math.max(0, b - 10)})`);
        ctx.fillStyle = grad;
        ctx.fillRect(x + 1.5, y + 1.5, tileSize - 3, tileSize - 3);

        // Delicate ceramic gloss highlight along top and left edge of tile
        ctx.fillStyle = 'rgba(255, 245, 235, 0.12)';
        ctx.fillRect(x + 1.5, y + 1.5, tileSize - 3, 2);
        ctx.fillRect(x + 1.5, y + 1.5, 2, tileSize - 3);

        // Darker seam shadow on bottom and right edge
        ctx.fillStyle = 'rgba(40, 30, 25, 0.22)';
        ctx.fillRect(x + 1.5, y + tileSize - 3.5, tileSize - 3, 2);
        ctx.fillRect(x + tileSize - 3.5, y + 1.5, 2, tileSize - 3);
      }
    }

    // Thin architectural cassette joint lines (dark charcoal grout seams)
    ctx.strokeStyle = '#4e3f36';
    ctx.lineWidth = 2.5;
    for (let i = 0; i <= numTiles; i++) {
      const pos = i * tileSize;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, 1024);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(1024, pos);
      ctx.stroke();
    }

    // Micro-surface stone grain
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.035)';
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;
      ctx.fillRect(rx, ry, Math.random() * 40 + 10, Math.random() * 40 + 10);
    }

    const texture = new THREE.CanvasTexture(tileCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    return texture;
  }

  /**
   * Helper to generate realistic spruce needle spray texture (tree-medium-1, 2, 3)
   */
  createSpruceNeedleTexture(isSilverBlue) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);

    // Draw central woody twig stem
    ctx.strokeStyle = '#2b1f14';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(256, 495);
    ctx.quadraticCurveTo(256, 260, 256, 35);
    ctx.stroke();

    // Secondary lateral twig branches
    for (let i = 0; i < 10; i++) {
      const y = 440 - i * 38;
      const len = 100 - i * 7.5;
      ctx.lineWidth = Math.max(3, 7 - i * 0.4);
      // left
      ctx.beginPath();
      ctx.moveTo(256, y);
      ctx.quadraticCurveTo(256 - len * 0.5, y - 16, 256 - len, y - 28);
      ctx.stroke();
      // right
      ctx.beginPath();
      ctx.moveTo(256, y);
      ctx.quadraticCurveTo(256 + len * 0.5, y - 16, 256 + len, y - 28);
      ctx.stroke();
    }

    // Dense radial conifer needles matching reference photos
    // Harmonized deep nocturnal evergreen conifer needle palette under night sky
    const baseCol = isSilverBlue ? '#0f221c' : '#0d1f14';
    const midCol  = isSilverBlue ? '#1c382f' : '#17311f';
    const tipCol  = isSilverBlue ? '#294d40' : '#23442a';

    for (let y = 475; y > 45; y -= 5) {
      const spread = (490 - y) * 0.33;
      const needleCount = 16;

      for (let n = 0; n < needleCount; n++) {
        const side = n % 2 === 0 ? -1 : 1;
        const cx = 256 + side * (Math.random() * spread * 0.72);
        const ang = side < 0 ? -Math.PI * (0.58 + Math.random() * 0.32) : -Math.PI * (0.42 - Math.random() * 0.32);
        const len = 38 + Math.random() * 26;
        const nx = cx + Math.cos(ang) * len;
        const ny = y + Math.sin(ang) * len;

        const grad = ctx.createLinearGradient(cx, y, nx, ny);
        grad.addColorStop(0, baseCol);
        grad.addColorStop(0.5, midCol);
        grad.addColorStop(1, tipCol);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
      }
    }

    // Soft feathered vignette mask around conifer needle spray for seamless blending
    ctx.globalCompositeOperation = 'destination-in';
    const spruceMask = ctx.createRadialGradient(256, 260, 185, 256, 260, 252);
    spruceMask.addColorStop(0, 'rgba(0, 0, 0, 1)');
    spruceMask.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spruceMask;
    ctx.fillRect(0, 0, 512, 512);
    ctx.globalCompositeOperation = 'source-over';

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * Helper to generate realistic scotch pine long-needle cluster texture (tree-big-1, 2)
   */
  createPineNeedleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);

    const centers = [
      { x: 256, y: 256, r: 210, count: 210 },
      { x: 175, y: 210, r: 155, count: 120 },
      { x: 337, y: 210, r: 155, count: 120 },
      { x: 256, y: 145, r: 145, count: 110 },
      { x: 195, y: 330, r: 135, count: 95 },
      { x: 317, y: 330, r: 135, count: 95 }
    ];

    centers.forEach(c => {
      for (let i = 0; i < c.count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const len = c.r * (0.65 + Math.random() * 0.35);
        const curve = (Math.random() - 0.5) * 0.28;

        const ex = c.x + Math.cos(ang + curve) * len;
        const ey = c.y + Math.sin(ang + curve) * len;

        const grad = ctx.createLinearGradient(c.x, c.y, ex, ey);
        grad.addColorStop(0, '#0d1f14');
        grad.addColorStop(0.55, '#17311f');
        grad.addColorStop(1, '#23442a');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 3.4;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.quadraticCurveTo(
          c.x + Math.cos(ang) * (len * 0.5) + (Math.random() - 0.5) * 8,
          c.y + Math.sin(ang) * (len * 0.5) + (Math.random() - 0.5) * 8,
          ex, ey
        );
        ctx.stroke();
      }
    });

    // Soft feathered vignette mask around pine needle clouds to eliminate hard card borders
    ctx.globalCompositeOperation = 'destination-in';
    const pineMask = ctx.createRadialGradient(256, 256, 175, 256, 256, 252);
    pineMask.addColorStop(0, 'rgba(0, 0, 0, 1)');
    pineMask.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = pineMask;
    ctx.fillRect(0, 0, 512, 512);
    ctx.globalCompositeOperation = 'source-over';

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * Helper to generate lush leafy shrub/bush foliage texture (Spiraea, Boxwood, Mountain Juniper)
   */
  createBushTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);

    const clusters = [
      { x: 256, y: 256, r: 210, count: 240 },
      { x: 180, y: 210, r: 150, count: 140 },
      { x: 332, y: 210, r: 150, count: 140 },
      { x: 256, y: 150, r: 140, count: 120 },
      { x: 190, y: 320, r: 140, count: 120 },
      { x: 322, y: 320, r: 140, count: 120 }
    ];

    clusters.forEach(c => {
      for (let i = 0; i < c.count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.6) * c.r;
        const lx = c.x + Math.cos(ang) * dist;
        const ly = c.y + Math.sin(ang) * dist;
        const leafSize = 14 + Math.random() * 18;
        const leafAng = Math.random() * Math.PI * 2;

        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(leafAng);

        const shade = Math.random();
        if (shade < 0.4) {
          ctx.fillStyle = '#0e2015';
        } else if (shade < 0.75) {
          ctx.fillStyle = '#17311f';
        } else {
          ctx.fillStyle = '#23442a';
        }

        ctx.beginPath();
        ctx.ellipse(0, 0, leafSize * 0.5, leafSize * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(50, 95, 60, 0.2)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, -leafSize * 0.7);
        ctx.lineTo(0, leafSize * 0.7);
        ctx.stroke();

        ctx.restore();
      }
    });

    ctx.globalCompositeOperation = 'destination-in';
    const mask = ctx.createRadialGradient(256, 256, 175, 256, 256, 252);
    mask.addColorStop(0, 'rgba(0, 0, 0, 1)');
    mask.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, 512, 512);
    ctx.globalCompositeOperation = 'source-over';

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * Helper to generate a continuous panoramic forest silhouette backdrop sealing the horizon completely
   */
  createHorizonBackdropTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 2048, 512);

    // Multi-layered dense forest silhouette: background and foreground trees
    const treeCount = 140;
    for (let i = 0; i < treeCount; i++) {
      const x = (i / treeCount) * 2048 + (Math.random() - 0.5) * 16;
      const th = 220 + Math.random() * 200;
      const tw = 40 + Math.random() * 50;
      const topY = 512 - th;

      // Dark nocturnal forest tone
      ctx.fillStyle = i % 2 === 0 ? '#080d11' : '#0b1216';
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x + tw * 0.55, 512);
      ctx.lineTo(x - tw * 0.55, 512);
      ctx.closePath();
      ctx.fill();

      // Rounded pine/fir crown clusters along tree
      for (let c = 0; c < 4; c++) {
        const cy = topY + 25 + c * (th * 0.18);
        const cr = (tw * 0.35) * (1.0 + c * 0.2);
        ctx.beginPath();
        ctx.arc(x, cy, cr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Completely solid dense understory base ensuring zero gaps at ground level
    ctx.fillStyle = '#0a0d13';
    ctx.fillRect(0, 360, 2048, 152);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(3, 1);
    return tex;
  }

  /**
   * Helper to generate realistic stone paving blocks for urban park promenade (Screenshot 2)
   */
  createPlazaPavingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base dark urban promenade pavement
    ctx.fillStyle = '#2b2927';
    ctx.fillRect(0, 0, 1024, 1024);

    const rows = 16;
    const rowH = 1024 / rows;
    const blockW = rowH * 2.0;

    for (let r = 0; r < rows; r++) {
      const y = r * rowH;
      const xOffset = (r % 2) * (blockW * 0.5);
      const cols = Math.ceil(1024 / blockW) + 2;

      for (let c = -1; c < cols; c++) {
        const x = c * blockW + xOffset;

        // Individual stone paver shade variation
        const toneVar = (Math.random() - 0.5) * 18;
        const red = Math.min(255, Math.max(0, 56 + toneVar));
        const green = Math.min(255, Math.max(0, 52 + toneVar * 0.95));
        const blue = Math.min(255, Math.max(0, 48 + toneVar * 0.9));

        ctx.fillStyle = `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
        ctx.fillRect(x + 1.5, y + 1.5, blockW - 3, rowH - 3);

        // Subtle bevel highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.fillRect(x + 1.5, y + 1.5, blockW - 3, 1.5);
        ctx.fillRect(x + 1.5, y + 1.5, 1.5, rowH - 3);

        // Subtle bevel shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.fillRect(x + 1.5, y + rowH - 3, blockW - 3, 1.5);
        ctx.fillRect(x + blockW - 3, y + 1.5, 1.5, rowH - 3);
      }
    }

    // Mortar joint lines
    ctx.strokeStyle = '#181615';
    ctx.lineWidth = 2.0;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * rowH);
      ctx.lineTo(1024, r * rowH);
      ctx.stroke();
    }

    // Micro surface granite grain
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(Math.random() * 1024, Math.random() * 1024, Math.random() * 16 + 4, Math.random() * 16 + 4);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(14, 14);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * Helper to generate dark conifer mulch/turf texture for park tree beds
   */
  createLawnGrassTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Rich dark conifer bed soil
    ctx.fillStyle = '#1c241a';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const g = 38 + Math.random() * 38;
      const r = g * 0.72;
      const b = g * 0.52;
      ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.45)`;
      ctx.fillRect(x, y, Math.random() * 5 + 1, Math.random() * 5 + 1);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * Initialize authentic terracotta/mocha-stone tile materials from real photo
   */
  initMaterials() {
    // 1. Facade Ceramic Tile Materials (warm evening latte/mocha porcelain stoneware with satin sheen)
    // Scaled so 60x60cm cassette panels have identical physical dimensions on both walls
    this.facadeMat = new THREE.MeshStandardMaterial({
      color: 0xb5a192,
      map: this.createPorcelainTileTexture(3.25, 1.25),
      roughness: 0.32,
      metalness: 0.15
    });

    this.leftFacadeMat = new THREE.MeshStandardMaterial({
      color: 0xb5a192,
      map: this.createPorcelainTileTexture(2.4, 1.25),
      roughness: 0.32,
      metalness: 0.15
    });

    // Darker roof & foundation material
    this.darkRoofMat = new THREE.MeshStandardMaterial({
      color: 0x272422,
      roughness: 0.85,
      metalness: 0.1
    });

    // Warm Golden Soffit/Ceiling of the entrance arch (from real photo)
    this.soffitMat = new THREE.MeshStandardMaterial({
      color: 0xf5b848,
      roughness: 0.45,
      metalness: 0.1,
      emissive: 0xd98d22,
      emissiveIntensity: 0.65
    });

    // Dark Charcoal Window Mullions / Metal Frames
    this.frameMat = new THREE.MeshStandardMaterial({
      color: 0x1b1c20,
      roughness: 0.3,
      metalness: 0.85
    });

    // Tinted Window Glass with realistic transparency letting the interior amber glow radiate through
    this.glassMat = new THREE.MeshStandardMaterial({
      color: 0x16202c,
      roughness: 0.12,
      metalness: 0.85,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });

    // Warm Glowing Interior Backing (radiant amber izakaya illumination, visible from both sides)
    this.interiorGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffb242,
      emissive: 0xff8c14,
      emissiveIntensity: 3.6,
      roughness: 0.3,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    // Yellow Neon Sign Material
    this.neonSignMat = new THREE.MeshBasicMaterial({
      color: 0xffea00,
      side: THREE.DoubleSide
    });

    // Golden Fairy Lights (dense cascading curtain)
    this.fairyLightMat = new THREE.MeshStandardMaterial({
      color: 0xffec94,
      emissive: 0xffc730,
      emissiveIntensity: 5.5,
      roughness: 0.1
    });

    // Polished Chrome Door Handles
    this.chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe8ecf2,
      metalness: 0.95,
      roughness: 0.15
    });

    // Dark Wood Steps
    this.woodMat = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      roughness: 0.75,
      metalness: 0.05
    });

    // --- Environment Materials (Trees, Park Lanterns, Benches, Ground) ---
    // Scotch Pine lower rough dark trunk bark
    this.pineBarkMat = new THREE.MeshStandardMaterial({
      color: 0x241d18,
      roughness: 0.95,
      metalness: 0.02
    });

    // Scotch Pine distinctive warm cinnamon orange upper bark (toned for evening/night)
    this.pineOrangeBarkMat = new THREE.MeshStandardMaterial({
      color: 0x6e361c,
      roughness: 0.85,
      metalness: 0.04
    });

    // Dark Spruce trunk bark
    this.spruceBarkMat = new THREE.MeshStandardMaterial({
      color: 0x1e1915,
      roughness: 0.95,
      metalness: 0.02
    });

    // Deep evergreen needle core volume cone
    this.spruceCoreMat = new THREE.MeshStandardMaterial({
      color: 0x101a14,
      roughness: 0.92,
      metalness: 0.02
    });

    // High-fidelity needle & foliage textures
    this.spruceNeedleTex1 = this.createSpruceNeedleTexture(true); // Blue spruce (tree-medium-1, 2)
    this.spruceNeedleTex2 = this.createSpruceNeedleTexture(false); // Alpine spruce (tree-medium-3)
    this.pineNeedleTex = this.createPineNeedleTexture(); // Scotch pine (tree-big-1, 2)
    this.bushTex = this.createBushTexture(); // Spiraea, Boxwood, Juniper bushes

    // Unified Nocturnal Foliage Materials (harmonious deep forest evergreen palette under night sky)
    this.blueNeedleCanopyMat = new THREE.MeshStandardMaterial({
      map: this.spruceNeedleTex1,
      color: 0x142820, // Unified deep nocturnal conifer evergreen
      transparent: true,
      alphaTest: 0.25,
      roughness: 0.85,
      metalness: 0.02,
      emissive: 0x030705,
      side: THREE.DoubleSide
    });

    this.greenNeedleCanopyMat = new THREE.MeshStandardMaterial({
      map: this.spruceNeedleTex2,
      color: 0x142820, // Unified deep nocturnal conifer evergreen
      transparent: true,
      alphaTest: 0.25,
      roughness: 0.85,
      metalness: 0.02,
      emissive: 0x030705,
      side: THREE.DoubleSide
    });

    // Scotch Pine Canopy (harmonized with trees in night mode)
    this.pineCanopyMat = new THREE.MeshStandardMaterial({
      map: this.pineNeedleTex,
      color: 0x142820, // Unified deep nocturnal conifer evergreen
      transparent: true,
      alphaTest: 0.25,
      roughness: 0.85,
      metalness: 0.02,
      emissive: 0x030705,
      side: THREE.DoubleSide
    });

    // Lush Shrub / Bush Material (harmonized with trees: velvety dark boxwood green)
    this.bushMat = new THREE.MeshStandardMaterial({
      map: this.bushTex,
      color: 0x142820, // Unified deep nocturnal conifer evergreen
      transparent: true,
      alphaTest: 0.22,
      roughness: 0.84,
      metalness: 0.02,
      emissive: 0x030705,
      side: THREE.DoubleSide
    });

    // Panoramic Horizon Forest Silhouette Backdrop
    this.backdropMat = new THREE.MeshBasicMaterial({
      map: this.createHorizonBackdropTexture(),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true
    });

    // Grand stone promenade paving material (matching Screenshot 2)
    this.pavingMat = new THREE.MeshStandardMaterial({
      map: this.createPlazaPavingTexture(),
      color: 0x827f7c, // Nocturnal stone paver tone
      roughness: 0.74,
      metalness: 0.08
    });

    // Park tree garden bed lawn/turf material
    this.lawnMat = new THREE.MeshStandardMaterial({
      map: this.createLawnGrassTexture(),
      color: 0x485246, // Dark nocturnal turf tone
      roughness: 0.92,
      metalness: 0.02
    });

    // Granite curb stone border around tree lawn beds
    this.curbMat = new THREE.MeshStandardMaterial({
      color: 0x45423f,
      roughness: 0.62,
      metalness: 0.1
    });

    // Glowing Lantern Bulb Core
    this.lanternGlassMat = new THREE.MeshBasicMaterial({
      color: 0xffd966
    });

    // Park Bench dark stained wood
    this.benchWoodMat = new THREE.MeshStandardMaterial({
      color: 0x2b1c14,
      roughness: 0.74,
      metalness: 0.06
    });
  }

  /**
   * Scene Lighting (authentic evening / night atmosphere with atmospheric contrast)
   */
  initLights() {
    // Nocturnal sky ambient light (cool twilight sky, subtle dark ground fill)
    const hemiLight = new THREE.HemisphereLight(0x384e6c, 0x161c26, 0.95);
    this.scene.add(hemiLight);

    // Cool Moonlit directional light from upper-right (crisp night shadows)
    const moonLight = new THREE.DirectionalLight(0x658bb2, 0.85);
    moonLight.position.set(14, 20, 15);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(1024, 1024); // Optimized: sharp, clean shadows without GPU strain
    moonLight.shadow.camera.near = 4;
    moonLight.shadow.camera.far = 42;
    moonLight.shadow.camera.left = -26;
    moonLight.shadow.camera.right = 28;
    moonLight.shadow.camera.top = 22;
    moonLight.shadow.camera.bottom = -22;
    moonLight.shadow.bias = -0.0004;
    this.scene.add(moonLight);

    // Soft secondary moonlight bounce from left (illuminates left walkway, curb and shrubs)
    const leftFillLight = new THREE.DirectionalLight(0x4a6a90, 0.75);
    leftFillLight.position.set(-15, 14, 10);
    leftFillLight.castShadow = false;
    this.scene.add(leftFillLight);

    // Warm Golden Portico Downlights (illuminating the floor, fairy lights & main doors)
    this.porchLight = new THREE.PointLight(0xffa832, 5.5, 11);
    this.porchLight.position.set(1.9, 2.5, -1.0);
    this.porchLight.castShadow = false;
    this.buildingGroup.add(this.porchLight);

    // Interior Warm Lights behind windows (radiant amber izakaya illumination)
    const atriumLight = new THREE.PointLight(0xff9a26, 4.8, 10);
    atriumLight.position.set(5.9, 3.1, -1.8);
    this.buildingGroup.add(atriumLight);

    const amoebaLight = new THREE.PointLight(0xff9a26, 3.5, 6);
    amoebaLight.position.set(1.9, 4.65, -0.6);
    this.buildingGroup.add(amoebaLight);

    const leftWinLight = new THREE.PointLight(0xff9420, 4.2, 12);
    leftWinLight.position.set(1.8, 3.1, -5.5);
    this.buildingGroup.add(leftWinLight);

    // Pylon Arch Entrance Light (illuminating steps and doors)
    const pylonLight = new THREE.PointLight(0xffa42c, 3.6, 8);
    pylonLight.position.set(8.8, 1.8, 0.4);
    this.buildingGroup.add(pylonLight);
  }

  /**
   * Ground plane and concrete building plinth
   */
  buildGround() {
    // Street / Plaza promenade ground plane with authentic stone paving
    const groundGeo = new THREE.PlaneGeometry(120, 120);
    const ground = new THREE.Mesh(groundGeo, this.pavingMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.41;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Concrete architectural plinth under the main building wing (X: 3.6 to 16.0)
    // Sits strictly from y=-0.42 to y=0.00 and does NOT overlap corner porch floor (eliminates all Z-fighting/flicker!)
    const plinthGeo = new THREE.BoxGeometry(12.4, 0.42, 14.4);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x22201e,
      roughness: 0.88,
      metalness: 0.08
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.set(9.8, -0.21, -7.1);
    plinth.receiveShadow = true;
    this.buildingGroup.add(plinth);
  }

  /**
   * Complete Architectural Assembly of the Building
   */
  buildBuilding() {
    // 1. Build Main Corner Portico (NO COLUMN - open, airy, with dense fairy lights)
    this.buildCornerPortico();

    // 2. Build Right/Front Facade (Amoeba Window + Giant Atrium Window + Pylon Arch + Ribbon Windows)
    this.buildRightFacade();

    // 3. Build Left Facade (4 distinctive warmly glowing windows)
    this.buildLeftFacade();

    // 4. Build Roof, Parapets, and Enclose All Voids
    this.buildRoofStructure();

    // 5. Build Surrounding Urban Park Environment (Spruces, Scotch Pines, Lanterns, Benches)
    this.buildEnvironment();
  }

  /**
   * 1. Corner Portico (NO column, fully enclosed side walls, golden ceiling, dense fairy lights)
   */
  buildCornerPortico() {
    this.porticoGroup = new THREE.Group();
    this.buildingGroup.add(this.porticoGroup);

    // NOTE: Column is removed as explicitly requested by user for better animation!

    // A. Warm Glowing Ceiling / Soffit of the corner arch (recessed strictly inside portico)
    const ceilingGeo = new THREE.BoxGeometry(3.0, 0.15, 3.0);
    const ceiling = new THREE.Mesh(ceilingGeo, this.soffitMat);
    ceiling.position.set(1.85, 3.11, -1.85);
    this.porticoGroup.add(ceiling);

    // B. Paved Porch Floor Slab (strictly from y=-0.42 to y=0.00, top aligns with doorway threshold)
    // Sits solely under corner portico (X: 0.05 to 3.55, Z: -3.4 to 0.0) with zero plinth overlap
    const floorGeo = new THREE.BoxGeometry(3.5, 0.42, 3.4);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x2b2724,
      roughness: 0.72,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(1.80, -0.21, -1.70);
    floor.receiveShadow = true;
    this.porticoGroup.add(floor);

    // Two Broad Stone Entrance Steps leading smoothly from threshold (y=0) to promenade (y=-0.41)
    const step1 = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.14, 0.35), floorMat);
    step1.position.set(1.80, -0.14, 0.18);
    step1.receiveShadow = true;
    this.porticoGroup.add(step1);

    const step2 = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.14, 0.35), floorMat);
    step2.position.set(1.80, -0.28, 0.50);
    step2.receiveShadow = true;
    this.porticoGroup.add(step2);

    // C. Enclose Portico Side Walls to eliminate empty voids (matching real building photos!)
    // Right side connecting wall (from front wall x=3.55 into the porch to z=-1.65)
    const rightSideWall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.12, 1.70), this.facadeMat);
    rightSideWall.position.set(3.42, 1.56, -0.85);
    rightSideWall.castShadow = true;
    this.porticoGroup.add(rightSideWall);

    // Left glazed return wall (from z=-1.65 back to left facade arch at z=-3.2)
    const leftSideWall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.12, 1.60), this.facadeMat);
    leftSideWall.position.set(0.50, 1.56, -2.45);
    leftSideWall.castShadow = true;
    this.porticoGroup.add(leftSideWall);

    // Left connecting header above left arch reveal
    const leftHeader = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.35), this.facadeMat);
    leftHeader.position.set(1.10, 2.95, -3.20);
    this.porticoGroup.add(leftHeader);

    // D. Forward-Facing Recessed Entrance Facade (parallel to front facade, matching porch-1.png & 3d-rakurs.png)
    const entranceGroup = new THREE.Group();
    entranceGroup.position.set(1.95, 0, -1.65);
    entranceGroup.rotation.y = 0.0; // FACING FORWARD (+Z), exactly parallel to the front street facade!
    this.porticoGroup.add(entranceGroup);

    // Entrance Metal Perimeter Frame (neatly sized to doorway, zero wall penetration)
    const eFrameW = 2.4;
    const eFrameH = 2.9;
    const eFrameDepth = 0.08;

    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(eFrameW, 0.08, eFrameDepth), this.frameMat);
    topBeam.position.set(0, 2.9, 0);
    entranceGroup.add(topBeam);

    const midBeam = new THREE.Mesh(new THREE.BoxGeometry(eFrameW, 0.06, eFrameDepth), this.frameMat);
    midBeam.position.set(0, 2.2, 0);
    entranceGroup.add(midBeam);

    const botBeam = new THREE.Mesh(new THREE.BoxGeometry(eFrameW, 0.12, eFrameDepth), this.frameMat);
    botBeam.position.set(0, 0.06, 0);
    entranceGroup.add(botBeam);

    // Vertical frame mullions (door jambs & side reveals)
    [-1.15, -0.48, 0.48, 1.15].forEach(vx => {
      const vCol = new THREE.Mesh(new THREE.BoxGeometry(0.06, eFrameH, eFrameDepth), this.frameMat);
      vCol.position.set(vx, 1.45, 0);
      entranceGroup.add(vCol);
    });

    // Glass transom panels above doors (y: 2.2 to 2.9)
    const transomGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.65), this.glassMat);
    transomGlass.position.set(0, 2.55, 0.01);
    entranceGroup.add(transomGlass);

    // Right-side fixed glass window panel with warm izakaya backing poster (matching real photo!)
    const sideGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.60, 2.05), this.glassMat);
    sideGlass.position.set(0.82, 1.10, 0.01);
    entranceGroup.add(sideGlass);

    const sideGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 2.00), this.interiorGlowMat);
    sideGlow.position.set(0.82, 1.10, -0.05);
    entranceGroup.add(sideGlow);

    // Left-side connecting infill panel to left wall
    const leftFill = new THREE.Mesh(new THREE.BoxGeometry(0.30, 2.90, 0.06), this.frameMat);
    leftFill.position.set(-1.30, 1.45, 0);
    entranceGroup.add(leftFill);

    // Deep Matte Pure Black Portal Chamber (strictly behind doorway, floor at y=-0.02 to eliminate all Z-fighting!)
    const blackVoidMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });

    // Back wall of black void chamber
    const voidBack = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 2.9), blackVoidMat);
    voidBack.position.set(0, 1.45, -4.5);
    entranceGroup.add(voidBack);

    // Left wall of black chamber
    const voidLeft = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 2.9), blackVoidMat);
    voidLeft.rotation.y = Math.PI / 2;
    voidLeft.position.set(-1.40, 1.45, -2.25);
    entranceGroup.add(voidLeft);

    // Right wall of black chamber
    const voidRight = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 2.9), blackVoidMat);
    voidRight.rotation.y = -Math.PI / 2;
    voidRight.position.set(1.40, 1.45, -2.25);
    entranceGroup.add(voidRight);

    // Floor of black chamber - positioned at y=-0.02 (strictly below y=0.00 to guarantee ZERO Z-fighting with porch!)
    const voidFloor = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 4.5), blackVoidMat);
    voidFloor.rotation.x = -Math.PI / 2;
    voidFloor.position.set(0, -0.02, -2.25);
    entranceGroup.add(voidFloor);

    // Ceiling of black chamber
    const voidCeiling = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 4.5), blackVoidMat);
    voidCeiling.rotation.x = Math.PI / 2;
    voidCeiling.position.set(0, 2.92, -2.25);
    entranceGroup.add(voidCeiling);

    // Automatic Sliding Door Header Box (overhead mechanism in dark anodized aluminum)
    const headerBoxGeo = new THREE.BoxGeometry(2.1, 0.12, 0.08);
    const headerBox = new THREE.Mesh(headerBoxGeo, this.frameMat);
    headerBox.position.set(0, 2.18, 0.04);
    entranceGroup.add(headerBox);

    // E. High-Detail Sliding Glass Double Doors (Left & Right) facing forward (+Z)
    this.doorLeft = this.createDetailedDoorLeaf(true);
    this.doorLeft.position.set(-0.44, 1.10, 0.03);
    entranceGroup.add(this.doorLeft);

    this.doorRight = this.createDetailedDoorLeaf(false);
    this.doorRight.position.set(0.44, 1.10, 0.03);
    entranceGroup.add(this.doorRight);

    // F. Dense Cascading Golden Fairy Lights Curtain (matching real photo!)
    this.buildDenseFairyLights(entranceGroup);

    // G. Floating 3D Glowing Neon Sign «ТАЙСЁ АЗИАТСКОЕ БИСТРО» (no clunky black box!)
    this.buildNeonSign();
  }

  /**
   * Helper to build a highly detailed architectural commercial sliding door leaf
   */
  createDetailedDoorLeaf(isLeft) {
    const doorGroup = new THREE.Group();
    const dw = 0.82;
    const dh = 2.05;
    const frameThick = 0.045;
    const stileW = 0.055;

    // 1. Clear Tinted Glass Pane
    const glassW = dw - stileW * 2;
    const glassH = dh - 0.22;
    const glassGeo = new THREE.BoxGeometry(glassW, glassH, 0.015);
    const glassMesh = new THREE.Mesh(glassGeo, this.glassMat);
    glassMesh.position.set(0, 0.05, 0);
    doorGroup.add(glassMesh);

    // 2. Anodized Aluminum Perimeter Stiles (Left & Right)
    const stileGeo = new THREE.BoxGeometry(stileW, dh, frameThick);
    const stileL = new THREE.Mesh(stileGeo, this.frameMat);
    stileL.position.set(-dw * 0.5 + stileW * 0.5, 0, 0);
    doorGroup.add(stileL);

    const stileR = new THREE.Mesh(stileGeo, this.frameMat);
    stileR.position.set(dw * 0.5 - stileW * 0.5, 0, 0);
    doorGroup.add(stileR);

    // 3. Top Rail
    const topRailGeo = new THREE.BoxGeometry(dw, 0.06, frameThick);
    const topRail = new THREE.Mesh(topRailGeo, this.frameMat);
    topRail.position.set(0, dh * 0.5 - 0.03, 0);
    doorGroup.add(topRail);

    // 4. Commercial Kick-Plate Rail (bottom)
    const kickGeo = new THREE.BoxGeometry(dw, 0.16, frameThick + 0.005);
    const kick = new THREE.Mesh(kickGeo, this.frameMat);
    kick.position.set(0, -dh * 0.5 + 0.08, 0);
    doorGroup.add(kick);

    // 5. Horizontal Waist-Level Mid-Rail / Push Bar
    const midRailGeo = new THREE.BoxGeometry(glassW, 0.045, frameThick);
    const midRail = new THREE.Mesh(midRailGeo, this.frameMat);
    midRail.position.set(0, -0.05, 0);
    doorGroup.add(midRail);

    // 6. Long Sleek Architectural Chrome Pull Handle
    const handleX = isLeft ? (dw * 0.5 - 0.12) : (-dw * 0.5 + 0.12);
    const handleBarGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.15, 16);
    const handleBar = new THREE.Mesh(handleBarGeo, this.chromeMat);
    handleBar.position.set(handleX, 0.05, 0.045);
    doorGroup.add(handleBar);

    // Handle standoffs
    const mountGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.04, 12);
    const mountUpper = new THREE.Mesh(mountGeo, this.chromeMat);
    mountUpper.rotation.x = Math.PI / 2;
    mountUpper.position.set(handleX, 0.5, 0.022);
    doorGroup.add(mountUpper);

    const mountLower = new THREE.Mesh(mountGeo, this.chromeMat);
    mountLower.rotation.x = Math.PI / 2;
    mountLower.position.set(handleX, -0.4, 0.022);
    doorGroup.add(mountLower);

    return doorGroup;
  }

  /**
   * Dense Cascading Golden Fairy Lights Curtain across the entire entrance (from real photo)
   */
  buildDenseFairyLights(parentGroup) {
    const stringCount = 36;
    const beadsPerString = 22;
    const spanW = 3.5;

    // Filter string positions so central doorway (x from -0.95 to +0.95) remains completely unobstructed
    const validPositions = [];
    for (let s = 0; s < stringCount; s++) {
      const sx = -spanW * 0.5 + (s / (stringCount - 1)) * spanW;
      if (Math.abs(sx) < 0.95) continue; // Keep sliding door entrance wide open!
      validPositions.push(sx);
    }

    const totalBeads = validPositions.length * beadsPerString;
    const beadGeo = new THREE.SphereGeometry(0.024, 6, 6);
    this.fairyMesh = new THREE.InstancedMesh(beadGeo, this.fairyLightMat, totalBeads);

    const dummy = new THREE.Object3D();
    let idx = 0;

    for (let s = 0; s < validPositions.length; s++) {
      const sx = validPositions[s];

      for (let b = 0; b < beadsPerString; b++) {
        const sy = 2.9 - (b / beadsPerString) * 2.55;
        const sz = 0.1 + (Math.random() - 0.5) * 0.04;

        dummy.position.set(sx + (Math.random() - 0.5) * 0.02, sy, sz);
        dummy.scale.setScalar(0.75 + Math.random() * 0.5);
        dummy.updateMatrix();
        this.fairyMesh.setMatrixAt(idx++, dummy.matrix);
      }
    }
    this.fairyMesh.instanceMatrix.needsUpdate = true;
    parentGroup.add(this.fairyMesh);
  }

  /**
   * Floating, radiant neon sign «ТАЙСЁ · АЗИАТСКОЕ БИСТРО» directly on facade (matching real photo!)
   */
  buildNeonSign() {
    const signGroup = new THREE.Group();
    // Mounted horizontally along the warm porcelain arch brow right above the portico (from real photo)
    signGroup.position.set(1.85, 3.42, 0.12);

    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 280;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 1600, 280);

    // Multi-pass neon tube renderer for uniform, authentic neon radiance on all letters
    const renderNeonString = (text, x, y, font, isMain) => {
      ctx.font = font;
      ctx.textBaseline = 'middle';

      // Pass 1: Outer diffuse neon aura
      ctx.save();
      ctx.shadowColor = 'rgba(255, 225, 0, 0.75)';
      ctx.shadowBlur = isMain ? 20 : 12;
      ctx.strokeStyle = '#ffcc00';
      ctx.lineWidth = isMain ? 7 : 4.5;
      ctx.strokeText(text, x, y);
      ctx.restore();

      // Pass 2: Saturated glowing neon tube glass
      ctx.save();
      ctx.shadowColor = 'rgba(255, 245, 60, 0.95)';
      ctx.shadowBlur = isMain ? 8 : 5;
      ctx.strokeStyle = '#ffe833';
      ctx.lineWidth = isMain ? 4 : 2.5;
      ctx.strokeText(text, x, y);
      ctx.restore();

      // Pass 3: White-hot luminous neon gas core
      ctx.save();
      ctx.fillStyle = '#fffdf0';
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    // 1. Main brand name "ТАЙСЁ"
    renderNeonString('Т А Й С Ё', 50, 140, '900 102px "Outfit", "Inter", sans-serif', true);

    // 2. Subtitle "АЗИАТСКОЕ БИСТРО" with matching uniform neon glow
    ctx.font = '700 46px "Outfit", "Inter", sans-serif';
    const subText = 'АЗИАТСКОЕ БИСТРО';
    let startX = 670;
    for (let i = 0; i < subText.length; i++) {
      const char = subText[i];
      renderNeonString(char, startX, 140, '700 46px "Outfit", "Inter", sans-serif', false);
      startX += ctx.measureText(char).width + 7;
    }

    const signTex = new THREE.CanvasTexture(canvas);
    signTex.anisotropy = 8;

    const signGeo = new THREE.PlaneGeometry(3.5, 0.6);
    const signPlaneMat = new THREE.MeshBasicMaterial({
      map: signTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const signMesh = new THREE.Mesh(signGeo, signPlaneMat);
    signMesh.position.set(0, 0, 0.04);
    signGroup.add(signMesh);

    this.buildingGroup.add(signGroup);
  }

  /**
   * 2. Right/Front Facade (Amoeba Window + Giant Atrium Window + Pylon Arch + Ribbon Windows)
   */
  buildRightFacade() {
    const rightGroup = new THREE.Group();
    this.buildingGroup.add(rightGroup);

    // A. Front Arch Wall Section (X: 0 to 3.6, Y: 0 to 6.2) with Sweeping Arch & Amoeba Window
    const frontWallShape = new THREE.Shape();
    frontWallShape.moveTo(0, 0);
    frontWallShape.lineTo(3.6, 0);
    frontWallShape.lineTo(3.6, 6.2);
    frontWallShape.lineTo(0, 6.2);
    frontWallShape.closePath();

    // 1. Sweeping Entrance Arch Cutout (matching real photo!)
    const archHole = new THREE.Path();
    archHole.moveTo(3.6, 0);
    archHole.quadraticCurveTo(3.2, 3.15, 1.6, 3.15);
    archHole.quadraticCurveTo(0.2, 3.0, 0, 0);
    archHole.closePath();
    frontWallShape.holes.push(archHole);

    // 2. Organic Amoeba / Pebble Window Cutout (from real photo: soft curved contour, center x=1.9, y=4.65)
    const amoebaHole = new THREE.Path();
    amoebaHole.moveTo(1.2, 4.05);
    amoebaHole.quadraticCurveTo(2.1, 3.85, 2.7, 4.3);
    amoebaHole.quadraticCurveTo(2.95, 4.95, 2.55, 5.4);
    amoebaHole.quadraticCurveTo(1.9, 5.55, 1.35, 5.25);
    amoebaHole.quadraticCurveTo(0.95, 4.65, 1.2, 4.05);
    amoebaHole.closePath();
    frontWallShape.holes.push(amoebaHole);

    const frontWallGeo = new THREE.ExtrudeGeometry(frontWallShape, { depth: 0.35, bevelEnabled: false });
    const frontWallMesh = new THREE.Mesh(frontWallGeo, this.facadeMat);
    frontWallMesh.position.set(0, 0, -0.35);
    rightGroup.add(frontWallMesh);

    // Build the Organic Amoeba Window Glass, Frame & Warm Interior Glow (Orange Circle)
    this.buildAmoebaWindow(rightGroup);

    // B. Wall Section with Giant 2-Story Circular Atrium Window (X: 3.6 to 8.2)
    const atriumWallShape = new THREE.Shape();
    atriumWallShape.moveTo(3.6, 0);
    atriumWallShape.lineTo(8.2, 0);
    atriumWallShape.lineTo(8.2, 6.2);
    atriumWallShape.lineTo(3.6, 6.2);
    atriumWallShape.closePath();

    const atriumHole = new THREE.Path();
    atriumHole.absarc(5.9, 3.1, 2.1, 0, Math.PI * 2, true);
    atriumWallShape.holes.push(atriumHole);

    const atriumWallGeo = new THREE.ExtrudeGeometry(atriumWallShape, { depth: 0.35, bevelEnabled: false });
    const atriumWallMesh = new THREE.Mesh(atriumWallGeo, this.facadeMat);
    atriumWallMesh.position.set(0, 0, -0.35);
    rightGroup.add(atriumWallMesh);

    // The Giant Circular Glass Atrium Window
    this.buildAtriumWindow(rightGroup, 5.9, 3.1, 2.1);

    // C. The Sculptural Arch-Pylon & Entrance (X: 7.6 to 11.0) - with sealed back wall
    this.buildSculpturalPylon(rightGroup, 7.6);

    // D. Right Wing (X: 10.5 to 15.6, Y: 0 to 6.2) - starts at 10.5, completely closing any gap with the pylon!
    this.buildRightWing(rightGroup, 10.5);
  }

  /**
   * Organic Amoeba/Pebble Window above Portico (Orange Circle fix from real photo!)
   */
  buildAmoebaWindow(group) {
    const amoebaGroup = new THREE.Group();
    group.add(amoebaGroup);

    // Contour of the amoeba window
    const amoebaShape = new THREE.Shape();
    amoebaShape.moveTo(1.2, 4.05);
    amoebaShape.quadraticCurveTo(2.1, 3.85, 2.7, 4.3);
    amoebaShape.quadraticCurveTo(2.95, 4.95, 2.55, 5.4);
    amoebaShape.quadraticCurveTo(1.9, 5.55, 1.35, 5.25);
    amoebaShape.quadraticCurveTo(0.95, 4.65, 1.2, 4.05);
    amoebaShape.closePath();

    // 1. Tinted Glass
    const glassGeo = new THREE.ShapeGeometry(amoebaShape);
    const glassMesh = new THREE.Mesh(glassGeo, this.glassMat);
    glassMesh.position.set(0, 0, -0.05);
    amoebaGroup.add(glassMesh);

    // 2. Warm Glowing Interior Backing (matching real photo glow!)
    const glowMesh = new THREE.Mesh(glassGeo, this.interiorGlowMat);
    glowMesh.position.set(0, 0, -0.28);
    amoebaGroup.add(glowMesh);

    // 3. Amoeba Metal Rim (recessed inside opening reveal)
    const rimPoints = amoebaShape.getPoints(48);
    const rimGeo = new THREE.BufferGeometry().setFromPoints(rimPoints);
    const rimMesh = new THREE.LineLoop(
      rimGeo,
      new THREE.LineBasicMaterial({ color: 0x1b1c20, linewidth: 2 })
    );
    rimMesh.position.set(0, 0, -0.02);
    amoebaGroup.add(rimMesh);

    // 4. Window Mullion Bars (recessed at glass plane z=-0.05, strictly inside window opening)
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.045, 1.45, 0.04), this.frameMat);
    vBar.position.set(1.95, 4.70, -0.05);
    amoebaGroup.add(vBar);

    const hBar = new THREE.Mesh(new THREE.BoxGeometry(1.60, 0.045, 0.04), this.frameMat);
    hBar.position.set(1.95, 4.70, -0.05);
    amoebaGroup.add(hBar);
  }

  /**
   * Giant 2-Story Circular Glass Atrium Window (3d-rakurs.png, right-3.png)
   */
  buildAtriumWindow(group, cx, cy, radius) {
    // 1. Physical Glass Disc
    const glassGeo = new THREE.CircleGeometry(radius, 48);
    const glassMesh = new THREE.Mesh(glassGeo, this.glassMat);
    glassMesh.position.set(cx, cy, -0.05);
    group.add(glassMesh);

    // 2. Warm Glowing Interior Backing
    const interiorGeo = new THREE.CircleGeometry(radius * 0.98, 36);
    const interiorMesh = new THREE.Mesh(interiorGeo, this.interiorGlowMat);
    interiorMesh.position.set(cx, cy, -0.32);
    group.add(interiorMesh);

    // 3. Circular Outer Metal Rim
    const rimGeo = new THREE.TorusGeometry(radius, 0.05, 12, 48);
    const rim = new THREE.Mesh(rimGeo, this.frameMat);
    rim.position.set(cx, cy, 0.01);
    group.add(rim);

    // 4. Horizontal Floor Divider Beam at center
    const midBeamGeo = new THREE.BoxGeometry(radius * 2, 0.16, 0.08);
    const midBeam = new THREE.Mesh(midBeamGeo, this.frameMat);
    midBeam.position.set(cx, cy, 0.02);
    group.add(midBeam);

    // 5. Vertical Grid Mullions
    [-1.4, -0.7, 0, 0.7, 1.4].forEach(vx => {
      const hAtX = Math.sqrt(Math.max(0, radius * radius - vx * vx)) * 2;
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.045, hAtX, 0.06), this.frameMat);
      vBar.position.set(cx + vx, cy, 0.01);
      group.add(vBar);
    });

    // Horizontal shelf mullions
    [-1.0, 1.0].forEach(vy => {
      const wAtY = Math.sqrt(Math.max(0, radius * radius - vy * vy)) * 2;
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(wAtY, 0.04, 0.06), this.frameMat);
      hBar.position.set(cx, cy + vy, 0.01);
      group.add(hBar);
    });
  }

  /**
   * Sculptural Arch-Pylon (curved blade arch with steps, ramp & sealed back wall)
   */
  buildSculpturalPylon(group, startX) {
    const pylonGroup = new THREE.Group();
    pylonGroup.position.set(startX, 0, 0);
    group.add(pylonGroup);

    // A. The Swooping Curved Blade/Fin (reaches Y = 7.0m, higher than roof)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.quadraticCurveTo(0.4, 4.2, 1.8, 7.0);
    finShape.lineTo(2.9, 7.0);
    finShape.lineTo(2.9, 0);
    finShape.lineTo(2.4, 0);

    // Archway cutout opening (width 1.8, height 3.1)
    const archHole = new THREE.Path();
    archHole.moveTo(0.35, 0);
    archHole.lineTo(0.35, 2.0);
    archHole.quadraticCurveTo(1.2, 3.2, 2.05, 2.0);
    archHole.lineTo(2.05, 0);
    archHole.closePath();
    finShape.holes.push(archHole);

    const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.65, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 });
    const finMesh = new THREE.Mesh(finGeo, this.facadeMat);
    finMesh.position.set(0, 0, 0);
    finMesh.castShadow = true;
    pylonGroup.add(finMesh);

    // Solid connecting wall behind the top of the pylon (extends to X=3.4, overlapping right wing to guarantee 100% solid wall!)
    const pylonBackingWall = new THREE.Mesh(new THREE.BoxGeometry(3.4, 6.2, 0.35), this.facadeMat);
    pylonBackingWall.position.set(1.7, 3.1, -0.35);
    pylonGroup.add(pylonBackingWall);

    // B. Wooden Entrance Steps leading through the archway
    for (let step = 0; step < 4; step++) {
      const stepGeo = new THREE.BoxGeometry(1.9, 0.12, 0.32);
      const stepMesh = new THREE.Mesh(stepGeo, this.woodMat);
      stepMesh.position.set(1.2, 0.06 + step * 0.12, 0.45 - step * 0.28);
      stepMesh.receiveShadow = true;
      pylonGroup.add(stepMesh);
    }

    // C. Decorative Architectural Entrance Door inside the Pylon Arch (Yellow Circle fix)
    this.buildDecorativePylonDoor(pylonGroup);
  }

  /**
   * Decorative Architectural Entrance Door inside the Pylon Arch (Yellow Circle)
   * Static decorative double door with dark bronze frame, Japanese cedar slats, and warm amber transom
   */
  buildDecorativePylonDoor(pylonGroup) {
    const doorGroup = new THREE.Group();
    // Positioned at z=0.05 directly inside the archway reveal, fully visible through the arch
    doorGroup.position.set(1.2, 0, 0.05);
    pylonGroup.add(doorGroup);

    // Warm architectural lantern light casting down across the decorative door
    const doorLight = new THREE.PointLight(0xffbe48, 3.8, 6.0);
    doorLight.position.set(0, 2.7, 0.35);
    doorGroup.add(doorLight);

    const frameW = 1.72;
    const frameH = 2.95;
    const frameD = 0.10;

    // Outer door jambs and header
    const jambGeo = new THREE.BoxGeometry(0.08, frameH, frameD);
    const jambL = new THREE.Mesh(jambGeo, this.frameMat);
    jambL.position.set(-frameW * 0.5 + 0.04, frameH * 0.5 + 0.42, 0);
    doorGroup.add(jambL);

    const jambR = new THREE.Mesh(jambGeo, this.frameMat);
    jambR.position.set(frameW * 0.5 - 0.04, frameH * 0.5 + 0.42, 0);
    doorGroup.add(jambR);

    const header = new THREE.Mesh(new THREE.BoxGeometry(frameW, 0.08, frameD), this.frameMat);
    header.position.set(0, frameH + 0.38, 0);
    doorGroup.add(header);

    const transomBeam = new THREE.Mesh(new THREE.BoxGeometry(frameW, 0.07, frameD), this.frameMat);
    transomBeam.position.set(0, 2.45, 0);
    doorGroup.add(transomBeam);

    // Upper Arched Fanlight with Japanese Kumiko Geometric Lattice
    const transomGlass = new THREE.Mesh(new THREE.PlaneGeometry(frameW - 0.16, 0.85), this.glassMat);
    transomGlass.position.set(0, 2.88, 0.01);
    doorGroup.add(transomGlass);

    const transomBacking = new THREE.Mesh(new THREE.PlaneGeometry(frameW - 0.16, 0.85), this.interiorGlowMat);
    transomBacking.position.set(0, 2.88, -0.06);
    doorGroup.add(transomBacking);

    [-0.45, 0, 0.45].forEach(gx => {
      const gBar = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.82, 0.03), this.frameMat);
      gBar.position.set(gx, 2.88, 0.02);
      doorGroup.add(gBar);
    });

    // Double Door Leaves (Left & Right)
    const doorLeafW = (frameW - 0.20) * 0.5;
    const doorLeafH = 1.95;

    [-doorLeafW * 0.5 - 0.02, doorLeafW * 0.5 + 0.02].forEach((leafX, leafIdx) => {
      const leafGroup = new THREE.Group();
      leafGroup.position.set(leafX, 0.42 + doorLeafH * 0.5, 0);
      doorGroup.add(leafGroup);

      // Stile/rail frame
      const leafStileGeo = new THREE.BoxGeometry(0.06, doorLeafH, 0.05);
      const sL = new THREE.Mesh(leafStileGeo, this.frameMat);
      sL.position.set(-doorLeafW * 0.5 + 0.03, 0, 0);
      leafGroup.add(sL);
      const sR = new THREE.Mesh(leafStileGeo, this.frameMat);
      sR.position.set(doorLeafW * 0.5 - 0.03, 0, 0);
      leafGroup.add(sR);

      // Bottom kick plate
      const kickPlate = new THREE.Mesh(new THREE.BoxGeometry(doorLeafW, 0.35, 0.05), this.frameMat);
      kickPlate.position.set(0, -doorLeafH * 0.5 + 0.175, 0);
      leafGroup.add(kickPlate);

      // Horizontal Japanese Cedar Slats
      const slatCount = 10;
      const slatH = 0.085;
      for (let sl = 0; sl < slatCount; sl++) {
        const slatY = -doorLeafH * 0.5 + 0.42 + sl * 0.15;
        const slat = new THREE.Mesh(new THREE.BoxGeometry(doorLeafW - 0.12, slatH, 0.03), this.woodMat);
        slat.position.set(0, slatY, 0.01);
        leafGroup.add(slat);

        const slatGlow = new THREE.Mesh(new THREE.PlaneGeometry(doorLeafW - 0.12, slatH), this.interiorGlowMat);
        slatGlow.position.set(0, slatY, -0.02);
        leafGroup.add(slatGlow);
      }

      // Elegant Vertical Brushed Brass/Chrome Pull Handle
      const hX = leafIdx === 0 ? (doorLeafW * 0.5 - 0.09) : (-doorLeafW * 0.5 + 0.09);
      const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.85, 12), this.chromeMat);
      handleBar.position.set(hX, 0.05, 0.05);
      leafGroup.add(handleBar);

      [-0.35, 0.35].forEach(hy => {
        const hMount = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.04, 12), this.chromeMat);
        hMount.rotation.x = Math.PI / 2;
        hMount.position.set(hX, hy, 0.03);
        leafGroup.add(hMount);
      });
    });
  }

  /**
   * Right Wing with ribbon windows and pill windows (sealed roofline, Green Circle fix!)
   */
  buildRightWing(group, startX) {
    const wingGroup = new THREE.Group();
    wingGroup.position.set(startX, 0, 0);
    group.add(wingGroup);

    const wingW = 5.1; // Extends from 10.5 to 15.6 seamlessly
    const wingH = 6.2; // Full height matching building, eliminating gap!

    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(wingW, 0);
    wingShape.lineTo(wingW, wingH);
    wingShape.lineTo(0, wingH);
    wingShape.closePath();

    // 1. Ribbon window cutout (X: 0.4 to 4.4, Y: 3.8 to 4.8)
    const ribbonHole = new THREE.Path();
    ribbonHole.moveTo(0.4, 3.8);
    ribbonHole.lineTo(4.4, 3.8);
    ribbonHole.lineTo(4.4, 4.8);
    ribbonHole.lineTo(0.4, 4.8);
    ribbonHole.closePath();
    wingShape.holes.push(ribbonHole);

    // 2. Two Pill Windows cutouts on ground floor (Y: 1.5 to 2.2)
    [1.2, 2.8].forEach(px => {
      const pillHole = new THREE.Path();
      pillHole.moveTo(px, 1.5);
      pillHole.lineTo(px + 0.9, 1.5);
      pillHole.absarc(px + 0.9, 1.85, 0.35, -Math.PI / 2, Math.PI / 2, false);
      pillHole.lineTo(px, 2.2);
      pillHole.absarc(px, 1.85, 0.35, Math.PI / 2, -Math.PI / 2, false);
      pillHole.closePath();
      wingShape.holes.push(pillHole);
    });

    const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.35, bevelEnabled: false });
    const wingMesh = new THREE.Mesh(wingGeo, this.facadeMat);
    wingMesh.position.set(0, 0, -0.35);
    wingGroup.add(wingMesh);

    // Fill Ribbon Window with Glass and Mullions
    const ribbonGlass = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 1.0), this.glassMat);
    ribbonGlass.position.set(2.4, 4.3, -0.05);
    wingGroup.add(ribbonGlass);

    const ribbonGlow = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 1.0), this.interiorGlowMat);
    ribbonGlow.position.set(2.4, 4.3, -0.3);
    wingGroup.add(ribbonGlow);

    // Ribbon mullions every 0.6m
    for (let rx = 0.4; rx <= 4.4; rx += 0.6) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.0, 0.06), this.frameMat);
      bar.position.set(rx, 4.3, 0.01);
      wingGroup.add(bar);
    }

    // Pill Windows Glass and Vertical Bars
    [1.65, 3.25].forEach(px => {
      const pGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7), this.glassMat);
      pGlass.position.set(px, 1.85, -0.05);
      wingGroup.add(pGlass);

      const pGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7), this.interiorGlowMat);
      pGlow.position.set(px, 1.85, -0.28);
      wingGroup.add(pGlow);

      // 3 vertical safety bars
      [-0.3, 0, 0.3].forEach(bx => {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.7, 8), this.frameMat);
        bar.position.set(px + bx, 1.85, 0.01);
        wingGroup.add(bar);
      });
    });
  }

  /**
   * 3. Left Facade (4 distinctive windows filled with warm amber glow, Green Circles fix!)
   */
  buildLeftFacade() {
    const leftGroup = new THREE.Group();
    // Rotate 90° so it is perpendicular to the Right Facade and extends along -Z
    leftGroup.position.set(0, 0, 0);
    leftGroup.rotation.y = Math.PI / 2;
    this.buildingGroup.add(leftGroup);

    const wallLength = 11.5;
    const wallHeight = 6.2;

    // Wall shape with cutouts
    const leftShape = new THREE.Shape();
    leftShape.moveTo(0, 0);
    leftShape.lineTo(wallLength, 0);
    leftShape.lineTo(wallLength, wallHeight);
    leftShape.lineTo(0, wallHeight);
    leftShape.closePath();

    // 1. Arch cutout at the corner portico (sweeping curve matching front arch!)
    const porticoHole = new THREE.Path();
    porticoHole.moveTo(0, 0);
    porticoHole.quadraticCurveTo(0.2, 3.0, 1.6, 3.15);
    porticoHole.quadraticCurveTo(3.0, 3.15, 3.2, 0);
    porticoHole.closePath();
    leftShape.holes.push(porticoHole);

    // 2. Large Vertical Oval Window on far right (pos X = 9.8, Y = 3.2)
    const bigOvalHole = new THREE.Path();
    bigOvalHole.absellipse(9.8, 3.2, 1.25, 2.05, 0, Math.PI * 2, true);
    leftShape.holes.push(bigOvalHole);

    // 3. Lower Circular Window (pos X = 6.8, Y = 1.9, r = 0.95)
    const lowerCircleHole = new THREE.Path();
    lowerCircleHole.absarc(6.8, 1.9, 0.95, 0, Math.PI * 2, true);
    leftShape.holes.push(lowerCircleHole);

    // 4. Upper Oval Window 1 (smaller, pos X = 6.8, Y = 4.6)
    const upperOval1Hole = new THREE.Path();
    upperOval1Hole.absellipse(6.8, 4.6, 0.65, 0.92, 0, Math.PI * 2, true);
    leftShape.holes.push(upperOval1Hole);

    // 5. Upper Oval Window 2 (larger, pos X = 4.2, Y = 4.6)
    const upperOval2Hole = new THREE.Path();
    upperOval2Hole.absellipse(4.2, 4.6, 0.85, 0.95, 0, Math.PI * 2, true);
    leftShape.holes.push(upperOval2Hole);

    const leftWallGeo = new THREE.ExtrudeGeometry(leftShape, { depth: 0.35, bevelEnabled: false });
    const leftWallMesh = new THREE.Mesh(leftWallGeo, this.leftFacadeMat);
    leftWallMesh.position.set(0, 0, 0);
    leftGroup.add(leftWallMesh);

    // Solid inner back wall behind left wing windows (from x=3.5 to 11.5, leaving portico arch 0..3.2 clear!)
    const backWallLength = wallLength - 3.5;
    const leftBackWall = new THREE.Mesh(
      new THREE.PlaneGeometry(backWallLength, wallHeight),
      new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.9, side: THREE.DoubleSide })
    );
    leftBackWall.position.set(3.5 + backWallLength * 0.5, wallHeight * 0.5, 0.5);
    leftGroup.add(leftBackWall);

    // Populate ALL 4 Left Windows with Glass, Mullion Grids & Vibrant Warm Glow (Green Circles fix!)
    // 1. Big Vertical Oval Window (9.8, 3.2)
    this.createMullionWindow(leftGroup, {
      x: 9.8, y: 3.2, z: 0.18,
      type: 'oval', rx: 1.25, ry: 2.05,
      bars: 'dense-grid'
    });

    // 2. Lower Circle Window (6.8, 1.9)
    this.createMullionWindow(leftGroup, {
      x: 6.8, y: 1.9, z: 0.18,
      type: 'round', r: 0.95,
      bars: 'grid'
    });

    // 3. Upper Oval 1 (6.8, 4.6)
    this.createMullionWindow(leftGroup, {
      x: 6.8, y: 4.6, z: 0.18,
      type: 'oval', rx: 0.65, ry: 0.92,
      bars: 'cross'
    });

    // 4. Upper Oval 2 (4.2, 4.6)
    this.createMullionWindow(leftGroup, {
      x: 4.2, y: 4.6, z: 0.18,
      type: 'oval', rx: 0.85, ry: 0.95,
      bars: 'cross'
    });
  }

  /**
   * Helper to build windows with double-sided glass, mullions, and bright warm interior glow
   */
  createMullionWindow(parent, opt) {
    const group = new THREE.Group();
    group.position.set(opt.x, opt.y, opt.z);
    parent.add(group);

    const rx = opt.rx || opt.r;
    const ry = opt.ry || opt.r;

    // Glass Disc (DoubleSide)
    let glassGeo;
    if (opt.type === 'round') {
      glassGeo = new THREE.CircleGeometry(rx, 36);
    } else {
      const curve = new THREE.EllipseCurve(0, 0, rx, ry, 0, Math.PI * 2, false);
      const points = curve.getPoints(36);
      const shape = new THREE.Shape(points);
      glassGeo = new THREE.ShapeGeometry(shape);
    }

    const glass = new THREE.Mesh(glassGeo, this.glassMat);
    glass.position.z = -0.08;
    group.add(glass);

    // Warm Interior Backing (DoubleSide, highly luminous amber izakaya light!)
    const interior = new THREE.Mesh(glassGeo, this.interiorGlowMat);
    interior.position.z = 0.06;
    group.add(interior);

    // Metal Mullion Bars on outer surface of glass
    if (opt.bars === 'cross') {
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.045, ry * 2, 0.05), this.frameMat);
      vBar.position.z = -0.12;
      group.add(vBar);

      const hBar = new THREE.Mesh(new THREE.BoxGeometry(rx * 2, 0.045, 0.05), this.frameMat);
      hBar.position.z = -0.12;
      group.add(hBar);
    } else if (opt.bars === 'grid') {
      [-0.45, 0.45].forEach(vx => {
        const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.04, ry * 1.8, 0.05), this.frameMat);
        vBar.position.set(vx, 0, -0.12);
        group.add(vBar);
      });
      [-0.35, 0.35].forEach(hy => {
        const hBar = new THREE.Mesh(new THREE.BoxGeometry(rx * 1.8, 0.04, 0.05), this.frameMat);
        hBar.position.set(0, hy, -0.12);
        group.add(hBar);
      });
    } else if (opt.bars === 'dense-grid') {
      [-0.8, -0.4, 0, 0.4, 0.8].forEach(vx => {
        const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.04, ry * 1.9, 0.05), this.frameMat);
        vBar.position.set(vx, 0, -0.12);
        group.add(vBar);
      });
      [-1.2, -0.6, 0, 0.6, 1.2].forEach(hy => {
        const hBar = new THREE.Mesh(new THREE.BoxGeometry(rx * 1.9, 0.04, 0.05), this.frameMat);
        hBar.position.set(0, hy, -0.12);
        group.add(hBar);
      });
    }
  }

  /**
   * 4. Roof and Parapet Structure (completely seals all top gaps, Green Circle fix!)
   */
  buildRoofStructure() {
    // Flat roof slab completely capping the entire building volume (16.5m x 13.5m)
    const roofGeo = new THREE.BoxGeometry(16.5, 0.35, 13.5);
    const roof = new THREE.Mesh(roofGeo, this.darkRoofMat);
    roof.position.set(8.0, 6.25, -6.5);
    this.buildingGroup.add(roof);

    // Front parapet roof border rail
    const pRailGeo1 = new THREE.BoxGeometry(16.5, 0.4, 0.25);
    const pRail1 = new THREE.Mesh(pRailGeo1, this.facadeMat);
    pRail1.position.set(8.0, 6.55, 0);
    this.buildingGroup.add(pRail1);

    // Left parapet roof border rail (starts behind front parapet to eliminate corner Z-fighting)
    const pRailGeo2 = new THREE.BoxGeometry(0.25, 0.4, 13.25);
    const pRail2 = new THREE.Mesh(pRailGeo2, this.leftFacadeMat);
    pRail2.position.set(0, 6.55, -0.125 - 13.25 * 0.5);
    this.buildingGroup.add(pRail2);
  }

  /**
   * 5. Surrounding Urban Park Environment
   * Dense procedural Scotch Pines, Organic Tiered Conifers, Japanese Bush/Shrub Hedges,
   * Panoramic Horizon Backdrop, Expanded Right Park Meadow, Architectural Lanterns, and Benches
   */
  buildEnvironment() {
    this.envGroup = new THREE.Group();
    // Attached directly to buildingGroup so all paths, curbs, and palisades are locked to the building facade
    this.buildingGroup.add(this.envGroup);

    // 0. Panoramic Horizon Forest Silhouette Backdrop (sealing the horizon line completely!)
    const backdropGeo = new THREE.CylinderGeometry(52, 52, 26, 48, 1, true, Math.PI * 0.22, Math.PI * 1.56);
    const backdropMesh = new THREE.Mesh(backdropGeo, this.backdropMat);
    backdropMesh.position.set(5.0, 7.0, -18.0);
    this.envGroup.add(backdropMesh);

    // A. Architectural Stone Walkways (Тропинки вдоль здания)
    // 1. Dedicated Left Stone Walkway along the entire left facade (X: 0 to -2.85, Z: +2.5 to -14.0)
    // Sits flush at y=-0.38, seamlessly connecting the front plaza to the rear perimeter
    const leftWalkwayGeo = new THREE.BoxGeometry(2.85, 0.06, 17.0);
    const leftWalkway = new THREE.Mesh(leftWalkwayGeo, this.pavingMat);
    leftWalkway.position.set(-1.425, -0.38, -5.75);
    leftWalkway.receiveShadow = true;
    this.envGroup.add(leftWalkway);

    // 2. Wide Front Stone Promenade in front of the building (X: -2.85 to +16.5, Z: 0.0 to +7.0)
    // Ensures both the main porch and second entrance stairs sit cleanly on continuous stone paving
    const frontPromGeo = new THREE.BoxGeometry(19.4, 0.06, 7.0);
    const frontProm = new THREE.Mesh(frontPromGeo, this.pavingMat);
    frontProm.position.set(6.8, -0.38, 3.5);
    frontProm.receiveShadow = true;
    this.envGroup.add(frontProm);

    // B. Granite Curbs (Бордюры вдоль тропинки и палисадников, не перекрывающие проход)
    // 1. Left Granite Curb: runs along the left walkway border at X=-2.95 from Z=-14.0 to Z=+1.5
    const leftCurbStraightGeo = new THREE.BoxGeometry(0.18, 0.14, 15.5);
    const leftCurbStraight = new THREE.Mesh(leftCurbStraightGeo, this.curbMat);
    leftCurbStraight.position.set(-2.95, -0.34, -6.25);
    leftCurbStraight.receiveShadow = true;
    this.envGroup.add(leftCurbStraight);

    // Smooth outward curve at Z=+1.5 flaring open to X=-4.5, Z=+3.2 (keeping the walkway entrance completely open!)
    const leftCurbCornerGeo = new THREE.BoxGeometry(2.0, 0.14, 0.18);
    const leftCurbCorner = new THREE.Mesh(leftCurbCornerGeo, this.curbMat);
    leftCurbCorner.rotation.y = -Math.PI / 4;
    leftCurbCorner.position.set(-3.7, -0.34, 2.25);
    this.envGroup.add(leftCurbCorner);

    // 2. Right Granite Curb: protects the second entrance! Starts strictly at X=16.5 (>6m past second entrance stairs at X=8.8!)
    const rightCurbStraightGeo = new THREE.BoxGeometry(0.18, 0.14, 15.5);
    const rightCurbStraight = new THREE.Mesh(rightCurbStraightGeo, this.curbMat);
    rightCurbStraight.position.set(16.5, -0.34, -6.25);
    rightCurbStraight.receiveShadow = true;
    this.envGroup.add(rightCurbStraight);

    const rightCurbCornerGeo = new THREE.BoxGeometry(2.0, 0.14, 0.18);
    const rightCurbCorner = new THREE.Mesh(rightCurbCornerGeo, this.curbMat);
    rightCurbCorner.rotation.y = Math.PI / 4;
    rightCurbCorner.position.set(17.25, -0.34, 2.25);
    this.envGroup.add(rightCurbCorner);

    // C. Palisades / Garden Beds (Палисадники с кустами и деревьями)
    // 1. Left Palisade Turf Bed: sits strictly behind the left curb at X <= -3.05 (Z: +3.2 to -16.0)
    // Never enters the walkway, porch, or restaurant!
    const leftLawnGeo = new THREE.BoxGeometry(18.0, 0.05, 20.0);
    const leftLawn = new THREE.Mesh(leftLawnGeo, this.lawnMat);
    leftLawn.position.set(-12.1, -0.39, -6.5);
    leftLawn.receiveShadow = true;
    this.envGroup.add(leftLawn);

    // 2. Right Park Turf Bed: sits strictly behind right curb at X >= 16.65 (>7m clear of second entrance stairs!)
    const rightLawnGeo = new THREE.BoxGeometry(18.0, 0.05, 20.0);
    const rightLawn = new THREE.Mesh(rightLawnGeo, this.lawnMat);
    rightLawn.position.set(25.6, -0.39, -6.5);
    rightLawn.receiveShadow = true;
    this.envGroup.add(rightLawn);

    // D. DENSE BUSH & SHRUB HEDGES (Палисадник с кустами вдоль тропинки и задний план)
    // 1. Left Palisade Shrub Hedges: positioned along the curb line (X: -3.8 to -5.5)
    const leftBushes1 = this.createShrubCluster(18, 2.5, 7.0, 1.25, 1.6);
    leftBushes1.position.set(-4.2, 0, -3.5);
    this.envGroup.add(leftBushes1);

    const leftBushes2 = this.createShrubCluster(20, 3.0, 8.0, 1.35, 1.7);
    leftBushes2.position.set(-4.5, 0, -10.5);
    this.envGroup.add(leftBushes2);

    const leftBushes3 = this.createShrubCluster(14, 4.0, 4.0, 1.20, 1.5);
    leftBushes3.position.set(-5.5, 0, 1.8);
    this.envGroup.add(leftBushes3);

    const leftBushesDeep = this.createShrubCluster(22, 10.0, 12.0, 1.45, 1.8);
    leftBushesDeep.position.set(-10.5, 0, -6.5);
    this.envGroup.add(leftBushesDeep);

    // 2. Continuous Back Boundary Shrub Hedge (behind the entire building length, completely sealing horizon seam!)
    const backBushes1 = this.createShrubCluster(28, 16.0, 5.0, 1.55, 2.2);
    backBushes1.position.set(-2.0, 0, -16.0);
    this.envGroup.add(backBushes1);

    const backBushes2 = this.createShrubCluster(28, 16.0, 5.0, 1.55, 2.2);
    backBushes2.position.set(12.0, 0, -16.0);
    this.envGroup.add(backBushes2);

    const backBushes3 = this.createShrubCluster(24, 14.0, 5.0, 1.50, 2.0);
    backBushes3.position.set(5.0, 0, -18.5);
    this.envGroup.add(backBushes3);

    // 3. Right Palisade Shrub Hedges (starting strictly at X >= 17.2, zero touch with second entrance!)
    const rightBushes1 = this.createShrubCluster(18, 3.0, 7.0, 1.35, 1.7);
    rightBushes1.position.set(18.0, 0, -3.5);
    this.envGroup.add(rightBushes1);

    const rightBushes2 = this.createShrubCluster(20, 4.0, 9.0, 1.45, 1.8);
    rightBushes2.position.set(18.5, 0, -10.5);
    this.envGroup.add(rightBushes2);

    const rightBushes3 = this.createShrubCluster(16, 5.0, 5.0, 1.25, 1.5);
    rightBushes3.position.set(19.0, 0, 1.5);
    this.envGroup.add(rightBushes3);

    const rightBushesDeep = this.createShrubCluster(24, 10.0, 12.0, 1.45, 1.9);
    rightBushesDeep.position.set(23.0, 0, -6.5);
    this.envGroup.add(rightBushesDeep);

    // E. LEFT SECTOR — Forest Trees in Palisade Behind Walkway (set back to X <= -6.5)
    // 1. Tall Scotch Pines with cinnamon trunks rising above palisade
    const pineL1 = this.createPineTree(2, 16.2, 4.5);
    pineL1.position.set(-8.5, 0, -5.5);
    pineL1.rotation.y = 0.4;
    this.envGroup.add(pineL1);

    const pineL2 = this.createPineTree(1, 15.0, 4.2);
    pineL2.position.set(-12.5, 0, -10.5);
    pineL2.rotation.y = -0.8;
    this.envGroup.add(pineL2);

    const pineL3 = this.createPineTree(2, 14.2, 3.9);
    pineL3.position.set(-8.0, 0, -13.0);
    pineL3.rotation.y = 1.2;
    this.envGroup.add(pineL3);

    const pineL4 = this.createPineTree(1, 15.5, 4.3);
    pineL4.position.set(-13.5, 0, -4.5);
    pineL4.rotation.y = 2.3;
    this.envGroup.add(pineL4);

    const pineL5 = this.createPineTree(2, 16.8, 4.6);
    pineL5.position.set(-17.0, 0, -8.5);
    pineL5.rotation.y = 0.1;
    this.envGroup.add(pineL5);

    // 2. High-Detail Organic Conifers in left palisade
    const coniferL1 = this.createOrganicConiferTree(1, 7.8, 2.6);
    coniferL1.position.set(-6.8, 0, -2.5);
    coniferL1.rotation.y = 0.6;
    this.envGroup.add(coniferL1);

    const coniferL2 = this.createOrganicConiferTree(2, 6.8, 2.4);
    coniferL2.position.set(-7.0, 0, -8.0);
    coniferL2.rotation.y = -0.3;
    this.envGroup.add(coniferL2);

    const coniferL3 = this.createOrganicConiferTree(3, 5.8, 2.2);
    coniferL3.position.set(-7.5, 0, 1.8);
    coniferL3.rotation.y = 1.1;
    this.envGroup.add(coniferL3);

    const coniferL4 = this.createOrganicConiferTree(1, 7.0, 2.4);
    coniferL4.position.set(-10.8, 0, -5.5);
    coniferL4.rotation.y = 2.1;
    this.envGroup.add(coniferL4);

    // F. DENSE BACKGROUND ROOFLINE CANOPY (forming a solid, continuous forest crown sealing the sky!)
    const pineB1 = this.createPineTree(2, 15.5, 4.2);
    pineB1.position.set(-5.0, 0, -18.0);
    pineB1.rotation.y = 0.5;
    this.envGroup.add(pineB1);

    const pineB2 = this.createPineTree(1, 16.2, 4.4);
    pineB2.position.set(-1.0, 0, -18.5);
    pineB2.rotation.y = -0.6;
    this.envGroup.add(pineB2);

    const pineB3 = this.createPineTree(2, 16.8, 4.6);
    pineB3.position.set(3.5, 0, -19.0);
    pineB3.rotation.y = 0.8;
    this.envGroup.add(pineB3);

    const pineB4 = this.createPineTree(1, 15.8, 4.3);
    pineB4.position.set(7.5, 0, -18.5);
    pineB4.rotation.y = -1.1;
    this.envGroup.add(pineB4);

    const pineB5 = this.createPineTree(2, 16.5, 4.5);
    pineB5.position.set(11.8, 0, -19.0);
    pineB5.rotation.y = 1.6;
    this.envGroup.add(pineB5);

    const pineB6 = this.createPineTree(1, 15.4, 4.1);
    pineB6.position.set(16.0, 0, -18.0);
    pineB6.rotation.y = -0.4;
    this.envGroup.add(pineB6);

    const pineB7 = this.createPineTree(2, 16.2, 4.4);
    pineB7.position.set(1.5, 0, -21.5);
    pineB7.rotation.y = 1.3;
    this.envGroup.add(pineB7);

    const pineB8 = this.createPineTree(1, 16.0, 4.3);
    pineB8.position.set(5.5, 0, -22.0);
    pineB8.rotation.y = -0.9;
    this.envGroup.add(pineB8);

    const pineB9 = this.createPineTree(2, 16.6, 4.5);
    pineB9.position.set(9.8, 0, -21.5);
    pineB9.rotation.y = 0.4;
    this.envGroup.add(pineB9);

    const pineB10 = this.createPineTree(1, 15.8, 4.2);
    pineB10.position.set(-3.0, 0, -20.5);
    pineB10.rotation.y = 1.7;
    this.envGroup.add(pineB10);

    const pineB11 = this.createPineTree(2, 16.4, 4.4);
    pineB11.position.set(14.0, 0, -21.0);
    pineB11.rotation.y = -1.2;
    this.envGroup.add(pineB11);

    const pineB12 = this.createPineTree(1, 16.0, 4.3);
    pineB12.position.set(19.0, 0, -19.5);
    pineB12.rotation.y = 0.9;
    this.envGroup.add(pineB12);

    // Deep mid-height conifer filler trees behind building
    const backConifer1 = this.createOrganicConiferTree(2, 8.5, 2.8);
    backConifer1.position.set(0.5, 0, -17.5);
    this.envGroup.add(backConifer1);

    const backConifer2 = this.createOrganicConiferTree(1, 8.8, 2.9);
    backConifer2.position.set(5.5, 0, -17.8);
    this.envGroup.add(backConifer2);

    const backConifer3 = this.createOrganicConiferTree(3, 8.2, 2.7);
    backConifer3.position.set(10.5, 0, -17.5);
    this.envGroup.add(backConifer3);

    // G. RIGHT SECTOR — Trees in Right Park (starting strictly at X >= 17.5)
    const pineR1 = this.createPineTree(2, 15.8, 4.3);
    pineR1.position.set(18.5, 0, -5.5);
    pineR1.rotation.y = -0.5;
    this.envGroup.add(pineR1);

    const pineR2 = this.createPineTree(1, 16.2, 4.5);
    pineR2.position.set(22.5, 0, -10.5);
    pineR2.rotation.y = 1.4;
    this.envGroup.add(pineR2);

    const pineR3 = this.createPineTree(2, 15.0, 4.1);
    pineR3.position.set(25.5, 0, -5.5);
    pineR3.rotation.y = -1.2;
    this.envGroup.add(pineR3);

    const pineR4 = this.createPineTree(1, 15.6, 4.2);
    pineR4.position.set(27.0, 0, -12.0);
    pineR4.rotation.y = 0.7;
    this.envGroup.add(pineR4);

    const coniferR1 = this.createOrganicConiferTree(2, 7.4, 2.5);
    coniferR1.position.set(18.2, 0, -1.5);
    coniferR1.rotation.y = 0.9;
    this.envGroup.add(coniferR1);

    const coniferR2 = this.createOrganicConiferTree(1, 6.5, 2.3);
    coniferR2.position.set(21.0, 0, 1.5);
    coniferR2.rotation.y = -1.2;
    this.envGroup.add(coniferR2);

    // H. Park Lanterns & Benches along the promenade edge and walkway
    // Left Walkway Lantern (casts a warm atmospheric glow down the stone path, curb & shrubs)
    const lanternWalkway = this.createParkLantern();
    lanternWalkway.position.set(-2.95, 0, -5.5);
    this.envGroup.add(lanternWalkway);

    const lanternL = this.createParkLantern();
    lanternL.position.set(-3.2, 0, 2.2);
    this.envGroup.add(lanternL);

    const benchL = this.createParkBench();
    benchL.position.set(-3.5, 0, 4.0);
    benchL.rotation.y = 0.15;
    this.envGroup.add(benchL);

    const lanternR = this.createParkLantern();
    lanternR.position.set(15.2, 0, 2.6);
    this.envGroup.add(lanternR);

    const benchR = this.createParkBench();
    benchR.position.set(15.2, 0, 4.2);
    benchR.rotation.y = -0.15;
    this.envGroup.add(benchR);
  }

  /**
   * Procedural Bush / Shrub Cluster (Japanese Spiraea, Boxwood & Dwarf Mountain Juniper)
   * High performance: All bush leaf cards merged into 1 single geometry!
   */
  createShrubCluster(count, spanX, spanZ, avgRadius, avgHeight) {
    const clusterGroup = new THREE.Group();
    const leafGeos = [];

    for (let i = 0; i < count; i++) {
      const bx = (Math.random() - 0.5) * spanX;
      const bz = (Math.random() - 0.5) * spanZ;
      const bScale = 0.75 + Math.random() * 0.5;
      const bR = avgRadius * bScale;
      const bH = avgHeight * bScale;
      const by = bH * 0.45;

      const cardW = bR * 1.6;
      const cardH = bH * 1.1;
      const cardGeo = new THREE.PlaneGeometry(cardW, cardH);

      // 4 radial vertical leaf cards
      [0, Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4].forEach(ang => {
        const p = cardGeo.clone();
        p.applyMatrix4(new THREE.Matrix4().makeRotationY(ang).setPosition(bx, by, bz));
        leafGeos.push(p);
      });

      // 2 domed top cap cards tilted outward
      [-0.4, 0.4].forEach(tilt => {
        const topCard = cardGeo.clone();
        const m = new THREE.Matrix4()
          .makeRotationX(Math.PI * 0.38)
          .multiply(new THREE.Matrix4().makeRotationZ(tilt))
          .setPosition(bx, by + bH * 0.15, bz);
        topCard.applyMatrix4(m);
        leafGeos.push(topCard);
      });
    }

    if (leafGeos.length > 0) {
      const mergedLeaves = BufferGeometryUtils.mergeGeometries(leafGeos, false);
      const shrubMesh = new THREE.Mesh(mergedLeaves, this.bushMat);
      shrubMesh.castShadow = false;
      shrubMesh.receiveShadow = true;
      clusterGroup.add(shrubMesh);
    }

    return clusterGroup;
  }

  /**
   * High-Detail Organic Coniferous Tree (tree-medium-1, tree-medium-2, tree-medium-3)
   * Built on the organic bough & needle tuft principle (beloved by user in Scotch pines)
   * NO solid cone! Slender curved trunk, spreading organic tiers, fluffy multi-angle needle pads
   */
  createOrganicConiferTree(variant, height, baseRadius) {
    const treeGroup = new THREE.Group();

    // 1. Slender organic curved trunk
    const segCount = 6;
    const segH = height / segCount;
    let cx = 0, cy = 0, cz = 0;
    const leanX = (Math.random() - 0.5) * 0.4;
    const leanZ = (Math.random() - 0.5) * 0.4;

    const trunkGeos = [];
    const boughGeos = [];
    const foliageGeos = [];

    for (let s = 0; s < segCount; s++) {
      const t = (s + 1) / segCount;
      const nx = leanX * t * t;
      const ny = cy + segH;
      const nz = leanZ * t * t;

      const rTop = (0.04 + (1 - t) * 0.14) * (height / 7);
      const rBot = (0.04 + (1 - s / segCount) * 0.14) * (height / 7);

      const segGeo = new THREE.CylinderGeometry(rTop, rBot, segH, 8);
      const dir = new THREE.Vector3(nx - cx, ny - cy, nz - cz).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      const m = new THREE.Matrix4().compose(new THREE.Vector3((cx + nx) * 0.5, (cy + ny) * 0.5, (cz + nz) * 0.5), q, new THREE.Vector3(1, 1, 1));
      segGeo.applyMatrix4(m);
      trunkGeos.push(segGeo);

      cx = nx; cy = ny; cz = nz;
    }

    // 2. Tiered Spreading Boughs
    const tierCount = variant === 2 ? 8 : (variant === 3 ? 7 : 8);
    const canopyMat = variant === 3 ? this.greenNeedleCanopyMat : this.blueNeedleCanopyMat;

    for (let tr = 0; tr < tierCount; tr++) {
      const tt = tr / (tierCount - 1);
      const ty = (0.12 + tt * 0.78) * height;
      const tierR = baseRadius * Math.pow(1.0 - tt * 0.88, 0.75);
      const boughCount = 5 + (tr % 2 === 0 ? 1 : 0);
      const tierRot = (tr % 2) * (Math.PI / boughCount);

      for (let b = 0; b < boughCount; b++) {
        const phi = (b / boughCount) * Math.PI * 2 + tierRot + (Math.random() - 0.5) * 0.2;
        const bLen = tierR * (0.85 + Math.random() * 0.25);
        const bDroop = 0.22 + (1.0 - tt) * 0.18;

        const bPos = new THREE.Vector3(
          Math.cos(phi) * 0.15,
          ty,
          Math.sin(phi) * 0.15
        );
        const bEuler = new THREE.Euler(0, phi, -Math.PI * bDroop, 'YXZ');
        const bMatrix = new THREE.Matrix4().makeRotationFromEuler(bEuler).setPosition(bPos);

        const bGeo = new THREE.CylinderGeometry(0.025, 0.055, bLen, 6);
        bGeo.applyMatrix4(new THREE.Matrix4().makeTranslation(0, bLen * 0.45, 0));
        bGeo.applyMatrix4(bMatrix);
        boughGeos.push(bGeo);

        // Layered fluffy needle fan pads along the bough
        const padCount = 2 + (tr < 4 ? 1 : 0);
        for (let p = 0; p < padCount; p++) {
          const pt = 0.35 + (p / padCount) * 0.65;
          const padW = tierR * (0.48 + (1 - tt) * 0.25);
          const padH = padW * 0.75;

          const padLocal = new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            bLen * pt,
            (Math.random() - 0.5) * 0.1
          );
          padLocal.applyMatrix4(bMatrix);

          const padGeo = new THREE.PlaneGeometry(padW, padH);

          [0, Math.PI / 3, (Math.PI * 2) / 3].forEach(ang => {
            const plane = padGeo.clone();
            const m = new THREE.Matrix4()
              .makeRotationY(ang)
              .setPosition(padLocal);
            plane.applyMatrix4(m);
            foliageGeos.push(plane);
          });

          // Tilted bough fan cap
          const cap = padGeo.clone();
          const capM = new THREE.Matrix4()
            .makeRotationX(Math.PI * 0.40)
            .multiply(new THREE.Matrix4().makeRotationY(phi))
            .setPosition(padLocal);
          cap.applyMatrix4(capM);
          foliageGeos.push(cap);
        }
      }
    }

    // 3. Spire Tip Fluffy Needle Pads
    const tipCenter = new THREE.Vector3(cx, height * 0.94, cz);
    const tipGeo = new THREE.PlaneGeometry(1.2, 1.8);
    [0, Math.PI / 3, (Math.PI * 2) / 3].forEach(ang => {
      const p = tipGeo.clone();
      p.applyMatrix4(new THREE.Matrix4().makeRotationY(ang).setPosition(tipCenter));
      foliageGeos.push(p);
    });

    // Merge trunk
    if (trunkGeos.length > 0) {
      const mergedTrunk = BufferGeometryUtils.mergeGeometries(trunkGeos, false);
      const trunkMesh = new THREE.Mesh(mergedTrunk, this.spruceBarkMat);
      trunkMesh.castShadow = true;
      treeGroup.add(trunkMesh);
    }

    // Merge boughs
    if (boughGeos.length > 0) {
      const mergedBoughs = BufferGeometryUtils.mergeGeometries(boughGeos, false);
      const boughMesh = new THREE.Mesh(mergedBoughs, this.spruceBarkMat);
      boughMesh.castShadow = true;
      treeGroup.add(boughMesh);
    }

    // Merge foliage (NO cast shadow to eliminate harsh black shadow lines!)
    if (foliageGeos.length > 0) {
      const mergedFoliage = BufferGeometryUtils.mergeGeometries(foliageGeos, false);
      const foliageMesh = new THREE.Mesh(mergedFoliage, canopyMat);
      foliageMesh.castShadow = false;
      foliageMesh.receiveShadow = true;
      treeGroup.add(foliageMesh);
    }

    return treeGroup;
  }

  /**
   * High-Fidelity 3D Scotch Pine Tree (tree-big-1, tree-big-2)
   * High performance: All canopy tufts merged into 1 geometry, branches into 1 geometry
   */
  createPineTree(variant, height, canopyRadius) {
    const pineGroup = new THREE.Group();

    // Natural organic lean / curve
    const leanX = (Math.random() - 0.5) * 0.85;
    const leanZ = (Math.random() - 0.5) * 0.85;

    // 1. Organic segmented curved trunk (5 segments)
    const segCount = 5;
    const segH = (height * 0.84) / segCount;
    let currX = 0, currY = 0, currZ = 0;

    const lowerTrunkGeos = [];
    const orangeWoodGeos = [];
    const canopyGeos = [];

    for (let s = 0; s < segCount; s++) {
      const t = (s + 1) / segCount;
      const nextX = leanX * t * t;
      const nextY = currY + segH;
      const nextZ = leanZ * t * t;

      const midX = (currX + nextX) * 0.5;
      const midY = (currY + nextY) * 0.5;
      const midZ = (currZ + nextZ) * 0.5;

      const rTop = 0.30 * Math.pow(1.0 - t * 0.52, 0.8);
      const rBot = 0.30 * Math.pow(1.0 - (s / segCount) * 0.52, 0.8);

      const segGeo = new THREE.CylinderGeometry(rTop, rBot, segH, 8);
      const dir = new THREE.Vector3(nextX - currX, nextY - currY, nextZ - currZ).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      const m = new THREE.Matrix4().compose(new THREE.Vector3(midX, midY, midZ), q, new THREE.Vector3(1, 1, 1));
      segGeo.applyMatrix4(m);

      if (s < 2) {
        lowerTrunkGeos.push(segGeo);
      } else {
        orangeWoodGeos.push(segGeo);
      }

      currX = nextX;
      currY = nextY;
      currZ = nextZ;
    }

    // 2. Muscular Upper Boughs
    const boughCount = variant === 2 ? 7 : 6;
    const startY = height * 0.50;

    for (let b = 0; b < boughCount; b++) {
      const bt = b / (boughCount - 1);
      const by = startY + bt * (height * 0.34);
      const phi = (b / boughCount) * Math.PI * 2 + (b % 2) * 0.45;
      const bLen = canopyRadius * (0.70 + Math.random() * 0.35);

      const bPos = new THREE.Vector3(currX * (0.6 + bt * 0.4), by, currZ * (0.6 + bt * 0.4));
      const bEuler = new THREE.Euler(0, phi, -Math.PI * (0.28 + bt * 0.08), 'YXZ');
      const bMatrix = new THREE.Matrix4().makeRotationFromEuler(bEuler).setPosition(bPos);

      // Branch limb
      const bGeo = new THREE.CylinderGeometry(0.045, 0.09, bLen, 6);
      bGeo.applyMatrix4(new THREE.Matrix4().makeTranslation(0, bLen * 0.4, 0));
      bGeo.applyMatrix4(bMatrix);
      orangeWoodGeos.push(bGeo);

      // Layered Needle Tuft Canopy Pads at varied natural angles (no harsh perpendicular cards!)
      const padCount = 2 + (b % 2 === 0 ? 1 : 0);
      for (let p = 0; p < padCount; p++) {
        const pFrac = 0.4 + (p / padCount) * 0.65;
        const padR = 1.55 + (1.0 - bt * 0.3) * 0.85;

        const tuftLocal = new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          bLen * pFrac + 0.15,
          (Math.random() - 0.5) * 0.2
        );
        tuftLocal.applyMatrix4(bMatrix);

        const tuftGeo = new THREE.PlaneGeometry(padR * 1.7, padR * 1.2);

        // 4 radial angles for uniform 3D density
        [0, Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4].forEach(angle => {
          const plane = tuftGeo.clone();
          plane.applyMatrix4(new THREE.Matrix4().makeRotationY(angle).setPosition(tuftLocal));
          canopyGeos.push(plane);
        });

        // Tilted domed cap cards (instead of flat horizontal plane)
        [-0.35, 0.35].forEach(tilt => {
          const cap = tuftGeo.clone();
          const m = new THREE.Matrix4()
            .makeRotationX(Math.PI * 0.40)
            .multiply(new THREE.Matrix4().makeRotationZ(tilt))
            .setPosition(tuftLocal);
          cap.applyMatrix4(m);
          canopyGeos.push(cap);
        });
      }
    }

    // 3. Apex Umbrella Crown
    const crownCenter = new THREE.Vector3(currX, height * 0.88, currZ);
    for (let c = 0; c < 4; c++) {
      const cPhi = (c / 4) * Math.PI * 2;
      const cR = canopyRadius * 0.48;
      const crownPos = new THREE.Vector3(
        crownCenter.x + Math.cos(cPhi) * cR,
        crownCenter.y + c * 0.25,
        crownCenter.z + Math.sin(cPhi) * cR
      );

      const cGeo = new THREE.PlaneGeometry(2.6, 1.8);
      [0, Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4].forEach(ang => {
        const p = cGeo.clone();
        p.applyMatrix4(new THREE.Matrix4().makeRotationY(ang).setPosition(crownPos));
        canopyGeos.push(p);
      });

      [-0.35, 0.35].forEach(tilt => {
        const hp = cGeo.clone();
        const m = new THREE.Matrix4()
          .makeRotationX(Math.PI * 0.40)
          .multiply(new THREE.Matrix4().makeRotationZ(tilt))
          .setPosition(crownPos);
        hp.applyMatrix4(m);
        canopyGeos.push(hp);
      });
    }

    if (lowerTrunkGeos.length > 0) {
      const mergedLower = BufferGeometryUtils.mergeGeometries(lowerTrunkGeos, false);
      const lowerMesh = new THREE.Mesh(mergedLower, this.pineBarkMat);
      lowerMesh.castShadow = true;
      pineGroup.add(lowerMesh);
    }

    if (orangeWoodGeos.length > 0) {
      const mergedUpper = BufferGeometryUtils.mergeGeometries(orangeWoodGeos, false);
      const upperMesh = new THREE.Mesh(mergedUpper, this.pineOrangeBarkMat);
      upperMesh.castShadow = true;
      pineGroup.add(upperMesh);
    }

    if (canopyGeos.length > 0) {
      const mergedCanopy = BufferGeometryUtils.mergeGeometries(canopyGeos, false);
      const canopyMesh = new THREE.Mesh(mergedCanopy, this.pineCanopyMat);
      // Disable self-shadow on needle cards to eliminate harsh black shadow lines!
      canopyMesh.castShadow = false;
      canopyMesh.receiveShadow = true;
      pineGroup.add(canopyMesh);
    }

    return pineGroup;
  }

  /**
   * Modern Architectural Park Lantern Post (Screenshot 2)
   */
  createParkLantern() {
    const lanternGroup = new THREE.Group();

    // Base Stanchion
    const baseGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.22, 8);
    const baseMesh = new THREE.Mesh(baseGeo, this.frameMat);
    baseMesh.position.y = 0.11;
    baseMesh.castShadow = true;
    lanternGroup.add(baseMesh);

    // Slender Dark Metal Pole (height 3.2m)
    const poleGeo = new THREE.CylinderGeometry(0.045, 0.065, 3.2, 8);
    const pole = new THREE.Mesh(poleGeo, this.frameMat);
    pole.position.y = 1.71;
    pole.castShadow = true;
    lanternGroup.add(pole);

    // Decorative Flared Bracket Collar
    const collarGeo = new THREE.CylinderGeometry(0.14, 0.07, 0.1, 8);
    const collar = new THREE.Mesh(collarGeo, this.frameMat);
    collar.position.y = 3.28;
    lanternGroup.add(collar);

    // Modern Inverted Flared Lantern Head
    const headHousingGeo = new THREE.CylinderGeometry(0.32, 0.16, 0.45, 4);
    const headHousing = new THREE.Mesh(headHousingGeo, this.frameMat);
    headHousing.position.y = 3.52;
    headHousing.rotation.y = Math.PI / 4;
    lanternGroup.add(headHousing);

    // Glowing Luminous Amber Core Bulb
    const bulbGeo = new THREE.BoxGeometry(0.2, 0.32, 0.2);
    const bulb = new THREE.Mesh(bulbGeo, this.lanternGlassMat);
    bulb.position.y = 3.52;
    bulb.rotation.y = Math.PI / 4;
    lanternGroup.add(bulb);

    // Pyramidal Roof Cap
    const capGeo = new THREE.ConeGeometry(0.38, 0.14, 4);
    const cap = new THREE.Mesh(capGeo, this.frameMat);
    cap.position.y = 3.81;
    cap.rotation.y = Math.PI / 4;
    cap.castShadow = true;
    lanternGroup.add(cap);

    // Warm Atmosphere Point Light (illuminates surrounding trees and pavement)
    const lanternLight = new THREE.PointLight(0xffc25c, 3.6, 12.0);
    lanternLight.position.set(0, 3.52, 0);
    lanternLight.castShadow = false;
    lanternGroup.add(lanternLight);

    return lanternGroup;
  }

  /**
   * Modern Park Trash Receptacle / Urn (Screenshot 2)
   */
  createParkTrashCan() {
    const urnGroup = new THREE.Group();

    // Dark slatted rectangular receptacle
    const bodyGeo = new THREE.BoxGeometry(0.42, 0.68, 0.42);
    const body = new THREE.Mesh(bodyGeo, this.frameMat);
    body.position.y = 0.34;
    body.castShadow = true;
    urnGroup.add(body);

    // Inner rim top
    const rimGeo = new THREE.BoxGeometry(0.36, 0.08, 0.36);
    const rim = new THREE.Mesh(rimGeo, this.benchWoodMat);
    rim.position.y = 0.65;
    urnGroup.add(rim);

    return urnGroup;
  }

  /**
   * Architectural Park Bench (Slatted Wood & Cast Iron, Screenshot 2)
   */
  createParkBench() {
    const benchGroup = new THREE.Group();

    // 2 Cast-Iron Stanchions (end legs)
    [-0.72, 0.72].forEach(bx => {
      // Leg frame
      const legGeo = new THREE.BoxGeometry(0.05, 0.45, 0.48);
      const leg = new THREE.Mesh(legGeo, this.frameMat);
      leg.position.set(bx, 0.225, 0);
      leg.castShadow = true;
      benchGroup.add(leg);

      // Backrest stanchion
      const backStanchionGeo = new THREE.BoxGeometry(0.045, 0.45, 0.05);
      const backStanchion = new THREE.Mesh(backStanchionGeo, this.frameMat);
      backStanchion.position.set(bx, 0.62, -0.22);
      backStanchion.rotation.x = -0.12;
      backStanchion.castShadow = true;
      benchGroup.add(backStanchion);
    });

    // 4 Seat Slats (Dark Wood)
    for (let s = 0; s < 4; s++) {
      const sz = -0.16 + s * 0.11;
      const slatGeo = new THREE.BoxGeometry(1.6, 0.035, 0.085);
      const slat = new THREE.Mesh(slatGeo, this.benchWoodMat);
      slat.position.set(0, 0.46, sz);
      slat.castShadow = true;
      benchGroup.add(slat);
    }

    // 3 Backrest Slats
    for (let b = 0; b < 3; b++) {
      const by = 0.56 + b * 0.09;
      const bz = -0.21 - b * 0.015;
      const bSlatGeo = new THREE.BoxGeometry(1.6, 0.075, 0.025);
      const bSlat = new THREE.Mesh(bSlatGeo, this.benchWoodMat);
      bSlat.position.set(0, by, bz);
      bSlat.rotation.x = -0.12;
      bSlat.castShadow = true;
      benchGroup.add(bSlat);
    }

    return benchGroup;
  }

  /**
   * Event Listeners for resize and mouse parallax
   */
  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        const heroSection = document.getElementById('hero-section');
        if (!heroSection || !heroSection.classList.contains('departed')) {
          this.resume();
        }
      }
    });
  }

  onResize() {
    if (!this.container) return;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  onMouseMove(e) {
    if (this.isTransitioning) return;
    if (this._mouseRaf) return;
    this._mouseRaf = true;
    requestAnimationFrame(() => {
      this._mouseRaf = false;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mouse.targetX = nx * 0.55;
      this.mouse.targetY = ny * 0.25;
    });
  }

  /**
   * Cinematic Camera Flight into the Corner Portico Entrance (now completely open and unobstructed!)
   */
  flyIntoEntrance(onComplete) {
    this.isTransitioning = true;

    const timeline = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Sliding Glass Doors slide wide open smoothly
    if (this.doorLeft && this.doorRight) {
      timeline.to(this.doorLeft.position, {
        x: -1.35,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 0.3);

      timeline.to(this.doorRight.position, {
        x: 1.35,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 0.3);
    }

    // 2. Camera glides straight forward through the open doors into the pure black void
    timeline.to(this.camera.position, {
      x: 0.40,
      y: 1.0,
      z: -3.22,
      duration: 2.0,
      ease: 'power3.inOut'
    }, 0);

    const targetObj = { x: this.initialTarget.x, y: this.initialTarget.y, z: this.initialTarget.z };
    timeline.to(targetObj, {
      x: -1.54,
      y: 1.0,
      z: -6.61,
      duration: 2.0,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.camera.lookAt(targetObj.x, targetObj.y, targetObj.z);
      }
    }, 0);

    // 3. Cinematic pure black overlay smoothly fills 100% of the screen
    const portalFlash = document.getElementById('portal-flash');
    if (portalFlash) {
      timeline.to(portalFlash, {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.in'
      }, 1.3);
    }

    return timeline;
  }

  /**
   * Smooth Camera Return to the Exterior Street View
   */
  flyBackToStreet(onComplete) {
    const timeline = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        if (onComplete) onComplete();
      }
    });

    // Position camera just inside doorway before pulling back
    this.camera.position.set(0.40, 1.0, -3.22);
    this.camera.lookAt(-1.54, 1.0, -6.61);

    // 1. Camera glides smoothly back outside to street view
    timeline.to(this.camera.position, {
      x: this.initialCamPos.x,
      y: this.initialCamPos.y,
      z: this.initialCamPos.z,
      duration: 1.5,
      ease: 'power3.out'
    }, 0);

    const targetObj = { x: -1.54, y: 1.0, z: -6.61 };
    timeline.to(targetObj, {
      x: this.initialTarget.x,
      y: this.initialTarget.y,
      z: this.initialTarget.z,
      duration: 1.5,
      ease: 'power3.out',
      onUpdate: () => {
        this.camera.lookAt(targetObj.x, targetObj.y, targetObj.z);
      }
    }, 0);

    // 2. Sliding doors close smoothly as camera clears the doorway
    if (this.doorLeft && this.doorRight) {
      timeline.to(this.doorLeft.position, {
        x: -0.44,
        duration: 0.9,
        ease: 'power2.inOut'
      }, 0.4);

      timeline.to(this.doorRight.position, {
        x: 0.44,
        duration: 0.9,
        ease: 'power2.inOut'
      }, 0.4);
    }

    // 3. Reset porch light intensity
    timeline.to(this.porchLight, {
      intensity: 6.0,
      distance: 14,
      duration: 1.0
    }, 0.2);

    // 4. Smoothly lift the black curtain revealing the exterior street view
    const portalFlash = document.getElementById('portal-flash');
    if (portalFlash) {
      timeline.to(portalFlash, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, 0.2);
    }

    return timeline;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.animate();
    }
  }

  animate() {
    if (this.isPaused) return;
    requestAnimationFrame(this.animate.bind(this));

    // Mouse Parallax Damping
    if (!this.isTransitioning) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      this.camera.position.x = this.initialCamPos.x + this.mouse.x * 0.8;
      this.camera.position.y = this.initialCamPos.y + this.mouse.y * 0.5;
      this.camera.lookAt(
        this.initialTarget.x + this.mouse.x * 0.2,
        this.initialTarget.y + this.mouse.y * 0.1,
        this.initialTarget.z
      );
    }

    // Subtle gentle twinkle on the neon sign and fairy lights
    const time = performance.now() * 0.002;
    if (this.signPointLight) {
      this.signPointLight.intensity = 2.8 + Math.sin(time * 3) * 0.15;
    }
    if (this.porchLight && !this.isTransitioning) {
      this.porchLight.intensity = 5.5 + Math.cos(time * 2.5) * 0.25;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
