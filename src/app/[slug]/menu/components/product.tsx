import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
    products: Product[]
}

const Products = ({products} : ProductsProps) => {
    return ( <div className="space-y-3 px-5">
        {products.map(product => (
            <Link href="/" key={product.id} className="flex items-center justify-between py-3 gap-10 border-b">
                <div>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                    <p className="font-semibold pt-3 text-sm">{
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(product.price)
                        }</p>
                </div>
                <div className="relative min-h-[82px] min-w-[120px]">
                    <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain"/>
                </div>
            </Link>
        ))}
    </div> );
}
 
export default Products;