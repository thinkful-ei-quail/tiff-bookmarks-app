const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tiff';

const getBookmarks = function () {
return fetch(`${BASE_URL}/bookmarks`);
};
debugger

// const createNewBookmark = function(bookmark) {
//     const newBookmark = JSON.stringify({ bookmark });
//     return fetch(`${BASE_URL}/bookmarks`, {
//         method: 'POST',
//         headers: {
//           'Content-Type' : 'application/json'
//         },
//         body: newBookmark
//       });
//     };
// }

// const updateBookmark = function(id, updateData){
//     const newData =  JSON.stringify(updateData);
//     return fetch(`${BASE_URL}/bookmarks/${id}`), {
//     method: 'PATCH',
//     headers: {
//         'Content-Type' : 'application/json'
//     },
//     body: newData
//     });
// };

const deleteBookmark = function (id) {
    return fetch(BASE_URL + '/bookmarks/' + id, {
      method: 'DELETE'
    });
  };


export default{
    getBookmarks,
    // createNewBookmark,
    // updateBookmark,
    deleteBookmark,
};