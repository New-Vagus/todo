const inputOnFocus = document.getElementById('txt');
let checkCheked = document.getElementsByClassName('todoinput');
let listSpan = document.getElementsByClassName('editspan');
let blockDone = document.getElementById('block-done');
let block1 = document.getElementById('block-1');
let statusToDo = document.getElementById('statusbar-todo');
let statusDone = document.getElementById('statusbar-done');
let maxWidth;
let widthBar = 0;
let todoList = [];

function generateId() {
  return `f${(+new Date).toString(16)}`
}

statusToDo.innerHTML = localStorage.getItem('width1');
statusDone.innerHTML = localStorage.getItem('width2');
if (localStorage.getItem('todo')){
  todoList = JSON.parse(localStorage.getItem('todo'));
}

function sortTodo(){
  for (i = 0; i < todoList.length; i++){
    let key = todoList[i];
    let input = key.todo;
    let value = key.check;
    let id = key.id;
    const element =`<li class="list">
                      <input type="checkbox" class="todoinput" id="${id}" value="${value}">
                      <span class="editspan">${input}</span>
                      <img class="delete" src="img.gif">
                    </li>`;
    if (!key.check) {
      block1.insertAdjacentHTML('beforeEnd', element); 
    } else {
      blockDone.insertAdjacentHTML('beforeEnd', element);
      document.getElementById(`${key.id}`).setAttribute('checked', 'checked');
    }               
  }
}
sortTodo();


inputOnFocus.onkeyup = function (e) {
  e = e || window.event;
  if (e.keyCode === 13 && inputOnFocus.value === ''){
  	alert('Did you forget to type your item?');
    return;
  }
  if (e.keyCode === 13 && inputOnFocus.value) {
    let temp = {};
    temp.todo = inputOnFocus.value;
    temp.check = false;
    temp.id = generateId();
    let i = todoList.length;
    todoList[i] = temp;
    const element =`<li class="list">
                      <input type="checkbox" class="todoinput" id="${temp.id}" value="${temp.check}">
                      <span class="editspan">${inputOnFocus.value}</span>
                      <img class="delete" src="img.gif">
                    </li>`;
    block1.insertAdjacentHTML('beforeEnd', element);
    inputOnFocus.value = null;
    inputOnFocus.focus();
    listing();
    dblSpan();
    deleteLi();
    progressNum();
    localStorage.setItem('todo', JSON.stringify(todoList));
  }
  return false;
}

function listing(e) {
  e = e || window.event;
  for (let i = 0; i < checkCheked.length; i++) {
    checkCheked[i].onclick = function() {
      checkChekedNew = checkCheked[i];
      if (checkChekedNew.checked) {
          let idCheck = todoList.find( elem => elem.id === checkChekedNew.id);
          idCheck.check = true;
          checkChekedNew.setAttribute('checked', 'checked');
          document.getElementById('block-done').appendChild(checkChekedNew.parentElement);
          progressNum();
          localStorage.setItem('todo', JSON.stringify(todoList));
          return listing();
      } else {
          let idCheck = todoList.find( elem => elem.id === checkChekedNew.id);
          idCheck.check = false;
          checkChekedNew.removeAttribute('checked');
          document.getElementById('block-1').appendChild(checkChekedNew.parentElement);
          localStorage.setItem('todo', JSON.stringify(todoList));
          progressNum();
          return listing();
      }
    }
  }
}

function dblSpan() {
	for (i = 0; i < listSpan.length; i++){
	  let target = listSpan[i];
	  target.ondblclick = function() {
	  	if (target.children.length < 1){
	  		let defaultValue = target.innerText;
        let todoValue = todoList.find( elem => elem.id === target.parentElement.firstElementChild.id);
	  		let buttonNum = String(document.getElementsByClassName('save-button').length);
		  	target.innerHTML = '<input type="text" class="redact" value="' + target.innerText + 
			  	'"><button id="save' + buttonNum + '" class="save-button">save</button><button id="cancel' +
			  	buttonNum + '" class="cancel-button">cancel</button>';
		  	buttonClick(target, buttonNum, defaultValue, todoValue);
	  	} else {
	  		return;
	  	}
	  }
	}
}


function buttonClick(target, buttonNum, defaultValue, todoValue) {
	const buttonCancel = document.getElementById('cancel' + buttonNum);
	const buttonSave = document.getElementById('save' + buttonNum);
	buttonSave.onclick = function(){
		target.innerHTML = target.firstChild.value;
    todoValue.todo = target.innerHTML;
    localStorage.setItem('todo', JSON.stringify(todoList));
	}

	buttonCancel.onclick = function(){
		target.innerHTML = defaultValue;
	}
}

function progressNum() {
	if (document.getElementById('block-done').children.length === 0){
		maxWidth = 0;
    move();
	} else {
		maxWidth = 100 - 100 / listSpan.length * 
		document.getElementById('block-1').children.length;
    maxWidth = Math.ceil(maxWidth)
    move();		
	}
}

function move(){
  let id = setInterval(frame, 16);
  function frame(){
    if (widthBar === maxWidth) {
      clearInterval(id);
    } else if (widthBar < maxWidth) {
      widthBar++;
      statusDone.style.width = widthBar + '%';
      statusToDo.style.width = widthBar + '%';
    } else if (widthBar > maxWidth) {
      widthBar--;
      statusDone.style.width = widthBar + '%';
      statusToDo.style.width = widthBar + '%';
    }      
    localStorage.setItem('width1', statusToDo.innerHTML);
    localStorage.setItem('width2', statusDone.innerHTML);
  }
}


function deleteLi() {
  const elementLi = document.getElementsByClassName('list');
	for(i = 0; i < elementLi.length; i++) {
		const deleteThisLi = elementLi[i];
    const todoDelete = todoList.findIndex( elem => elem.id === deleteThisLi.children[0].id);
		deleteThisLi.children[2].onclick = function() {
      deleteThisLi.remove();
      todoList.splice(todoDelete, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
			listing();
      progressNum();
			return deleteLi();
		}
	}
}
listing();
dblSpan();
deleteLi();
progressNum();
