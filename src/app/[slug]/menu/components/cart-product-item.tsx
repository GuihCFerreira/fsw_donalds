"use client"

import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
    product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {

    const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext)

    const handleDecreaseProductQuantity = () => {
        decreaseProductQuantity(product.id);
    }

    const handleIncreaseProductQuantity = () => {
        increaseProductQuantity(product.id);
    }

    const handleRemoveProduct = () => {
        removeProduct(product.id);
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 bg-gray-100 rounded-xl">
                    <Image src={product.imageUrl} fill alt={product.name} />
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    <div className="flex items-center gap-1 text-center">
                        <Button className="w-7 h-7 rounded-lg" variant="outline" onClick={handleDecreaseProductQuantity}>
                            <ChevronLeftIcon />
                        </Button>
                        <p className="text-xs w-7">{product.quantity}</p>
                        <Button className="w-7 h-7 rounded-lg" variant="destructive" onClick={handleIncreaseProductQuantity} >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <Button className="w-7 h-7 rounded-lg" variant="outline" onClick={handleRemoveProduct}>
                <TrashIcon />
            </Button>

        </div>
    );
}

export default CartProductItem;