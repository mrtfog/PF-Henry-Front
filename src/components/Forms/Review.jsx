import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  userId: "1234",
  movieId: "",
  stars: 0,
  description: "",
};
export default function Review() {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  return <div></div>;
}
