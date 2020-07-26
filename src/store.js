const bookmarks = []; //bookmarks will load here from API
let adding = true; //controls views b/n list view and add new view
let expanded = false;
let filtered = "";

const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const findAndUpdate = function (id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};

const filterRating = function (rating) {
  return this.bookmarks.filter(bookmark => bookmark.rating >= rating)
  // this.bookmarks = this.bookmarks.filter(bookmark => bookmark.rating >= rating)
}

export default {
  filtered,
  bookmarks,
  adding,
  expanded,
  filterRating,
  findById,
  addBookmark,
  findAndDelete,
  findAndUpdate
};