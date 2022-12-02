function commentDate(ms) {
    const dateNow = Date.now();
    const date = new Date(+ms);
    const different = (dateNow - ms) / 1000;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (different <= 60) {
        return "1 минуту назад";
    } else if (different > 60 && different <= 300) {
        return "5 минут назад";
    } else if (different > 300 && different <= 600) {
        return "10 минут назад";
    } else if (different > 600 && different <= 1800) {
        return "30 минут назад";
    } else if (different > 1800 && different <= 86400) {
        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    } else if (different > 86400 && different <= 2678400) {
        return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}`;
    } else if (different > 2678400) {
        return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
    }
}

export default commentDate;
