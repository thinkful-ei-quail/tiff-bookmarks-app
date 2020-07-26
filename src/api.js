import { data } from "jquery";

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tiff';

const getBookmarks = function () {
return fetch(`${BASE_URL}/bookmarks`);
};

const createNewBookmark = function(bookmark) {
    const newBookmark = JSON.stringify(bookmark);
    return fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: newBookmark
      })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.json().then(error => error))
        }
        return res.json()
      })
      .then(data => data)
    };

const deleteBookmark = function (id) {
    return fetch(BASE_URL + '/bookmarks/' + id, {
      method: 'DELETE'
    });
  };


export default{
    getBookmarks,
    createNewBookmark,
    deleteBookmark,
};