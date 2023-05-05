class YPomo{
    constructor()  {
        this.timer = document.querySelector('.timer')
        this.pomodoro = document.querySelector('.pomodoro')
        this.shortBreak = document.querySelector('.short-break')
        this.longBreak = document.querySelector('.long-break')
        this.start = document.querySelector('.start')

        this.startClicked = false
        this.pomodoroClicked = true
        this.pomodoro.classList.add('clicked')
        this.shortBreakClicked = false
        this.shortLongClicked = false

        this.pomodoroSet()
        this.printer()
    }

    listener() {
        this.start.addEventListener('click', e => this.chronometer())

        this.pomodoro.addEventListener('click', e=> this.pomodoroSet())

        this.shortBreak.addEventListener('click', e=> this.shortBreakSet())

        this.longBreak.addEventListener('click', e=> this.longBreakSet())
    }

    chronometer() {
        if (this.startClicked) {
            this.start.classList.remove('btn-click')
            this.start.innerHTML = 'Começar'
            clearInterval(this.whi)
            this.startClicked = false
        } else {
            this.start.classList.add('btn-click')
            this.start.innerHTML = 'Pausar'
            this.whi = setInterval(() => {
                if (this.seconds === 0) {
                    this.seconds = 59
                    this.minutes--   
                } else this.seconds--
    
                this.printer()
                
                if (this.minutes === 0 && this.seconds === 0) {
                    clearInterval(this.whi)
                    if (this.pomodoroClicked) this.shortBreakSet()
                    else if (this.shortBreakClicked) this.pomodoroSet()
                    else if (this.longBreakClicked) this.pomodoroSet()
                }
            }, 1000) 
            this.startClicked = true
        } 
    
        
    }
    
    pomodoroSet() {
        if (this.startClicked) {
            clearInterval(this.whi)
            if (!this.pomodoroClicked) {
                this.start.classList.remove('btn-click')
                this.start.innerHTML = 'Começar'
            }
            this.startClicked = false
        }
        this.minutes = 25
        this.seconds = 0
    
    
        this.pomodoroClicked = true
        this.shortBreakClicked = false
        this.longShortClicked = false
    
        this.pomodoro.classList.add('clicked')
        if (this.shortBreak.classList.contains('clicked')) this.shortBreak.classList.remove('clicked')
        if (this.longBreak.classList.contains('clicked')) this.longBreak.classList.remove('clicked')
        this.printer()
    }
    
    shortBreakSet() {
        if (this.startClicked) {
            clearInterval(this.whi)
            if (!this.shortBreakClicked) {
                this.start.classList.remove('btn-click')
                this.start.innerHTML = 'Começar'
            }
            this.startClicked = false
        }
        this.minutes = 5
        this.seconds = 0
    
        this.pomodoroClicked = false
        this.shortBreakClicked = true
        this.longShortClicked = false
    
        this.shortBreak.classList.add('clicked')
        if (this.pomodoro.classList.contains('clicked')) this.pomodoro.classList.remove('clicked')
        if (this.longBreak.classList.contains('clicked')) this.longBreak.classList.remove('clicked')
        this.printer()
    }
    
    longBreakSet() {
        if (this.startClicked) {
            clearInterval(this.whi)
            if (!this.longBreakClicked) {
                this.start.classList.remove('btn-click')
                this.start.innerHTML = 'Começar'
            }
            this.startClicked = false
        }
        this.minutes = 15
        this.seconds = 0
    
        this.pomodoroClicked = false
        this.shortBreakClicked = false
        this.longShortClicked = true
    
        this.longBreak.classList.add('clicked')
        if (this.shortBreak.classList.contains('clicked')) this.shortBreak.classList.remove('clicked')
        if (this.pomodoro.classList.contains('clicked')) this.pomodoro.classList.remove('clicked')
        this.printer()
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