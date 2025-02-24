import { removeCpfPunctuation } from "@/helpers/cpf"
import { db } from "@/lib/prisma"

export const getOrdersByCpf = async (cpf: string) => {
    const orders = await db.order.findMany({
        where: {
            customerCpf: removeCpfPunctuation(cpf)
        }
    })

    return orders;
}

export const getOrdersByCpfWithRestaurantAndProducts = async (cpf: string) => {
    const orders = await db.order.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            customerCpf: removeCpfPunctuation(cpf)
        },
        include:{
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            },
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    return orders;
}