import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function UnderDevelopment() {
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        let blinkId;
        const id = setTimeout(() => {
            blinkId = setInterval(() => setBlink(b => !b), 530);
        }, 2400);
        return () => {
            clearTimeout(id);
            clearInterval(blinkId);
        };
    }, []);

    return (
        <div style={{
            position: "fixed",
            bottom: "2rem",
            left: "2rem",
            zIndex: 10,
            pointerEvents: "none",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 400,
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "lowercase",
            color: "rgba(30, 50, 70, 0.4)",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
        }}>
            <div style={{
                opacity: 0,
                animation: `fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards`
            }}>
                <span style={{ color: "rgba(30,50,70,0.25)", marginRight: "0.5rem" }}>//</span>
                <span style={{ opacity: blink ? 0.4 : 0, transition: "opacity 0.1s" }}>▌</span>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default function Placeholder() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const w = mount.clientWidth;
        const h = mount.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xe8edf2);
        scene.fog = new THREE.Fog(0xe8edf2, 18, 38);

        const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
        camera.position.set(0, 6, 14);
        camera.lookAt(0, 0, 0);

        const SEGMENTS = 800;
        const SIZE = 60;
        const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
        geo.rotateX(-Math.PI / 2);

        const pos = geo.attributes.position;
        const baseX = new Float32Array(pos.count);
        const baseZ = new Float32Array(pos.count);
        for (let i = 0; i < pos.count; i++) {
            baseX[i] = pos.getX(i);
            baseZ[i] = pos.getZ(i);
        }

        const mat = new THREE.MeshPhongMaterial({
            color: 0xd0dde8,
            specular: 0xffffff,
            shininess: 60,
            flatShading: false,
            side: THREE.FrontSide,
            wireframe: false,
        });
        scene.add(new THREE.Mesh(geo, mat));

        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xb8cad8,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        });
        scene.add(new THREE.Mesh(geo, wireMat));

        scene.add(new THREE.AmbientLight(0xffffff, 0.55));
        const sun = new THREE.DirectionalLight(0xffffff, 0.9);
        sun.position.set(5, 10, 8);
        scene.add(sun);
        const fill = new THREE.DirectionalLight(0xc8dff0, 0.4);
        fill.position.set(-8, 4, -6);
        scene.add(fill);

        const waves = [
            { dirX: 1.0,  dirZ: 0.3,  freq: 0.38, amp: 0.55, speed: 0.55 },
            { dirX: -0.4, dirZ: 1.0,  freq: 0.52, amp: 0.4,  speed: 0.42 },
            { dirX: 0.6,  dirZ: -0.8, freq: 0.7,  amp: 0.28, speed: 0.68 },
            { dirX: -0.9, dirZ: -0.4, freq: 0.3,  amp: 0.5,  speed: 0.35 },
            { dirX: 0.2,  dirZ: 0.95, freq: 0.88, amp: 0.18, speed: 0.9  },
        ];

        function waveHeight(x, z, t) {
            let y = 0;
            for (const w of waves) {
                const len = Math.sqrt(w.dirX * w.dirX + w.dirZ * w.dirZ);
                const dx = w.dirX / len;
                const dz = w.dirZ / len;
                y += Math.sin((x * dx + z * dz) * w.freq + t * w.speed) * w.amp;
            }
            return y;
        }

        let t = 0;
        let animId;
        function animate() {
            animId = requestAnimationFrame(animate);
            t += 0.012;
            for (let i = 0; i < pos.count; i++) {
                pos.setY(i, waveHeight(baseX[i], baseZ[i], t));
            }
            pos.needsUpdate = true;
            geo.computeVertexNormals();
            renderer.render(scene, camera);
        }
        animate();

        function onResize() {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>
            <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />
            <UnderDevelopment />
        </>
    );
}