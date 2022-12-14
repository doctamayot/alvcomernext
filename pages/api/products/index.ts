import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProducto } from "../../../interfaces/productos";

type Data = { message: string } | IProducto[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { categoria = "all" } = req.query;

  let condition = {};

  if (
    categoria !== "all" &&
    [
      "Equipo Militar o Camping",
      "Herrajes",
      "Institucional",
      "Vallas de Contención",
      "Servicio de Troquelado y Embutido",
      "Placas de Identificación",
    ].includes(`${categoria}`)
  ) {
    condition = { categoria };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select("titulo copy images slug -_id")
    .lean();

  await db.disconnect();
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });

    return product;
  });

  return res.status(200).json(updatedProducts);
}
