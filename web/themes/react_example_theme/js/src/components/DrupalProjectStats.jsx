import React, { useState, useEffect } from "react";
import { useTransition, useSpring, animated } from "react-spring";
import PropTypes from 'prop-types';

/* Import Components */
import DrupalProjectStatsButton from "./DrupalProjectStatsButton";
import DrupalProjectStatsSelect from "./DrupalProjectStatsSelect";

const DrupalProjectStats = ({ projectName }) => {
  const [project, setProject] = useState(projectName);
  const [usage, setUsage] = useState(null);
  const projectsList = ["drupal", "marquee", "pwa"];
  const transitions = useTransition(usage, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  useEffect(() => {
    setUsage(false);
    const data = fetch(
      `https://www.drupal.org/api-d7/node.json?field_project_machine_name=${project}`
    )
      .then(response => response.json())
      .then(result => {
        if (result.list[0].project_usage) {
          setUsage(result.list[0].project_usage);
        }
      })
      .catch(error => console.log("error", error));
  }, [project]);

  return (
    <div>
      <div>
        Choose a project:
        <br/>
        <DrupalProjectStatsSelect projectList={projectsList} onChangeCallback={setProject} />
      </div>
      <hr />
      <div className="project--name">
        Usage stats for <strong>{project}</strong> by version:
        {transitions((style, usage) => (
            usage ? (
              <animated.div style={style} className="project-wrapper">
                <ul>
                  {Object.keys(usage).map(key => (
                    <StatsItem count={parseInt(usage[key])} version={key} key={key} />
                  ))}
                </ul>
              </animated.div>
            ) : (
              <animated.div style={style} className="project-wrapper">
                <p>fetching data ...</p>
              </animated.div>
            )
          ))}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div>
  //       Choose a project:
  //       <br/>
  //       {/*<button onClick={() => setProject('drupal')}>Drupal core</button>*/}
  //       {/*<button onClick={() => setProject('marquee')}>Marquee</button>*/}
  //       {/*<button onClick={() => setProject('pwa')}>PWA</button>*/}
  //       {/*<DrupalProjectStatsButton onClickCallback={setProject} projectName="drupal" />*/}
  //       {/*<DrupalProjectStatsButton onClickCallback={setProject} projectName="marquee" />*/}
  //       {/*<DrupalProjectStatsButton onClickCallback={setProject} projectName="pwa" />*/}
  //       <DrupalProjectStatsSelect projectList={projectsList} onChangeCallback={setProject} />
  //     </div>
  //     <hr />
  //     <div className="project--name">
  //       Usage stats for <strong>{project}</strong> by version:
  //       {usage ? (
  //         <ul>
  //           {Object.keys(usage).map(key => (
  //             <StatsItem count={usage[key]} version={key} key={key} />
  //           ))}
  //         </ul>
  //       ) : (
  //         <p>fetching data ...</p>
  //       )}
  //     </div>
  //   </div>
  // );
};

// Provide type checking for props. Think of this as documentation for what
// props a component accepts.
// https://reactjs.org/docs/typechecking-with-proptypes.html
DrupalProjectStats.propTypes = {
  projectName: PropTypes.string.isRequired
};

// Set a default value for any required props.
DrupalProjectStats.defaultProps = {
  projectName: 'drupal',
};


/**
 * Another component: this one displays usage statistics for a specific version
 * of Drupal. It's not exported, so it can only be used in this file's scope.
 * Breaking things up like this can help make your code easier to maintain.
 */
const StatsItem = ({ count, version }) => (
  <li>
    <strong>{version}</strong>: {count}
  </li>
);

StatsItem.propTypes = {
  count: PropTypes.number,
  version: PropTypes.string,
};

export default DrupalProjectStats;
