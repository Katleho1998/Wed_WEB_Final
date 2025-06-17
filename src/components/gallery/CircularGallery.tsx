import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Geometry, Program, Mesh, Texture } from 'ogl';

// Import all couple images
import img1 from '../../assets/Couple/image 1.jpg';
import img2 from '../../assets/Couple/image 2.jpg';
import img3 from '../../assets/Couple/image 3.jpg';
import img4 from '../../assets/Couple/image 4.jpg';
import img5 from '../../assets/Couple/image 5.jpg';
import img6 from '../../assets/Couple/image 6.jpg';
import img7 from '../../assets/Couple/image 7.jpg';

const COUPLE_IMAGES = [img1, img2, img3, img4, img5, img6, img7];

interface CircularGalleryProps {
  bend?: number;
  textColor?: string;
  borderRadius?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const meshesRef = useRef<Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;
    
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    rendererRef.current = renderer;

    // Setup camera
    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Create scene
    const scene = new Transform();
    sceneRef.current = scene;

    // Resize handler
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };

    window.addEventListener('resize', resize);
    resize();

    // Create geometry for image planes
    const geometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array([
        -1, -1, 0,
         1, -1, 0,
         1,  1, 0,
        -1,  1, 0,
      ])},
      uv: { size: 2, data: new Float32Array([
        0, 1,
        1, 1,
        1, 0,
        0, 0,
      ])},
      index: { data: new Uint16Array([0, 1, 2, 0, 2, 3]) }
    });

    // Vertex shader
    const vertex = `
      attribute vec3 position;
      attribute vec2 uv;
      
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uBend;
      
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        
        vec3 pos = position;
        
        // Apply bend effect
        float angle = pos.x * uBend;
        pos.x = sin(angle) * 2.0;
        pos.z = cos(angle) * 2.0 - 2.0;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment shader
    const fragment = `
      precision highp float;
      
      uniform sampler2D uTexture;
      uniform float uBorderRadius;
      
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        
        // Apply border radius
        vec2 center = vec2(0.5);
        vec2 dist = abs(uv - center);
        float radius = uBorderRadius;
        
        vec2 rounded = max(dist - vec2(0.5 - radius), 0.0) / radius;
        float alpha = 1.0 - smoothstep(0.0, 1.0, length(rounded));
        
        vec4 color = texture2D(uTexture, uv);
        gl_FragColor = vec4(color.rgb, color.a * alpha);
      }
    `;

    // Load textures and create meshes
    const loadImages = async () => {
      const meshes: Mesh[] = [];
      
      for (let i = 0; i < COUPLE_IMAGES.length; i++) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = COUPLE_IMAGES[i];
        });

        const texture = new Texture(gl, {
          image: img,
          generateMipmaps: false,
        });

        const program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            uTexture: { value: texture },
            uBend: { value: bend },
            uBorderRadius: { value: borderRadius }
          },
          transparent: true,
          cullFace: null,
        });

        const mesh = new Mesh(gl, { geometry, program });
        
        // Position images in a circle
        const angle = (i / COUPLE_IMAGES.length) * Math.PI * 2;
        const radius = 3;
        mesh.position.set(
          Math.sin(angle) * radius,
          0,
          Math.cos(angle) * radius - 2
        );
        mesh.rotation.y = -angle;
        mesh.scale.set(1.2, 1.6, 1);
        
        mesh.setParent(scene);
        meshes.push(mesh);
      }
      
      meshesRef.current = meshes;
    };

    loadImages();

    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate the entire scene
      if (scene) {
        scene.rotation.y = time * 0.0005;
      }
      
      // Individual mesh animations
      meshesRef.current.forEach((mesh, i) => {
        if (mesh) {
          mesh.rotation.z = Math.sin(time * 0.001 + i) * 0.1;
        }
      });
      
      renderer.render({ scene, camera });
    };

    animate(0);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      if (camera) {
        camera.position.x = mouseX * 0.5;
        camera.position.y = mouseY * 0.5;
        camera.lookAt([0, 0, 0]);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      
      // Cleanup WebGL resources
      meshesRef.current.forEach(mesh => {
        if (mesh.program) {
          gl.deleteProgram(mesh.program.program);
        }
      });
      
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      meshesRef.current = [];
    };
  }, [bend, borderRadius]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        overflow: 'hidden'
      }}
    />
  );
};

export default CircularGallery;