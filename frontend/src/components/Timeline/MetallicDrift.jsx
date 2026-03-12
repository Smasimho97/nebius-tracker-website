import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MetallicDrift() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth || window.innerWidth;
    const H = mount.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8edf2);

    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 500);
    const TILT = 10 * Math.PI / 180;
    const DIST = 24;
    camera.position.set(0, DIST * Math.cos(TILT), DIST * Math.sin(TILT));
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xd8e8f8, 0.6));

    const key = new THREE.DirectionalLight(0xc8dfff, 0.9);
    key.position.set(-12, 22, 15);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xc8ddf8, 0.4);
    fill.position.set(2, 10, -10);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xe8f4ff, 0.3);
    rim.position.set(2, 6, -20);
    scene.add(rim);

    const drift1 = new THREE.PointLight(0xc0d8ff, 1.4, 45);
    scene.add(drift1);

    const drift2 = new THREE.PointLight(0xd0e8ff, 0.8, 40);
    scene.add(drift2);

    const geo = new THREE.PlaneGeometry(60, 60, 400, 400);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const count = pos.count;
    const bx = new Float32Array(count);
    const bz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      bx[i] = pos.getX(i);
      bz[i] = pos.getZ(i);
    }

    const colors = new Float32Array(count * 3);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xbbdbf9),
      metalness: 0.88,
      roughness: 0.22,
      vertexColors: true,
    });
    scene.add(new THREE.Mesh(geo, mat));

    scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: 0x90a9bf,
      wireframe: true,
      transparent: true,
      opacity: 0.035,
    })));

    const WAVES = [
{ dx:  1.0, dz:  0.2, freq: 0.2,  amp: 0.01, speed: 0.16 }, // slow big roll
{ dx: -0.3, dz:  1.0, freq: 1.2,  amp: 0.01, speed: 0.20 }, // fast small ripple
{ dx:  0.7, dz: -0.7, freq: 2.5,  amp: 0.01, speed: 0.25 }, // very fast tiny
    ];

    const MAX_AMP = WAVES.reduce((acc, w) => acc + w.amp, 0);
    const baseColor = new THREE.Color(0xbbdbf9);
    const peakColor = new THREE.Color(0xc8e0f5);

    function waveH(x, z, t) {
      let y = 0;
      for (const w of WAVES) {
        const len = Math.sqrt(w.dx * w.dx + w.dz * w.dz);
        y += Math.sin((x * w.dx / len + z * w.dz / len) * w.freq + t * w.speed) * w.amp;
      }
      return y;
    }

    const clock = new THREE.Clock();
    let t = 0;
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      t += clock.getDelta();

      drift1.position.set(
        Math.sin(t * 0.11) * 16 + Math.cos(t * 0.07) * 7, 14,
        Math.cos(t * 0.09) * 13 + Math.sin(t * 0.05) * 5
      );
      drift2.position.set(
        Math.sin(t * 0.08 + 2.1) * 12 + Math.cos(t * 0.13) * 5, 10,
        Math.cos(t * 0.06 + 1.4) * 14 + Math.sin(t * 0.10) * 6
      );

      for (let i = 0; i < count; i++) {
        const y = waveH(bx[i], bz[i], t);
        pos.setY(i, y);
        const f = Math.max(y / MAX_AMP, 0);
        colors[i * 3]     = baseColor.r + (peakColor.r - baseColor.r) * f;
        colors[i * 3 + 1] = baseColor.g + (peakColor.g - baseColor.g) * f;
        colors[i * 3 + 2] = baseColor.b + (peakColor.b - baseColor.b) * f;
      }

      pos.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      geo.computeVertexNormals();
      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      const nw = mount.clientWidth || window.innerWidth;
      const nh = mount.clientHeight || window.innerHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (mount.contains(canvas)) mount.removeChild(canvas);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}