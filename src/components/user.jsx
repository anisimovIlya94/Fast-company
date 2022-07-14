import React from 'react'
import Quality from './quality';
import Bookmark from './bookmark';

const User = ({ user, ...rest }) => {
  return (
      <tr key={user._id}>
         <td>{user.name}</td>
         <td>{user.qualities.map((quality) => {
            return (
               <Quality key={quality._id} quality={quality}/>
            );
         })}
         </td>
         <td>{user.profession.name}</td>
         <td>{user.completedMeetings}</td>
         <td>{user.rate} /5</td>
        <td><Bookmark bookmark={user.bookmark} onFavourites={rest.onBookmark} id={user._id}/></td>
         <td><button className="btn btn-danger" onClick = {()=>rest.onDelete(user._id)}>delete</button></td>
      </tr>
  )
}

export default User