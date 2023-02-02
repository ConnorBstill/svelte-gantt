<script lang="ts">
    import type { SvelteRow } from 'src/core/row';
    import { getContext } from 'svelte';
    export let row: SvelteRow;
    const { rowHeight } = getContext('options');
    const { hoveredRow, selectedRow } = getContext('gantt');
</script>

<div class="sg-row {row.model.classes}" title={row.model.tooltip} data-row-id="{row.model.id}" class:sg-hover={$hoveredRow == row.model.id} class:sg-selected={$selectedRow == row.model.id} style="height:{$rowHeight}px">
    <!-- <p>selected:{$selectedRow} row id:{row.model.id}</p> -->
    {#if row.model.contentHtml}
        {@html row.model.contentHtml}
    {/if}
</div>    
<style>
    .sg-row {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
    }

    .sg-selected {
        border-color: black;
    }
</style>