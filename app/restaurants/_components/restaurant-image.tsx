"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Restaurant } from "@prisma/client";

import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";


interface RestaurantsImageProps{
   restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

const RestaurantsImage = ({restaurant}:RestaurantsImageProps) => {

   const router = useRouter()

   const handleBackClick = () => router.back()

   return (  
      <div className="relative w-full h-[250px]">
      <Image 
         src={restaurant?.imageUrl} 
         alt={restaurant.name} 
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

      <Button size={"icon"} className="absolute top-4 right-4 bg-gray-700 rounded-full ">
         <HeartIcon size={20} className="fill-white" />
      </Button>
   </div>
   );
}

export default RestaurantsImage;