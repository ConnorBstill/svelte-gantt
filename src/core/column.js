import { get } from '../utils/utils';
export function findByPosition(columns, x) {
    const result = get(columns, x, c => c.left);
    return result;
}
export function findByDate(columns, x) {
    const result = get(columns, x, c => c.from);
    return result;
}
//# sourceMappingURL=column.js.map