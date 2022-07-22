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

const apply_filter = (dataset, filter) => {
    let temp = [...dataset]

    // SORT BY REVIEWS
    if (filter.tag === 'reviews') {
        temp = temp.sort((a, b) => b.reviewCount - a.reviewCount)

    // SORT BY AVG RATING
    } else if (filter.tag === 'rating') {
        temp = temp.sort((a, b) => b.ratingAverage - a.ratingAverage)
    
    // SORT BY LATEST
    } else if (filter.tag === 'latest') {
        temp = temp.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // FILTER BY KEYWORD
    temp = temp.filter(item => item.fullName.includes(filter.keyword))

    return temp
}

export {
    shorten,
    format_date,
    apply_filter
}