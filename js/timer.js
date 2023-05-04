function chronometer(thisP) {
    if (thisP.startClicked) {
        thisP.start.classList.remove('btn-click')
        thisP.start.innerHTML = 'Começar'
        clearInterval(thisP.whi)
        thisP.startClicked = false
    } else {
        thisP.start.classList.add('btn-click')
        thisP.start.innerHTML = 'Pausar'
        thisP.whi = setInterval(() => {
            if (thisP.seconds === 0) {
                thisP.seconds = 59
                thisP.minutes--   
            } else thisP.seconds--

            thisP.printer()
            
            if (thisP.minutes === 0 && thisP.seconds === 0) {
                clearInterval(thisP.whi)
                console.log(thisP.pomodoroClicked, thisP.shortBreakClicked)
                if (thisP.pomodoroClicked) shortBreakSet(thisP)
                else if (thisP.shortBreakClicked) pomodoroSet(thisP)
                else if (thisP.longBreakClicked) longBreakSet(thisP)
                thisP.start.classList.remove('btn-click')
                thisP.start.innerHTML = 'Começar'
            }
        }, 1000) 
        thisP.startClicked = true
    } 

    
}

function pomodoroSet(thisP) {
    if (thisP.startClicked) {
        clearInterval(thisP.whi)
        if (!thisP.pomodoroClicked) {
            thisP.start.classList.remove('btn-click')
            thisP.start.innerHTML = 'Começar'
        }
        thisP.startClicked = false
    }
    thisP.minutes = 25
    thisP.seconds = 0


    thisP.pomodoroClicked = true
    thisP.shortBreakClicked = false
    thisP.longShortClicked = false

    thisP.pomodoro.classList.add('clicked')
    if (thisP.shortBreak.classList.contains('clicked')) thisP.shortBreak.classList.remove('clicked')
    if (thisP.longBreak.classList.contains('clicked')) thisP.longBreak.classList.remove('clicked')
    thisP.printer()
}

function shortBreakSet(thisP) {
    if (thisP.startClicked) {
        clearInterval(thisP.whi)
        if (!thisP.shortBreakClicked) {
            thisP.start.classList.remove('btn-click')
            thisP.start.innerHTML = 'Começar'
        }
        thisP.startClicked = false
    }
    thisP.minutes = 5
    thisP.seconds = 0

    thisP.pomodoroClicked = false
    thisP.shortBreakClicked = true
    thisP.longShortClicked = false

    thisP.shortBreak.classList.add('clicked')
    if (thisP.pomodoro.classList.contains('clicked')) thisP.pomodoro.classList.remove('clicked')
    if (thisP.longBreak.classList.contains('clicked')) thisP.longBreak.classList.remove('clicked')
    thisP.printer()
}

function longBreakSet(thisP) {
    if (thisP.startClicked) {
        clearInterval(thisP.whi)
        if (!thisP.longBreakClicked) {
            thisP.start.classList.remove('btn-click')
            thisP.start.innerHTML = 'Começar'
        }
        thisP.startClicked = false
    }
    thisP.minutes = 15
    thisP.seconds = 0

    thisP.pomodoroClicked = false
    thisP.shortBreakClicked = false
    thisP.longShortClicked = true

    thisP.longBreak.classList.add('clicked')
    if (thisP.shortBreak.classList.contains('clicked')) thisP.shortBreak.classList.remove('clicked')
    if (thisP.pomodoro.classList.contains('clicked')) thisP.pomodoro.classList.remove('clicked')
    thisP.printer()
}