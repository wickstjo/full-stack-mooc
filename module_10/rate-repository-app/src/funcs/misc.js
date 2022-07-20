const shorten = (entry) => {
    let temp = entry

    if (entry > 1000) {
        temp /= 1000
        temp = temp.toFixed(1) + 'K'
    }

    return temp
}

export {
    shorten
}