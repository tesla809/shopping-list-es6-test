const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionButtonInput = document.querySelector('input.description');
const descriptionButtonP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
// added this- to target this ul in case there are other uls later on.
const listUl = listDiv.querySelector('ul');
const listItems = document.getElementsByTagName('li');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const removeItemButton = document.querySelector('button.removeItemButton');
const listChildren = listUl.children;

// attach buttons to pre-loaded data
// mod this if loading data with ajax
const addButtonsToPreloadData = (itemsList) => {
  for (let i = 0; i < itemsList.length; i++){
    attachListItemButtons(itemsList[i]);
  }
};

const attachListItemButtons = (li) => {
  let upButton = document.createElement('BUTTON');
  upButton.className = 'up';
  upButton.textContent = 'Up';
  
  let downButton = document.createElement('BUTTON');
  downButton.className = 'down';
  downButton.textContent = 'Down';
  
  let removeButton = document.createElement('BUTTON');
  removeButton.className = 'remove';
  removeButton.textContent = 'Remove';
  
  li.appendChild(upButton);
  li.appendChild(downButton);
  li.appendChild(removeButton);
};

const highlightListItems = (event) => {
  if (event.target.tagName === 'LI'){
    let li = event.target;
    li.style.backgroundColor = 'lightyellow';
  }
};

const unHighlightListItems = (event) => {
  if (event.target.tagName === 'LI'){
    event.target.style.backgroundColor = 'white';
   }
};

const removeListItemButton = (event) => {
  if (event.target.className === 'remove'){
    let li = event.target.parentNode;
    // DOM traversal - move between elements
    let ul = li.parentNode;
    ul.removeChild(li);
  }
};

const toggleListDisplay = () => {
  if (listDiv.style.display === 'none'){
    toggleList.textContent = 'Hide list';
    listDiv.style.display = 'block';
  } else {
     toggleList.textContent = 'Show list';   
     listDiv.style.display = 'none';
   }
};

const setListDescription = () => {
  if (descriptionButtonInput.value === ''){
    descriptionButtonInput.value = '';
  } else {
    descriptionButtonP.textContent = descriptionButtonInput.value + ':';
    descriptionButtonInput.value = '';    
  }
};

const moveItemUp = (event) => {
  if (event.target.className  === 'up'){
    let li = event.target.parentNode;
    let prevLi = li.previousElementSibling;
    let ul = li.parentNode;
    if (prevLi){
      // parentNode.insertBefore(itemToInsert, itemToBeInsertedBefore)
      ul.insertBefore(li, prevLi);
    }
  }
};

const moveItemDown = (event) => {
  if (event.target.className  === 'down'){
    let li = event.target.parentNode;
    let nextLi = li.nextElementSibling;
    let ul = li.parentNode;
    if (nextLi != null){
      let nextNextLi = nextLi.nextElementSibling;
      // parentNode.insertBefore(itemToInsert, itemToBeInsertedBefore)
      // no insertAfter() method, but placing nextLi before li does the same
      ul.insertBefore(nextLi, li);
    }
  }
};

const addItem = () => {
  let li = document.createElement('li');
  if (addItemInput.value === ''){
    addItemInput.value = 'add something'
  } else {
    li.textContent = addItemInput.value;
    attachListItemButtons(li);
    listUl.appendChild(li);
    addItemInput.value = '';
  }
};

const removeItemFromList = () => {
  // if value is empty space remove last item
  if (addItemInput.value === ''){
  // another way of doing it
  // let listUlArray = listUl.querySelectorAll('li');
  // let lastElement = listUlArray[listUlArray.length - 1];
    let lastElement = listUl.querySelectorAll('li:last-child')[0];
    console.log(lastElement);
    listUl.removeChild(lastElement);
    // else remove the item written in field
  } else {
    let removeItem = addItemInput.value;
    let listUlArray = listUl.querySelectorAll('li')
    let listUlLength = listUlArray.length;
    let foundItem = false;

    for (var i = 0; i < listUlLength; i++){
      let targetText = listUlArray[i].textContent;
      let targetTextNoRemove = targetText.substring(0, targetText.length - 7);
      //Bug- this needs fixing
      if (targetTextNoRemove ===  removeItem){
        console.log('x')
        // remove li element typed into the field.
        listUl.removeChild(listUlArray[i]);
        // else: alert x + "not found in list"
        foundItem = true; 
        addItemInput.value = '';
      }
    }
      if (!foundItem){
        addItemInput.style.outline = 'none';
        addItemInput.style.borderColor = 'tomato';
        addItemInput.style.boxShadow = '0 0 20px tomato';
      }
  }
};

const inputBoxInFocusHightlight = () => {
  addItemInput.style.outline = 'none';
  addItemInput.style.borderColor = '#9ecaed';
  addItemInput.style.boxShadow = '0 0 10px #9ecaed';
};

const inputBoxNoFocusHightlight = () => {
    addItemInput.style.outline = 'none';
    addItemInput.style.border = '1px solid #dcdcdc';
    addItemInput.style.boxShadow = 'none';
}

// if empty, sets input field back to normal 
const inputBoxBackToNormal = () => {
  if (addItemInput === ''){
    addItemInput.style.outline = 'none';
    addItemInput.style.border = '1px solid #dcdcdc';
    addItemInput.style.boxShadow = 'none';
  }
};

// load buttons to preloaded data
addButtonsToPreloadData(listChildren);

// Using event bubbling to binding event to parent list div, so that you can bind event listeners to all li tags.
// This way it takes up less memory and applies to all new li tags after being created 
listDiv.addEventListener('mouseover', highlightListItems);

listDiv.addEventListener('mouseout', unHighlightListItems);

toggleList.addEventListener('click', toggleListDisplay);

descriptionButton.addEventListener('click', setListDescription);

// move list up when clicked on
listUl.addEventListener('click', moveItemUp);

// move list down when clicked on
listUl.addEventListener('click', moveItemDown);

// add Item.
// when mouse over, items turn purple and upper case
addItemButton.addEventListener('click', addItem);

// removes items. If input field is blank, it deletes the last item
// if it has an item on the list, it is deleted.
// if the item is not on the list, box is turned red
removeItemButton.addEventListener('click', removeItemFromList);
  
// when in focus
addItemInput.addEventListener('focus', inputBoxInFocusHightlight);

// when out of focus
addItemInput.addEventListener('blur', inputBoxNoFocusHightlight);

// if empty, sets input field back to normal   
addItemInput.addEventListener('keyup', inputBoxBackToNormal);

// remove list item when clicked on
// changed listDiv to listUl
listUl.addEventListener('click', removeListItemButton);



  

  
  
