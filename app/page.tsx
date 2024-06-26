import CategoryList from "./_components/category-list"
import Header from "./_components/header"
import Search from "./_components/search"
import ProductList from "./_components/product-list"
import { Button } from "./_components/ui/button"
import { ChevronRightIcon } from "lucide-react"
import { db } from "./_lib/prisma"
import PromoBanne from "./_components/promoBanne"
import RestaurantList from "./_components/restaurant-list"
import Link from "next/link"




const Home = async () => {


   const products = await db.product.findMany({
      where:{
         discountPercentage:{
            gt:0
         }
      },
      take:10,
      include:{
         restaurant: {
            select:{
               name: true
            }
         }
      }
   })


   return (
      <>
         <Header/>

         <div className="px-5 pt-6">
            <Search/>
         </div>

         <div className="px-5 pt-6">
            <CategoryList/>
         </div>

         <div className="px-5 pt-6">
            <PromoBanne  
               src="/promo-banner-01.png" 
               alt="Até 30% de desconto em pizzas"
            />
         </div>

         <div className="pt-6 space-y-4">
            <div className="px-5 flex justify-between items-center" >
               <h2 className="font-semibold">Pedidos Recomendados</h2>
               <Button  asChild variant={"ghost"} className="h-fit text-primary p-0 hover:bg-transparent hover:text-primary">
                  <Link href={`/products/recommended`}>
                     Ver todos
                     <ChevronRightIcon size={16}/>
                  </Link>
               </Button>
            </div>

            <ProductList products={products}/>
         </div>

         <div className="px-5 pt-6">
            <PromoBanne  
               src="/promo-banner-02.png" 
               alt="A partir de R$17,90 em lanches!"
            />
         </div>
   


         <div className="py-6 space-y-4">
            <div className="px-5 flex justify-between items-center" >
               <h2 className="font-semibold">Restaurantes Recomendados</h2>
               <Button 
                  variant={"ghost"} 
                  className="h-fit text-primary p-0 hover:bg-transparent hover:text-primary"
                  asChild
               >
                  <Link href={'/restaurants/recommended'}>
                     Ver todos
                     <ChevronRightIcon size={16}/>
                  </Link>
               </Button>
            </div>

            <RestaurantList/>
         </div>

      </>
   )
}


export default Home