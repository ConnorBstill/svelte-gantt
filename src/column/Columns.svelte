<script lang="ts">
    import { onMount } from 'svelte';

    import Column from './Column.svelte';
    /**
     * Container component for columns rendered as gantt body background
     */
    export let columns = [];

    export let columnStrokeWidth = 1;
    export let columnStrokeColor = '#efefef';
    let componentHeight;

    onMount(() => {
        const el = document.getElementById('container');
    
        componentHeight = el.clientHeight;
    })

    function lineAt(ctx, x) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 20);
        ctx.stroke();
    }

    function createBackground(columns) {
        const canvas = document.createElement('canvas');
        canvas.width = (columns.length - 1) * columns[0].width;
        canvas.height = 20;

        const ctx = canvas.getContext('2d');
        ctx.shadowColor = "rgba(128,128,128,0.5)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0.5;
        ctx.lineWidth = columnStrokeWidth;
        ctx.lineCap = "square";
        ctx.strokeStyle = columnStrokeColor;
        // ctx.fillStyle = '#a9a9a9';
        ctx.translate(0.5, 0.5);

        columns.forEach((column, index) => {
            lineAt(ctx, column.left);
        });

        const dataURL = canvas.toDataURL();
        return `url("${dataURL}")`;
    }

    function alternateColumnColorCondition(index) {
        if ((index / 8) % 1 === 0 || 
            ((index - 1) / 8) % 1 === 0 ||
            ((index - 2) / 8) % 1 === 0 ||
            ((index - 3) / 8) % 1 === 0) {
            return true
        } else {
            return false;
        }
    }

    let backgroundImage;
    $: {
        backgroundImage = createBackground(columns.slice(0,5));
    }
</script>
<!-- style="background-image:{backgroundImage};" -->
<div id="container" class="sg-columns">
	{#each columns as column, i}
    {#if alternateColumnColorCondition(i)}
        <Column left={column.left} width={column.width} />
    {:else}
        <Column left={column.left} width={column.width} backgroundColor={'#efefef'} />
    {/if}
	{/each}
</div>
<style>
    .sg-columns {
        position: absolute;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-repeat: repeat-x, repeat-x;
        background-position: left, right;
        background-blend-mode: multiply;
    }
</style>