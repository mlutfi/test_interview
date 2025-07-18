import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllProduct = async () => {
  const product = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true
    },
  });
  return product;
};

const createProduct = async (dataFromParam: any) => {
  const product = await prisma.product.create({ data: dataFromParam });
  return product;
};

const updateProduct = async (id: number, dataFromParam: any) => {
  const product = await prisma.product.update({
    where: { id: id },
    data: dataFromParam,
  });
  return product;
};

const getProductById = async (id: number) => {
  const result = await prisma.product.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true
    },
  });
  return result;
};

const deleteProduct = async (id: number) => {
  const product = await prisma.product.delete({
    where: { id: id }
  });
  return product;
};

export {
  getAllProduct,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct
};
