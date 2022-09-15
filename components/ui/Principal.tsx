//Libreria
import { Slide } from "react-slideshow-image";
import styles from "./principal.module.scss";
import "react-slideshow-image/dist/styles.css";

const zoomOutProperties = {
  duration: 2000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  scale: 0.4,
  arrows: false,
  pauseOnHover: false,
};

const fondos = [
  { url: "/static/images/fondo1.webp" },
  { url: "/static/images/fondo2.jpg" },
  { url: "/static/images/fondo3.jpg" },
];

// const mapea = () => {
//   fondos.map((i) => console.log(i.url));
// };
// mapea();
export const Principal = () => {
  return (
    <>
      <Slide {...zoomOutProperties}>
        {fondos.map((i, index) => (
          <div className={styles["each-slide"]} key={index}>
            <div
              style={{
                backgroundImage: `url(${i.url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </>
  );
};
