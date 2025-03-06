class Board {
    constructor(gameLength) {
        this.table = new Table();
        this.timer = new Timer(gameLength, () => this.onTimeout());
        this.table.timer = this.timer; // todo better way?
        this.newGameButton = new NewGameButton(() => {
            this.reset();
            this.start();
        });

        this.reset();
    }

    onTimeout() {
        alert("Out of time!"); // todo don't do this

        let cells = this.table.table.querySelectorAll('input');
        cells.forEach(input => input.disabled = true);
    }

    start() {
        this.timer.start();
    }

    reset() {
        this.timer.reset();
        this.table.reset();
    }
}