const DateFormat = require('./DateFormat.js');

describe('formatDate function', () => {
    it('formats a date correctly', () => {
        
        const mockDate = new Date(2023, 11, 31);
        const expectedFormattedDate = '2023-12-31';

        const formattedDate = DateFormat.formatDate(mockDate);

        expect(formattedDate).toBe(expectedFormattedDate);
    });

    it('throws an error for invalid date', () => {
        const invalidCall = () => DateFormat.formatDate('not_a_date');

        expect(invalidCall).toThrow('Invalid date provided.');
    });
});