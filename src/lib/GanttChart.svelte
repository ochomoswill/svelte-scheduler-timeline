<script>
    import {
        arrayRange,
        dateDiff,
        getCurrentMonth,
        getDayOfWeek,
        getDaysListWithDayName,
        getMonthsDaysHashmap,
        isWeekend,
        padTo2Digits
    } from "./utils";

    const employeesList = [
        {
            employee_id: 1,
            full_name: 'Barnard Posselt',
            leave_transactions: [
                {
                    label: 'Annual Leave',
                    bgColor: '#FFC002',
                    startDate: '2022-11-01',
                    endDate: '2022-11-09',
                }
            ]
        },
        {
            employee_id: 2,
            full_name: 'Ryley Huggons',
            leave_transactions: []
        },
        {
            employee_id: 3,
            full_name: 'Lanie Erwin',
            leave_transactions: [
                {
                    label: 'Sick Leave',
                    bgColor: '#FF7C80',
                    startDate: '2022-11-03',
                    endDate: '2022-11-17',
                },
                {
                    label: 'Compassionate Leave',
                    bgColor: '#92D050',
                    startDate: '2022-11-18',
                    endDate: '2022-11-26',
                }
            ]
        },
        {
            employee_id: 4,
            full_name: 'Hobard Lampitt',
            leave_transactions: [
                {
                    label: 'Study Leave',
                    bgColor: '#F4B183',
                    startDate: '2022-11-01',
                    endDate: '2022-11-30',
                }
            ]
        },
        {
            employee_id: 5,
            full_name: 'Virgilio Jeanes',
            leave_transactions: []
        },
        {
            employee_id: 6,
            full_name: 'Ky Verick',
            leave_transactions: [
                {
                    label: 'Study Leave',
                    bgColor: '#F4B183',
                    startDate: '2022-11-10',
                    endDate: '2022-11-18',
                }
            ]
        },
        {
            employee_id: 7,
            full_name: 'Ketti Waterworth',
            leave_transactions: [
                {
                    label: 'Annual Leave',
                    bgColor: '#ff6252',
                    startDate: '2022-11-10',
                    endDate: '2022-11-18',
                }
            ]
        }
    ]

    const currentYear = 2022;
    const currentMonth = getCurrentMonth();

    const monthDaysHashMap = getMonthsDaysHashmap(currentYear);
    const daysInSelectedMonth = monthDaysHashMap[currentMonth.toString()];
    const daysListInSelectedMonth = arrayRange(daysInSelectedMonth);

    const daysListWithDayName = getDaysListWithDayName(daysListInSelectedMonth, currentYear, currentMonth);

    const getDateFromDay = (theDay) => {
        return `${currentYear}-${padTo2Digits(currentMonth)}-${padTo2Digits(theDay)}`
    }

    const getJobSpan = (startDate, endDate) => {
        console.log(dateDiff(new Date(startDate), new Date(endDate)))

        const diff = dateDiff(new Date(startDate), new Date(endDate));
        const daysDiff = diff.days + 1;

        // return `calc(${daysDiff*100}% + ${daysDiff*1}px)`
        return `calc(${daysDiff * 100}% + ${daysDiff * 1}px)`
    }
</script>


<style>
    :root {
        --scheduler-border-color: #BFBFBF;
        --scheduler-row-border-bottom-color: #808080;
        --scheduler-header-bg-color: #FFFBEF;
        --scheduler-header-text-color: #0D2935;
        --scheduler-weekend-color: hsl(0deg 0% 88%);
        --scheduler-bars-count: 12;
        --scheduler-bars-size: minmax(40px, 1fr);
        --schedular-employees-column-width: 150px;
        /*--schedular-bars-grid-template-columns: repeat(var(--scheduler-bars-count), 1fr);*/
    }

    .gantt__container {
        display: grid;
        grid-template-columns: 150px repeat(1, 1fr);
        border: 1px solid #000;
    }

    .gantt__row-resource {
        background-color: whitesmoke;
        color: rgba(0, 0, 0, 0.726);
        border-right: 1px solid var(--scheduler-row-border-bottom-color);
        border-bottom: 1px solid var(--scheduler-row-border-bottom-color);
        text-align: center;
    }

    .gantt__row-period {
        background-color: whitesmoke;
        color: rgba(0, 0, 0, 0.726);
        border-bottom: 1px solid var(--scheduler-row-border-bottom-color);
        text-align: center;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(40px, 1fr);
        position: relative;
    }


    .gantt__row-period-title {
        display: flex;
        flex-direction: column;
    }

    .gantt__row-period-title-date {
        font-weight: 700;
        font-size: 1rem;
        color: #404040;
    }

    .gantt__row-period-title-name {
        font-weight: 500;
        font-size: 0.875rem;
        color: #595959;
    }


    .gantt__row-item {
        border: 1px solid var(--scheduler-border-color);
        /*padding: 10px 0 10px 0;*/
        position: relative;
        background-color: white;
        height: 56px;
        border-top: none;
        border-bottom: none;
        border-left: none;
    }

    .gantt__row-item[data-is-weekend='YES'] {
        background-color: var(--scheduler-weekend-color);
    }

    .gantt__row-item[data-day-of-the-week='Sat'] .gantt__row-period-title-date{
        color: #2DAA33;
    }

    .gantt__row-item[data-day-of-the-week='Sun'] .gantt__row-period-title-date{
        color: #C65911;
    }

    .gantt__row--header {
        height: 56px;
        background: var(--scheduler-header-bg-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .gantt__row_activity-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: calc(2 * 100%);
        z-index: 100;
        cursor: pointer;

        text-align: left;
        font-size: 12px;
        min-height: 15px;
        background-color: transparent;
        /*padding: 2px 4px;*/
        color: #000;
        font-weight: bold;
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr;
        align-content: center;
        height: 100%;

        box-sizing: border-box;
        padding-inline: 6px;
    }

    .gantt__row_activity {
        width: 100%;
        border-radius: 4px;
        box-sizing: border-box;
        padding-inline: 6px;

    }
</style>


<div class="gantt__container">
    <div class="gantt__row-resource gantt__row--header">
        EMPLOYEES
    </div>
    <div class="gantt__row-period">
        {#each daysListWithDayName as day}
            <div class="gantt__row-item gantt__row--header" data-day-of-the-week={day.name}>
                <div class="gantt__row-period-title" >
                    <span class="gantt__row-period-title-date">{day.date}</span>
                    <label class="gantt__row-period-title-name">{day.name}</label>
                </div>
            </div>
        {/each}
    </div>

    {#each employeesList as employee}
        <div class="gantt__row-resource">
            {employee.full_name}
        </div>
        <div class="gantt__row-period">
            {#each daysListWithDayName as day, dayIndex}
                <div
                        class="gantt__row-item"
                        data-date={getDateFromDay(day.date)}
                        data-resource={employee.employee_id}
                        data-is-weekend={isWeekend(new Date(getDateFromDay(day.date))) ? 'YES': 'NO'}
                        data-day-of-the-week={day.name}
                >
                    {#each employee.leave_transactions as transaction}
                        {#if getDateFromDay(day.date) === transaction.startDate}
                            <div class="gantt__row_activity-wrapper"
                                 style="width: {getJobSpan(transaction.startDate, transaction.endDate)};">
                                <div class="gantt__row_activity" style="background-color: {transaction.bgColor};">
                                    {transaction.label}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>
    {/each}
</div>
