// import { useDispatch, useSelector } from "react-redux";
// import { getAllShowtimes } from "../../../redux/actions/showtimes";

// export default function Datafront() {
//   const dispatch = useDispatch();
//   const showtimes = useSelector((state) =>
//     state.showtimesReducer.showtimes.map((m) => m.movieTitle)
//   );

//   const count = {};

//   showtimes.forEach((element) => {
//     count[element] = (count[element] || 0) + 1;
//   });

//   const countByTitle = Object.keys(count);
//   const countByAmount = Object.values(count);

//   if (!showtimes.length) dispatch(getAllShowtimes());

//   const graphics = {
//     labels: countByTitle,
//     datasets: [
//       {
//         label: "Showtimes amount",
//         data: countByAmount,
//         backgroundColor: ["rgb(255, 49, 90)", "rgb(73, 122, 166)"],
//         borderColor: "rgba(236, 233, 233, 0.589)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   return graphics;
// }

// // export const UserData = [
// //     {
// //       id: 1,
// //       year: 2016,
// //       userGain: 80000,
// //       userLost: 823,
// //     },
// //     {
// //       id: 2,
// //       year: 2017,
// //       userGain: 45677,
// //       userLost: 345,
// //     },
// //     {
// //       id: 3,
// //       year: 2018,
// //       userGain: 78888,
// //       userLost: 555,
// //     },
// //     {
// //       id: 4,
// //       year: 2019,
// //       userGain: 90000,
// //       userLost: 4555,
// //     },
// //     {
// //       id: 5,
// //       year: 2020,
// //       userGain: 4300,
// //       userLost: 234,
// //     },
// //    ];

// //harcodeo de datos para los graficos
