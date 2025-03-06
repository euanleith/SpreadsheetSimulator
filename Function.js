/**
 * Abstract class.
 * Defines of a mapping function between
 * some source cell(s) and some target cell(s).
 */
class Function {
    constructor(func, tgtCol) {
        this.func = func;
        this.tgtCol = tgtCol;
    }

    // todo bug - currently allow empty values, which stall functions. should empty values not be allowed? maybe default to 0? should the inputCell not be changed until its submitted?
    /**
     * Applies common functions required by all
     * Function object just before this.func() is called.
     * @param inInputCell
     * @param outInputCell
     * @returns {boolean}
     */
    applyCommon(inInputCell, outInputCell) {
        if (!inInputCell.value) {
            // inInputCell.value = 0; // todo should only set this once empty input has been submitted
            return false;
        }
        return true;
    }

    // todo should allow for more complex mappings
    //  currently only maps from one cell to another, should be n:m cells across any number of columns
    //  mapping could also change over time, but that would probably be too complicated
    /**
     * Maps the value of the given cell to the cell at the same
     * row in the target column using the function this.func().
     * @param table
     * @param srcInputCell
     */
    map(table, srcInputCell) {
        let rowIndex = srcInputCell.parentNode.parentNode.rowIndex;
        let tgtCell = table.rows[rowIndex]?.cells[this.tgtCol];
        if (tgtCell) {
            let tgtInputCell = tgtCell.getElementsByTagName('input')[0];
            if (tgtInputCell) {
                let cont = this.applyCommon(srcInputCell, tgtInputCell);
                if (cont) {
                    tgtInputCell.setAttribute('value', this.func(parseInt(srcInputCell.value), parseInt(tgtInputCell.value)));
                    tgtInputCell.dispatchEvent(new Event('input')); // manually firing input event  // todo is this bad
                }
            }
        }
    }

    /**
     * Abstract function to be implemented by subclasses.
     * Attaches the mapping function this.func() from
     * the source cell(s) to the target cell(s).
     * @param inputCell
     * @param table
     * @param rowIndex
     */
    attach(table, srcInputCell, timer) {
        throw 'Method attach() must be implemented by subclass';
    }
}