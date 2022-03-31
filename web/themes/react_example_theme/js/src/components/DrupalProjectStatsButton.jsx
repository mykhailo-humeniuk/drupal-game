import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

const DrupalProjectStatsButton = ({ projectName, onClickCallback }) => {
  return <button onClick={() => onClickCallback(projectName)}>{projectName}</button>
};

export default DrupalProjectStatsButton;
