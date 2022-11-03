<script>
    import TeamsCalendar from './lib/TeamsCalendar.svelte'
    import GanttChart from "./lib/GanttChart.svelte";
</script>

<main class="flex-column" style="gap: 20px;">
    <!--<div class="flex-column" style="gap: 4px;">
        <h3>Styling Empty Grid Cells using Generated Content As A Styling Hook</h3>
        <TeamsCalendar/>

        <em>I however abandoned this approach as it was very inflexible in styling individual grid cells. In this case the weekends</em>
    </div>-->

    <div class="flex-column" style="gap: 4px;">
        <h3>Styling Empty Grid Cells using Redundant Elements As A Styling Hook</h3>
        <GanttChart/>
    </div>
</main>

<style>

</style>
