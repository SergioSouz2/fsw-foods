"use client"
import { Prisma } from "@prisma/client";
import { useContext, useState } from "react";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import ProductList from "@/app/_components/product-list";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { computerProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { CartContext } from "@/app/_contexte/cart";


interface ProductDetailsProps{
   product: Prisma.ProductGetPayload<{
      include:{
         restaurant: true
      }
   }>;
   complementaryProducts: Prisma.ProductGetPayload<{
      include: {
         restaurant:true;
      }
   }>[];
}

const ProductDetails = ({product,complementaryProducts}:ProductDetailsProps) => {

   const [quantity, setQuantity] = useState(1)
   const [isCartOpen, setIsCartOpen] = useState(false)
   const { addProductToCard, products} = useContext(CartContext)
   console.log(products);

   const handleAddToCardClick = () => {
      addProductToCard(product,quantity )
      setIsCartOpen(true)
   }

   
   const handleIncreaseQuantityClick = () => 
      setQuantity((currentState) => currentState + 1);


   const handleDecreaseQuantityClick = () => 
      setQuantity((currentState) => {
         if(currentState === 1) return 1;
            return currentState - 1
         }
      );

   return ( 
      <>
         <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-background py-6">
            {/* RESTAURANTES */}
            <div className="flex items-center gap-[0.375rem] px-5">
               <div className="relative h-6 w-6">
                  <Image 
                     className="rounded-full object-cover"
                     src={product.restaurant.imageUrl} 
                     alt={product.restaurant.name} 
                     fill
                  />
               </div>
               <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
            </div>

            {/* NOME DO PRODUTO */}
            <h1 className="text-xl font-semibold mb-2 mt-1 px-5">{product.name}</h1>

            {/* PRECO DO PRODUTO E QUANTIDADE */}
            <div className="flex justify-between px-5">
               <div>
                  <div className="flex items-center gap-2">
                     <h2 className="font-semibold text-xl">{formatCurrency(computerProductTotalPrice(product))}</h2>
                     {
                        product.discountPercentage > 0 && (
                           <DiscountBadge product={product}/>
                        )
                     }
                  </div>
                  {
                     product.discountPercentage > 0 && (
                        <p className=" text-sm text-muted-foreground">De: {formatCurrency(Number(product.price))}</p>
                     )
                  }
               </div>
               <div className=" flex gap-3 text-center items-center">
                  <Button 
                     onClick={handleDecreaseQuantityClick}
                     size={"icon"} 
                     variant={"ghost"} 
                     className="border border-solid border-muted-foreground"
                  >
                     <ChevronLeftIcon/>
                  </Button>
                  <span className="w-4">{quantity}</span>
                  
                  <Button size={"icon"} onClick={handleIncreaseQuantityClick}>
                     <ChevronRightIcon/>
                  </Button>
               </div>
            </div>

            <div className="px-5">
               <DeliveryInfo restaurant={product.restaurant}/>
            </div>

            <div className="mt-6 space-y-3 px-5" >
               <h3 className="font-semibold">Sobre</h3>
               <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            <div className="mt-6 space-y-3 ">
               <h3 className="font-semibold px-5">Sucos</h3>
               <ProductList products={complementaryProducts}/>
            </div>

            <div className="px-5 mt-6">
               <Button className="w-full font-semibold" onClick={handleAddToCardClick}>
                  Adicionar à sacola
               </Button>
            </div>
         </div>
         <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-[90vw]">
               <SheetHeader>
                  <SheetTitle className="text-left">Sacola</SheetTitle>
               </SheetHeader>
               <Cart/>
            </SheetContent>

         </Sheet>
      </>        
   
   );
}

export default ProductDetails;