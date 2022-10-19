import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRooms,
  logicDeleteRoom,
  postNewRoom,
} from "../../redux/actions/rooms";
import { useAuth } from "../contexts/AuthContext";

import style from "../../scss/components/AdminPanel/_rooms.module.scss";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

function Rooms() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const roomsBackend = useSelector((state) => state.roomReducer.rooms);

  /* Estas dos lineas es para saber cuál es el último numero de sala creada y seguir un orden */
  const lastRoom = roomsBackend
    ? roomsBackend[roomsBackend.length - 1]
    : undefined;
  const roomNumber = lastRoom ? lastRoom.number : undefined;

  /* Esto es para saber el tamaño de las salas que viene del backend y clasificarlas en Regular, Pemiere y Small*/
  const rooms = roomsBackend
    ? roomsBackend.map((e) => {
      const type =
        e.columns <= 10 ? "Small" : e.columns === 12 ? "Regular" : "Premiere";
      return { value: e._id, label: `Room N° ${e.number} - Size: ${type}` };
    })
    : [];

  const [room, setRoom] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const roomTypes = {
    small: { columns: 10, rows: 7 },
    medium: { columns: 12, rows: 7 },
    big: { columns: 15, rows: 7 },
  };

  function handleSelect(e) {
    setRoom(roomTypes[e.target.value]);
    setSelectValue(e.target.value);
  }

  function handleSubmit() {
    dispatch(postNewRoom({ ...room, number: roomNumber ? roomNumber + 1 : 1 }, currentUser));
    setRoom("");
  }

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  function handleDelete(e, f) {
    Swal.fire({
      title: "Are you sure you want to delete this movie theater?",
      html: `<div>
            <p><span style='font-weight: 700;'>Movie Theater:</span></br></br> ${f._id ? rooms.find((r) => r.value === f._id).label : ""
        }</p>
          </div>`,
      icon: "question",
      iconColor: "#497aa6",
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: "Yes, I am sure",
      denyButtonText: "No, cancel delete",
      allowEnterKey: false,
      customClass: {
        popup: "Alert",
        closeButton: "closeButton",
        confirmButton: "confirmButton",
        denyButton: "denyButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const roomId = f._id;
        dispatch(logicDeleteRoom(roomId, currentUser));
      }
    });
  }

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  return (
    <div className={style.mainContainer}>
      <form>
        <h2>Movie Theater Creation</h2>
        <div className={style.subtitleContainer}>
          {
            <p>
              Create movie theater number:{" "}
              <span>{roomNumber ? roomNumber + 1 : "Loading..."}</span>
            </p>
          }
        </div>
        <div className={style.inputContainer}>
          <label className={style.malditoLabel}>Select room type</label>
          <select value={selectValue} onChange={(e) => handleSelect(e)}>
            <option disabled value="">
              Select type room
            </option>
            <option value="big">Premiere</option>
            <option value="medium">Regular</option>
            <option value="small">Small</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          disabled={room === "" ? true : false}
        >
          Create
        </button>
      </form>
      <div>
        <h2>Created Movie Theaters</h2>
        <div className={style.roomCardsContainer}>
          {roomsBackend
            ? roomsBackend.map((f) => {
              const type =
                f.columns <= 10
                  ? "Small"
                  : f.columns === 12
                    ? "Regular"
                    : "Premiere";

              return (
                <div className={style.roomCard}>
                  <p>
                    {" "}
                    Movie theater <span>N° {f.number}</span> - Size:{" "}
                    <span>{type}</span>
                  </p>
                  <button
                    className={style.closeBtn}
                    onClick={(e) => handleDelete(e, f)}
                  >
                    X
                  </button>
                </div>
              );
            })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
