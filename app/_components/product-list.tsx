import { Prisma } from "@prisma/client";
import ProductItem from "./productItem";


interface ProductListProps {
   products: Prisma.ProductGetPayload<{
      include:{
         restaurant: {
            select:{
               name: true
            }
         }
      }
   }>[];
}

const ProductList = ({products}:ProductListProps) => {


   return ( 
      <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5">
         {products.map((product) => (
            <ProductItem key={product.id} product={product}/>
         ))}
      </div>
   );
}

export default ProductList;