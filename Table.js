class Table {
    constructor() {
        this.table = document.getElementById('table');
    }

    addHeader(value) {
        let th = document.createElement('th');
        th.innerHTML = value;
        this.table.appendChild(th);
        return th;
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
//        this.addColumn('Shimp', [10, 20, 30], new PeriodicFunction((src, tgt) => {
//            return tgt - src;
//        }, 1));
    }
}
