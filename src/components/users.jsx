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
					<td>{user.rate} /5</td>
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
		const lastOne = Number(number.toString().slice(-1));
      if (number > 4 && number < 15 || lastOne === 1) return "человек тусанет";
      if ([2, 3, 4].includes(lastOne)) return "человека тусанут";
      return "человек тусанет";
	}
	return (
		<>
			<h1>
				<span className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}>
				{users.length > 0
                        ? `${users.length + " " + renderPhrase(users.length)} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
				</span>
			</h1>
			{users.length > 0 && (
				<table className="table">
					<thead>
							<tr>
								<th scope="name">Имя</th>
								<th scope="quality">Качества</th>
								<th scope="profession">Профессия</th>
								<th scope="completedMeetings">Встретился,раз</th>
								<th scope="rate">Оценка</th>
								<th scope="button"></th>
							</tr>
					</thead>
					<tbody>
						{userOfUsersList}
					</tbody>
				</table>
			)}
		</>
	);
}

export default Users;