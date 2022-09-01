//MUI
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  Airplay,
  Animation,
  AssuredWorkload,
  CategoryOutlined,
  LoginOutlined,
  MilitaryTech,
  PrecisionManufacturing,
  SearchOutlined,
  VpnKeyOutlined,
  WorkspacePremium,
} from "@mui/icons-material";

export const MenuLateral = () => {
  return (
    <Drawer
      open={false}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <MilitaryTech />
            </ListItemIcon>
            <ListItemText primary={"Equipo Militar o Camping"} />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <Animation />
            </ListItemIcon>
            <ListItemText primary={"Herrajes"} />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <AssuredWorkload />
            </ListItemIcon>
            <ListItemText primary={"Institucional"} />
          </ListItem>
          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <Airplay />
            </ListItemIcon>
            <ListItemText primary={"Vallas de Contención"} />
          </ListItem>
          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <PrecisionManufacturing />
            </ListItemIcon>
            <ListItemText primary={"Servicio de Troquelado y embutido"} />
          </ListItem>
          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <WorkspacePremium />
            </ListItemIcon>
            <ListItemText primary={"Placas de Identificación"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ingresar"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={"Usuarios"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
