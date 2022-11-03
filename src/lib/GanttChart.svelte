<script>
    import {
        arrayRange, getCurrentMonth,
        getCurrentMonthEndDate,
        getCurrentMonthStartDate,
        getDaysListWithDayName,
        getJobSpan,
        getMonthsDaysHashmap,
        isEndDateOverflowing,
        isStartDateOverflowing,
        isWeekend,
        months,
        padTo2Digits,
        isToday
    } from "./utils";

    const employeesList = [
        {
            employee_id: 1,
            full_name: 'Barnard Posselt',
            leave_transactions: [
                {
                    label: 'Annual Leave',
                    bgColor: '#FFC002',
                    startDate: '2022-08-31',
                    endDate: '2022-12-15',
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
                    startDate: '2022-06-03',
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
    let currentMonth = getCurrentMonth();

    $: currentMonthName = months[currentMonth - 1].month;

    const monthDaysHashMap = getMonthsDaysHashmap(currentYear);
    $: daysInSelectedMonth = monthDaysHashMap[currentMonth.toString()];
    $: daysListInSelectedMonth = arrayRange(daysInSelectedMonth);

    $: currentMonthStartDate = `${currentYear}-${padTo2Digits(currentMonth)}-${padTo2Digits(1)}`
    $: currentMonthEndDate = `${currentYear}-${padTo2Digits(currentMonth)}-${padTo2Digits(daysInSelectedMonth)}`

    $: daysListWithDayName = getDaysListWithDayName(daysListInSelectedMonth, currentYear, currentMonth);

    $: getDateFromDay = (theDay) => {
        return `${currentYear}-${padTo2Digits(currentMonth)}-${padTo2Digits(theDay)}`
    }

    const onNextMonth = () => {
        currentMonth = currentMonth + 1;
    }

    const onPrevMonth = () => {
        currentMonth = currentMonth - 1;
    }
</script>


<style>
    :root {
        --scheduler-top-bar-height: 40px;
        --scheduler-border-color: #BFBFBF;
        --scheduler-row-border-bottom-color: #808080;
        --scheduler-header-bg-color: #FFFBEF;
        --scheduler-header-text-color: #0D2935;
        --scheduler-weekend-color: hsl(0deg 0% 88%);
        --scheduler-today-color: hsl(135deg 97% 37% / 20%);
        --scheduler-bars-count: 12;
        --scheduler-bars-size: minmax(40px, 1fr);
        --schedular-employees-column-width: 150px;
        /*--schedular-bars-grid-template-columns: repeat(var(--scheduler-bars-count), 1fr);*/
    }

    .grid-scroller {
        overflow: auto;
        height: 320px;
        width: 98vw;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        box-sizing: border-box;
    }

    .position__fixed--left {
        position: sticky;
        left: 0;
    }

    .position__fixed--top {
        position: sticky;
        top: 0;
    }

    .gantt__container {
        display: grid;
        grid-template-columns: 150px repeat(1, 1fr);
        /*border: 1px solid #000;*/
    }


    .gantt__row-resource {
        background-color: whitesmoke;
        color: rgba(0, 0, 0, 0.726);
        border-left: 1px solid var(--scheduler-row-border-bottom-color);
        border-right: 1px solid var(--scheduler-row-border-bottom-color);
        border-bottom: 1px solid var(--scheduler-row-border-bottom-color);
        text-align: center;
    }

    .gantt__row-resource:last-child {
        border-bottom: none;
    }

    .gantt__row-resource-header-title {
        font-weight: bold;
        display: grid;
        align-content: center;
        height: inherit;
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

    .gantt__row-period:last-child {
        border-bottom: none;
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
        border-right: 1px solid var(--scheduler-border-color);
        /*padding: 10px 0 10px 0;*/
        position: relative;
        background-color: white;
        height: 56px;
    }

    .gantt__row-item:last-child {
        border-right: none;
    }

    .gantt__row-item[data-is-today='YES'] {
        background-color: var(--scheduler-today-color);
    }

    .gantt__row-item[data-is-weekend='YES'] {
        background-color: var(--scheduler-weekend-color);
    }

    .gantt__row-item[data-day-of-the-week='Sat'] .gantt__row-period-title-date {
        color: #2DAA33;
    }

    .gantt__row-item[data-day-of-the-week='Sun'] .gantt__row-period-title-date {
        color: #C65911;
    }

    .gantt__row-top-bar {
        height: var(--scheduler-top-bar-height);
        position: sticky;
        top: 0;
        z-index: 15;
        border-top: 1px solid #000;
        box-sizing: border-box;
    }

    .gantt__row--header {
        height: 56px;
        background: var(--scheduler-header-bg-color);
        position: sticky;
        top: var(--scheduler-top-bar-height);
        z-index: 15;
    }

    .gantt__row--header-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: transparent;
    }

    .gantt__row-resource.position__fixed--left {
        z-index: 18;
    }

    .gantt__row-item.gantt__row--header {
        position: sticky;
        top: 0;
        z-index: 15;
    }

    .gantt__row--header.position__fixed--left, .gantt__row-top-bar.position__fixed--left {
        z-index: 20;
    }

    .gantt__row_activity-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: calc(2 * 100%);
        z-index: 10;
        cursor: pointer;

        text-align: left;
        font-size: 12px;
        min-height: 15px;
        background-color: transparent;
        color: #000;
        font-weight: bold;
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr;
        align-content: center;
        height: 100%;

        box-sizing: border-box;
        padding-inline: 6px;
        transition: width 500ms ease-in-out;
    }

    .gantt__row_activity-wrapper[data-has-start-date-overflow='YES'] {
        padding-inline-start: 0;
    }

    .gantt__row_activity-wrapper[data-has-end-date-overflow='YES'] {
        padding-inline-end: 0;
    }

    .gantt__row_activity {
        width: 100%;
        border-radius: 4px;
        box-sizing: border-box;
        padding-inline: 6px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .gantt__row_activity-wrapper[data-has-start-date-overflow='YES'] .gantt__row_activity {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .gantt__row_activity-wrapper[data-has-end-date-overflow='YES'] .gantt__row_activity {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>


<div>
    <button on:click={onPrevMonth} disabled={currentMonth=== 1}>
        Prev
    </button>

    <button on:click={onNextMonth} disabled={currentMonth=== 12}>
        Next
    </button>
</div>


<div class="grid-scroller">
    <div class="gantt__container">
        <div class="gantt__row-resource gantt__row-top-bar position__fixed--left position__fixed--top">
            <div>

            </div>
        </div>
        <div class="gantt__row-period gantt__row-top-bar">
            {currentMonthName}
        </div>


        <div class="gantt__row-resource gantt__row--header position__fixed--left position__fixed--top">
            <div class="gantt__row-resource-header-title">
                EMPLOYEES
            </div>
        </div>
        <div class="gantt__row-period gantt__row--header">
            {#each daysListWithDayName as day}
                <div class="gantt__row-item gantt__row--header-item" data-day-of-the-week={day.name}>
                    <div class="gantt__row-period-title">
                        <span class="gantt__row-period-title-date">{day.date}</span>
                        <label class="gantt__row-period-title-name">{day.name}</label>
                    </div>
                </div>
            {/each}
        </div>


        {#each employeesList as employee}
            <div class="gantt__row-resource position__fixed--left">
                {employee.full_name}
            </div>
            <div class="gantt__row-period">
                {#each daysListWithDayName as day, dayIndex}
                    <div class="gantt__row-item"
                         data-date={getDateFromDay(day.date)}
                         data-resource={employee.employee_id}
                         data-is-weekend={isWeekend(new Date(getDateFromDay(day.date))) ? 'YES': 'NO'}
                         data-is-today={isToday(new Date(getDateFromDay(day.date))) ? 'YES': 'NO'}
                         data-day-of-the-week={day.name}
                    >
                        {#each employee.leave_transactions as transaction}
                            {#if getDateFromDay(day.date) >= getCurrentMonthStartDate(currentMonthStartDate, transaction.startDate) && getDateFromDay(day.date) <= getCurrentMonthEndDate(currentMonthEndDate, transaction.endDate)}
                                {#if getDateFromDay(day.date) === getCurrentMonthStartDate(currentMonthStartDate, transaction.startDate)}
                                    <div class="gantt__row_activity-wrapper"
                                         style="width: {getJobSpan(transaction.startDate, transaction.endDate, currentMonthStartDate, currentMonthEndDate)};"
                                         data-start-date={transaction.startDate}
                                         data-end-date={transaction.endDate}
                                         data-has-start-date-overflow={isStartDateOverflowing(currentMonthStartDate, transaction.startDate) ? 'YES': 'NO'}
                                         data-has-end-date-overflow={isEndDateOverflowing(currentMonthEndDate, transaction.endDate) ? 'YES': 'NO'}
                                    >
                                        <div class="gantt__row_activity"
                                             style="background-color: {transaction.bgColor};"
                                             title={transaction.label}
                                        >
                                            {transaction.label}
                                        </div>
                                    </div>
                                {/if}
                            {/if}
                        {/each}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
