const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tiff';

const getBookmarks = function () {
return fetch(`${BASE_URL}/bookmarks`);
};