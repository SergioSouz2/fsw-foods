"use client";

import Link from "next/link";
import Image from "next/image";

import { Prisma } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

import { computerProductTotalPrice, formatCurrency } from "../_helpers/price";


interface ProductItemProps {
   product : Prisma.ProductGetPayload<{
      include:{
         restaurant: {
            select:{
               name: true
            }
         }
      }
   }>;
}


const ProductItem = ({product}:ProductItemProps) => {

   return (
      <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
         <div 
            className="space-y-8 w-[150px] min-w-[150px]" 
         >
         <div className=" h-[150px] w-full relative">
            <Image 
               src={product.imageUrl} 
               alt={product.name}
               fill
               className="object-cover rounded-lg shadow-md"
            />

            {
               product.discountPercentage && (
                  <div className="flex gap-[2px] items-center absolute top-2 left-2 bg-primary py-[2px] px-2 rounded-full text-white">
                     <ArrowDownIcon size={12}/>
                     <span className="font-semibold text-xs ">{product.discountPercentage}%</span>
                  </div>

               )
            }
         </div>

         <div>
            <h2 className="text-sm truncate">{product.name}</h2>
            <div className="flex gap-1 items-center" >
               <h3 className="font-semibold">
                  {formatCurrency(computerProductTotalPrice(product))}
               </ h3>

               {product.discountPercentage> 0 && (
                  <span className="line-through text-muted-foreground text-xs">
                  {formatCurrency(Number(product.price))}
                  </span>
               )}
            </div>

            <span className=" block text-muted-foreground text-xs">{product.restaurant.name}</span>
         </div>
      </div>
   </Link>

   );
}

export default ProductItem;