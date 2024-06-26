import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/productItem";
import { db } from "@/app/_lib/prisma";

const RecommentededProductsPage = async () => {
   // TODO: pegar produtos com mais pedidos
   
   const products = await db.product.findMany({
      where:{
         discountPercentage:{
            gt:0
         }
      },
      take:20,
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
      <div className="py-6 px-5">
         <h2 className="font-semibold text-lg mb-6">Pedidos Recomendados</h2>
         <div className="grid grid-cols-2 gap-6 ">
            {
               products.map((product) => (
                  <ProductItem 
                     key={product.id} 
                     product={product} 
                     className="min-w-full"
                  />
               ))
            }
         </div>
      </div>
   </>
   );
}

export default RecommentededProductsPage;