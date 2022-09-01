import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProducto } from "../../../interfaces/productos";

type Data = { message: string } | IProducto;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function getProductBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.connect();

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.status(200).json(product);
}
