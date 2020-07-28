import $ from 'jquery';

import store from './store';
import api from './api';


const displayNavButtons = function () {
   let nav 
    if (store.adding){
      nav = `
    <button class="add-new-bookmark">New Bookmark</button>
    <select class="filter-view">
      <option value="">Filter Bookmarks</options>
      <option value="1">1</options>
      <option value="2">2</options>
      <option value="3">3</options>
      <option value="4">4</options>
      <option value="5">5</options>
    </select>`
    } else {
      nav = ``
    }
    $('header > section').html(nav)
}

const generateBookmark = function (bookmark) {
  displayNavButtons()
  if (store.adding) {  
    if (bookmark.expanded) {
      return `
      <div>
      <h2 id='${bookmark.id}' class='bookmark-title'>${bookmark.title}</h2>
      <span>${bookmark.rating ||""}</span>
      <p>${bookmark.desc}</p>
      <a href='${bookmark.url}' target='_blank'>Visit</a>
      <button id='delete-button'>Delete</button>
      </div>`
    } else {
    return `
    <div>
    <h2 style="display:inline-block; cursor:pointer" id='${bookmark.id}' class='bookmark-title'>${bookmark.title}</h2>
    <span>${bookmark.rating ||""}</span>
    </div>
    `
    }
  } else {
    return `
     <form id="bookmark-form">
     <h3>Create new bookmark</h3>
      <label for="bookmark-entry"></label>
      <input type="url" name="new-bookmark-url" class="new-bookmark-url" placeholder="Google.com"
        required>
        <input type="text" name="new-bookmark-title" class="new-bookmark-title" placeholder="Page title"
        required>
        <input type="text" name="new-bookmark-desc" class="new-bookmark-desc" placeholder="Page description"
        required>
        <div class='ratingSystem'>
          <input id="rating-1" type="radio" name="rating" value="1">
          <label for="rating-1">1</label>
          <input id="rating-2" type="radio" name="rating" value="2">
          <label for="rating-2">2</label>
          <input id="rating-3" type="radio" name="rating" value="3">
          <label for="rating-3">3</label>
          <input id="rating-4" type="radio" name="rating" value="4">
          <label for="rating-4">4</label>
          <input id="rating-5" type="radio" name="rating" value="5">
          <label for="rating-5">5</label>
        </div>
        <div class='error-container'></div>
      <button type="submit">Submit</button>
      <button class="cancel-button" type="button">Cancel</button>
    </form>`
  }
};

const generateBookmarkString = function (bookmarks) {
  if (store.adding) {
    const items = bookmarks.map((item) => generateBookmark(item));
    return items.join(''); //.join() combines individual strings to list
  } else {
    return generateBookmark()
  }
};

const generateError = function (message) {
  return `
      <section class="error-content">
        <button type="button" id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = function () {
  $('.container').on('click', '#cancel-error', () => {
    console.log("working")
    store.error = null;
    renderError();
  });
};

const render = function (data = [...store.bookmarks]) {
  renderError();

  // Filter item list if store prop is true by item.checked === false
  let bookmarks = data;

  // render the shopping list in the DOM
  const bookmarkString = generateBookmarkString(bookmarks);

  // insert that HTML into the DOM
  $('.container').html(bookmarkString);
};

const deleteBookmark = function () {
  $('.container').on('click', '#delete-button', (e) => {
    const id = $(e.currentTarget).parent().find('.bookmark-title').attr('id')
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};

const newBookmark = function () {
  $('header').on('click', '.add-new-bookmark', (e) => {
    store.adding = false
    render()
  })
}

const submitForm = function () {
  $('header').on('submit', '#bookmark-form', (e) => {
    e.preventDefault()
    let url = $('.new-bookmark-url').val()
    let title = $('.new-bookmark-title').val()
    let desc = $('.new-bookmark-desc').val()
    let rating = $('input[type="radio"]:checked').val()
    const newBookmark = {
      url,
      title,
      desc,
      rating
    }
    api.createNewBookmark(newBookmark)
      .then((bookmark) => {
        store.addBookmark(bookmark)
        store.adding = true
        render()
      })
      .catch(error => {
        error.then(data => {
          store.error = data.message
          renderError()
        })
      })
      
  })
}

const cancelButton = function() {
  $('.container').on('click', '.cancel-button', (e) => {
    store.adding = true
    render()
  })
}

const expandedBookmark = function() {
  $('.container').on('click', '.bookmark-title', (e) => {
    let id = $(e.currentTarget).attr('id')
    let currentBookmark = store.findById(id)
    currentBookmark.expanded = !currentBookmark.expanded
    let filtered = store.filterRating(store.filtered)
    render(filtered)
  })
}

const filterBookmarkView = function() {
  $('header').on('change', '.filter-view', (e) => {
    let rating = $(e.currentTarget).val()
    store.filtered = rating
    let filtered = store.filterRating(rating)
    render(filtered)
  })
}

const bindEventListeners = function () {
  deleteBookmark();
  newBookmark();
  submitForm();
  filterBookmarkView();
  cancelButton();
  expandedBookmark();
  handleCloseError();
};

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners
};

