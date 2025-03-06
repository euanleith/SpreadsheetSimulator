class Timer {
    // length in seconds
    constructor(length, onTimeout) {
        this.timer = document.getElementById('timer');
        this.onTimeout = onTimeout;
        this.length = length;
        this.reset();
    }

    start() {
        let h = Math.floor(this.remainingTime / 3600).toString().padStart(2, '0');
        let m = Math.floor((this.remainingTime % 3600) / 60).toString().padStart(2, '0');
        let s = (this.remainingTime % 60).toString().padStart(2, '0');

        this.timer.innerHTML = h + ":" + m + ":" + s;

        if (this.remainingTime > 0) {
            this.remainingTime -= 1;
            setTimeout(() => this.start(), 1000);
        } else {
            this.onTimeout();
            this.active = false;
        }
    }

    reset() {
        this.remainingTime = this.length;
        this.active = true;
    }
}
