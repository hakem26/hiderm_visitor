// utils.js

/**
 * Convert a date string from yyyy/mm/dd format to a Date object.
 * @param {string} dateStr - Date string in yyyy/mm/dd format.
 * @returns {Date} - JavaScript Date object.
 */
function parseDate(dateStr) {
    const [year, month, day] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Format a Date object into yyyy/mm/dd format.
 * @param {Date} date - JavaScript Date object.
 * @returns {string} - Formatted date string.
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

/**
 * Convert a Gregorian date to a Jalali date.
 * @param {Date} date - JavaScript Date object.
 * @returns {string} - Jalali date string in yyyy/mm/dd format.
 */
function convertToJalali(date) {
    const gregorianDate = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
    };
    const jalaliDate = jalaali.toJalaali(gregorianDate);
    return `${jalaliDate.jy}/${String(jalaliDate.jm).padStart(2, '0')}/${String(jalaliDate.jd).padStart(2, '0')}`;
}

/**
 * Convert a Jalali date string to a Gregorian date.
 * @param {string} jalaliDateStr - Jalali date string in yyyy/mm/dd format.
 * @returns {Date} - JavaScript Date object.
 */
function convertFromJalali(jalaliDateStr) {
    const [year, month, day] = jalaliDateStr.split('/').map(Number);
    const gregorianDate = jalaali.toGregorian(year, month, day);
    return new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
}

/**
 * Validate if a string is a valid date in yyyy/mm/dd format.
 * @param {string} dateStr - Date string in yyyy/mm/dd format.
 * @returns {boolean} - True if valid date, false otherwise.
 */
function isValidDate(dateStr) {
    const regex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return regex.test(dateStr);
}
