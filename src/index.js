import $ from 'jquery';

import './style.css';

import api from './api';

// function main() {
//   console.log('DOM is loaded');

//   const startMsg = $('<p>Webpack is working!</p>');
//   $('#root').html(startMsg);
// }

function main() {
  api.getBookmarks()
  .then(res => res.json())
  .then((bookmarks => console.log(bookmarks)) 
  
  )}

$(main);