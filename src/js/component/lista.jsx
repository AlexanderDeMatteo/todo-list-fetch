import React, { useState } from "react";

export const Notes = () => {
	const [addTodolist, setAddTodolist] = useState("");
	const [todoList, setTodolist] = useState([]);
	const [tareasPendientes, settareasPendientes] = useState("");

	const handleList = (e) => {
		if (e.key === "Enter" && addTodolist != "") {
			if (tareasPendientes == "") {
				settareasPendientes(1);
			} else {
				settareasPendientes(tareasPendientes + 1);
			}
			setTodolist([...todoList, addTodolist]);
			setAddTodolist("");
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

	const deleteAll = (position) => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
			method: "DELETE",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				if (resp.status == 404) {
					setTodolist([]);
				}
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log("error");
				console.log(error);
			});
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
								<span>{todolist.label}</span>
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
				<button
					onClick={() => {
						deleteAll();
					}}>
					borrador
				</button>
			</div>
		</div>
	);
};
