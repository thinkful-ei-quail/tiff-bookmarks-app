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
          let error = res.status.error
          console.log(res)
          return Promise.reject(error)
        }
      })
      .catch(error => error)
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