class YPomo{
    constructor()  {
        this.favicon = document.querySelector('#favicon')
        this.title = document.querySelector('#title')
        this.body = document.querySelector('body')

        this.timer = document.querySelector('.timer')
        this.pomodoro = document.querySelector('.pomodoro')
        this.shortBreak = document.querySelector('.short-break')
        this.longBreak = document.querySelector('.long-break')
        this.start = document.querySelector('.start-pomo')
        this.nextPomo = document.querySelector('.next-pomo')
        this.contPomo = document.querySelector('#cont-pomo')
        this.focus = document.querySelector('.focus')

        this.saveConfig = document.querySelector('#save-config')
        this.blurModalConfig = document.querySelector('.blur-modal-config')
        this.modalConfig = document.querySelector('.modal-config')
        this.closeModalConfig = document.querySelector('.close-modal-config')

        this.blurModalInfo = document.querySelector('.blur-modal-info')
        this.modalInfo = document.querySelector('.modal-info')
        this.exitInfoBtn = document.querySelector('.exit-info')

        this.pomoConfigLabel = document.querySelector('.pomo-config-label')
        this.shortConfigLabel = document.querySelector('.short-config-label')
        this.longConfigLabel = document.querySelector('.long-config-label')

        this.configPomodoroInput = document.querySelector('#pomodoro-input')
        this.configShortInput = document.querySelector('#short-break-input')
        this.configLongInput = document.querySelector('#long-break-input')
        this.configContInput = document.querySelector('#cont-pomo-input')
        

        this.standardPomodoro = 25
        this.standardShortBreak = 5
        this.standardLongBreak = 15
        this.standardContPomo = 4
        this.initContPomo = 0

        this.configPomodoroInput.value = this.standardPomodoro
        this.configShortInput.value = this.standardShortBreak
        this.configLongInput.value = this.standardLongBreak
        this.configContInput.value = this.standardContPomo

        this.configClicked = false
        this.startClicked = false
        this.pomodoroconfig = ''
        this.pomodoroClicked = true
        this.pomodoro.classList.add('clicked')
        this.shortBreakClicked = false
        this.longBreakClicked = false

        this.seconds = 0

        this.textOptions()
        this.contPomoSet()
        this.pomodoroSet()
        this.printer()
    }

    textOptions(e) {

        if (window.innerWidth < 850) {
            this.pomoConfigLabel.innerHTML = 'Pomo'
            this.shortConfigLabel.innerHTML = 'Curto'
            this.longConfigLabel.innerHTML = 'Longo'
        } else {
            this.pomoConfigLabel.innerHTML = 'Pomodoro'
            this.shortConfigLabel.innerHTML = 'Intervalo Curto'
            this.longConfigLabel.innerHTML = 'Intervalo Longo'
        }

        if (window.innerWidth <= 335) {
            this.pomodoro.innerHTML = 'Pomo'
            this.shortBreak.innerHTML = 'Curto'
            this.longBreak.innerHTML = 'Longo'
        } else if (window.innerWidth > 335) {
            this.pomodoro.innerHTML = 'Pomodoro'
            this.shortBreak.innerHTML = 'Intervalo Curto'
            this.longBreak.innerHTML = 'Intervalo Longo'

            this.focus.innerHTML = 'Tempo de focar!'
        }

    }

    load() {
        this.body.style.transition = '1s'
    }

    async listener() {
        window.addEventListener('load', e => this.load(e))
        window.addEventListener('resize', e => this.textOptions(e))

        

        document.addEventListener('click', e=> {
            const el = e.target
            if (el === this.start) this.chronometer()
            if (el === this.pomodoro) this.pomodoroSet()
            if (el === this.shortBreak) this.shortBreakSet()
            if (el === this.longBreak) this.longBreakSet()
            if (el === this.blurModalConfig 
                || el === this.saveConfig
                || el.classList.contains('config-img')) this.configurationToggle()
            if (el === this.blurModalInfo 
                || el.classList.contains('info-img')
                || el === this.exitInfoBtn) this.Info()
            if (el === this.nextPomo) this.nextStep()
        })

        document.addEventListener('keydown', e => {
            const el = e.target
            const arrows = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']
            if (el === this.configPomodoroInput
                || el === this.configShortInput
                || el === this.configLongInput
                || el === this.configContInput) {
            if (e.key === "Backspace" 
                || arrows.includes(e.key)
                || e.key === "Delete"
                 ) return 
            if (!e.key.match("[0-9]")) return e.preventDefault() 
        }
        })

    }

    Info() {
        if (!this.modalInfo.classList.contains('hide')) {

            this.modalInfo.style.animationName = "modal-transition-reverse"
            this.modalInfo.style.animationDuration = "200ms"
            this.modalInfo.style.opacity = 0
            this.modalInfo.style.top = 0

            this.body.style.overflowY = 'unset'
        } else {

            this.modalInfo.style.animationName = "modal-transition"
            this.modalInfo.style.animationDuration = "200ms"
            this.modalInfo.style.opacity = 1
            this.modalInfo.style.top = "50%"

            this.body.style.overflowY = 'hidden'
        }

        setTimeout(() => {
        this.blurModalInfo.classList.toggle('hide')
        this.modalInfo.classList.toggle('hide')}, 50)


    }


    configurationToggle() {
        this.seconds = 0

        if (this.configClicked) this.configClicked = false
        else this.configClicked = true

        if (Number(this.configContInput.value) > 0){
            this.standardContPomo = Number(this.configContInput.value)
        } else this.configContInput.value = this.standardContPomo

        if (Number(this.configPomodoroInput.value) > 0) { 
            this.minutes = Number(this.configPomodoroInput.value)
        } else this.configPomodoroInput.value = this.standardPomodoro
        
        if (Number(this.configShortInput.value) > 0){
            this.minutes = Number(this.configShortInput.value)
        } else {
            this.configShortInput.value = this.standardShortBreak
        }

        if (Number(this.configLongInput.value) > 0){
            this.minutes = Number(this.configLongInput.value)
        } else {
            this.configLongInput.value = this.standardLongBreak
        }

        this.contPomo.innerHTML = "#0"
        this.initContPomo = 0


        if (!this.modalConfig.classList.contains('hide')) {

            this.modalConfig.style.animationName = "modal-transition-reverse"
            this.modalConfig.style.animationDuration = "200ms"
            this.modalConfig.style.opacity = 0
            this.modalConfig.style.top = 0

            this.body.style.overflowY = 'unset'
        } else {

            this.modalConfig.style.animationName = "modal-transition"
            this.modalConfig.style.animationDuration = "200ms"
            this.modalConfig.style.opacity = 1
            this.modalConfig.style.top = "50%"

            this.body.style.overflowY = 'hidden'
        }

        setTimeout(() => {
        this.blurModalConfig.classList.toggle('hide')
        this.modalConfig.classList.toggle('hide')}, 50)

        if (this.pomodoroClicked) this.pomodoroSet()
        if (this.shortBreakClicked) this.shortBreakSet()
        if (this.longBreakClicked) this.longBreakSet()
        
    }

    chronometer() {
        if (this.startClicked) {
            this.pauseBtn()
        } else {
            this.startBtn()
            this.whi = setInterval(() => {
                if (this.seconds === 0) {
                    this.seconds = 59
                    if (this.minutes > 0) this.minutes-- 
                    else this.minutes++  
                } else this.seconds--

                this.printer()
                
                if (this.minutes === 0 && this.seconds === 0) {
                    clearInterval(this.whi)
                    this.nextStep()
                    const audio = new Audio('./songs/alarm.mp3')
                    audio.play()
                }
            }, 1000) 
            this.startClicked = true
        } 
    
        
    }

    startBtn() {
        const audio = new Audio('./songs/start.mp3')
        audio.play()

        this.start.classList.add('btn-click')
        this.start.innerHTML = 'Pausar'
        this.start.setAttribute('title', "Pausar")
        this.nextPomo.classList.toggle('hide')
    }

    pauseBtn() {
        const audio = new Audio('./songs/pause.mp3')
        audio.play()

        clearInterval(this.whi)
        this.start.classList.remove('btn-click')
        this.start.innerHTML = 'Começar'
        this.nextPomo.classList.toggle('hide')
        this.start.setAttribute('title', "Começar")
        this.startClicked = false
    }

    nextStep() {
        if (this.pomodoroClicked) {
            this.initContPomo++
            this.contPomoSet()
            if (this.initContPomo % this.standardContPomo === 0) this.longBreakSet()
            else this.shortBreakSet()
        } else if (this.shortBreakClicked 
                    || this.longBreakClicked) this.pomodoroSet()
    }
    
    contPomoSet() {
        this.contPomo.innerHTML = `#${this.initContPomo}`
    }


    pomodoroSet() {
        if (this.startClicked) {
            this.pauseBtn()
        }

        this.minutes = Number(this.configPomodoroInput.value)



        if (!this.pomodoroClicked) {
            this.seconds = 0
        }
    
        this.pomodoroClicked = true
        this.shortBreakClicked = false
        this.longBreakClicked = false

        this.focus.innerHTML = 'Tempo de focar!'

        this.body.style.backgroundColor = "#be4040"
        this.start.style.color = "#be4040"
        this.favicon.setAttribute('href', "./img/faviconred.png")
    
        this.pomodoro.classList.add('clicked')
        if (this.shortBreak.classList.contains('clicked')) this.shortBreak.classList.remove('clicked')
        if (this.longBreak.classList.contains('clicked')) this.longBreak.classList.remove('clicked')
        this.printer()
    }
    
    shortBreakSet() {
        if (this.startClicked) {
            this.pauseBtn()
        }

        this.minutes = Number(this.configShortInput.value)

        if (!this.shortBreakClicked) {
            this.seconds = 0
        }

        this.focus.innerHTML = 'Tempo de descanso!'
    
        this.pomodoroClicked = false
        this.shortBreakClicked = true
        this.longBreakClicked = false

        this.body.style.backgroundColor = "#4C93B9"
        this.start.style.color = "#4C93B9"
        this.favicon.setAttribute('href', "./img/faviconblue.png")

        this.shortBreak.classList.add('clicked')
        if (this.pomodoro.classList.contains('clicked')) this.pomodoro.classList.remove('clicked')
        if (this.longBreak.classList.contains('clicked')) this.longBreak.classList.remove('clicked')
        this.printer()
    }
    
    longBreakSet() {
        if (this.startClicked) {
            this.pauseBtn()
        }

        this.minutes = Number(this.configLongInput.value)
       

        if (!this.longBreakClicked) {
            this.seconds = 0
        }

        this.focus.innerHTML = 'Tempo de descanso!'

        this.pomodoroClicked = false
        this.shortBreakClicked = false
        this.longBreakClicked = true

        this.body.style.backgroundColor = "#4CB9A9"
        this.start.style.color = "#43a193"
        this.favicon.setAttribute('href', "./img/favicongreen.png")
    
        this.longBreak.classList.add('clicked')
        if (this.shortBreak.classList.contains('clicked')) this.shortBreak.classList.remove('clicked')
        if (this.pomodoro.classList.contains('clicked')) this.pomodoro.classList.remove('clicked')
        this.printer()
    }

    

    printer() {
        let secondsString
        let minutesString

        this.seconds < 10 ? secondsString = `0${this.seconds}` : secondsString = this.seconds

        this.minutes < 10 ? minutesString = `0${this.minutes}`: minutesString = this.minutes

        const print = `${minutesString}:${secondsString}`
        const title = `${print} - YPomo`
        this.title.innerHTML = title
        this.timer.innerHTML = print
    }
}

const Pomo = new YPomo()
Pomo.listener()