class Score {
    constructor() {
        this.obj = document.getElementById('score');
        this.score = 0;
        this.updateText();
    }

    updateText() {
        this.obj.innerHTML = "Score: " + this.score;
    }

    add(amount=1) {
        this.score += amount;
        this.updateText();
    }

    reset() {
        this.score = 0;
        this.updateText();
    }
}