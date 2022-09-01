//Next
import NextLink from "next/link";
//MUI
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
//App
import { AuthLayout } from "../../components/layouts";

const RegistroPage = () => {
  return (
    <AuthLayout title={"Ingresar"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Regístrate
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField type="text" label="Nombre" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField type="email" label="Correo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login" passHref>
              <Link underline="always">¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            justifyContent="end"
          >
            <Divider sx={{ width: "100%", mb: 2 }} />
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegistroPage;
