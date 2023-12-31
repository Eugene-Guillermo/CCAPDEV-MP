function formatDate(date) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date provided.');
    }

    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}

module.exports = {formatDate};
