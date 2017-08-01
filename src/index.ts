import { toDoList } from "./toDoList";
import { toDoObject } from "./toDoList";
import { toDoItem } from "./toDoItem";

const toDoListArray: Array<toDoObject> = [];
const toDoApp = new toDoList(toDoListArray);
toDoApp.checkVisibility();

let newToDo = document.querySelector(".new-todo") as HTMLInputElement;
newToDo.addEventListener('keydown', (e) => {
	let key = e.which;
	if (key === 13) {

		let toDoValue = newToDo.value.trim();
		newToDo.value = '';

		let arrayLength = toDoApp.returnArrayLength()
		let newToDoItem = new toDoItem('li' + arrayLength, toDoValue, toDoApp, toDoListArray);

		toDoApp.addToDo(newToDoItem.element);
		toDoApp.checkVisibility();
		toDoApp.pushToDo(newToDoItem);

	}
}, false);
