import { toDoObject } from "./toDoList"
import { toDoList } from "./toDoList"
import { iToDoItem } from "./toDoList"

export class toDoItem {
	public toDoListArray: Array<toDoObject>;
	public parent: toDoList
	public id: string
	public state: boolean
	public element: HTMLElement
	public container: HTMLElement
	public completedInput: HTMLInputElement
	public destroyButton: HTMLButtonElement
	public label: HTMLLabelElement
	public parentLi : HTMLElement
	
	constructor(passedId: string, inputValue: string, parent: toDoList, toDoListArray: Array<toDoObject>) {
		this.toDoListArray = toDoListArray
		this.parent = parent;
		this.id = passedId
		this.state = false;
		this.label = document.createElement("label")
		this.label.innerHTML = inputValue;
		this.container = document.createElement("div");
		this.destroyButton = document.createElement("button")
		this.destroyButton.className = "destroy";
		this.parentLi = document.querySelector(passedId) as HTMLInputElement
		this.completedInput = document.createElement("input");
		this.completedInput.type = "checkbox";
		this.completedInput.className = "toggle";
		this.element = document.createElement("li");
		this.element.appendChild(this.completedInput); 
		this.container.appendChild(this.completedInput);
		this.container.appendChild(this.label);
		this.container.appendChild(this.destroyButton);
		this.element.appendChild(this.container)
		this.label.addEventListener('click', () => {
		this.element.className = "editting"	
		this.label.contentEditable = "true";
		})
	
		this.label.addEventListener('keydown', (e) => {
			let key = e.which;
			if (key === 13 && this.label.contentEditable === "true") {
					this.label.contentEditable = "false";
					this.element.classList.remove("editting");
			}
		})

		this.completedInput.addEventListener('click', () => {
			this.container.classList.toggle('completed');
			let index = this.toDoListArray.findIndex((newToDoItem: iToDoItem) => newToDoItem.id == this.id)
			this.toDoListArray[index].state = !this.toDoListArray[index].state;
			this.parent.updateToDo();
		})

		this.destroyButton.addEventListener('click', () => {
			let index = this.toDoListArray.findIndex((newToDoItem: iToDoItem) => newToDoItem.id == this.id)
			if (index > -1) {
				this.parent.toDoListArray.splice(index, 1);
				this.parent.updateToDo()
				this.parent.checkVisibility();
				}
			this.element.remove();
		})
	}
}