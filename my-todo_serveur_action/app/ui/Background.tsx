import Image from "next/image";

export default function Background() {
  return (
    <Image
        alt="Arrière-plan avec neige"
        src="/christmas-background.jpg"
        quality={100}
        fill
        sizes="100vw"
        style={{
            objectFit: 'cover',
            zIndex: '-5'
        }}
    />
  )
}
