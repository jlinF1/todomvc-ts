export interface toDoObject {
	toDoListArray: object[];
	parent: object
	id: string
	state: boolean
	element: HTMLElement
	container: HTMLElement
	completedInput: HTMLInputElement
	destroyButton: HTMLButtonElement
	label: HTMLLabelElement
	parentLi: HTMLElement
}

export interface iToDoItem {
	id: string
}

export class toDoList {
	public toDoListArray: Array<toDoObject>
	public main: HTMLInputElement;
	public footer: HTMLInputElement;
	public toDoElement: HTMLInputElement;
	public newToDo: HTMLInputElement;
	public count: number;
	public toDoCount: HTMLElement;

	constructor(toDoListArray: Array<toDoObject>) {
		this.toDoListArray = toDoListArray
		this.count = 0;
		this.main = document.querySelector(".main") as HTMLInputElement;
		this.footer = document.querySelector('.footer') as HTMLInputElement;
		this.toDoElement = document.querySelector(".todo-list") as HTMLInputElement;
		this.newToDo = document.querySelector(".new-todo") as HTMLInputElement;
		let clearCompleted = document.querySelector(".clear-completed") as HTMLButtonElement;

		clearCompleted.addEventListener('click', () => {
			let result = this.toDoListArray.filter(function (toDoItem) {
				return toDoItem.state == true
			});
			result.forEach((toDoItem) => {
				toDoItem.element.remove();
				let index = this.toDoListArray.findIndex((newToDoItem: iToDoItem) => newToDoItem.id == toDoItem.id)
				if (index > -1) {
					this.toDoListArray.splice(index, 1);
					this.updateToDo()
					this.checkVisibility();
				}
				toDoItem.element.remove();

			})
		})
	}

	checkVisibility() {
		if (!this.toDoListArray.length) {
			this.main.classList.toggle('hidden');
			this.footer.classList.toggle('hidden');
		}
	}

	updateToDo() {
		this.toDoCount = document.querySelector(".todo-count") as HTMLElement;
		let result = this.toDoListArray.filter(function (toDoItem) {
			return toDoItem.state == false
		});
		if (result.length === 1) {
			this.toDoCount.innerHTML = result.length.toString() + " item left";
		}
		else {
			this.toDoCount.innerHTML = result.length.toString() + " items left";
		}
	}

	returnArrayLength() {
		return this.toDoListArray.length;
	}

	pushToDo(toDoItem: toDoObject) {
		this.toDoListArray.push(toDoItem);
		this.updateToDo();
	}

	addToDo(newListElement: HTMLElement) {
		this.toDoElement.appendChild(newListElement);
	}


}
