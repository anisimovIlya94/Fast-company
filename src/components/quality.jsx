import React from 'react'

const Quality = ({ quality }) => {
  return (
   <span key={quality._id}
   className={'badge m-2 bg-' + quality.color}>
   {quality.name}
   </span>
  )
}

export default Quality