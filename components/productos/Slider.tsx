import React, { FC } from "react";
import Image from "next/image";

import { Box } from "@mui/material";
import { IProducto } from "../../interfaces/productos";

interface Props {
  activeIndex: number;
  productos: IProducto[];
}

export const Slider: FC<Props> = ({ activeIndex, productos }) => {
  return (
    <div className="container">
      <section className="outer-container-image">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginRight: "20px",
            marginTop: "400px",
          }}
        >
          <Image
            src={productos[activeIndex].images[0]}
            alt={productos[activeIndex].copy}
            width={250}
            height={250}
          />
        </Box>
      </section>
    </div>
  );
};
