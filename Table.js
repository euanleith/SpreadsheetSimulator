class Table {
    constructor() {
        this.table = document.getElementById('table');
        this.focus = null;
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
        document.addEventListener('click', (event) => this.onClick(event));
    }

    // todo don't love these
    onKeyDown(event) {
        if (event.key === 'Shift') {
            this.shiftPressed = true;
        }
    }

    onKeyUp(event) {
        if (event.key === 'Shift') {
            this.shiftPressed = false;
        }
    }

    onClick(event) {
        if (event.target === document.documentElement) {
            document.activeElement.blur();
            this.deselectAllCells();
        }
    }

    addHeader(value) {
        let th = document.createElement('th');
        th.innerHTML = value;
        this.table.appendChild(th);
        return th;
    }

    /**
     * Key down event triggered while an input is selected.
     * Used for keyboard navigation of the table.
     * @param event
     */
    onKeyDownInput(event) {
        if (event.key === 'Enter') {
            // todo i don't like that i have to keep putting these everywhere; is there a better way?
            this.deselectAllCells();
            this.focus?.input.removeEventListener('input', this.focus.listener);

            let cell = event.target.closest('td');
            let row = cell.closest('tr');
            let nextRow = this.table.rows[row.rowIndex+1];
            let nextCol = this.table.rows[0].cells[cell.cellIndex+1];
            if (nextRow) {
                nextRow.cells[cell.cellIndex].querySelector('input')?.focus();
            } else if (nextCol) {
                nextCol.querySelector('input')?.focus();
            }
        }
    }

    /**
     * Event triggered on focus for an input.
     * Used for keyboard navigation of the table.
     * @param event
     */
    onFocusInput(event) {
        if (this.shiftPressed && this.focus) {
            this.focus.input.focus(); // don't change focus if selecting group
        } else {
            let cell = event.target.closest('td');
            let row = cell.closest('tr');
            this.focus?.input.removeEventListener('input', this.focus.listener);
            // todo maybe make this its own class, with removeListener(), listener(start, end), etc.
            this.focus = {
                row: row.rowIndex,
                col: cell.cellIndex,
                input: event.target
            };

            event.target.select(); // select entire contents of cell
        }
    }

    onClickInput(event) {
        this.deselectAllCells();
        let cell = event.target.closest('td');
        let row = cell.closest('tr');
        if (event.shiftKey && this.focus) {
            // select entire contents of first focused cell
            this.focus.input.select();

            // make cells appear selected
            let startRow = Math.min(this.focus.row, row.rowIndex);
            let endRow = Math.max(this.focus.row, row.rowIndex);
            let startCol = Math.min(this.focus.col, cell.cellIndex);
            let endCol = Math.max(this.focus.col, cell.cellIndex);
            for (let row = startRow; row <= endRow; row++) {
                for (let col = startCol; col <= endCol; col++) {
                    let input = this.table.rows[row].cells[col].querySelector('input');
                    input.classList.add('selected');
                }
            }

            // update values of cells on input
            if (this.focus.listener) this.focus.input.removeEventListener('input', this.focus.listener); // todo might need to do this too
            // todo move
            let listener = (event) => {
                for (let row = startRow; row <= endRow; row++) {
                    for (let col = startCol; col <= endCol; col++) {
                        let input = this.table.rows[row].cells[col].querySelector('input');
                        input.setAttribute('value', event.target.value); // todo spreadsheets don't actually do this normally...
                        input.value = event.target.value; // todo why do i have to do this? if i don't, there's a bug: e.g. select a 2x2 group and change them. then select a different first cell, then shift click the original first cell and change them. everything in the group but the original first cell changes.
                    }
                }
            };
            this.focus.input.addEventListener('input', listener);
            this.focus.listener = listener;
        }
    }

    deselectAllCells() {
        let inputs = this.table.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('selected');
        });
    }

    addRow(value, rowIndex, func=null, editable=true) {
        let tr = document.getElementById('row' + rowIndex);
        if (tr == null) {
            tr = document.createElement('tr');
            tr.setAttribute('id', 'row' + rowIndex);
        }
        let td = document.createElement('td');
        let inputCell = document.createElement('input');
        inputCell.setAttribute('type', 'number');
        inputCell.setAttribute('value', value);
        if (!editable) inputCell.readOnly = true;

        inputCell.addEventListener('keydown', (event) => this.onKeyDownInput(event));
        inputCell.addEventListener('focus', (event) => this.onFocusInput(event));
        inputCell.addEventListener('click', (event) => this.onClickInput(event));

        if (func != null) {
            func.attach(this.table, inputCell, this.timer);
        }

        td.appendChild(inputCell);

        tr.appendChild(td);
        this.table.appendChild(tr);
        return tr;
    }

    addColumn(name, values, func=null, editable=true) {
        this.addHeader(name);
        for (let row = 0; row < values.length; row++) {
            this.addRow(values[row], row, func, editable);
        }
    }

    // todo lots of problems;
    //  name
    //  column indices are hardcoded
    //  only works for two columns, should be able to have multiple result and corresponding desired results columns
    //  most importantly, is there a better way to structure how this is done? e.g. in a column subclass?
    addRowsEqualListeners() {
        let j1 = 0;
        let j2 = 1;
        for (let i = 0; i < this.table.rows.length; i++) {
            let row = this.table.rows[i];
            let cell1 = row.cells[j1].querySelector('input');
            let cell2 = row.cells[j2].querySelector('input');
            cell2.addEventListener('input', () => {
                if (parseInt(cell1.value) === parseInt(cell2.value)) {
                    cell1.setAttribute('value', this.randDifInt(parseInt(cell1.value)));
                    this.score.add();
                }
            });
        }
    }

    getColIndex(colName) {
        let headers = Array.from(this.table.querySelectorAll('th'));
        return headers.findIndex(th => th.innerText.trim() === colName);
    }

    // returns a random int which is always different from the given value
    randDifInt(val, min=0, max=10) {
        while (true) {
            let res = this.randInt(min, max);
            if (res !== val) return res;
        }
    }

    randInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // todo this will eventually randomly generate new cells, hardcoding for now
    reset() {
        this.table.replaceChildren(); // remove existing cells

        // example setup
        this.addColumn('Desired Results', [5, 6, 7], null, false);
        this.addColumn('Results', [0, 1, 2], null, false); // todo maybe first row should always be incrementing down, and at harder levels it goes down faster
        this.addRowsEqualListeners();

        this.addColumn('Frimbus', [1, 2, 3], new EventFunction((src, tgt) => {
            return tgt + src;
        }, 1));
        this.addColumn('Shimp', [1, 2, 3], new PeriodicFunction((src, tgt) => {
            return tgt - src;
        }, 1));
    }
}
