import { Category } from "@prisma/client";
import Image from "next/image";


interface CategoryItemProps {
   category: Category
}


const CategoryItem = ({category}:CategoryItemProps) => {
   return ( 
      <div className="flex min-w-[120px] items-center gap-3 py-3 px-4 bg-white rounded-full shadow-sm">
         <Image 
            src={category.imageUrl} 
            alt={category.name}
            height={30}
            width={30}
         />
         <span className="font-semibold text-sm">{category.name}</span>
      </div> 
   );
}

export default CategoryItem;