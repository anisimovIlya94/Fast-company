import React, { useState } from "react";
import api from "../api";

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll())
	const userOfUsersList = users.map((user) => {
		return(
				<tr key={user._id}>
					<td>{user.name}</td>
					<td>{user.qualities.map((quality) => {
						return (
							<span key={quality._id}
								className={'badge m-2 bg-' + quality.color}>
								{quality.name}
							</span>
						);
					})}
					</td>
					<td>{user.profession.name}</td>
					<td>{user.completedMeetings}</td>
					<td>{user.rate + ' /5'}</td>
					<td><button className="btn btn-danger" onClick = {()=>handleDelete(user._id)}>delete</button></td>
				</tr>
		);
	})
	const handleDelete = (id) => {
		setUsers(users.filter((user) => {
			return user._id !== id;
		}))
	}
	const renderPhrase = (number) => {
		const style = number > 0 ? "badge bg-primary" : "badge bg-danger";
		const typeOfWords = ((number > 1 && number < 5) || (number > 20 && (number % 10 === 2 || number % 10 === 3 || number % 10 === 4))) ? ' человека тусанет с тобой сегодня' : ' человек тусанет с тобой сегодня'
		return <span className={style}> {number > 0 ? number + typeOfWords : 'Никто с тобой не тусанет'} </span>
	}
	return (
		<>
			<h1>{renderPhrase(users.length)}</h1>
			<table className="table">
				<thead>
					{users.length > 0 ?
						<tr>
							<th scope="name">Имя</th>
							<th scope="quality">Качества</th>
							<th scope="profession">Профессия</th>
							<th scope="completedMeetings">Встретился,раз</th>
							<th scope="rate">Оценка</th>
							<th scope="button"></th>
						</tr>
					: ''
					}
				</thead>
				<tbody>
					{userOfUsersList}
				</tbody>
			</table>
		</>
	);
}

export default Users;