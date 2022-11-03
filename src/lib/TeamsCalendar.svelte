<script lang="ts">
    import {arrayRange, getCurrentMonth, getDaysListWithDayName, getMonthsDaysHashmap} from "./utils";

    const employeesList = [
        {
            full_name: 'Barnard Posselt',
            leave_transactions: [
                {
                    label: 'Annual Leave',
                    bgColor: '#FFC002',
                    gridColumn: '4/11'
                }
            ]
        },
        {
            full_name: 'Ryley Huggons',
            leave_transactions: []
        },
        {
            full_name: 'Lanie Erwin',
            leave_transactions: [
                {
                    label: 'Sick Leave',
                    bgColor: '#FF7C80',
                    gridColumn: '2/5'
                },
                {
                    label: 'Compassionate Leave',
                    bgColor: '#92D050',
                    gridColumn: '7/11'
                }
            ]
        },
        {
            full_name: 'Hobard Lampitt',
            leave_transactions: []
        },
        {
            full_name: 'Virgilio Jeanes',
            leave_transactions: []
        },
        {
            full_name: 'Ky Verick',
            leave_transactions: [
                {
                    label: 'Study Leave',
                    bgColor: '#F4B183',
                    gridColumn: '3/8'
                }
            ]
        },
        {
            full_name: 'Ketti Waterworth',
            leave_transactions: [
                {
                    label: 'Annual Leave',
                    bgColor: '#ff6252',
                    gridColumn: '4/9'
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

</script>

<div class="scheduler">
    <div class="scheduler__row scheduler__row--months" style="--scheduler-bars-count: {daysInSelectedMonth};">
        <div class="scheduler__row-employees">EMPLOYEES</div>
        {#each daysListWithDayName as day}
            <span>
                <div class="scheduler__row--header-day">
                    <span>{day.date}</span>
                    <label>{day.name}</label>
                </div>
            </span>
        {/each}
    </div>
    <div class="scheduler__row scheduler__row--lines" style="--scheduler-bars-count: {daysInSelectedMonth};"
         data-month={currentMonth}>
        <span class="marker"></span>
        {#each daysListInSelectedMonth as day}
            <span></span>
        {/each}
    </div>
    {#each employeesList as employee}
        <div class="scheduler__row">
            <div class="scheduler__row-employees">
                {employee.full_name}
            </div>
            <ul class="scheduler__row-bars" style="--scheduler-bars-count: {daysInSelectedMonth};">
                {#each employee.leave_transactions as transaction}
                    <li style="grid-column: {transaction.gridColumn}; background-color: {transaction.bgColor};">{transaction.label}</li>
                {/each}
            </ul>
        </div>
    {/each}
</div>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto:100,400,700");

    body, html {
        font-family: "Roboto", sans-serif;
        background-color: #cddade;
        height: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :root {
        --scheduler-border-color: rgba(0, 0, 0, 0.1);
        --scheduler-header-bg-color: #FFFBEF;
        --scheduler-header-text-color: #0D2935;
        --scheduler-weekend-color: #D9D9D9;
        --scheduler-bars-count: 12;
        --scheduler-bars-size: minmax(40px, 1fr);
        --schedular-employees-column-width: 150px;
        /*--schedular-bars-grid-template-columns: repeat(var(--scheduler-bars-count), 1fr);*/
    }


    .scheduler {
        display: grid;
        border: 1px solid #000;
        border-radius: 0;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        /*box-shadow: 0 75px 125px -57px #7e8f94;*/
    }

    .scheduler__row {
        display: grid;
        grid-template-columns: var(--schedular-employees-column-width) 1fr;
        background-color: #fff;
    }

    .scheduler__row--lines {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: transparent;
        grid-template-columns: var(--schedular-employees-column-width) repeat(var(--scheduler-bars-count), var(--scheduler-bars-size));
    }

    .scheduler__row--lines span {
        display: block;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 3;
    }

    .scheduler__row--lines span.marker {
        background-color: hsl(135deg 97% 37% / 20%);
        z-index: 2;
    }

    .scheduler__row--lines:after {
        grid-row: 1;
        grid-column: 0;
        background-color: #1688b3;
        z-index: 2;
        height: 100%;
    }

    .scheduler__row--months {
        color: var(--scheduler-header-text-color);
        background-color: var(--scheduler-header-bg-color);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        grid-template-columns: var(--schedular-employees-column-width) repeat(var(--scheduler-bars-count), var(--scheduler-bars-size));
    }

    .scheduler__row--months .scheduler__row-employees {
        border-top: 0 !important;
        background-color: var(--scheduler-header-bg-color);
    }

    .scheduler__row--months span {
        text-align: center;
        font-size: 13px;
        align-self: center;
        font-weight: bold;
        padding: 4px 8px;
    }

    .scheduler__row--header-day {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .scheduler__row-employees {
        background-color: #fff;
        border-width: 1px 0 0 0;
        border-color: rgba(0, 0, 0, 0.1);
        border-style: solid;
        padding: 15px 0;
        font-size: 13px;
        font-weight: bold;
        padding-inline: 8px;
    }

    .scheduler__row-bars {
        list-style: none;
        display: grid;
        padding: 9px 0;
        margin: 0;
        grid-template-columns: repeat(var(--scheduler-bars-count), var(--scheduler-bars-size));
        grid-gap: 8px 0;
        border-top: 1px solid rgba(221, 221, 221, 0.8);
    }

    .scheduler__row-bars li {
        text-align: left;
        font-size: 14px;
        min-height: 15px;
        background-color: #55de84;
        padding: 5px 12px;
        color: #000;
        font-weight: bold;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        border-radius: 6px;
    }

    .scheduler__row-bars li:before, .scheduler__row-bars li:after {
        content: "";
        height: 100%;
        top: 0;
        z-index: 4;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .scheduler__row-bars li:before {
        left: 0;
    }

    .scheduler__row-bars li:after {
        right: 0;
    }
</style>
