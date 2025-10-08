import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

type CameraControllerProps = {
  target: [number, number, number];
  selectedBody: string;
  distance: number;
};

const CameraController = ({ target, selectedBody, distance }: CameraControllerProps) => {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3(...target));
  const currentOffset = useRef(new Vector3(0, distance * 0.5, distance));

  useEffect(() => {
    targetPosition.current.set(...target);
  }, [target]);

  useFrame(() => {
    // Smoothly interpolate camera position to follow the target
    const targetCameraPos = new Vector3(
      targetPosition.current.x + currentOffset.current.x,
      targetPosition.current.y + currentOffset.current.y,
      targetPosition.current.z + currentOffset.current.z
    );

    camera.position.lerp(targetCameraPos, 0.05);
    
    // Look at the target
    const lookAtTarget = new Vector3().copy(targetPosition.current);
    const currentLookAt = new Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(-1).add(camera.position);
    currentLookAt.lerp(lookAtTarget, 0.05);
    camera.lookAt(currentLookAt);

    // Adjust offset based on distance
    const targetOffset = new Vector3(0, distance * 0.5, distance);
    currentOffset.current.lerp(targetOffset, 0.05);
  });

  return null;
};

export default CameraController;
