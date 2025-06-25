import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

const SpiderModel = () => {
  const { scene } = useGLTF("/spider1.glb");
  return <primitive object={scene} scale={2} position={[0, 0, 0]} />;
};

const SpiderMan3D = () => {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={1} />
<directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <SpiderModel />
        </Suspense>
        <Stars />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default SpiderMan3D;
