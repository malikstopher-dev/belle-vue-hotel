/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '@react-three/drei' {
  export const Float: React.ComponentType<any>;
  export const MeshDistortMaterial: React.ComponentType<any>;
  export const Environment: React.ComponentType<any>;
  export const OrbitControls: React.ComponentType<any>;
  export const Text: React.ComponentType<any>;
  export const Html: React.ComponentType<any>;
  export const Sparkles: React.ComponentType<any>;
  export const Stars: React.ComponentType<any>;
}

declare module '@react-three/fiber' {
  export const Canvas: React.ComponentType<any>;
  export function useFrame(callback: (state: any) => void): void;
  export function useThree(): any;
}

declare module 'lenis' {
  class Lenis {
    constructor(options?: Record<string, any>);
    raf(time: number): void;
    destroy(): void;
  }
  export default Lenis;
}
