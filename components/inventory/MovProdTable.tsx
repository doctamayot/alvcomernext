import NextLink from "next/link";
import { AddOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { PrincipalLayout } from "../../components/layouts";
import { IInventory } from "../../interfaces/inventory";
import { FC, useState } from "react";

import { useForm } from "react-hook-form";

import { tesloApi } from "../../api";
import { useRouter } from "next/router";

import moment from "moment";
import "moment/locale/es";

interface FormData {
  _id?: string;
  valor: number;
  tipo: string;
  titulo: string;
}

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Titulo",
    width: 200,
    renderCell: ({ row }: any) => {
      return (
        <NextLink href={`/admin/parts/${row.id}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "tipo", headerName: "Tipo", width: 200 },
  { field: "valor", headerName: "Valor", width: 200 },
  { field: "creado", headerName: "Creado", width: 250 },
];

interface Props {
  product: any;
  idver: string;
}

const MovProdTable: FC<Props> = ({ product, idver }) => {
  console.log(product);
  console.log(idver);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const Swal = require("sweetalert2");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: {} });

  //console.log(product.movimientos);
  moment.locale("es");

  const rows =
    product &&
    product.movimientos.map(
      (product: {
        _id: any;

        titulo: any;
        tipo: any;
        valor: any;
        createdAt: any;
      }) => ({
        id: product._id,

        title: product.titulo,
        tipo: product.tipo,
        valor: product.valor,
        creado: moment(product.createdAt).format("LLL"),
      })
    );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (form: FormData) => {
    //setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: `/admin/inventory/${idver}`,
        method: "PATCH",
        data: form,
      });

      console.log({ data });
      setOpen(false);
      Swal.fire({
        title: "Movimiento Ingresado",
        text: "Continuar",
        icon: "success",
        confirmButtonText: "Ok",
      });
      router.reload();
    } catch (error) {
      console.log(error);
      //setIsSaving(false);
    }
  };

  if (!product.movimientos)
    return (
      <PrincipalLayout
        title={`Movimientos (${product?.movimientos.length})`}
        description={"Mantenimiento de productos"}
        // icon={ <CategoryOutlined /> }
      >
        <Box sx={{ marginTop: "50px" }}>
          <Box display="flex" justifyContent="center" sx={{ mb: 2, mt: 2 }}>
            <Button
              startIcon={<AddOutlined />}
              color="secondary"
              onClick={handleOpen}
            >
              Crear Movimiento
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute" as "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    sx={{
                      //display: idver === "new" ? "none" : "flex",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        mb: 1,
                        marginTop: "10px",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",
                      }}
                    >
                      Crear Movimiento
                    </Typography>
                  </Box>

                  <TextField
                    label="T??tulo"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register("titulo", {
                      required: "Este campo es requerido",
                      minLength: { value: 2, message: "M??nimo 2 caracteres" },
                    })}
                    error={!!errors.titulo}
                    helperText={errors.titulo?.message}
                  />

                  <TextField
                    label="Cantidad"
                    type="number"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 1 }}
                    {...register("valor", {
                      required: "Este campo es requerido",
                      min: { value: 0, message: "M??nimo de valor cero" },
                    })}
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue=""
                      label="Tipo"
                      //onChange={handleChange}
                      {...register("tipo", {
                        required: "Este campo es requerido",
                      })}
                    >
                      <MenuItem value={"entrada"}>entrada</MenuItem>
                      <MenuItem value={"salida"}>salida</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    color="secondary"
                    startIcon={<SaveOutlined />}
                    sx={{ width: "100%", marginTop: "20px" }}
                    type="submit"
                    //disabled={isSaving}
                  >
                    Insertar Movimiento
                  </Button>
                </form>
              </Box>
            </Modal>
          </Box>

          <Grid
            container
            className="fadeIn"
            display="flex"
            justifyContent="center"
          >
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography
                sx={{
                  marginTop: "30px",
                  fontSize: "30px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Movimientos
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </PrincipalLayout>
    );

  return (
    <PrincipalLayout
      title={`Movimientos (${product?.movimientos.length})`}
      description={"Mantenimiento de productos"}
      // icon={ <CategoryOutlined /> }
    >
      <Box sx={{ marginTop: "50px" }}>
        <Box display="flex" justifyContent="center" sx={{ mb: 2, mt: 2 }}>
          <Button
            startIcon={<AddOutlined />}
            color="secondary"
            onClick={handleOpen}
          >
            Crear Movimiento
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    //display: idver === "new" ? "none" : "flex",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      mb: 1,
                      marginTop: "10px",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "20px",
                    }}
                  >
                    Crear Movimiento
                  </Typography>
                </Box>

                <TextField
                  label="T??tulo"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register("titulo", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "M??nimo 2 caracteres" },
                  })}
                  error={!!errors.titulo}
                  helperText={errors.titulo?.message}
                />

                <TextField
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register("valor", {
                    required: "Este campo es requerido",
                    min: { value: 0, message: "M??nimo de valor cero" },
                  })}
                  error={!!errors.valor}
                  helperText={errors.valor?.message}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue=""
                    label="Tipo"
                    //onChange={handleChange}
                    {...register("tipo", {
                      required: "Este campo es requerido",
                    })}
                  >
                    <MenuItem value={"entrada"}>entrada</MenuItem>
                    <MenuItem value={"salida"}>salida</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  color="secondary"
                  startIcon={<SaveOutlined />}
                  sx={{ width: "100%", marginTop: "20px" }}
                  type="submit"
                  //disabled={isSaving}
                >
                  Insertar Movimiento
                </Button>
              </form>
            </Box>
          </Modal>
        </Box>

        <Grid
          container
          className="fadeIn"
          display="flex"
          justifyContent="center"
        >
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography
              sx={{
                marginTop: "30px",
                fontSize: "30px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Movimientos
            </Typography>
          </Grid>

          <Grid item xs={8} sx={{ height: "650px" }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: "creado", sort: "desc" }],
                },
              }}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              sx={{
                width: "85%",
                margin: "0 auto",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </PrincipalLayout>
  );
};

export default MovProdTable;
