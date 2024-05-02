"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@prisma/client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";


interface ProductImageProps{
   product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductImage = ({product}:ProductImageProps) => {

   const router = useRouter()

   const handleBackClick = () => router.back()

   return (  
      <div className="relative w-full h-[360px]">
      <Image 
         src={product?.imageUrl} 
         alt={product.name} 
         className="object-cover"
         fill 
      />
      <Button 
         onClick={handleBackClick}
         className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white" 
         size={"icon"} 
      >
         <ChevronLeftIcon />
      </Button>
   </div>
   );
}

export default ProductImage;