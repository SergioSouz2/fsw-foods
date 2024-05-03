import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


interface CategoryItemProps {
   category: Category
}


const CategoryItem = ({category}:CategoryItemProps) => {
   return ( 
      <Link 
         href={`/categories/${category.id}/products`} 
         className="flex min-w-[170px] items-center justify-center gap-3 py-2 px-4 bg-white rounded-full shadow-sm"
      >
         <Image 
            src={category.imageUrl} 
            alt={category.name}
            height={30}
            width={30}
         />
         <span className="font-semibold text-sm">{category.name}</span>
      </Link>
   );
}

export default CategoryItem;