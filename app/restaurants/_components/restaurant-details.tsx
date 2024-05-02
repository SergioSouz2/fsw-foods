import DeliveryInfo from "@/app/_components/delivery-info";
import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";


interface RestaurantDetailsProps{
   restaurant: Prisma.RestaurantGetPayload<{
      include:{

      }
   }>;

}

const RestaurantDetails = ({restaurant}:RestaurantDetailsProps) => {

   return ( 
            
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-[#e7e7e7] py-6">
         {/* RESTAURANTES */}
         <div className="flex justify-between px-5 ">
            <div className="flex items-center gap-[0.375rem] ">
               <div className="relative h-8 w-8">
                  <Image 
                     className="rounded-full object-cover"
                     src={restaurant.imageUrl} 
                     alt={restaurant.name} 
                     fill
                     />
               </div>
               <h1 className="text-xl font-semibold ">{restaurant.name}</h1>
            </div>

            <div className="flex gap-[3px] items-center  bg-foreground py-[2px] px-2 rounded-full text-white">
               <StarIcon size={12} className="fill-yellow-400 text-yellow-400"/>
               <span className="font-semibold text-xs  ">5.0</span>
            </div>
         </div>

         <div className="px-5">
            <DeliveryInfo restaurant={restaurant}/>
         </div>
         
      </div>
   );
}

export default RestaurantDetails;