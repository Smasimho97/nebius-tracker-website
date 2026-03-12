import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RoilingBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.outputEncoding = THREE.LinearEncoding;
    renderer.toneMapping = THREE.NoToneMapping;

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(3/255, 6/255, 12/255);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 20, 0);
    camera.lookAt(0, 0, 0);

    // ── Geometry ───────────────────────────────────────────────
    const SEGS = 300;
    const SIZE = 80;
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGS, SEGS);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const count = pos.count;

    const baseX = new Float32Array(count);
    const baseZ = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      baseX[i] = pos.getX(i);
      baseZ[i] = pos.getZ(i);
    }

    // vertex color buffer
    const colors = new Float32Array(count * 3);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // solid mesh — height colored
    const solidMat = new THREE.MeshBasicMaterial({ vertexColors: true });
    scene.add(new THREE.Mesh(geo, solidMat));

    // wireframe overlay — same geometry
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0a1828,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    scene.add(new THREE.Mesh(geo, wireMat));

    // ── Waves ──────────────────────────────────────────────────
    const waves = [
      { dirX:  1.0, dirZ:  0.2, freq: 0.38, amp: 0.65, speed: 0.42 },
      { dirX: -0.3, dirZ:  1.0, freq: 0.50, amp: 0.48, speed: 0.35 },
      { dirX:  0.7, dirZ: -0.7, freq: 0.68, amp: 0.28, speed: 0.58 },
      { dirX: -0.9, dirZ: -0.3, freq: 0.30, amp: 0.55, speed: 0.28 },
      { dirX:  0.4, dirZ:  0.8, freq: 0.85, amp: 0.18, speed: 0.80 },
      { dirX:  0.5, dirZ:  0.5, freq: 0.18, amp: 0.75, speed: 0.20 },
    ];

    function waveHeight(x, z, t) {
      let y = 0;
      for (const w of waves) {
        const len = Math.sqrt(w.dirX * w.dirX + w.dirZ * w.dirZ);
        y += Math.sin((x * w.dirX / len + z * w.dirZ / len) * w.freq + t * w.speed) * w.amp;
      }
      return y;
    }



    const trough = { r: 5/255,  g: 10/255, b: 22/255 };
    const mid    = { r: 2/255,  g: 5/255,  b: 12/255 };
    const peak   = { r: 0/255,  g: 1/255,  b: 4/255  };

    function lerp(a, b, t) {
      return { r: a.r+(b.r-a.r)*t, g: a.g+(b.g-a.g)*t, b: a.b+(b.b-a.b)*t };
    }

    function sharpen(n, exp) {
      return Math.sign(n) * Math.pow(Math.abs(n), exp);
    }

    const MAX_AMP = waves.reduce((s, w) => s + w.amp, 0);

    let t = 0;
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.009;

      const col = geo.attributes.color;

      for (let i = 0; i < count; i++) {
        const y = waveHeight(baseX[i], baseZ[i], t);
        pos.setY(i, y);

        const n = Math.max(-1, Math.min(1, y / (MAX_AMP * 1.1)));
        const sn = sharpen(n, 0.6);

        const c = sn >= 0
          ? lerp(mid, peak, sn)
          : lerp(trough, mid, 1 + sn);

        col.setXYZ(i, c.r, c.g, c.b);
      }

      pos.needsUpdate = true;
      col.needsUpdate = true;
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
      solidMat.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}