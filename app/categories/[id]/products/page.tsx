import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/productItem";

interface CaregotiriesPageProps {
   params: {
      id: string;
   }
}

const CategoriesPage = async ({params:{id}}:CaregotiriesPageProps) => {

   const categories = await db.category.findUnique({
      where:{
         id,
      },
      include:{
         product:  {
            include:{
               restaurant: {
                  select:{
                     name: true
                  }
               },
            },
         },
         
      },
   });

   if(!categories){
      return notFound()
   }

   return (  
      <>
         <Header/>
         <div className="py-6 px-5">
            <h2 className="font-semibold text-lg mb-6">{categories.name}</h2>
            <div className="grid grid-cols-2 gap-6 ">
               {
                  categories.product.map((product) => (
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

export default CategoriesPage;