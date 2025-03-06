class NewGameButton {
    constructor(onClick) {
        this.button = document.getElementById('newGame');
        this.button.onclick = onClick;
    }
}