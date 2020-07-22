import $ from 'jquery';

// import store from './store';
// import api from './api';

function renderInitialView(bookmarks) {
$('#root').html(`<div class="initialViewNav">
<div class="dropdown">
  <button onclick="myFunction()" class="dropbtn">Filter View</button>
  <div id="myDropdown" class="dropdown-content">
    <a href="#">1 stars and above</a>
    <a href="#">2 stars and above</a>
    <a href="#">3 stars and above</a>
    <a href="#">4 stars and above</a>
    <a href="#">5 stars and above</a>
  </div>
</div>
<button id="filterView" type="button">Filter View by Rating</button>
</div>
<form id="listMod">
<li class="bookMarkElement" data-item-id="${}">
  <p>Title of Page 3 of 5 stars</p>
</li>
<li class="bookMarkElement" data-item-id="${}">
  <p>Title of Page 2 of 5 stars</p>
</li>
<li class="bookMarkElement" data-item-id="${}">
  <p>Title of Page 5 of 5 stars</p>
</li>
</form>`)
}

renderInitialView