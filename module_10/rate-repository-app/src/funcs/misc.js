const shorten = (entry) => {
    let temp = entry

    if (entry > 1000) {
        temp /= 1000
        temp = temp.toFixed(1) + 'K'
    }

    return temp
}

const format_date = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

export {
    shorten,
    format_date
}