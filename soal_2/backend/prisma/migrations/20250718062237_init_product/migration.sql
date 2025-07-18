-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "price" INTEGER NOT NULL DEFAULT 11,
    "stock" INTEGER NOT NULL DEFAULT 11,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
