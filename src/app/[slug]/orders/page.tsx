import { getOrdersByCpfWithRestaurantAndProducts } from "@/app/data/get-orders-by-cpf";
import { isValidCpf } from "@/helpers/cpf";

import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
    searchParams: Promise<{ cpf: string }>
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {

    const { cpf } = await searchParams;

    if (!cpf) {
        return <CpfForm />
    }

    if (!isValidCpf(cpf)) {
        return <CpfForm />
    }

    const orders = await getOrdersByCpfWithRestaurantAndProducts(cpf);

    return <OrderList orders={orders} />;
}

export default OrdersPage;