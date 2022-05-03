import React, { useEffect, useState } from "react";
// import { todoList } from "./lista.jsx";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Notes } from "./lista.jsx";
//create your first component
const Home = () => {
	const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/alexander";
	const [addTodolist, setAddTodolist] = useState("");
	const [todoList, setTodolist] = useState([]);
	// const [todoList, setAddTodolist] = useState([]);
	// const [todoList, setTodolist] = useState([]);

	//POST - create User
	const createUser = async () => {
		const response = await fetch(apiUrl, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const body = await response.json();
			console.log(body);
		}
	};

	// GET - get Todolist from User
	const gettodoList = async () => {
		const response = await fetch(apiUrl);
		if (response.ok) {
			const body = await response.json();
			console.log(body);
			setTodolist(body);
		}
		console.table(gettodoList);
	};
	setTodolist;

	let newtodoList = [
		{ label: "Make the bed", done: false },
		{ label: "Walk the dog", done: false },
		{ label: "Do the replits", done: false },
	];

	// PUT - update todoList from User
	const updatetodoList = async (todoList) => {
		const response = await fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoList),
		});
		if (response.ok) {
			const body = await response.json();
			console.log(body);
			gettodoList();
		}
	};

	// DELETE - deletes user with all todoList
	const deleteUser = async () => {
		const response = await fetch(apiUrl, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const body = await response.json();
			console.log(body);
		}
	};

	useEffect(() => {
		// createUser();
		gettodoList();
		// deleteUser();
	}, []);

	useEffect(() => {
		if (todoList.length < 3) {
			updatetodoList(newtodoList);
		}
	}, [todoList]);

	return (
		<div className="fondo">
			<div className="fondo-de-cartas">
				<h1 className="titulo">todos</h1>
				<div className="notas">
					<Notes />
				</div>
			</div>
		</div>
	);
};

export default Home;
