/**
 * Defines a mapping function between
 * some source cell(s) and some target cell(s).
 * With this subclass, the function is called
 * whenever an input event occurs in the source cell(s).
 */
class EventFunction extends Function {
    constructor(func, tgtCol) {
        super(func, tgtCol);
    }

    /**
     * Attaches the mapping function this.func() from
     * the source cell(s) to the target cell(s).
     * Within the subclass EventFunction, this function is
     * called on the 'input' event for the source cell.
     * @param table
     * @param srcInputCell
     */
    attach(table, srcInputCell) {
        srcInputCell.addEventListener('input', () => {
            this.map(table, srcInputCell);
        });
    }
}