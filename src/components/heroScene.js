import * as THREE from 'three';
import gsap from 'gsap';

export class HeroBuildingScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x131418, 0.015);

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    // Perspective Camera matching 3d-rakurs.png
    this.camera = new THREE.PerspectiveCamera(36, this.width / this.height, 0.1, 100);
    this.initialCamPos = new THREE.Vector3(1.0, 3.9, 17.6);
    this.initialTarget = new THREE.Vector3(3.2, 2.6, -0.3);
    this.camera.position.copy(this.initialCamPos);
    this.camera.lookAt(this.initialTarget);

    // WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // Mouse Parallax Values
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isTransitioning = false;

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
  }

  /**
   * Scene Lighting (authentic evening dusk atmosphere matching real photo)
   */
  initLights() {
    // Ambient twilight sky light
    const hemiLight = new THREE.HemisphereLight(0x7892b8, 0x2e241c, 1.25);
    this.scene.add(hemiLight);

    // Warm Sunset directional sunlight from front-right (gentle dusk angle)
    const dirLight = new THREE.DirectionalLight(0xffecd2, 1.95);
    dirLight.position.set(18, 22, 16);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -18;
    dirLight.shadow.camera.right = 18;
    dirLight.shadow.camera.top = 18;
    dirLight.shadow.camera.bottom = -18;
    dirLight.shadow.bias = -0.0003;
    this.scene.add(dirLight);

    // Subtle fill light from front-left to illuminate the left facade
    const fillLight = new THREE.DirectionalLight(0xa6b8d4, 1.05);
    fillLight.position.set(-18, 16, 12);
    this.scene.add(fillLight);

    // Sky Rim light from back to outline roof silhouettes
    const rimLight = new THREE.DirectionalLight(0x7094c8, 0.95);
    rimLight.position.set(0, 16, -16);
    this.scene.add(rimLight);

    // Warm Golden Portico Downlights (illuminating the floor and archway)
    this.porchLight = new THREE.PointLight(0xffb238, 6.0, 14);
    this.porchLight.position.set(1.6, 2.6, -1.6);
    this.porchLight.castShadow = true;
    this.buildingGroup.add(this.porchLight);

    // Interior Warm Lights behind windows
    const atriumLight = new THREE.PointLight(0xffae36, 5.5, 14);
    atriumLight.position.set(5.9, 3.2, -2.0);
    this.buildingGroup.add(atriumLight);

    // Amoeba Window Light (illuminates upper window above portico)
    const amoebaLight = new THREE.PointLight(0xffae36, 4.0, 8);
    amoebaLight.position.set(1.9, 4.65, -0.6);
    this.buildingGroup.add(amoebaLight);

    // Left Facade Interior Light (illuminates all 4 left windows warmly)
    const leftWinLight = new THREE.PointLight(0xffa830, 5.2, 16);
    leftWinLight.position.set(2.0, 3.2, -6.0);
    this.buildingGroup.add(leftWinLight);

    // Pylon Arch Entrance Light (illuminating steps and doors)
    const pylonLight = new THREE.PointLight(0xffae36, 3.5, 10);
    pylonLight.position.set(8.8, 1.8, 0.5);
    this.buildingGroup.add(pylonLight);
  }

  /**
   * Ground plane and concrete building plinth
   */
  buildGround() {
    // Street pavement ground plane
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1f1d1b,
      roughness: 0.9,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Concrete architectural plinth directly under the building
    const plinthGeo = new THREE.BoxGeometry(20, 0.16, 18);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x2c2724,
      roughness: 0.85,
      metalness: 0.08
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.set(6.5, 0.08, -5.5);
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

    // B. Paved Porch Floor Slab
    const floorGeo = new THREE.BoxGeometry(3.4, 0.15, 3.4);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x36302b, roughness: 0.7 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(1.85, 0.08, -1.85);
    floor.receiveShadow = true;
    this.porticoGroup.add(floor);

    // C. Enclose Portico Side Walls to eliminate empty voids (Green Circles fix)
    // Right side connecting wall (from front wall x=3.6 into the porch)
    const rightSideWall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.12, 1.8), this.facadeMat);
    rightSideWall.position.set(3.42, 1.56, -0.9);
    rightSideWall.castShadow = true;
    this.porticoGroup.add(rightSideWall);

    // Left side connecting wall (from left wall z=-3.2 into the porch)
    const leftSideWall = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.12, 0.35), this.facadeMat);
    leftSideWall.position.set(0.9, 1.56, -3.02);
    leftSideWall.castShadow = true;
    this.porticoGroup.add(leftSideWall);

    // D. Angled Recessed Entrance Facade
    const entranceAngledGroup = new THREE.Group();
    entranceAngledGroup.position.set(1.75, 0, -1.75);
    entranceAngledGroup.rotation.y = -Math.PI / 4; // 45 degrees
    this.porticoGroup.add(entranceAngledGroup);

    // Entrance Metal Perimeter Frame
    const eFrameW = 3.6;
    const eFrameH = 2.95;
    const eFrameDepth = 0.08;

    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(eFrameW, 0.08, eFrameDepth), this.frameMat);
    topBeam.position.set(0, 2.9, 0);
    entranceAngledGroup.add(topBeam);

    const midBeam = new THREE.Mesh(new THREE.BoxGeometry(eFrameW, 0.06, eFrameDepth), this.frameMat);
    midBeam.position.set(0, 2.2, 0);
    entranceAngledGroup.add(midBeam);

    const botBeam = new THREE.Mesh(new THREE.BoxGeometry(eFrameW, 0.12, eFrameDepth), this.frameMat);
    botBeam.position.set(0, 0.12, 0);
    entranceAngledGroup.add(botBeam);

    // Vertical frame mullions
    [-1.6, -0.85, 0.85, 1.6].forEach(vx => {
      const vCol = new THREE.Mesh(new THREE.BoxGeometry(0.06, eFrameH, eFrameDepth), this.frameMat);
      vCol.position.set(vx, 1.48, 0);
      entranceAngledGroup.add(vCol);
    });

    // Glass transom panels above doors (y: 2.2 to 2.9)
    const transomGlass = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 0.65), this.glassMat);
    transomGlass.position.set(0, 2.55, 0.01);
    entranceAngledGroup.add(transomGlass);

    // Deep Matte Pure Black Portal Chamber (zero visual interference, pristine black void)
    const blackVoidMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });

    // Back wall of black void chamber (deep behind entrance)
    const voidBack = new THREE.Mesh(new THREE.PlaneGeometry(8, 6), blackVoidMat);
    voidBack.position.set(0, 1.8, -5.0);
    entranceAngledGroup.add(voidBack);

    // Left wall of black chamber
    const voidLeft = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), blackVoidMat);
    voidLeft.rotation.y = Math.PI / 2;
    voidLeft.position.set(-2.0, 1.8, -2.5);
    entranceAngledGroup.add(voidLeft);

    // Right wall of black chamber
    const voidRight = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), blackVoidMat);
    voidRight.rotation.y = -Math.PI / 2;
    voidRight.position.set(2.0, 1.8, -2.5);
    entranceAngledGroup.add(voidRight);

    // Floor of black chamber
    const voidFloor = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), blackVoidMat);
    voidFloor.rotation.x = -Math.PI / 2;
    voidFloor.position.set(0, 0, -2.5);
    entranceAngledGroup.add(voidFloor);

    // Ceiling of black chamber
    const voidCeiling = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), blackVoidMat);
    voidCeiling.rotation.x = Math.PI / 2;
    voidCeiling.position.set(0, 3.2, -2.5);
    entranceAngledGroup.add(voidCeiling);

    // Automatic Sliding Door Header Box (overhead mechanism in dark anodized aluminum)
    const headerBoxGeo = new THREE.BoxGeometry(2.1, 0.12, 0.08);
    const headerBox = new THREE.Mesh(headerBoxGeo, this.frameMat);
    headerBox.position.set(0, 2.18, 0.04);
    entranceAngledGroup.add(headerBox);

    // E. High-Detail Sliding Glass Double Doors (Left & Right)
    this.doorLeft = this.createDetailedDoorLeaf(true);
    this.doorLeft.position.set(-0.43, 1.10, 0.03);
    entranceAngledGroup.add(this.doorLeft);

    this.doorRight = this.createDetailedDoorLeaf(false);
    this.doorRight.position.set(0.43, 1.10, 0.03);
    entranceAngledGroup.add(this.doorRight);

    // F. Dense Cascading Golden Fairy Lights Curtain (matching real photo!)
    this.buildDenseFairyLights(entranceAngledGroup);

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

    // C. The Sculptural Arch-Pylon & Entrance (X: 7.6 to 11.2) - with sealed back wall
    this.buildSculpturalPylon(rightGroup, 7.6);

    // D. Right Wing (X: 10.8 to 15.6, Y: 0 to 6.2) - sealed roofline, no gaps
    this.buildRightWing(rightGroup, 10.8);
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

    // Solid connecting wall behind the top of the pylon (Green Circle fix: no sky gap!)
    const pylonBackingWall = new THREE.Mesh(new THREE.BoxGeometry(2.9, 6.2, 0.35), this.facadeMat);
    pylonBackingWall.position.set(1.45, 3.1, -0.35);
    pylonGroup.add(pylonBackingWall);

    // B. Wooden Entrance Steps leading through the archway
    for (let step = 0; step < 4; step++) {
      const stepGeo = new THREE.BoxGeometry(1.9, 0.12, 0.32);
      const stepMesh = new THREE.Mesh(stepGeo, this.woodMat);
      stepMesh.position.set(1.2, 0.06 + step * 0.12, 0.45 - step * 0.28);
      stepMesh.receiveShadow = true;
      pylonGroup.add(stepMesh);
    }

    // C. Sealed Glass Doorway inside the Pylon Arch (no hollow hole)
    const pylonGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 2.9), this.glassMat);
    pylonGlass.position.set(1.2, 1.5, -0.05);
    pylonGroup.add(pylonGlass);

    const pylonInterior = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 2.9), this.interiorGlowMat);
    pylonInterior.position.set(1.2, 1.5, -0.28);
    pylonGroup.add(pylonInterior);
  }

  /**
   * Right Wing with ribbon windows and pill windows (sealed roofline, Green Circle fix!)
   */
  buildRightWing(group, startX) {
    const wingGroup = new THREE.Group();
    wingGroup.position.set(startX, 0, 0);
    group.add(wingGroup);

    const wingW = 4.8;
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
   * Event Listeners for resize and mouse parallax
   */
  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
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
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;

    this.mouse.targetX = nx * 0.55;
    this.mouse.targetY = ny * 0.25;
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
        x: -1.4,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 0.3);

      timeline.to(this.doorRight.position, {
        x: 1.4,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 0.3);
    }

    // 2. Camera glides straight forward through the open doors into the pure black void
    timeline.to(this.camera.position, {
      x: 1.2,
      y: 1.35,
      z: -1.8,
      duration: 2.0,
      ease: 'power3.inOut'
    }, 0);

    const targetObj = { x: this.initialTarget.x, y: this.initialTarget.y, z: this.initialTarget.z };
    timeline.to(targetObj, {
      x: 1.2,
      y: 1.35,
      z: -6.0,
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
    this.camera.position.set(1.2, 1.35, -1.8);
    this.camera.lookAt(1.2, 1.35, -6.0);

    // 1. Camera glides smoothly back outside to street view
    timeline.to(this.camera.position, {
      x: this.initialCamPos.x,
      y: this.initialCamPos.y,
      z: this.initialCamPos.z,
      duration: 1.5,
      ease: 'power3.out'
    }, 0);

    const targetObj = { x: 1.2, y: 1.35, z: -6.0 };
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
        x: -0.43,
        duration: 0.9,
        ease: 'power2.inOut'
      }, 0.4);

      timeline.to(this.doorRight.position, {
        x: 0.43,
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

    return timeline;
  }

  animate() {
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
