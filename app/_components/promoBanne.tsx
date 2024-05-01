import Image, { ImageProps } from "next/image"



const PromoBanne = ({alt, ...prop}: ImageProps) => {
   return (
      <Image  
         alt={alt}
         height={0}
         width={0}
         className="w-full h-auto object-contain"
         sizes="100vw"
         quality={100}
         {...prop}
      />
   )
}

export default PromoBanne