import React from "react";
import {TextField} from "@mui/material"
import style from '../css/Selector.module.css'

const DateSelector = ({ selectedDate, setSelectedDate }) => (
    <TextField
      type="date"      
      label="Date"
      value={selectedDate} 
      className={style.inputStyle}     
      onChange={(e) => setSelectedDate(e.target.value)}
    />
);

export default DateSelector;
