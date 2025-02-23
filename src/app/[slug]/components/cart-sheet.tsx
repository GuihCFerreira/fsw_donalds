import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../menu/contexts/cart";

const CartSheet = () => {

    const {isOpen, toggleCart} = useContext(CartContext)

    return ( 
    <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
        </SheetContent>
    </Sheet> 
    );
}
 
export default CartSheet;