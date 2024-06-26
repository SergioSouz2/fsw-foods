import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
   restaurant: Restaurant
   className?: string
}


const RestaurantItem = ({restaurant,className}:RestaurantItemProps) => {
   return (
      <Link className={cn('min-w-[266px] max-w-[266px]', className)} href={`/restaurants/${restaurant.id}`}>
         <div className="w-full space-y-3" >
            <div className="w-full h-[136px] relative">
               <Image 
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="object-cover rounded-lg"
                  fill
                  />
               <div className="flex gap-[2px] items-center absolute top-2 left-2 bg-white py-[2px] px-2 rounded-full">
                  <StarIcon size={12} className="fill-yellow-400 text-yellow-400"/>
                  <span className="font-semibold text-xs ">5.0</span>
               </div>

               <Button size={"icon"} className="absolute top-2 right-2 bg-gray-700 h-7 w-7 rounded-full ">
                  <HeartIcon size={16} className="fill-white" />
               </Button>


            </div>
            <div>
               <h3 className="font-semibold text-sm">{restaurant.name}</h3>
               <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                     <BikeIcon size={12} className="text-primary"/>
                     <span className="text-xs text-muted-foreground">{
                        Number(restaurant.deliveryFee) == 0 
                        ? "Entrega grátis" 
                        : formatCurrency(Number(restaurant.deliveryFee))}
                     </span>
                  </div>

                  <div className="flex gap-1 items-center">
                     <TimerIcon size={12} className="text-primary"/>
                     <span className="text-xs text-muted-foreground">
                        {restaurant.deliveryTimeMinutes} min
                     </span>
                  </div>

               </div>
            </div>
         </div>
      </Link>
   );
}
 
export default RestaurantItem;