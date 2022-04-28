import React, { useState } from "react";

export const Notes = () => {
	const [addTodolist, setAddTodolist] = useState("");
	const [todoList, setTodolist] = useState([]);
	const [tareasPendientes, settareasPendientes] = useState("");
	const handleList = (e) => {
		if (e.key === "Enter" && addTodolist != "") {
			setTodolist([...todoList, addTodolist]);
			setAddTodolist("");
			if (tareasPendientes == "") {
				settareasPendientes(1);
			} else {
				settareasPendientes(tareasPendientes + 1);
			}
		}
	};

	const deleteTask = (position) => {
		let newTasks = todoList.filter((task, index) => index != position);
		setTodolist(newTasks);
		settareasPendientes(tareasPendientes - 1);
		if (tareasPendientes - 1 == 0) {
			settareasPendientes("");
		}
	};

	return (
		<div className="list-body">
			<div className="lista">
				<input
					id="input_1"
					onChange={(e) => setAddTodolist(e.target.value)}
					onKeyDown={(e) => handleList(e)}
					type="text"
					placeholder="What need to be done?"
					value={addTodolist}
				/>

				<div className="row">
					{todoList.map((todolist, index) => {
						return (
							<div className="Task" key={index}>
								<span>{todolist}</span>
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => {
										deleteTask(index);
									}}></button>
							</div>
						);
					})}
				</div>

				<div className="contador">
					<>{tareasPendientes != "" ? "tareas por realizar" : ""}</>
					{tareasPendientes}
				</div>
			</div>
		</div>
	);
};
