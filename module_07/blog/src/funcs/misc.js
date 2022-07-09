// THOTTLE STRING LENGTH
const throttle = (string, length) => {
    if (string.length > length) {
        return string.substring(0, length-3) + '...'
    }

    return string
}

export {
    throttle,
}