import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produit non trouvé." },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la récupération du produit.", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Erreur de modification :", error);
    return NextResponse.json(
      { message: "Une erreur s'est produite lors de la modification", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deletedProduct = await prisma.product.delete({
      where: { id }, // Assure-toi que l'ID est un nombre si nécessaire
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la suppression", error },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
