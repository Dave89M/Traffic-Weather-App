import React from "react";
import style from '../css/Selector.module.css'
import { TextField } from "@mui/material";

const TimeSelector = ({ selectedTime, setSelectedTime }) => (
  <TextField
    type="time"
    label="Time"
    value={selectedTime}
    className={style.inputStyle}
    format='hh:mm:s'
    onChange={(e) => setSelectedTime(e.target.value)}
  />
);

export default TimeSelector;
