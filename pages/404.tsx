//MUI
import { Box, Typography } from "@mui/material";

//APP
import { PrincipalLayout } from "../components/layouts";

const Custom404 = () => {
  return (
    <PrincipalLayout
      title="Página no encontrada"
      description={"No hay nada que mostrar aquí"}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
        textAlign="center"
      >
        <Typography
          sx={{ fontFamily: "Montserrat, sans-serif" }}
          variant="h1"
          component="h1"
          fontSize={80}
          fontWeight="200"
        >
          404 |
        </Typography>
        <Typography
          sx={{ fontFamily: "Montserrat, sans-serif" }}
          variant="h6"
          fontSize={40}
          fontWeight="100"
        >
          No encontramos ninguna página aqui
        </Typography>
      </Box>
    </PrincipalLayout>
  );
};

export default Custom404;
