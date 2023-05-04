class YPomo{
    constructor()  {
        this.timer = document.querySelector('.timer')
        this.pomodoro = document.querySelector('.pomodoro')
        this.shortBreak = document.querySelector('.short-break')
        this.longBreak = document.querySelector('.long-break')
        this.start = document.querySelector('.start')

        
        this.minutes = 0
        this.seconds = 2

        this.startClicked = false
        this.pomodoroClicked = true
        this.pomodoro.classList.add('clicked')
        this.shortBreakClicked = false
        this.shortLongClicked = false


        this.printer()
    }

    listener() {
        this.start.addEventListener('click', e => chronometer(this))

        this.pomodoro.addEventListener('click', e=> pomodoroSet(this))

        this.shortBreak.addEventListener('click', e=> shortBreakSet(this))

        this.longBreak.addEventListener('click', e=> longBreakSet(this))
    }

    

    printer() {
        let secondsString
        let minutesString

        if (this.seconds < 10) secondsString = `0${this.seconds}` 
        else secondsString = this.seconds

        if (this.minutes < 10) minutesString = `0${this.minutes}`
        else minutesString = this.minutes

        const print = `${minutesString}:${secondsString}`
        this.timer.innerHTML = print

    }
}

const Pomo = new YPomo()
Pomo.listener()