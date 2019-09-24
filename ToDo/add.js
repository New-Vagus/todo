let checkCheked = document.getElementsByClassName('todoinput');
let listSpan = document.getElementsByClassName('editspan');
let blockDone = document.getElementById('block-done');
let block1 = document.getElementById('block-1').innerHTML;
let statusToDo = document.getElementById('statusbar-todo');
let statusDone = document.getElementById('statusbar-done');
let maxWidth;
let widthBar = 0;
let number = 0;

document.getElementById('block-done').innerHTML = localStorage.getItem('block-done');
document.getElementById('block-1').innerHTML = localStorage.getItem('block-1');
statusToDo.innerHTML = localStorage.getItem('width1');
statusDone.innerHTML = localStorage.getItem('width2');
// function checkOk() {
//   if (blockDone) {
//     for (i = 0; i < blockDone.children.length; i++){
//       console.log(blockDone.children[i]);
//       blockDone.children[i].querySelectorAll('input').setAttribute('checked', 'checked');
//     }
//   }
// }
// checkOk();
// let todoItem = {
//  text: '',
//  id: '',
//  status: ''
// }

// [todoItem, todoItem, todoItem].forEach(viewElem)

// function viewElem(todo) {
//   let view = `<li id=${todo.id}>
//                 <span>${todo.text}</span>
//                 <input type="checkbox" ${ todo.status && "checked"}>
//               </li>`

//   if (todo.status) blockDone.innerHTML(view);
//   else block1(view)
// }

// [].find(todo => if (todo.id === liId) todo.status = true)

function createLi(){
	const element = document.getElementById('block-1');
	const listElem = document.createElement('li');
	const input = document.getElementById('txt').value;

	listElem.className = 'list';
	listElem.innerHTML = '<input type="checkbox" class="todoinput"><span class="editspan">' + input + 
	'</span><img class="delete" id="delete' + String(number) + '" src="img.gif">';
	number++;

	element.appendChild(listElem);

  localStorage.setItem('block-1', document.getElementById('block-1').innerHTML);
  localStorage.setItem('block-done', document.getElementById('block-done').innerHTML);

  listing();
  dblSpan();
  deleteLi();
  progressNum();


}

const inputOnFocus = document.getElementById('txt');
inputOnFocus.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13 && inputOnFocus.value === ''){
    	alert('Did you forget to type your item?');
      return;
    }

    if (e.keyCode === 13 && inputOnFocus.value) {
        createLi();
        inputOnFocus.value = null;
        inputOnFocus.focus();
    }
    return false;
}

function listing() {
  for (let i = 0; i < checkCheked.length; i++) {
    checkCheked[i].onclick = function() {
      checkChekedNew = checkCheked[i];
      if (checkChekedNew.checked) {
          checkChekedNew.setAttribute('checked', 'checked');
          document.getElementById('block-done').appendChild(checkChekedNew.parentElement);
          progressNum();
          return listing();
      } else {
          checkChekedNew.removeAttribute('checked');
          document.getElementById('block-1').appendChild(checkChekedNew.parentElement);
          progressNum();
          return listing();
      }
    }

  }
  localStorage.setItem('block-1', document.getElementById('block-1').innerHTML);
  localStorage.setItem('block-done', document.getElementById('block-done').innerHTML);
}

function dblSpan() {
	for (i = 0; i < listSpan.length; i++){
	  let target = listSpan[i];
	  target.ondblclick = function() {
	  	if (target.children.length < 1){
	  		let defaultValue = target.innerText; 
	  		let buttonNum = String(document.getElementsByClassName('save-button').length);
		  	target.innerHTML = '<input type="text" class="redact" value="' + target.innerText + 
			  	'"><button id="save' + buttonNum + '" class="save-button">save</button><button id="cancel' +
			  	buttonNum + '" class="cancel-button">cancel</button>';
		  	buttonClick(target, buttonNum, defaultValue);
	  	} else {
	  		return;
	  	}
	  }
	}
}


function buttonClick(target, buttonNum, defaultValue) {
	const buttonCancel = document.getElementById('cancel' + buttonNum);
	const buttonSave = document.getElementById('save' + buttonNum);
	buttonSave.onclick = function(){
		target.innerHTML = target.firstChild.value;
    localStorage.setItem('block-1', document.getElementById('block-1').innerHTML);
    localStorage.setItem('block-done', document.getElementById('block-done').innerHTML);
	}

	buttonCancel.onclick = function(){
		target.innerHTML = defaultValue;
    localStorage.setItem('block-1', document.getElementById('block-1').innerHTML);
    localStorage.setItem('block-done', document.getElementById('block-done').innerHTML);
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


function move() {
  let elem = document.getElementById('statusbar-done');
  let id = setInterval(frame, 16);
  function frame() {
    if (widthBar === maxWidth) {
      clearInterval(id);
    } else if (widthBar < maxWidth) {
      widthBar++;
      elem.style.width = widthBar + '%';
      statusToDo.style.width = widthBar + '%';
    } else if (widthBar > maxWidth) {
      widthBar--;
      elem.style.width = widthBar + '%';
      statusToDo.style.width = widthBar + '%';
      localStorage.setItem('width1', statusToDo.innerHTML);
      localStorage.setItem('width2', elem.innerHTML);
    }
  }
}

const elementLi = document.getElementsByClassName('list');
function deleteLi() {
	for(i = 0; i < elementLi.length; i++) {
		const deleteThisLi = elementLi[i];
		deleteThisLi.lastChild.onclick = function() {
			deleteThisLi.remove();
			listing();
      localStorage.setItem('block-1', document.getElementById('block-1').innerHTML);
      localStorage.setItem('block-done', document.getElementById('block-done').innerHTML);
      progressNum();
			return deleteLi();
		}
	}
}
listing();
dblSpan();
deleteLi();
progressNum();






