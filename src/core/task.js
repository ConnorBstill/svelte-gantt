export class TaskFactory {
    constructor(columnService) {
        this.columnService = columnService;
    }
    createTask(model) {
        // id of task, every task needs to have a unique one
        //task.id = task.id || undefined;
        // completion %, indicated on task
        model.amountDone = model.amountDone || 0;
        // css classes
        model.classes = model.classes || '';
        // date task starts on
        model.from = model.from || null;
        // date task ends on
        model.to = model.to || null;
        // label of task
        model.label = model.label || undefined;
        // html content of task, will override label
        model.html = model.html || undefined;
        // show button bar
        model.showButton = model.showButton || false;
        // button classes, useful for fontawesome icons
        model.buttonClasses = model.buttonClasses || '';
        // html content of button
        model.buttonHtml = model.buttonHtml || '';
        // enable dragging of task
        model.enableDragging = model.enableDragging === undefined ? true : model.enableDragging;
        const left = this.columnService.getPositionByDate(model.from) | 0;
        const right = this.columnService.getPositionByDate(model.to) | 0;
        return {
            model,
            left: left,
            width: right - left,
            height: this.getHeight(model),
            top: this.getPosY(model),
            reflections: []
        };
    }
    createTasks(tasks) {
        return tasks.map(task => this.createTask(task));
    }
    row(resourceId) {
        return this.rowEntities[resourceId];
    }
    getHeight(model) {
        return this.row(model.resourceId).height - 2 * this.rowPadding;
    }
    getPosY(model) {
        return this.row(model.resourceId).y + this.rowPadding;
    }
}
function overlap(one, other) {
    return !(one.left + one.width <= other.left || one.left >= other.left + other.width);
}
export function reflectTask(task, row, options) {
    const reflectedId = `reflected-task-${task.model.id}-${row.model.id}`;
    const model = Object.assign(Object.assign({}, task.model), { resourceId: row.model.id, id: reflectedId, enableDragging: false });
    return Object.assign(Object.assign({}, task), { model, top: row.y + options.rowPadding, reflected: true, reflectedOnParent: false, reflectedOnChild: true, originalId: task.model.id });
}
//# sourceMappingURL=task.js.map