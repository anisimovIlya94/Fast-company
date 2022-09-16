import React from 'react'

const RenderUserImage = ({ width, height }) => {
  return (
   <img
   src={`https://avatars.dicebear.com/api/avataaars/${(
       Math.random() + 1
   )
       .toString(36)
       .substring(7)}.svg`}
   className="rounded-circle shadow-1-strong me-3"
   alt="avatar"
      style={{ width: width, height: height }}
   width="65"
   height="150px"
/>
  )
}
RenderUserImage.defaultProps = {
  width: "65px",
  height: "65px"
}
export default RenderUserImage