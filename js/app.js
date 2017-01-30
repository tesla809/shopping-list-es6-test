const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionButtonInput = document.querySelector('input.description');
const descriptionButtonP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = document.getElementsByTagName('ul')[0];
const listItems = document.getElementsByTagName('li');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const removeItemButton = document.querySelector('button.removeItemButton');

const highlightListItems = (event) => {
  if (event.target.tagName === 'LI'){
    event.target.style.color = 'purple';
    event.target.textContent = event.target.textContent.toUpperCase();
  }
};

const unhighlightListItems = (event) => {
  if (event.target.tagName === 'LI'){
    event.target.style.color = 'black';
    event.target.textContent = event.target.textContent.toLowerCase();
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

const addItem = () => {
  let li = document.createElement('li');
  if (addItemInput.value === ''){
    addItemInput.value = 'add something'
  } else {
    li.textContent = addItemInput.value;
    listUl.appendChild(li);
    addItemInput.value = '';
  
    li.addEventListener('mouseover', () => {
      li.style.color = 'purple';
      li.textContent = li.textContent.toUpperCase();
    });
  }
};

const removeItem = () => {
  // if value is empty space remove last item
  if(addItemInput.value === ''){
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
    for(var i = 0; i < listUlLength; i++){
      if(listUlArray[i].textContent ===  removeItem){
        // remove li element typed into the field.
        listUl.removeChild(listUlArray[i]);
        // else: alert x + "not found in list"
        foundItem = true; 
        addItemInput.value = '';
      }
    }
      if(!foundItem){
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
  if(addItemInput === ''){
    addItemInput.style.outline = 'none';
    addItemInput.style.border = '1px solid #dcdcdc';
    addItemInput.style.boxShadow = 'none';
  }
};


// Using event bubbling to binding event to parent list div, so that you can bind event listeners to all li tags.
// This way it takes up less memory and applies to all new li tags after being created 
listDiv.addEventListener('mouseover', highlightListItems);

listDiv.addEventListener('mouseout', unhighlightListItems);

toggleList.addEventListener('click', toggleListDisplay);

descriptionButton.addEventListener('click', setListDescription);

// add Item.
// when mouse over, items turn purple and upper case
addItemButton.addEventListener('click', addItem);

// removes items. If input field is blank, it deletes the last item
// if it has an item on the list, it is deleted.
// if the item is not on the list, box is turned red
removeItemButton.addEventListener('click', removeItem);
  
// when in focus
addItemInput.addEventListener('focus', inputBoxInFocusHightlight);

// when out of focus
addItemInput.addEventListener('blur', inputBoxNoFocusHightlight);

// if empty, sets input field back to normal   
addItemInput.addEventListener('keyup', inputBoxBackToNormal);
  

  
  
