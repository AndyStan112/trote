-- CreateTable
CREATE TABLE "Trot" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Trot_pkey" PRIMARY KEY ("id")
);
