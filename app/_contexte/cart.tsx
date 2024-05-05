/* eslint-disable no-unused-vars */
"use client"

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { computerProductTotalPrice } from "../_helpers/price";
import { PrismaClient } from "@prisma/client/extension";



export interface CartProduct extends Prisma.ProductGetPayload<{include:{
   restaurant:{
      select:{
         deliveryFee: true
      }
   }
}}>{
   quantity: number;
}

interface ICartContext  {
   products:  CartProduct[]
   subtotalPrice: number,
   totalPrice: number,
   totalDiscounts: number,
   // eslint-disable-next-line no-unused-vars
   addProductToCard: ({ product, quantity, emptyCart }: {
      product: Prisma.ProductGetPayload<{
         include: {
            restaurant: {
               select: {
                  deliveryFee: true;
               };
            };
         };
      }>;
      quantity: number;
      emptyCart?: boolean;
   }) => void
   decreaseProductQuantity: (productId: string) => void
   increaseProductQuantity: (productId: string) => void
   removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
   products: [],
   subtotalPrice:0,
   totalPrice:0,
   totalDiscounts:0,
   addProductToCard: () => {},
   decreaseProductQuantity: () => {},
   increaseProductQuantity: () => {},
   removeProductFromCart: () => {},
})


export const CartProvider = ({children}:{children: ReactNode}) => {
   
   const [products, setProducts] = useState<CartProduct[]>([])

   const subtotalPrice = useMemo(() => {
      return products.reduce((acc,product)=> {
         return acc + Number(product.price) * product.quantity
      },0)
   },[products]) 


   const totalPrice = useMemo(() => {
      return products.reduce((acc,product)=> {
         return acc + computerProductTotalPrice(product) * product.quantity
      },0)
   },[products]) 

   const totalDiscounts = subtotalPrice - totalPrice

   const increaseProductQuantity = (productId: string) =>  {
      return setProducts((prev)=> 
         prev.map((cartProduct)=> {
            if(cartProduct.id === productId){
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + 1
               }
            }
         return cartProduct;
      }))
   }


   const decreaseProductQuantity = (productId: string) =>  {
      return setProducts((prev)=> 
         prev.map((cartProduct)=> {
            if(cartProduct.id === productId){

               if(cartProduct.quantity === 1){
                  return cartProduct
               }
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity - 1
               }
            }
         return cartProduct;
      }))
   }

   const addProductToCard= (
      {product, quantity, emptyCart} : {
         product: Prisma.ProductGetPayload<{
            include:{
               restaurant:{
                  select:{
                     deliveryFee:true
                  }
               }
            }
         }>, 
         quantity: number,
         emptyCart?: boolean
      }
   
   ) => {
   
      if(emptyCart){
         setProducts([])
      }
      // VERIFICAR SE O PRODUTO JA ESTA NO CARRINHO
      const isProductAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)

       // SE ELE ESTIVER, AUMENTAR A SUA QUANTIDADE 
      if(isProductAlreadyOnCart){
         return setProducts((prev)=> prev.map((cartProduct)=> {
            if(cartProduct.id === product.id){
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity
               }
            }
            return cartProduct;
         }))
      }

      // SE NAO, ADICIONA-LO COM A QUANTIDADE RECEBIDA
      setProducts((prev)=>[ ...prev, {...product, quantity:quantity }])
   }


   const removeProductFromCart = (productId: string) => {
      return setProducts((prev)=> prev.filter((product)=> product.id !== productId))
   }

   return (
      <CartContext.Provider value={{
         products, 
         subtotalPrice,
         totalPrice,
         totalDiscounts,
         addProductToCard, 
         decreaseProductQuantity, 
         increaseProductQuantity,
         removeProductFromCart
      }}>
         {children}
      </CartContext.Provider>
   )
}