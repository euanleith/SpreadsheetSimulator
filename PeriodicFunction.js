/**
 * Defines a mapping function between
 * some source cell(s) and some target cell(s).
 * With this subclass, the function is called
 * periodically by a given interval.
 */
class PeriodicFunction extends Function {
    constructor(func, tgtCol, interval=1000) {
        super(func, tgtCol);
        this.interval = interval;
    }

    /**
     * Attaches the mapping function this.func() from
     * the source cell(s) to the target cell(s).
     * Within the subclass PeriodicFunction, this function is
     * called periodically by the interval this.interval.
     * @param table
     * @param srcInputCell
     */
    attach(table, srcInputCell) {
        setInterval(() => {
            this.map(table, srcInputCell);
        }, this.interval);
    }
}