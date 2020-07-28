import $ from 'jquery';

import './style.css';

import api from './api';
import store from "./store"
import bookmark from "./bookmark"

function main() {
  api.getBookmarks()
  .then(res => res.json())
  .then(bookmarks => {
    console.log(bookmarks)
    bookmarks.forEach(bookmark => {
      store.addBookmark(bookmark)
    })
    bookmark.render()
    bookmark.displayNavButtons()

  }) 
  bookmark.bindEventListeners()
  bookmark.render()
}


$(main);