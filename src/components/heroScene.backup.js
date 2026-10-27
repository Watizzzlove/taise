import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import gsap from 'gsap';

export class HeroBuildingScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x131418, 0.016);

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    // Perspective Camera matching the perspective sketch
    this.camera = new THREE.PerspectiveCamera(36, this.width / this.height, 0.1, 100);
    this.initialCamPos = new THREE.Vector3(0.5, 3.5, 14.5);
    this.initialTarget = new THREE.Vector3(1.0, 2.4, -1.0);
    this.camera.position.copy(this.initialCamPos);
    this.camera.lookAt(this.initialTarget);

    // WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // Mouse Parallax Values
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isTransitioning = false;

    // Building Root Group
    this.buildingGroup = new THREE.Group();
    this.buildingGroup.position.set(0.5, 0, -1.0);
    this.scene.add(this.buildingGroup);

    this.initLights();
    this.buildGround();
    this.loadBuildingSvgAssets();
    this.buildTrees();
    this.addEventListeners();
    this.animate();
  }

  initLights() {
    // Ambient twilight
    const hemiLight = new THREE.HemisphereLight(0x6e788c, 0x1a1c22, 0.9);
    this.scene.add(hemiLight);

    // Architectural key directional sunlight from the right-front
    const dirLight = new THREE.DirectionalLight(0xfff5e8, 1.15);
    dirLight.position.set(14, 20, 14);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 45;
    dirLight.shadow.camera.left = -14;
    dirLight.shadow.camera.right = 14;
    dirLight.shadow.camera.top = 14;
    dirLight.shadow.camera.bottom = -14;
    dirLight.shadow.bias = -0.0004;
    this.scene.add(dirLight);

    // Architectural fill/sun light from the left to highlight the left facade
    const fillLight = new THREE.DirectionalLight(0xe4edff, 1.15);
    fillLight.position.set(-16, 18, 10);
    this.scene.add(fillLight);

    // Warm Entrance Arch Light (inside the corner porch)
    this.archLight = new THREE.PointLight(0xffaa2b, 4.5, 14);
    this.archLight.position.set(0.97, 2.2, -2.0);
    this.archLight.castShadow = true;
    this.buildingGroup.add(this.archLight);

    // Yellow Neon Sign Light (soft glow on the right facade)
    this.signLight = new THREE.PointLight(0xffea00, 1.4, 6.0);
    this.signLight.position.set(3.1, 3.5, -0.9);
    this.buildingGroup.add(this.signLight);
  }

  buildGround() {
    // Concrete ground plane
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1e2025,
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Concrete architectural plinth under the restaurant building
    const curbGeo = new THREE.BoxGeometry(26, 0.16, 26);
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x2b2d33,
      roughness: 0.82,
      metalness: 0.1
    });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(1.5, 0.08, -6.5);
    curb.rotation.y = 0.4886;
    curb.receiveShadow = true;
    this.buildingGroup.add(curb);
  }

  /**
   * Load and extrude user SVG blueprints via SVGLoader
   */
  loadBuildingSvgAssets() {
    const loader = new SVGLoader();

    // Scale constant: maps 2394 px wall width to ~11.5 Three.js units
    this.SVG_SCALE = 0.0048;

    // Charcoal Facade Material matching sketch.png (#2b2b2e)
    this.stoneMat = new THREE.MeshStandardMaterial({
      color: 0x2b2b2e,
      roughness: 0.84,
      metalness: 0.15
    });

    // Vibrant Yellow Neon Sign Material
    this.neonMat = new THREE.MeshStandardMaterial({
      color: 0xffea00,
      emissive: 0xffd200,
      emissiveIntensity: 3.5,
      roughness: 0.2,
      metalness: 0.05
    });

    // Bright White Illuminated Window Glass matching sketch.png
    this.windowGlassMat = new THREE.MeshStandardMaterial({
      color: 0xf4f6fb,
      emissive: 0xf5f7fc,
      emissiveIntensity: 0.78,
      roughness: 0.2,
      metalness: 0.05
    });

    // Dark Charcoal Window Mullion Bars
    this.mullionMat = new THREE.MeshStandardMaterial({
      color: 0x1b1c1f,
      roughness: 0.45,
      metalness: 0.7
    });

    // 1. Load Right Facade
    loader.load('/assets/right-side.svg', (data) => {
      this.buildRightFacade(data);
    });

    // 2. Load Left Facade
    loader.load('/assets/left-side.svg', (data) => {
      this.buildLeftFacade(data);
    });

    // 3. Build Recessed Entrance Portal (with fairy lights, door, handle)
    this.buildEntrancePortal();

    // 4. Build Sloped Wedge Roof matching sketch.png
    this.buildWedgeRoof();
  }

  /**
   * Build Right Facade from right-side.svg (wall, window cutouts, and neon sign)
   * Extends from corner (0,0,0) towards the right and back into depth (angle +28°)
   */
  buildRightFacade(svgData) {
    if (!svgData || !svgData.paths || svgData.paths.length === 0) return;

    const s = this.SVG_SCALE;

    // Filter out canvas background rects: find the real wall path (fill #D9D9D9)
    const wallPath = svgData.paths.find((p) => {
      const node = p.userData?.node;
      if (!node) return false;
      return node.tagName === 'path' && (node.getAttribute('fill') === '#D9D9D9' || p.userData?.style?.fill === '#D9D9D9');
    }) || svgData.paths[1] || svgData.paths[0];

    // Find the neon text path (fill black)
    const textPath = svgData.paths.find((p) => {
      const node = p.userData?.node;
      if (!node) return false;
      return node.tagName === 'path' && (node.getAttribute('fill') === 'black' || p.userData?.style?.fill === 'black');
    }) || svgData.paths[2];

    const wallShapes = SVGLoader.createShapes(wallPath);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025
    };

    const rightWallGroup = new THREE.Group();

    wallShapes.forEach((shape) => {
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      // Invert Y (SVG Y is down) & align corner X=317, Y=1414 to (0, 0, 0), front face at Z=0
      geom.scale(s, -s, s);
      geom.translate(-317 * s, 1414 * s, -0.35);

      // Apply the wedge roof slope from sketch.png (drops down as x increases)
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        if (y > 4.2 && x > 0) {
          const slope = 0.23; // drops ~2.6 units over 11.5 units length
          const newY = Math.max(3.8, y - x * slope);
          pos.setY(i, newY);
        }
      }
      geom.computeVertexNormals();

      const mesh = new THREE.Mesh(geom, this.stoneMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      rightWallGroup.add(mesh);
    });

    // Window Glass backing for Right Facade (bright white glass matching sketch.png)
    // 1. Small amoeba window (X: ~2.9, Y: ~4.6)
    const amoebaGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.7), this.windowGlassMat);
    amoebaGlass.position.set(2.9, 4.6, -0.15);
    rightWallGroup.add(amoebaGlass);

    // 2. Large 2-story curved window (X: ~8.4, Y: ~3.3)
    const bigGlass = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 5.0), this.windowGlassMat);
    bigGlass.position.set(8.4, 3.3, -0.15);
    rightWallGroup.add(bigGlass);

    // Window Mullions (vertical and horizontal metal ribs overlaid on glass)
    this.addWindowMullions(rightWallGroup, [
      // Amoeba window mullions
      { x: 2.41, y: 4.6, w: 0.04, h: 1.7, d: 0.06 },
      { x: 3.2, y: 4.6, w: 0.04, h: 1.7, d: 0.06 },
      { x: 2.9, y: 4.95, w: 2.0, h: 0.04, d: 0.06 },
      { x: 2.9, y: 4.25, w: 2.0, h: 0.04, d: 0.06 },
      // Large window floor divider
      { x: 8.4, y: 3.12, w: 5.4, h: 0.24, d: 0.12 },
      // Large window vertical mullions
      { x: 6.1, y: 3.3, w: 0.04, h: 4.8, d: 0.06 },
      { x: 6.9, y: 3.3, w: 0.04, h: 5.0, d: 0.06 },
      { x: 7.7, y: 3.3, w: 0.04, h: 5.1, d: 0.06 },
      { x: 8.5, y: 3.3, w: 0.04, h: 5.1, d: 0.06 },
      { x: 9.3, y: 3.3, w: 0.04, h: 4.9, d: 0.06 },
      { x: 10.1, y: 3.3, w: 0.04, h: 4.6, d: 0.06 }
    ]);

    // Vector Neon Text "ТАЙСЁ АЗИАТСКОЕ БИСТРО"
    if (textPath) {
      const textShapes = SVGLoader.createShapes(textPath);
      const textExtrude = {
        depth: 0.07,
        bevelEnabled: true,
        bevelSegments: 1,
        bevelSize: 0.01,
        bevelThickness: 0.01
      };

      textShapes.forEach((tShape) => {
        const tGeom = new THREE.ExtrudeGeometry(tShape, textExtrude);
        tGeom.scale(s, -s, s);
        tGeom.translate(-317 * s, 1414 * s, 0.02);
        tGeom.computeVertexNormals();

        const textMesh = new THREE.Mesh(tGeom, this.neonMat);
        rightWallGroup.add(textMesh);
      });
    }

    // Rotate Right Wall into perspective receding to the right and back (+28°)
    rightWallGroup.rotation.y = 0.4886;
    this.buildingGroup.add(rightWallGroup);
  }

  /**
   * Build Left Facade from left-side.svg (wall, circular/oval windows, mullions)
   * Extends from corner (0,0,0) towards the left and back into depth (angle +118°)
   */
  buildLeftFacade(svgData) {
    if (!svgData || !svgData.paths || svgData.paths.length === 0) return;

    const s = this.SVG_SCALE;

    // Filter out canvas background rects: find the real wall path (fill #D9D9D9)
    const wallPath = svgData.paths.find((p) => {
      const node = p.userData?.node;
      if (!node) return false;
      return node.tagName === 'path' && (node.getAttribute('fill') === '#D9D9D9' || p.userData?.style?.fill === '#D9D9D9');
    }) || svgData.paths[1] || svgData.paths[0];

    const wallShapes = SVGLoader.createShapes(wallPath);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025
    };

    const leftWallGroup = new THREE.Group();

    wallShapes.forEach((shape) => {
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      // In left-side.svg, corner is at X=2711, Y=1414, front face at Z=0
      geom.scale(-s, -s, s);
      geom.translate(2711 * s, 1414 * s, -0.35);

      // Apply the wedge roof slope along distance from corner
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        if (y > 4.2 && x > 0) {
          const slope = 0.23;
          const newY = Math.max(3.8, y - x * slope);
          pos.setY(i, newY);
        }
      }
      geom.computeVertexNormals();

      const mesh = new THREE.Mesh(geom, this.stoneMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      leftWallGroup.add(mesh);
    });

    // Window Glass backing for Left Facade (bright white glass matching sketch.png)
    // 1. Two upper round windows (matching SVG cutouts X:1.35 and X:4.20)
    const round1 = new THREE.Mesh(new THREE.CircleGeometry(0.68, 24), this.windowGlassMat);
    round1.position.set(1.35, 4.75, -0.15);
    leftWallGroup.add(round1);

    const round2 = new THREE.Mesh(new THREE.CircleGeometry(0.68, 24), this.windowGlassMat);
    round2.position.set(4.20, 4.75, -0.15);
    leftWallGroup.add(round2);

    // 2. Ground floor arched window
    const archWin = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.8), this.windowGlassMat);
    archWin.position.set(4.90, 2.15, -0.15);
    leftWallGroup.add(archWin);

    // 3. Large double-floor window
    const leftBigWin = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 3.8), this.windowGlassMat);
    leftBigWin.position.set(9.10, 3.20, -0.15);
    leftWallGroup.add(leftBigWin);

    // Left Facade Window Mullions
    this.addWindowMullions(leftWallGroup, [
      // Round 1
      { x: 1.35, y: 4.75, w: 0.035, h: 1.36, d: 0.06 },
      { x: 1.35, y: 4.75, w: 1.36, h: 0.035, d: 0.06 },
      // Round 2
      { x: 4.20, y: 4.75, w: 0.035, h: 1.36, d: 0.06 },
      { x: 4.20, y: 4.75, w: 1.36, h: 0.035, d: 0.06 },
      // Arched ground window
      { x: 4.5, y: 2.15, w: 0.035, h: 1.8, d: 0.06 },
      { x: 5.3, y: 2.15, w: 0.035, h: 1.8, d: 0.06 },
      { x: 4.9, y: 2.25, w: 1.9, h: 0.035, d: 0.06 },
      // Large double-floor window
      { x: 9.1, y: 3.12, w: 4.2, h: 0.22, d: 0.12 },
      { x: 7.7, y: 3.2, w: 0.035, h: 3.6, d: 0.06 },
      { x: 8.4, y: 3.2, w: 0.035, h: 3.8, d: 0.06 },
      { x: 9.1, y: 3.2, w: 0.035, h: 3.8, d: 0.06 },
      { x: 9.8, y: 3.2, w: 0.035, h: 3.6, d: 0.06 },
      { x: 10.5, y: 3.2, w: 0.035, h: 3.4, d: 0.06 }
    ]);

    // Rotate Left Wall into perspective receding to the left and back (+118°: perpendicular to right wall)
    leftWallGroup.rotation.y = 0.4886 + Math.PI / 2;
    this.buildingGroup.add(leftWallGroup);

    // Add solid front corner column at (0, y, 0) meeting both facades
    const cornerColGeo = new THREE.BoxGeometry(0.36, 6.46, 0.36);
    const cornerCol = new THREE.Mesh(cornerColGeo, this.stoneMat);
    cornerCol.position.set(0, 3.23, 0);
    cornerCol.castShadow = true;
    cornerCol.receiveShadow = true;
    this.buildingGroup.add(cornerCol);
  }

  /**
   * Helper to add crisp window mullion bars
   */
  addWindowMullions(group, items) {
    items.forEach((item) => {
      const geo = new THREE.BoxGeometry(item.w, item.h, item.d || 0.08);
      const mesh = new THREE.Mesh(geo, this.mullionMat);
      mesh.position.set(item.x, item.y, -0.05);
      group.add(mesh);
    });
  }

  /**
   * Build Recessed Entrance Portal (from entance-forward.svg specs)
   * Rotated 90° and recessed inside the corner entrance archway
   */
  buildEntrancePortal() {
    this.portalGroup = new THREE.Group();

    // Recess portal directly inside the right archway, parallel to the right facade
    this.portalGroup.position.set(0.97, 0, -2.55);
    this.portalGroup.rotation.y = 0.4886;

    // 1. Porch Ceiling Slab
    const ceilingGeo = new THREE.BoxGeometry(5.2, 0.22, 2.5);
    const ceiling = new THREE.Mesh(ceilingGeo, this.stoneMat);
    ceiling.position.set(0, 3.12, 1.0);
    this.portalGroup.add(ceiling);

    // 2. Porch Tiled Floor
    const floorGeo = new THREE.BoxGeometry(5.2, 0.14, 2.5);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x32343a,
      roughness: 0.65,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, 0.07, 1.0);
    this.portalGroup.add(floor);

    // 3. Structural Metal Grid Frame (#4E4E4E)
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x2c2e33,
      roughness: 0.4,
      metalness: 0.8
    });

    // Perimeter horizontal beams
    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.09, 0.09), frameMat);
    topBeam.position.set(0, 2.95, 0);
    this.portalGroup.add(topBeam);

    const midBeam = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.07, 0.09), frameMat);
    midBeam.position.set(0, 1.8, 0);
    this.portalGroup.add(midBeam);

    const botBeam = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.11, 0.12), frameMat);
    botBeam.position.set(0, 0.15, 0);
    this.portalGroup.add(botBeam);

    // Vertical metal mullions
    [-2.0, -1.0, 0, 1.0, 2.0].forEach((vx) => {
      const vCol = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.9, 0.09), frameMat);
      vCol.position.set(vx, 1.5, 0);
      this.portalGroup.add(vCol);
    });

    // 4. Glass Entrance Panels (transparent glass with warm glow behind)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x141822,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.82,
      transparent: true,
      opacity: 0.85
    });

    const glassPanelGeo = new THREE.PlaneGeometry(4.9, 2.85);
    const glassPanel = new THREE.Mesh(glassPanelGeo, glassMat);
    glassPanel.position.set(0, 1.5, -0.02);
    this.portalGroup.add(glassPanel);

    // 5. Sliding Glass Doors (Left & Right)
    const doorGeo = new THREE.BoxGeometry(0.85, 2.3, 0.04);
    this.doorLeft = new THREE.Mesh(doorGeo, glassMat);
    this.doorLeft.position.set(-0.46, 1.25, 0.03);
    this.portalGroup.add(this.doorLeft);

    this.doorRight = new THREE.Mesh(doorGeo, glassMat);
    this.doorRight.position.set(0.46, 1.25, 0.03);
    this.portalGroup.add(this.doorRight);

    // Designer Handle matching entance-forward.svg
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xd0d0d0,
      metalness: 0.9,
      roughness: 0.2
    });
    const handleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.7, 8);
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    handleMesh.position.set(0.38, 0, 0.04);
    this.doorLeft.add(handleMesh);

    // 6. Cascading Golden Fairy Lights (hanging behind the glass)
    this.buildFairyLights();

    // 7. Inner side wall connecting to left arch with fairy lights
    const sideWallGeo = new THREE.BoxGeometry(0.2, 2.9, 2.3);
    const sideWall = new THREE.Mesh(sideWallGeo, this.stoneMat);
    sideWall.position.set(-2.5, 1.55, 1.15);
    this.portalGroup.add(sideWall);

    this.buildingGroup.add(this.portalGroup);
  }

  /**
   * Sparkling golden fairy lights curtain (vertical garland strings)
   */
  buildFairyLights() {
    const stringCount = 28;
    const beadsPerString = 24;
    const totalBeads = stringCount * beadsPerString;

    const beadGeo = new THREE.SphereGeometry(0.032, 6, 6);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xffe888,
      emissive: 0xffaa20,
      emissiveIntensity: 4.5,
      roughness: 0.1
    });

    this.fairyLights = new THREE.InstancedMesh(beadGeo, beadMat, totalBeads);
    const dummy = new THREE.Object3D();
    let idx = 0;

    const widthSpan = 4.6;
    const heightSpan = 2.4;

    for (let s = 0; s < stringCount; s++) {
      const sx = -widthSpan * 0.5 + (s / (stringCount - 1)) * widthSpan;
      // Skip doorway center slightly so path through door is clear
      if (Math.abs(sx) < 0.42) continue;

      for (let b = 0; b < beadsPerString; b++) {
        const sy = 2.8 - (b / beadsPerString) * heightSpan;
        const sz = -0.15 + (Math.random() - 0.5) * 0.06;

        dummy.position.set(sx + (Math.random() - 0.5) * 0.025, sy, sz);
        const scale = 0.8 + Math.random() * 0.5;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();

        this.fairyLights.setMatrixAt(idx++, dummy.matrix);
      }
    }

    this.fairyLights.instanceMatrix.needsUpdate = true;
    this.portalGroup.add(this.fairyLights);
  }

  /**
   * Build Sloped Wedge Roof connecting both facades
   */
  buildWedgeRoof() {
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x222225,
      roughness: 0.88,
      metalness: 0.12,
      side: THREE.DoubleSide
    });

    // 3D coordinates of the sloping roof wedge:
    // P0: Peak at front corner (0, 6.48, 0)
    // P1: Right facade back edge (10.15, 3.8, -5.40) [length 11.5 at angle +28°]
    // P2: Back interior corner (4.75, 2.4, -15.55)
    // P3: Left facade back edge (-5.40, 3.8, -10.15) [length 11.5 at angle +118°]
    const roofGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Triangle 1 (right slope)
      0.0, 6.48, 0.0,
      10.15, 3.8, -5.40,
      4.75, 2.4, -15.55,

      // Triangle 2 (left slope)
      0.0, 6.48, 0.0,
      4.75, 2.4, -15.55,
      -5.40, 3.8, -10.15
    ]);
    roofGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    roofGeo.computeVertexNormals();

    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.castShadow = true;
    roofMesh.receiveShadow = true;
    this.buildingGroup.add(roofMesh);
  }

  /**
   * Build Low-Poly Faceted Trees matching sketch.png
   * Prominently framed on the left and right sides
   */
  buildTrees() {
    const treeGroup = new THREE.Group();

    // Shared materials
    const lightBarkMat = new THREE.MeshStandardMaterial({
      color: 0xd8c6b2, // Light wood bark from sketch
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true
    });

    const darkBarkMat = new THREE.MeshStandardMaterial({
      color: 0x9e6c46, // Warm cedar bark for background tree
      roughness: 0.8,
      flatShading: true
    });

    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x6e9162, // Vibrant mossy grass base
      roughness: 0.85,
      flatShading: true
    });

    const foliagePalette = [
      0x7a9f79, // Sage green
      0x89ad86, // Light olive
      0x648663, // Deep forest
      0x96ba93  // Mint moss
    ];

    const createFacetedTree = (config) => {
      const tree = new THREE.Group();

      // 1. Grass pedestal mound
      const moundGeo = new THREE.CylinderGeometry(config.radius * 0.95, config.radius * 1.05, 0.4, 14);
      const mound = new THREE.Mesh(moundGeo, grassMat);
      mound.position.y = 0.2;
      mound.receiveShadow = true;
      tree.add(mound);

      // Low poly grass blades tufts
      const bladeGeo = new THREE.ConeGeometry(0.05, 0.3, 4);
      for (let g = 0; g < 22; g++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * config.radius * 0.75;
        const blade = new THREE.Mesh(bladeGeo, grassMat);
        blade.position.set(Math.cos(angle) * dist, 0.48, Math.sin(angle) * dist);
        blade.rotation.x = (Math.random() - 0.5) * 0.4;
        blade.rotation.z = (Math.random() - 0.5) * 0.4;
        tree.add(blade);
      }

      // 2. Faceted Trunk with branches (scaled tall to reach 2nd floor height)
      const trunkMat = config.darkBark ? darkBarkMat : lightBarkMat;
      const trunkHeight = config.height || 4.8;

      // Lower trunk (7 radial segments for faceted low-poly look)
      const lowerGeo = new THREE.CylinderGeometry(0.32, 0.58, trunkHeight * 0.58, 7);
      const lowerTrunk = new THREE.Mesh(lowerGeo, trunkMat);
      lowerTrunk.position.y = (trunkHeight * 0.58) / 2 + 0.35;
      lowerTrunk.rotation.y = 0.4;
      lowerTrunk.castShadow = true;
      tree.add(lowerTrunk);

      // Branch 1 (angled left)
      const b1Geo = new THREE.CylinderGeometry(0.18, 0.3, trunkHeight * 0.52, 6);
      const b1 = new THREE.Mesh(b1Geo, trunkMat);
      b1.position.set(-0.55, trunkHeight * 0.58 + 0.65, 0.15);
      b1.rotation.z = 0.55;
      b1.rotation.y = 0.2;
      b1.castShadow = true;
      tree.add(b1);

      // Branch 2 (angled right)
      const b2Geo = new THREE.CylinderGeometry(0.16, 0.28, trunkHeight * 0.48, 6);
      const b2 = new THREE.Mesh(b2Geo, trunkMat);
      b2.position.set(0.6, trunkHeight * 0.58 + 0.6, -0.15);
      b2.rotation.z = -0.58;
      b2.rotation.y = -0.3;
      b2.castShadow = true;
      tree.add(b2);

      // 3. Faceted Foliage Clusters (IcosahedronGeometry with detail 1 + flatShading)
      config.clusters.forEach((c, idx) => {
        const folGeo = new THREE.IcosahedronGeometry(c.r, 1);
        const folMat = new THREE.MeshStandardMaterial({
          color: foliagePalette[idx % foliagePalette.length],
          roughness: 0.85,
          metalness: 0.05,
          flatShading: true
        });
        const folMesh = new THREE.Mesh(folGeo, folMat);
        folMesh.position.set(c.x, c.y, c.z);
        folMesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        folMesh.castShadow = true;
        tree.add(folMesh);
      });

      tree.position.set(config.x, 0, config.z);
      tree.scale.set(config.s, config.s, config.s);
      return tree;
    };

    // Tree 1: Right Foreground (hero tree beside the right facade from sketch.png)
    treeGroup.add(createFacetedTree({
      x: 5.8,
      z: 2.2,
      s: 1.2,
      radius: 2.1,
      height: 4.8,
      darkBark: false,
      clusters: [
        { x: -0.8, y: 4.2, z: 0.5, r: 1.25 },
        { x: 0.7, y: 4.1, z: -0.4, r: 1.35 },
        { x: -0.1, y: 5.1, z: 0.1, r: 1.6 },
        { x: -1.3, y: 4.6, z: -0.4, r: 1.1 },
        { x: 1.1, y: 4.9, z: 0.4, r: 1.2 },
        { x: 0.1, y: 6.0, z: -0.1, r: 1.4 }
      ]
    }));

    // Tree 2: Left Midground (framing the left facade from sketch.png)
    treeGroup.add(createFacetedTree({
      x: -4.8,
      z: 1.8,
      s: 1.1,
      radius: 1.9,
      height: 4.4,
      darkBark: false,
      clusters: [
        { x: -0.7, y: 3.8, z: 0.3, r: 1.15 },
        { x: 0.6, y: 3.8, z: -0.3, r: 1.25 },
        { x: 0.0, y: 4.8, z: 0.0, r: 1.5 },
        { x: -1.0, y: 4.3, z: -0.4, r: 1.0 },
        { x: 0.8, y: 4.6, z: 0.4, r: 1.1 }
      ]
    }));

    // Tree 3: Left Background (framing the far left background from sketch.png)
    treeGroup.add(createFacetedTree({
      x: -7.5,
      z: -2.2,
      s: 1.15,
      radius: 2.0,
      height: 4.6,
      darkBark: true,
      clusters: [
        { x: -0.5, y: 4.0, z: 0.3, r: 1.2 },
        { x: 0.6, y: 4.1, z: -0.3, r: 1.3 },
        { x: 0.0, y: 5.2, z: 0.0, r: 1.55 },
        { x: -1.1, y: 4.7, z: -0.4, r: 1.05 },
        { x: 0.9, y: 5.0, z: 0.5, r: 1.15 }
      ]
    }));

    this.scene.add(treeGroup);
  }

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

    this.mouse.targetX = nx * 0.6;
    this.mouse.targetY = ny * 0.3;
  }

  /**
   * Cinematic Camera Flight into the Entrance Doors
   * Smoothly navigates into the warm glowing entrance archway
   */
  flyIntoEntrance(onComplete) {
    this.isTransitioning = true;

    const timeline = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Camera dives down & forward towards the entrance arch threshold
    timeline.to(this.camera.position, {
      x: 2.17,
      y: 1.75,
      z: -2.23,
      duration: 2.0,
      ease: 'power3.inOut'
    }, 0);

    // Look directly into the opening entrance doors
    const targetObj = { x: 1.0, y: 2.4, z: -1.0 };
    timeline.to(targetObj, {
      x: 0.77,
      y: 1.65,
      z: -4.87,
      duration: 2.0,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.camera.lookAt(targetObj.x, targetObj.y, targetObj.z);
      }
    }, 0);

    // 2. Sliding doors open apart smoothly before camera passes through
    if (this.doorLeft && this.doorRight) {
      timeline.to(this.doorLeft.position, {
        x: -1.35,
        duration: 1.2,
        ease: 'power2.out'
      }, 0.9);

      timeline.to(this.doorRight.position, {
        x: 1.35,
        duration: 1.2,
        ease: 'power2.out'
      }, 0.9);
    }

    // 3. Fairy lights pulse with warm golden bloom
    timeline.to(this.archLight, {
      intensity: 14,
      distance: 26,
      duration: 0.8,
      ease: 'power2.in'
    }, 1.2);

    // 4. Camera continues gliding straight inside through the open doors
    timeline.to(this.camera.position, {
      x: 0.77,
      y: 1.65,
      z: -4.87,
      duration: 1.0,
      ease: 'power2.in'
    }, 1.8);

    // 5. Trigger portal flash overlay
    const portalFlash = document.getElementById('portal-flash');
    if (portalFlash) {
      timeline.to(portalFlash, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.in'
      }, 2.0);

      timeline.to(portalFlash, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, 2.5);
    }
  }

  /**
   * Return camera back to the exterior street view
   */
  flyBackToStreet(onComplete) {
    this.isTransitioning = true;

    const timeline = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        if (onComplete) onComplete();
      }
    });

    timeline.to(this.camera.position, {
      x: this.initialCamPos.x,
      y: this.initialCamPos.y,
      z: this.initialCamPos.z,
      duration: 2.0,
      ease: 'power3.out'
    }, 0);

    const targetObj = { x: 0.77, y: 1.65, z: -4.87 };
    timeline.to(targetObj, {
      x: this.initialTarget.x,
      y: this.initialTarget.y,
      z: this.initialTarget.z,
      duration: 2.0,
      ease: 'power3.out',
      onUpdate: () => {
        this.camera.lookAt(targetObj.x, targetObj.y, targetObj.z);
      }
    }, 0);

    // Close doors & restore lights
    if (this.doorLeft && this.doorRight) {
      timeline.to(this.doorLeft.position, { x: -0.46, duration: 1.0 }, 0.4);
      timeline.to(this.doorRight.position, { x: 0.46, duration: 1.0 }, 0.4);
    }
    timeline.to(this.archLight, { intensity: 4.5, distance: 14, duration: 1.0 }, 0.4);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Smooth Mouse Damping for Parallax
    if (!this.isTransitioning) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      this.camera.position.x = this.initialCamPos.x + this.mouse.x;
      this.camera.position.y = this.initialCamPos.y + this.mouse.y;
      this.camera.lookAt(this.initialTarget);
    }

    // Twinkle animation for fairy lights
    if (this.fairyLights) {
      const time = Date.now() * 0.003;
      this.fairyLights.rotation.y = Math.sin(time * 0.4) * 0.006;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
