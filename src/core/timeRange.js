export class TimeRangeFactory {
    constructor(columnService) {
        this.columnService = columnService;
    }
    create(model) {
        // enable dragging
        model.enableResizing = model.enableResizing === undefined ? true : model.enableResizing;
        const left = this.columnService.getPositionByDate(model.from);
        const right = this.columnService.getPositionByDate(model.to);
        return {
            model,
            left: left,
            width: right - left,
            resizing: false
        };
    }
}
//# sourceMappingURL=timeRange.js.map