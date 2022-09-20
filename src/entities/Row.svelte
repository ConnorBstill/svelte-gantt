<script lang="ts">
    import type { SvelteRow } from 'src/core/row';
    import { getContext } from 'svelte';
    export let row: SvelteRow;
    const { rowHeight } = getContext('options');
    const { hoveredRow, selectedRow } = getContext('gantt');
</script>

<div class="sg-row {row.model.classes}" data-row-id="{row.model.id}" class:sg-hover={$hoveredRow == row.model.id} class:sg-selected={$selectedRow == row.model.id} style="height:{$rowHeight + 1}px">
    {#if row.model.contentHtml}
        {@html row.model.contentHtml}
    {/if}
</div>    
<style>
    .sg-row {
        position: relative;
        width: 100%;
        box-sizing: border-box;
    }

    .sg-selected {
        outline: 1px solid black;
        /* border-top: 1px solid black; */
        /* border-bottom: 1px solid black; */
    }
</style>