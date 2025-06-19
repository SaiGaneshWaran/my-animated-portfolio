'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

const PhotoSphere = () => {
  const meshRef = useRef<Mesh>(null!);
  const [isHovered, setIsHovered] = useState(false);

  // Load your profile picture as a texture.
  const texture = useTexture('/Images/my photo.jpg');

  // Gentle auto-rotation
  useFrame((state, delta) => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[2.2, 64, 64]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={isHovered ? 1.08 : 1}
    >
      <meshStandardMaterial 
        map={texture} 
        metalness={0.3}
        roughness={0.6}
      />
    </Sphere>
  );
};

const Scene3D = () => (
  <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1.5} color="#1FD6D6" />
    <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />

    <PhotoSphere />

    <OrbitControls 
      enableZoom={false} 
      enablePan={false}
      autoRotate={true}
      autoRotateSpeed={0.5}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />
  </Canvas>
);

export default Scene3D;