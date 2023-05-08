class YPomo{
    constructor()  {
        this.timer = document.querySelector('.timer')
        this.pomodoro = document.querySelector('.pomodoro')
        this.shortBreak = document.querySelector('.short-break')
        this.longBreak = document.querySelector('.long-break')
        this.start = document.querySelector('.start')
        this.saveConfig = document.querySelector('#save-config')
        this.blurModalConfig = document.querySelector('.blur-modal-config')
        this.modalConfig = document.querySelector('.modal-config')
        this.configPomodoroMin = document.querySelector('#pomodoro-min')
        this.configShortMin = document.querySelector('#short-break-min')
        this.configLongMin = document.querySelector('#long-break-min')

        this.standardPomodoro = 25
        this.standardShortBreak = 10
        this.standardLongBreak = 15

        this.configPomodoroMin.value = this.standardPomodoro
        this.configShortMin.value = this.standardShortBreak
        this.configLongMin.value = this.standardLongBreak

        this.configClicked = false
        this.startClicked = false
        this.pomodoroconfig = ''
        this.pomodoroClicked = true
        this.pomodoro.classList.add('clicked')
        this.shortBreakClicked = false
        this.longBreakClicked = false

        this.seconds = 0

        this.pomodoroSet()
        this.printer()
    }

    listener() {
        document.addEventListener('click', e=> {
            const el = e.target
            if (el === this.start) this.chronometer()
            if (el === this.pomodoro) this.pomodoroSet()
            if (el === this.shortBreak) this.shortBreakSet()
            if (el === this.longBreak) this.longBreakSet()
            if (el === this.blurModalConfig 
                || el === this.saveConfig
                || el.classList.contains('config-logo')
                ) this.configurationToggle()
        })

    }


    configurationToggle() {
        this.blurModalConfig.classList.toggle('hide')
        this.modalConfig.classList.toggle('hide')

        this.seconds = 0
        
        if (this.configClicked) this.configClicked = false
        else this.configClicked = true

        if (this.pomodoroClicked) this.pomodoroSet()
        if (this.shortBreakClicked) this.shortBreakSet()
        if (this.longBreakClicked) this.longBreakSet()

    }

    async chronometer() {
        if (this.startClicked) {
            this.start.classList.remove('btn-click')
            this.start.innerHTML = 'Começar'
            clearInterval(this.whi)
            this.startClicked = false
        } else {
            this.start.classList.add('btn-click')
            this.start.innerHTML = 'Pausar'
            this.whi = await setInterval(() => {
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
            this.start.classList.remove('btn-click')
            this.start.innerHTML = 'Começar'
            this.startClicked = false
        }
        this.minutes = this.configPomodoroMin.value || this.standardPomodoro
        
        if (!this.pomodoroClicked) {
            this.seconds = 0
        }
    
        this.pomodoroClicked = true
        this.shortBreakClicked = false
        this.longBreakClicked = false
    
        this.pomodoro.classList.add('clicked')
        if (this.shortBreak.classList.contains('clicked')) this.shortBreak.classList.remove('clicked')
        if (this.longBreak.classList.contains('clicked')) this.longBreak.classList.remove('clicked')
        this.printer()
    }
    
    shortBreakSet() {
        if (this.startClicked) {
            clearInterval(this.whi)
            this.start.classList.remove('btn-click')
            this.start.innerHTML = 'Começar'
            this.startClicked = false
        }
        this.minutes = this.configShortMin.value || this.standardShortBreak

        if (!this.shortBreakClicked) {
            this.seconds = 0
        }
    
        this.pomodoroClicked = false
        this.shortBreakClicked = true
        this.longBreakClicked = false
    
        this.shortBreak.classList.add('clicked')
        if (this.pomodoro.classList.contains('clicked')) this.pomodoro.classList.remove('clicked')
        if (this.longBreak.classList.contains('clicked')) this.longBreak.classList.remove('clicked')
        this.printer()
    }
    
    longBreakSet() {
        if (this.startClicked) {
            clearInterval(this.whi)
            this.start.classList.remove('btn-click')
            this.start.innerHTML = 'Começar'
            this.startClicked = false
        }
        this.minutes = this.configLongMin.value || this.standardLongBreak

        if (!this.longBreakClicked) {
            this.seconds = 0
        }

        this.pomodoroClicked = false
        this.shortBreakClicked = false
        this.longBreakClicked = true
    
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