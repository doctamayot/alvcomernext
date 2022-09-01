import React from "react";
import { PrincipalLayout } from "../../components/layouts";
import { Productos } from "../../components/productos";

const productos = () => {
  return (
    <PrincipalLayout
      title="Acero Inoxidable"
      description="Productos en acero inoxidable"
    >
      <Productos />
    </PrincipalLayout>
  );
};

export default productos;
