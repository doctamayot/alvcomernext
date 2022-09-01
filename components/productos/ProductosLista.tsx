import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Slider } from "./Slider";
import data from "./data.json";
import cn from "classnames";
import {
  AcUnit,
  ArrowCircleDown,
  ArrowCircleUp,
  ArrowForward,
} from "@mui/icons-material";

export const Productos = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(data.productos.length / 2);

  // Usd to determine the height/spacing of each item
  const itemHeight = 52;

  // Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = halfwayIndex * itemHeight;

  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex: any): number | undefined => {
    // If these match, the item is active
    if (activeIndex === itemIndex) return 0;

    if (itemIndex >= halfwayIndex) {
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        return -(data.productos.length + activeIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    }

    if (itemIndex < activeIndex) {
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (data.productos.length - (activeIndex - itemIndex)) * itemHeight;
      }
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction: any) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        if (prevIndex + 1 > data.productos.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }

      if (prevIndex - 1 < 0) {
        return data.productos.length - 1;
      }

      return prevIndex - 1;
    });
  };
  return (
    <Grid
      container
      spacing={8}
      sx={{
        backgroundColor: "#fec526",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          margin: "120px 20px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "90%",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "54px",
              fontWeight: "100",
            }}
          >
            Acero
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "70px",
              fontWeight: "bolder",
              color: "#fff",
              marginTop: "-20px",
            }}
          >
            Inoxidable
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              marginTop: "10px",
              fontWeight: "100",
            }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
            doloremque quod asperiores quibusdam sit at incidunt possimus, sunt
            similique et. Accusantium vitae nam eum blanditiis corrupti quos
            quisquam quibusdam architecto.
          </Typography>
          <div className="container">
            <section className="outer-container">
              <div className="carousel-wrapper">
                <button
                  type="button"
                  className="carousel-button prev"
                  onClick={() => handleClick("prev")}
                >
                  <ArrowCircleUp sx={{ marginBottom: "0px" }} />
                </button>

                <div className="carousel">
                  <div className="slides">
                    <div className="carousel-inner">
                      {data.productos.map((item: any, i: any) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          className={cn("carousel-item", {
                            active: activeIndex === i,
                            visible:
                              Math.abs(Number(determinePlacement(i))) <=
                              visibleStyleThreshold,
                          })}
                          style={{
                            transform: `translateY(${determinePlacement(i)}px)`,
                          }}
                        >
                          <Box
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: "25.2px",
                              fontWeight: "bolder",
                              display: "flex",
                            }}
                          >
                            <AcUnit />
                            <Typography
                              variant="h6"
                              sx={{ marginLeft: "10px" }}
                            >
                              {item.titulo}
                            </Typography>
                          </Box>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="carousel-button next"
                  onClick={() => handleClick("next")}
                >
                  <ArrowCircleDown />
                </button>
              </div>
            </section>
          </div>
        </Box>
      </Grid>
      <Grid item xs={3} sx={{ marginTop: "0px", marginLeft: "-120px" }}>
        <Slider activeIndex={activeIndex} productos={data.productos} />
      </Grid>
      <Grid item xs={3} sx={{ marginTop: "400px" }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            color: "#fff",
            fontSize: "60px",
          }}
        >
          {data.productos[activeIndex].titulo}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginTop: "30px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "20px",
          }}
        >
          {data.productos[activeIndex].copy}
        </Typography>
        <Button
          endIcon={<ArrowForward />}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            marginTop: "30px",
            width: "300px",
          }}
        >
          Ver más
        </Button>
      </Grid>
    </Grid>
  );
};
