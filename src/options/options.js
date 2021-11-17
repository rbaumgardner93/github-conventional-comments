const LIST_WRAPPER = document.querySelector( ".Options-addItemWrapper" );
const LIST = LIST_WRAPPER.querySelector("ul");

const createList = labels => {
	LIST.innerHTML = `${ labels.map( item =>
		`<li id=${ item }><span>&#10005; </span>${ item }</li>`
	).join('') }`;
};

let localStorage;
chrome.storage.sync.get( "labels", result => {
	localStorage = result.labels;
	createList( result.labels );
});

LIST.addEventListener( 'click', e => {
	var target = e.target;
	if (target.closest("span")) {
		localStorage = localStorage.filter( item => item !== target.closest("li").id );
		target.closest("li").remove();
		chrome.storage.sync.set( { labels: localStorage } );
	}
} );

document.querySelector("button").addEventListener( 'click', e => {
  var target = e.target;
  var input = target.closest(".Options-actionsWrapper").querySelector("input");
  var li = document.createElement("li");

  li.innerHTML = `<span>&#10005; </span>${ input.value }`;

  LIST.appendChild(li);
  localStorage.push( input.value );

  chrome.storage.sync.set( { labels: localStorage } );
  input.value = '';
});
