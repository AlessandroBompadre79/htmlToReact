const titlize = (str) => {
    str = str.replace(/-/ig, ' ');
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

export default titlize;