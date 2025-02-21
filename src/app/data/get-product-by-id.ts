import { db } from "@/lib/prisma"

export const getProductById = async (productId: string) => {
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })
    return product
}