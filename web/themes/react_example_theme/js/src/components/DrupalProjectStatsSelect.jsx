import React, {useState} from "react";

const DrupalProjectStatsSelect = ({ projectList, onChangeCallback }) => {
  // console.log(projectList);
  // console.log(onChangeCallback);
  return (
    <select onChange={(e) => onChangeCallback(e.target.value)}>
      {
        projectList.map((item, index) => {
          // console.log(item , index);
          return <SelectItem text={item} key={index} />;
        })
      }
    </select>
  );
}

const SelectItem = ({ text }) => {
  return <option value={text}>{text}</option>
}

export default DrupalProjectStatsSelect;
