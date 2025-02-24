import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import OrderItem from "./order-item";

interface OrderListProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                    avatarImageUrl: true
                }
            },
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    }>[];
}

const OrderList = ({ orders }: OrderListProps) => {
    return (
        <div className="space-y-6 p-6">
            <Button size="icon" className="rounded-full" variant="secondary">
                <ChevronLeftIcon />
            </Button>
            <div className="flex items-cente gap-3">
                <ScrollTextIcon />
                <h2 className="text-lg font-semibold">Meus Pedidos</h2>
            </div>
            {orders.map((order) => <OrderItem key={order.id} order={order} />)}
        </div>
    );
}

export default OrderList;