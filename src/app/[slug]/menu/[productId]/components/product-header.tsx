"use client"

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
    product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({product} : ProductHeaderProps) => {

const router = useRouter();

  const handleBackClick = () => router.back();

    return ( <div className="relative w-full h-[300px]">

<Button
        variant={"secondary"}
        className="absolute left-4 top-4 z-50 rounded-full"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
      <Button
        variant={"secondary"}
        className="absolute right-4 top-4 z-50 rounded-full"
        size={"icon"}
      >
        <ScrollTextIcon />
      </Button>

            
        </div> );
}
 
export default ProductHeader;