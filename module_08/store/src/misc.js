const throttle = (string, length) => {
    if (!string) { return '' }

    if (string.length > length) {
        return string.substring(0, length-3) + '...'
    }

    return string
}

const list = (data) => {
    if (!data) { return '' }

    return data.join(', ')
}

export {
    throttle,
    list,
}