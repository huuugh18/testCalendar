$(document).ready(function() {
    // -----------------Start Date -----------------------------
    let startDateInput = '2016-06-21'
    let startArr = []

    // -----------------Workout Objects-------------------------
    // -----------------A1 Workout Objs-------------------------
    let ubfA1 = new Workout('ubfA1', 'Upper Body Flexibility', 'https://www.youtube.com/watch?v=Ozd_56IHdfM', 'flex')
    let lbsA1 = new Workout('lbsA1', 'Lower Body Strength', 'https://www.youtube.com/watch?v=MYNWjf0qjxE', 'lift')
    let restA1 = new Workout('restA1', 'Rest Day', 'https://www.youtube.com/watch?v=qrx1vyvtRLY', 'rest')
    let cardioA1 = new Workout('cardioA1', 'Cardio', 'https://www.youtube.com/watch?v=iTLtv0hoSHU', 'cardio')
    //-----------------Workout Array Input----------------------
    let workoutA1 = [ubfA1,lbsA1,restA1]
    let workoutA2 = [ubfA1,lbsA1,restA1,cardioA1]
    //--------------------Workout Constructor-------------------
    function Workout(id, title, url, className)     {
        this.id = id
        this.title = title
        this.url = url
        this.className = className
        this.BGColor = getBG(className)
        this.txtColor = getTxt(className)

    }
    //---------------Program Objects----------------------------
    let programA1 = new ProgramObj('pA1', 'Hypertension A1', '#', 'hypertension', startDateInput, workoutA1 )
    let programA2 = new ProgramObj('pA2', 'Hypertension A2', '#', 'hypertension', startDateInput, workoutA2 )
    console.log(programA1)
    console.log(programA2)
    //--------------Program Constructor-------------------------
    function ProgramObj(id, title, url, className, startDate, workoutSched) {
        this.id = id
        this.title = title
        this.url = url
        this.className = className
        this.start = startDate
        this.workoutSched = workoutSched
        this.length = workoutSched.length
        this.eventPush = assignDates(workoutSched,dateCalc(startDate,workoutSched.length))
        // this.eventSched = assignDates()

    }
    
    
    // get background color and text color for class
    function getBG(className){
        switch(className){
            case 'rest': return '#83CDE6'
            case 'cardio': return '#E8002B'
            case 'lift': return '#FAAC2F'
            case 'flex': return '#19BD04'

        }
    }
    function getTxt(className){
        switch(className){
            case 'rest': return '#1c2833'
            case 'cardio': return '#FEFEFE'
            case 'lift': return '#05182a'
            case 'flex': return '#32050e'

        }
    }
    //create dates from starting date input
    function dateCalc(startDate,length) {
        let startDateSplit = startDate.split('-')
        for (let i=0; i < startDateSplit.length; i++){
            startDateSplit[i] = Number(startDateSplit[i])
        }
        for (let j=0; j < length; j++ ) {
            let d = startDateSplit[2] + j
            let m = startDateSplit[1]
            let y = startDateSplit[0] 
            startArr[j] = y.toString() + '-' + m.toString() + '-' + d.toString() 
        }
        return startArr
    }

    //---get dates into schedule
    

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
        return scheduleArr

    }
   
    // -----------------------------------------------------------------
    //------------------ FULL CALENDAR OPTIONS--------------------------
    //------------------------------------------------------------------
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
        events: programA2.eventPush,
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