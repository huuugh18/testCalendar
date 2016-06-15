$(document).ready(function() {
    let startDate = '2016-06-21'
    let startArr = []
    
    dateCalc(startDate);
    console.log(startArr)
    console.log('test this is different')
    
    // object constructors
    function ProgramObj(id, title, url, className) {
        this.id = id
        this.title = title
        this.url = url
        this.className = className
        // this.eventSched = assignDates()

    }
    function ScheduleObj(day1, day2, day3) {
        this.day1 = day1
        this.day2 = day2
        this.day3 = day3
        
    }
    function Workout(id, title, url, className)     {
        this.id = id
        this.title = title
        this.url = url
        this.className = className
        this.BGColor = getBG(className)
        this.txtColor = getTxt(className)

    }
    // get background color for class
    function getBG(className){
        switch(className){
            case 'rest': return '#83CDE6'
            case 'cardio': return '#E8002B'
            case 'lift': return '#FAAC2F'
            case 'flex': return '#19BD04'

        }
    }
    // get text color for class
    function getTxt(className){
        switch(className){
            case 'rest': return '#1c2833'
            case 'cardio': return '#FEFEFE'
            case 'lift': return '#05182a'
            case 'flex': return '#32050e'

        }
    }
    
    // created objects
    let ubfA1 = new Workout('ubfA1', 'Upper Body Flexibility', 'https://www.youtube.com/watch?v=Ozd_56IHdfM', 'flex')
    let lbsA1 = new Workout('lbsA1', 'Lower Body Strength', 'https://www.youtube.com/watch?v=MYNWjf0qjxE', 'lift')
    let restA1 = new Workout('restA1', 'Rest Day', 'https://www.youtube.com/watch?v=qrx1vyvtRLY', 'rest')
    let cardioA1 = new Workout('cardioA1', 'Cardio', 'https://www.youtube.com/watch?v=iTLtv0hoSHU', 'cardio')
    let schedA1 = new ScheduleObj(ubfA1, lbsA1, restA1)
    let programA1 = new ProgramObj('pA1', 'Program A1', '#', 'hypertension', schedA1)
    console.log(ubfA1)
    
    
    //create dates from starting date input
    function dateCalc(startDate) {
        let startDateSplit = startDate.split('-')
        for (let i=0; i < startDateSplit.length; i++){
            startDateSplit[i] = Number(startDateSplit[i])
        }
        let dayMath = []
        for (let j=0; j < 3; j++ ) {
            let d = startDateSplit[2] + j
            let m = startDateSplit[1]
            let y = startDateSplit[0] 
            startArr[j] = y.toString() + '-' + m.toString() + '-' + d.toString() 
        }
        return startArr
    }

    //---get dates into schedule
    //-----test vars--------------
    let testWorkout = [ubfA1,lbsA1,restA1]
    let testSchedule = dateCalc(startDate)
    assignDates(testWorkout,testSchedule)

    function assignDates(workoutArr, dateArr) {
        let scheduleArr = []
        for (let i = 0; i <workoutArr.length; i++ ) {
            scheduleArr.push({
                title:workoutArr[i].title,
                start:dateArr[i],
                url:workoutArr[i].url,
                backgroundColor:workoutArr[i].BGColor,
                textColor: workoutArr[i].txtColor
            })
        }
        console.log(scheduleArr)
        return scheduleArr

    }
    // get events array with all data from large program object
    function getEvents(program){
        let eventArr = []
        for (let i=0; i < program.schedule.length; i++) {
            eventArr.push({
                id: program.schedule[i].workout.id,
                title: program.schedule[i].workout.title,
                start: program.schedule[i].date,
                url: program.schedule[i].workout.url,
                className: program.schedule[i].workout.class,
            })
        }

    }
    
    // full calendar options and methods ect.
    $('#calendar').fullCalendar({
        weekends: true,
        dayClick: function() {
            alert('happy clicking')
        },
        allDayDefault: true,
        theme: true ,
        themeButtonIcons: {
            prev:'circle-triangle-w',
            next:'circle-triangle-e',
            prevYear: 'seek-prev',
            nextYear: 'seek-next'
        },
        events: assignDates(testWorkout,testSchedule),
        //    [
        //     {
        //         id: 'rest',
        //         title: 'Rest Day',
        //         start: '2016-06-10',
        //         url: '#',
        //         className: 'restClass',
        //         backgroundColor: '#00ffcc',
        //         textColor: 'blue',
        //     }

        // ],
        
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        eventClick: function(calEvent) {
            if (event.url) {
                window.open(event.url,'_blank');
                return
            }
        }

    
    })
    // custom button example
    $('#my-next-button').click(function(){ $('#calendar').fullCalendar('today')})
    // match heights of calendar and event well
    let heights = $('.clndrWell').map(function(){return $(this).height()}).get(),
    maxHeight = Math.max.apply(null, heights)
    $('.clndrWell').height(maxHeight)
    
}); 