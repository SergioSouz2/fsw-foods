import Image from "next/image";
import { CartContext, CartProduct } from "../_contexte/cart";
import { computerProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CardItemProps {
   cartProduct : CartProduct
}

const CartItem = ({cartProduct}: CardItemProps) => {

   const { 
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProductFromCart
   } = useContext(CartContext)


   const handleDecreaseQuantityClick = () => decreaseProductQuantity(cartProduct.id)
   const handleIncreaseProductQuantityClick = () => increaseProductQuantity(cartProduct.id)
   const handleRemoveProductFromCartClick = () => removeProductFromCart(cartProduct.id)

   return (
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-4">

            <div className="relative w-20 h-20 " >
               <Image src={cartProduct.imageUrl} alt={cartProduct.name} fill className="rounded-lg object-cover"/>
            </div>

            <div className="space-y-1" >
               <h3 className=" text-xs"> {cartProduct.name}</h3>
               <div className="flex items-center gap-1">
                  <h4 className="text-sm font-semibold">
                     {formatCurrency(computerProductTotalPrice(cartProduct) * cartProduct.quantity)}
                  </h4>
                  {cartProduct.discountPercentage > 0 && (
                     <span className="text-xs line-through text-muted-foreground">
                        {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)  }
                     </span>
                  )}
               </div>
               {/* quantidade  */}
               <div className=" flex gap-3 text-center items-center">
                  <Button 
                     size={"icon"} 
                     variant={"ghost"} 
                     className="border border-solid border-muted-foreground w-7 h-7"
                     onClick={handleDecreaseQuantityClick}
                  >
                     <ChevronLeftIcon size={16}/>
                  </Button>
                  <span className="block w-3 text-xs">{cartProduct.quantity}</span>
                  
                  <Button size={"icon"} className="w-7 h-7" onClick={handleIncreaseProductQuantityClick}>
                     <ChevronRightIcon size={16}/>
                  </Button>
               </div>

            </div>
         </div>

         {/* botao de excluir */}

         <Button 
            size={"icon"} 
            variant={"secondary"}  
            className="border border-solid border-muted-foreground w-8 h-8"
            onClick={handleRemoveProductFromCartClick}
         >
            <TrashIcon size={16}/>
         </Button>
      </div>
   );
}

export default CartItem;