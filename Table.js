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

    // todo this will eventually randomly generate new cells, hardcoding for now
    reset() {
        this.table.replaceChildren(); // remove existing cells

        // example setup
//        this.addColumn('AHHHH', [5, 6, 7], null, false);
        this.addColumn('Glorbo', [0, 1, 2], null, false); // todo maybe first row should always be incrementing down, and at harder levels it goes down faster
        this.addColumn('Frimbus', [1, 2, 3], new EventFunction((src, tgt) => {
            return tgt + src;
        }, 0));
        this.addColumn('Shimp', [10, 20, 30], new PeriodicFunction((src, tgt) => {
            return tgt - src;
        }, 0));
    }
}
