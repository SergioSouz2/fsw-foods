import { useContext } from "react"
import { CartContext } from "../_contexte/cart"
import CartItem from "./cartItem"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { formatCurrency } from "../_helpers/price"
import { Separator } from "./ui/separator"



const Cart = () => {
   const {products, subtotalPrice , totalDiscounts, totalPrice} = useContext(CartContext)
   return (
      <div className="py-5  flex flex-col justify-between h-full">
         <div className="space-y-4">
            {products.map(product => (
               <CartItem key={product.id} cartProduct={product}/>
            ))}
         </div>
         <div className="my-6">
            <Card >
               <CardContent className="p-5 space-y-2">
                  <div className="flex justify-between text-xs">
                     <span className="text-muted-foreground">Subtotal</span>
                     <span>{formatCurrency(subtotalPrice)}</span>
                  </div>
                  <Separator/>

                  <div className="flex justify-between text-xs">
                     <span className="text-muted-foreground">Entrega</span>
                     {Number(products[0].restaurant.deliveryFee) === 0 ? <span className="uppercase text-primary">Gratis</span>: formatCurrency(Number(products[0].restaurant.deliveryFee))}
                     
                  </div>
                  <Separator/>

                  <div className="flex justify-between text-xs">
                     <span className="text-muted-foreground">Descontos</span>
                     <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>
                  <Separator/>

                  <div className="flex justify-between text-xs font-semibold">
                     <span >Total</span>
                     <span>{formatCurrency(totalPrice)}</span>
                  </div>
               </CardContent>
            </Card>
            <Button className="w-full mt-6">
               Finalizar Pedido
            </Button>
         </div>
      </div>
   )
}


export default Cart;