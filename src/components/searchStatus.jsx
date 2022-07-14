import React from 'react'

const SearchStatus = ({ props }) => {
   const renderPhrase = (number) => {
		const lastOne = Number(number.toString().slice(-1));
      if (number > 4 && number < 15 || lastOne === 1) return "человек тусанет";
      if ([2, 3, 4].includes(lastOne)) return "человека тусанут";
      return "человек тусанет";
	}
  return (
<h1>
	<span className={"badge " + (props.length > 0 ? "bg-primary" : "bg-danger")}>
			{props.length > 0
            ? `${props.length + " " + renderPhrase(props.length)} с тобой сегодня`
            : "Никто с тобой не тусанет"}
	</span>
</h1>
  )
}

export default SearchStatus