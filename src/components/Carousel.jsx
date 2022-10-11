import React, { useEffect, useState } from "react";
import style from "../scss/components/_carousel.module.scss";
import img from "../assets/uncharted-poster.jpg";
import { useSelector } from "react-redux";

function Carousel() {
  /* Arreglo de images hardcodeado, acá irian las imagénes de poster de las películas en cartelera*/
  // const images = ['presencias-poster.jpg','thenorthman-poster.jpg','thor-poster.webp', 'uncharted-poster.jpg']

  const images = useSelector((state) => state.moviesReducer.carousel);
  const addPlaylistDisplay = useSelector(
    (state) => state.playlistsReducer.formDisplay
  );

  /* Uso estados locales para moverme entre las imágenes y uso un index*/
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  /* Lógica para que funcione el previous y el neext*/
  const selectNewImage = (index, images, next = true) => {
    const condition = next ? index < images.length - 1 : index > 0;
    const nextIndex = next
      ? condition
        ? index + 1
        : 0
      : condition
      ? index - 1
      : images.length - 1;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  /* Función para deslizar el carrusel hacia atrás */
  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  };

  /* Función para deslizar el carrusel hacia adelante*/
  const next = () => {
    selectNewImage(selectedIndex, images);
  };

  // if (images.length) selectNewImage(0, images)

  /* Con este useEffect hacemos que se vayan cambiando los sliders */
  useEffect(() => {
    const interval = setInterval(function test() {
      selectNewImage(selectedIndex, images);
      return test;
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <div
      className={style.carouselContainer}
      style={{
        backgroundImage: `url(${
          selectedImage ? selectedImage.backdrop_path : img
        })`,
        zIndex: addPlaylistDisplay === "none" ? 0 : -1,
      }}
    >
      <div className={style.overlay}></div>
      {selectedImage && (
        <span className={style.spanTitle}>
          <p>{selectedImage && selectedImage.title}</p>
          <button>Watch Now</button>
        </span>
      )}
      <button className={style.carouselBtnPrev} onClick={previous}>
        &#10092;
      </button>
      <button className={style.carouselBtnNext} onClick={next}>
        &#10093;
      </button>
    </div>
  );
}

export default Carousel;
