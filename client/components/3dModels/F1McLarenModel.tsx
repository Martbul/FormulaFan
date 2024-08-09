/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 f1McLarenModel.glb 
Author: Excalibur (https://sketchfab.com/excalibur)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/f1-2021-mclaren-mcl35m-967ecec37468412083c40c62b3d7234d
Title: F1 2021 McLaren MCL35M
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function F1McLarenModel(props) {
  const { nodes, materials } = useGLTF(
    "/models/MclarenF12021/f1McLarenModel-transformed.glb",
  );
  // const { nodes, materials } = useGLTF('../../../../client/public/models/MclarenF12021/f1McLarenModel.glb')
  return (
    <group {...props} dispose={null} scale={0.8}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.mcl35m_c_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        material={materials.mcl35m_h_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.mcl35m_m_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.mcl35m_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.rim_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.st_wheel_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8.geometry}
        material={materials.tread_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.tyrewall_png}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

// useGLTF.preload('../../../client/public/models/MclarenF12021/f1McLarenModel.glb');
useGLTF.preload("/models/MclarenF12021/f1McLarenModel-transformed.glb");
