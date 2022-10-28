import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../scss/components/_home.module.scss";
import Carousel from "./Carousel";
import { getMovies, getUpcoming } from "../redux/actions/movies";
import {
  getAllShowtimes,
  getBillboardMovies,
} from "../redux/actions/showtimes";
import Footer from "./Footer";
import Slider from "./Slider";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.moviesReducer.movies);
  const showtimes = useSelector((state) => state.showtimesReducer.showtimes);
  const billboardIds = Array.from(new Set(showtimes.map((s) => s.movieId)));
  const arrayBillboardMovies = useSelector(
    (state) => state.showtimesReducer.billboard
  );
  const arrayUpcomingMovies = useSelector(
    (state) => state.moviesReducer.upcoming
  );

  useEffect(() => {
    if (movies.length > 0 && showtimes.length > 0)
      dispatch(getBillboardMovies(billboardIds));
  }, [movies]);

  useEffect(() => {
    if (showtimes.length === 0) dispatch(getAllShowtimes());
    dispatch(getMovies());
    dispatch(getUpcoming());
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);
  const horrorFilms = movies
    .filter((m) => {
      return m.genres.includes(27);
    })
    .slice(0, 20);

  const actionFilms = movies
    .filter((m) => {
      return m.genres.includes(28);
    })
    .slice(0, 20);

  const mostPopular = movies
    .sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      } else {
        return -1;
      }
    })
    .slice(0, 10);

  return (
    <div className={style.container_home}>
      <Carousel></Carousel>
      <Slider
        scroll="fade-up-right"
        title="Billboard"
        movies={arrayBillboardMovies}
      ></Slider>
      <Slider
        scroll="fade-up-left"
        title="Upcomings"
        movies={arrayUpcomingMovies}
      ></Slider>

      <Slider
        scroll="fade-up-right"
        title="Just for Halloween season 🎃"
        movies={horrorFilms}
      ></Slider>
      <Slider
        scroll="fade-up-left"
        title="Top 10 rated 💯"
        movies={mostPopular}
      ></Slider>
      <Slider
        scroll="fade-up-right"
        title="You're the  disease, and i'm the cure 💥"
        movies={actionFilms}
      ></Slider>
      <Footer />
    </div>
  );
}
