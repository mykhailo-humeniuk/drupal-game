import React from 'react';
import ReactDOM from 'react-dom';

/* Import Components */
// import DrupalProjectStats from './components/DrupalProjectStats';
// import NodeListOnly from "./components/NodeListOnly";
// import NodeReadWrite from "./components/NodeReadWrite";
import NodeReadWrite from "./components/NodeReadWriteReducer";

// const Main = () => (
//   <NodeListOnly />
// );

ReactDOM.render(<NodeReadWrite />,  document.getElementById('react-app'));
