import React from "react";
import User from "./user";

const Users = ({ users, ...rest}) => {
   const userOfUsersList = users.map((user) => {
      return <User key={user._id} user={user} onDelete={rest.onDelete} onBookmark={rest.onBookmark} />
	})
	return (
		<>
			{users.length > 0 && (
				<table className="table">
					<thead>
							<tr>
								<th scope="name">Имя</th>
								<th scope="quality">Качества</th>
								<th scope="profession">Профессия</th>
								<th scope="completedMeetings">Встретился,раз</th>
								<th scope="rate">Оценка</th>
								<th scope="rate">Избранное</th>
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