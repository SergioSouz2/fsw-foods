import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";



interface  DeliveryInfoProps{
   restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({restaurant}:DeliveryInfoProps) => {
   return ( 
      < >
         <Card className="flex justify-around py-3 mt-6 px-5">
            {/* CUSTO */}
            <div className="flex flex-col items-center">
               <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="text-xs">Entrega</span>
                  <BikeIcon size={14}/>
               </div>
               
               {
                  Number(restaurant.deliveryFee) > 0 ? (
                     <p className="text-xs font-semibold">
                        {formatCurrency(Number(restaurant.deliveryFee))}
                     </p>
                  ) : (
                     <p className="text-xs font-semibold">Grátis</p>
                  )
               }
            </div>
            
            {/* TEMPO */}
            <div className="flex flex-col items-center">
               <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="text-xs">Entrega</span>
                  <TimerIcon size={14}/>
               </div>
               
               <span className="text-xs text-muted-foreground">
                  {restaurant.deliveryTimeMinutes} min
               </span>
            </div>
         </Card>
      </>

   );
}

export default DeliveryInfo;