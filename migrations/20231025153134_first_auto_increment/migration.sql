-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "table_link" TEXT NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "order_no" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_orders" (
    "id" SERIAL NOT NULL,
    "menuId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "menu_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_tag" (
    "id" SERIAL NOT NULL,
    "tagable" TEXT NOT NULL,
    "tagableId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagableType" TEXT NOT NULL,

    CONSTRAINT "category_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);
