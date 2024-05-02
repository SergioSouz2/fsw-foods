import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

import ProductList from "@/app/_components/product-list";
import RestaurantsImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";

interface RestaurantsPageProps {
   params: {
      id: string;
   }
}

const RestaurantPage = async ({params:{id}}:RestaurantsPageProps) => {

   const restaurant = await db.restaurant.findUnique({
      where:{
         id,
      },
      include:{
         categories: {
            orderBy:{
               createdAt: 'desc'
            },
            include:{
               product: {
                  where:{
                     restaurantId: id
                  },
                  include:{
                     restaurant:{
                        select:{
                           name:true
                        }
                     }
                  }
               }
            }
         },
         product: {
            take:10,
            include:{
               restaurant:{
                  select:{
                     name:true
                  }
               }
            }
         }
      }
   })

   if(!restaurant){
      return notFound();
   }

   return ( 
      <div>
         <RestaurantsImage restaurant={restaurant}/>
         <RestaurantDetails restaurant={restaurant}/>

         <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5 mt-3">
            {
               restaurant.categories.map((category) => (
                  <div key={category.id} className="bg-[#F4F4F4] min-w-[167px]  text-center rounded-lg">
                     <span className="text-muted-foreground text-xs">{category.name}</span>
                  </div>
               ))
            }
         </div>

         <div className="mt-6 space-y-4">
            {/* TODO: mostrar produtos mais pedidos quando implementar realização de pedido*/}
            <h2 className="font-semibold px-5">Mais Pedidos</h2>
            <ProductList products={restaurant.product}/>
         </div>

         {
            restaurant.categories.map((category) =>(
               <div className="mt-6 mb-6 space-y-4" key={category.id}>
                  {/* TODO: mostrar produtos mais pedidos quando implementar realização de pedido*/}
                  <h2 className="font-semibold px-5">{category.name}</h2>
                  <ProductList products={category.product}/>
               </div>
            ))
         }

      </div>
   );
}

export default RestaurantPage;