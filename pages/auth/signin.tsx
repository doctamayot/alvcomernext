//Next
import NextLink from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { getProviders, signIn, getSession } from "next-auth/react";
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
import { useEffect, useState } from "react";

interface Props {
  google: any;
}

const LoginPage: NextPage<Props> = () => {
  const [prov, setProv] = useState<any>({});

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProv(providers as any);
    })();
  }, []);

  return (
    <AuthLayout title={"Ingresar"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button>
              <Typography variant="h1" component="h1">
                Iniciar Sesión con{" "}
                {prov && prov.google && (prov.google.name as any)}
              </Typography>
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              onClick={() => signIn(prov.google.id, { callbackUrl: "/" })}
            >
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   query,
// }) => {
//   // const providers = await getProviders(); // your fetch function here
//   const session = await getSession({ req });

//   //const { p = "/" } = query;

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
//};

export default LoginPage;
