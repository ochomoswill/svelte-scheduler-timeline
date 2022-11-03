export const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
};

export const getCurrentMonth = () => {
    return new Date().getMonth() + 1;
}

export function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, {weekday: 'short'});
}

export function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export const getHeaderDayName = (theCurrentYear,theCurrentMonth, theDay) => {
    return getDayName(new Date(`${theCurrentYear}-${theCurrentMonth}-${theDay}`))
}

export const months = [
    {month: 'January'},
    {month: 'February'},
    {month: 'March'},
    {month: 'April'},
    {month: 'May'},
    {month: 'June'},
    {month: 'July'},
    {month: 'August'},
    {month: 'September'},
    {month: 'October'},
    {month: 'November'},
    {month: 'December'},
]

export const arrayRange = (end, start = 1) => {
    //@ts-ignore
    return [...Array(end - start + 1).keys()].map(x => x + start);
}

export const getDaysListWithDayName = (theDaysListInSelectedMonth, theCurrentYear, theCurrentMonth) => {
    const newDaysList = [];
    theDaysListInSelectedMonth.map((day) => {
        newDaysList.push({
            date: padTo2Digits(day),
            name: getHeaderDayName(theCurrentYear, theCurrentMonth, padTo2Digits(day))
        })
    })
    return newDaysList;
}

export const getMonthsDaysHashmap = (theCurrentYear) => {
    const monthDaysHashMap = {}
    months.map((month, monthIndex) => {
        monthDaysHashMap[monthIndex + 1] = getDays(theCurrentYear, monthIndex + 1);
    })

    return monthDaysHashMap;
}

/*
 * Function to calculate the absolute difference in days, months and years between 2 days taking into account variable month lengths and leap years
 * It ignores any time component (ie hours, minutes and seconds)
 *
 */
export function dateDiff(dt1, dt2)
{
    /*
     * setup 'empty' return object
     */
    var ret = {days:0, months:0, years:0};

    /*
     * If the dates are equal, return the 'empty' object
     */
    if (dt1 == dt2) return ret;

    /*
     * ensure dt2 > dt1
     */
    if (dt1 > dt2)
    {
        var dtmp = dt2;
        dt2 = dt1;
        dt1 = dtmp;
    }

    /*
     * First get the number of full years
     */

    var year1 = dt1.getFullYear();
    var year2 = dt2.getFullYear();

    var month1 = dt1.getMonth();
    var month2 = dt2.getMonth();

    var day1 = dt1.getDate();
    var day2 = dt2.getDate();

    /*
     * Set initial values bearing in mind the months or days may be negative
     */

    ret['years'] = year2 - year1;
    ret['months'] = month2 - month1;
    ret['days'] = day2 - day1;

    /*
     * Now we deal with the negatives
     */

    /*
     * First if the day difference is negative
     * eg dt2 = 13 oct, dt1 = 25 sept
     */
    if (ret['days'] < 0)
    {
        /*
         * Use temporary dates to get the number of days remaining in the month
         */
        var dtmp1 = new Date(dt1.getFullYear(), dt1.getMonth() + 1, 1, 0, 0, -1);

        var numDays = dtmp1.getDate();

        ret['months'] -= 1;
        ret['days'] += numDays;

    }

    /*
     * Now if the month difference is negative
     */
    if (ret['months'] < 0)
    {
        ret['months'] += 12;
        ret['years'] -= 1;
    }

    return ret;
}

export function isWeekend(date = new Date()) {
    return date.getDay() === 6 || date.getDay() === 0;
}

export function getDayOfWeek(date = new Date()) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
    });
}
