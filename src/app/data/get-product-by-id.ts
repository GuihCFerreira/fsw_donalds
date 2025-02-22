import { db } from "@/lib/prisma";

export const getProductById = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product;
};

export const getProductByIdWithRestaurant = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true,
          name: true,
          slug: true,
        },
      },
    },
  });
  return product;
};
