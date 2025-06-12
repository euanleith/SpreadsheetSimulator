class Score {
    constructor() {
        this.obj = document.getElementById('score');
        this.reset();
    }

    update() {
        this.obj.innerHTML = "Score: " + this.value;
    }

    add(amount=1) {
        this.value += amount;
        this.update();
    }

    reset() {
        this.value = 0;
        this.update();
    }
}