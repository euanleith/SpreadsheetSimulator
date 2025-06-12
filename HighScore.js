class HighScore {
    COOKIE_NAME = "highScore";

    constructor() {
        this.obj = document.getElementById('highScore');
        this.value = this.readCookie();
        this.update();
    }

    update() {
        this.obj.innerHTML = "High Score: " + this.value;
        this.writeCookie();
    }

    set(value) {
        if (value > this.readCookie()) {
            this.value = value;
            this.update();
        }
    }

    // todo move elsewhere
    getCookie(name) {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(name + '='))
            ?.split('=')[1];
    }

    readCookie() {
        return this.getCookie(this.COOKIE_NAME) ?? 0;
    }

    // todo move elsewhere with params (key, val)
    writeCookie() {
        document.cookie = "highScore=" + this.value;
        console.log('writing cookie ' + this.value)
    }
}