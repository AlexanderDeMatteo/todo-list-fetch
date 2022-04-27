import React, { useState } from "react";

export const Notes = () => {
	const [addTodolist, setAddTodolist] = useState("");
	const [todoList, setTodolist] = useState([]);
	const [hola, setHola] = useState("");
	const handleList = (e) => {
		if (e.key === "Enter") {
			setTodolist([...todoList, addTodolist]);
			setAddTodolist("");
			if (hola == "") {
				setHola(1);
			} else {
				setHola(hola + 1);
			}
		}
	};

	const deleteTask = (position) => {
		let newTasks = todoList.filter((task, index) => index != position);
		setTodolist(newTasks);
		setHola(hola - 1);
		if (hola - 1 == 0) {
			setHola("");
		}
	};

	return (
		<div className="container-fluid">
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
			<div>{hola}</div>
		</div>
	);
};
