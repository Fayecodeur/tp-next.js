import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Une erreur s'est produite lors de le recupération...",
        error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const { name, quantity, price } = await request.json();
    const newProduct = await prisma.product.create({
      data: { name, quantity, price },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Une erreur s'est produite lors de l'ajout", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
