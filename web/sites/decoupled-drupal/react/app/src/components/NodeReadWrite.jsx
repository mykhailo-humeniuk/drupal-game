import React, {useEffect, useReducer, useState} from "react";
import NodeAdd from "./NodeAdd";
import NodeEdit from "./NodeEdit";
import NodeDelete from "./NodeDelete";
import { getAuthClient } from "../utils/auth";



const auth = getAuthClient();

const NEXT_PAGE = 'next';
const PREV_PAGE = 'prev';

/**
 * Helper function to validate data retrieved from JSON:API.
 */
const isValidData = data => {
  return !(data === null || data.data === undefined || data.data === null || data.data.length === 0);
}

/**
 * Reduser
 */
// const reducer = (state, action) => {
//   switch (action.type) {
//     case NEXT_PAGE: return {...state, offset: state.offset + 10}
//     case PREV_PAGE: return {...state, offset: state.offset - 10}
//     default: return state
//   }
// }

/**
 * Component form displaying an individual article, with optional admin features.
 */
const NodeItem = ({id, drupal_internal__nid, title, body, contentList, updateContent}) => {
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  const handleClick = event => {
    event.preventDefault();
    setShowAdminOptions(!showAdminOptions);
  };

  const onEditSuccess = data => {
    // Replace the edited item in the list with updated values.
    const idx = contentList.findIndex(item => item.id === data.id);
    console.log('index', {idx, data, content: contentList});
    contentList[idx] = data;
    updateContent([...contentList]);
  };

  const onDeleteSuccess = id => {
    // Remove the deleted item from the list.
    const list = contentList.filter(item => item.id !== id);
    updateContent([...list]);
  }

  if (showAdminOptions) {
    return (
      <div>
        <hr/>
        Admin options for {title}
        <NodeEdit
          id={id}
          title={title}
          body={body.value}
          onSuccess={onEditSuccess}
        />
        <hr/>
        <button onClick={handleClick}>cancel</button>
        <NodeDelete
          id={id}
          title={title}
          onSuccess={onDeleteSuccess}
        />
        <hr/>
      </div>
    );
  }

  // Show just the item.
  return (
    <div>
      <a href={`/node/${drupal_internal__nid}`}>{title}</a>
      {" -- "}
      <button onClick={handleClick}>edit</button>
    </div>
  );
};

/**
 * Component to render when there are no articles to display.
 */
const NoData = () => (
  <div>No articles found</div>
);

/**
 * Display a list of Drupal article nodes.
 *
 * Retrieves articles from Drupal's JSON:API and then displays them along with
 * admin features to create, update and delete articles.
 */
const NodeReadWrite = () => {
  const [content, updateContent] = useState([]);
  const [filter, setFilter] = useState(null);
  const [showNodeAdd, setShowNodeAdd] = useState(false);

  useEffect(() => {
    // This should point to your local Drupal instance. Alternatively, for React
    // applications embedded in a Drupal theme or module this could also be set
    // to a relative path.
    const API_ROOT = '/jsonapi/';
    const url = `${API_ROOT}node/article?fields[node--article]=id,drupal_internal__nid,title,body&sort=-created&page[limit]=10&page[offset]=0`;
    // const url = `${API_ROOT}node/article?fields[node--article]=id,drupal_internal__nid,title,body&sort=-created&page[limit]=10&page[offset]=${state.offset}`;

    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });

    auth.fetchWithAuthentication(url, {headers})
      .then(response => response.json())
      .then(data => {
        if (isValidData(data)) {
          // Initialize the list of content with data retrieved from Drupal.
          updateContent(data.data);
        }
      })
      .catch(err => console.log('There was an error accessing the API', err));
  }, []);

  // Handle updates to state when a node is added.
  const onNodeAddSeccess = data => {
    // Add the new item to the top of the list.
    content.unshift(data);
    // Note the use of [...content] here, this is because we're
    // computing new state based on previous state and need to use a
    // functional update. https://reactjs.org/docs/hooks-reference.html#functional-updates
    // [...content] syntax creates a new array with the values of
    // content, and updates the state to that new array.
    updateContent([...content]);
  };

  return (
    <div>
      <h2>Site content</h2>
      {content.length ? (
        <>
          <label htmlFor="filter">Type to filter:</label>
          <input
            type="text"
            name="filter"
            placeholder="Start typing ..."
            onChange={event => setFilter(event.target.value.toLowerCase())}
          />
          <hr/>
          {
            // If there's a `filter` apply it to the list of nodes.
            content.filter(item => {
              if (!filter) {
                return item;
              }
              if (filter && (item.attributes.title.toLowerCase().includes(filter) || item.attributes.body.value.toLowerCase().includes(filter))) {
                return item;
              }
            }).map(item => (
              <NodeItem
                key={item.id}
                id={item.id}
                updateContent={updateContent}
                contentList={content}
                {...item.attributes}
              />
            ))
          }
          <hr/>
          <div className="pager-wrapper">
            {/*<button className="prev pager" onClick={prev}>Prev</button>*/}
            {/*<button className="next prev" onClick={next}>Next</button>*/}
          </div>
        </>
      ) : (
        <NoData />
      )}
      <hr/>
      {showNodeAdd ? (
        <>
          <h3>Add a new article</h3>
          <NodeAdd onSuccess={onNodeAddSeccess} />
        </>
      ) : (
        <p>
          Don't see what you're loking for?
          <button onClick={() => setShowNodeAdd(true)}>Add a node</button>
        </p>
      )}
    </div>
  );
};

export default NodeReadWrite;
