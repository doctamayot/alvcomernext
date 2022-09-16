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
  providers: any;
}

const LoginPage: NextPage<Props> = () => {
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      // console.log({prov});
      setProviders(prov);
    });
  }, []);
  return (
    <AuthLayout title={"Ingresar"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {Object.values(providers).map((provider: any) => (
              <Button key={provider.id}>
                <Typography variant="h1" component="h1">
                  Iniciar Sesión con
                  {provider.name}
                </Typography>
              </Button>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              onClick={() => signIn(providers.google.id)}
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  // console.log({session});

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
