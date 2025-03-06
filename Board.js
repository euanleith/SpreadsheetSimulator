class Board {
    constructor(gameLength) {
        this.table = new Table();
        this.timer = new Timer(gameLength, () => this.onTimeout());
        this.table.timer = this.timer; // todo better way?

        // example setup
        this.table.addColumn('Glorbo', [0, 1, 2], null, false); // todo maybe first row should always be incrementing down, and at harder levels it goes down faster
        this.table.addColumn('Frimbus', [1, 2, 3], new EventFunction((value, mapInput) => {
            mapInput.value *= value;
        }, 0));
        this.table.addColumn('Shimp', [10, 20, 30], new PeriodicFunction((value, mapInput) => {
            mapInput.value -= value;
        }, 0));
    }

    onTimeout() {
        alert("Out of time!"); // todo don't do this

        let cells = this.table.table.querySelectorAll('input');
        cells.forEach(input => input.disabled = true);
    }

    start() {
        this.timer.start();
    }
}