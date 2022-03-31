import React from "react";
import { getAuthClient } from "../utils/auth";

const auth = getAuthClient();

const NodeDelete = ({ id, title, onSuccess }) => {
  const doConfirm = () => window.confirm(`Are you sure you want to delete ${title}?`);

  const doDelete = () => {
    const fetchUrl = `/jsonapi/node/article/${id}`;
    const fetchOptions = {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Cache': 'no-cache'
      }),
    };

    try {
      auth.fetchWithAuthentication(fetchUrl, fetchOptions)
        .then(response => {
          // Should be 204. If so, call onSuccess callback.
          if (response.status === 204) {
            if (typeof onSuccess === 'function') {
              onSuccess(id);
            }
          }
        });
    } catch (error) {
      console.log('API error', error);
    }
  };

  return (
    <button onClick={event => doConfirm() && doDelete()}>delete</button>
  );
};

export default NodeDelete;
