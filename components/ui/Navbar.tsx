//React
import React, { useState } from "react";
//Next
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";

//MUI
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { Person, Widgets } from "@mui/icons-material";

//App
import logo from "../../public/static/images/logo.png";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        height: 80,
        fontSize: "16.2px",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Image
              src={logo}
              width={100}
              height={70}
              alt="Alvcomer SAS Productos Militares"
            />
          </Link>
        </NextLink>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            marginLeft: "80px",
          }}
          className="fadeIn"
        >
          <NextLink href="/" passHref>
            <Link>
              <Button
                variant="text"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16.2px",
                }}
              >
                Alvcomer SAS
              </Button>
            </Link>
          </NextLink>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              backgroundColor: "transparent",
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16.2px",
            }}
          >
            Productos
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              onClick={handleClose}
            >
              Equipo Militar o Camping
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              onClick={handleClose}
            >
              Herrajes
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              onClick={handleClose}
            >
              Institucional
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              onClick={handleClose}
            >
              Vallas de Contención
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              onClick={handleClose}
            >
              Servicio de Troquelado y embutido
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              onClick={handleClose}
            >
              Placas de Identificación
            </MenuItem>
          </Menu>

          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                variant="text"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16.2px",
                }}
              >
                Blog
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                variant="text"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16.2px",
                }}
              >
                Encuéntranos
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <NextLink href="/auth/login" passHref>
          <Link
            sx={{ display: { xs: "none", md: "flex" } }}
            alignItems="center"
          >
            <Box>
              <IconButton sx={{ display: { xs: "flex" }, color: "#fff" }}>
                <Person />
              </IconButton>
            </Box>
            <Typography
              sx={{
                marginRight: "20px",
                fontSize: "1em",
                color: "#fff",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Login
            </Typography>
          </Link>
        </NextLink>

        <Button variant="text" sx={{ fontSize: "16.2px" }}>
          <Widgets />
        </Button>
      </Toolbar>
    </AppBar>
  );
};
