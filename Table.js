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
}
