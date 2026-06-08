const FABRIC_TEXTURES = [
  '/design/fabric/Fabric-08.png',
  '/design/fabric/Fabric-09.png',
  '/design/fabric/Fabric-20.png',
  '/design/fabric/Fabric-22.png',
  '/design/fabric/Fabric-23.png',
  '/design/fabric/Fabric-25.png',
];

function getFabricTexture(seed: string) {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return FABRIC_TEXTURES[hash % FABRIC_TEXTURES.length];
}

export default getFabricTexture;
