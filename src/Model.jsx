import { useEffect, useState, forwardRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function Model(props, ref) {
  const [model, setModel] = useState(null)

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      '/rim.glb',
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        setModel(gltf.scene)
        // Wywołaj callback onLoad gdy model się załaduje
        if (props.onLoad) {
          props.onLoad()
        }
      },
      undefined,
      (error) => console.error('Błąd ładowania modelu:', error)
    )
  }, [])

  if (!model) return null

  return (
    <primitive
      ref={ref}
      object={model}
      scale={0.017}
      position={[2.4, -1, 0]}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}

export default forwardRef(Model)
