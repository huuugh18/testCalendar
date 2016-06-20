$(document).ready(function() {
    // -----------------Start Date -----------------------------
    let startDateInput = moment('2016-06-29','YYYY-MM-DD')
    console.log(startDateInput)
    let startArr = []
    //-----------------Current Date for Well-------------------
    clickDate(moment())
    // -----------------Workout Objects-------------------------
    // -----------------A1 Workout Objs-------------------------
    let ubfA1 = new Workout('ubfA1', 'Upper Flex', 'https://www.youtube.com/watch?v=Ozd_56IHdfM', 'flex', 'Upper Body Flexibility A1', ['Lower Back Mobility','Biceps Stretch', 'Pec Stretch'])
    let lbsA1 = new Workout('lbsA1', 'Lower Strength', 'https://www.youtube.com/watch?v=MYNWjf0qjxE', 'lift', 'Lower Body Strength A1', ['body weight squats', 'alternating lunges', 'swiss ball hamstring pulls'])
    let restA1 = new Workout('restA1', 'Rest Day', 'https://www.youtube.com/watch?v=qrx1vyvtRLY', 'rest', 'Rest Day', ['Enjoy your rest day'])
    let cardioA1 = new Workout('cardioA1', 'Cardio', 'https://www.youtube.com/watch?v=iTLtv0hoSHU', 'cardio', 'Cardio Workout', ['biking', 'jogging', 'swimming'])
    //-----------------Workout Array Input----------------------
    let workoutA1 = [ubfA1,lbsA1,restA1]
    let workoutA2 = [ubfA1,lbsA1,restA1,cardioA1]
    //--------------------Workout Constructor-------------------
    function Workout(id, title, url, className, descrip, list)     {
        this.id = id
        this.title = title
        this.url = url
        this.className = className
        this.descrip = descrip
        this.list = list
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
        for (let j=0; j < length; j++) {
            startArr[j] = addDays(startDate,j)
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
                textColor: workoutArr[i].txtColor,
                descrip: workoutArr[i].descrip,
                list:workoutArr[i].list

            })
        }
        return scheduleArr
    }
    // -----------------------------------------------------------------
    //------------------ FULL CALENDAR OPTIONS--------------------------
    //------------------------------------------------------------------
    $('#calendar').fullCalendar({
        weekends: true,
        dayClick: function(date) {
            clickDate(date)
            var dayEvents = $('#calendar').fullCalendar('clientEvents', function(event) {
                return moment(event.start).isSame(date)
                
            })
            console.log(dayEvents[0])
            pushWorkout(dayEvents)
            
            	
        },
        allDayDefault: true,
        theme: true ,
        themeButtonIcons: {
            prev:'circle-triangle-w',
            next:'circle-triangle-e',
            prevYear: 'seek-prev',
            nextYear: 'seek-next'
        },
        events: 
                programA2.eventPush,
       
        
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
    // change date format so single digit days and months have a 0 in front
    function getMoment(time) {
        return moment(time,'YYYY-M-D').format('YYYY-MM-DD')
    }
    function addDays(date,length){
        return moment(date).add(length,'days')
    }
    // click function for calendar well dates 
    function clickDate(date) {
        let newDate = moment(date,'YYYY-MM-DD').format('MMMM D')
        $('h2.dateTitle').html(newDate)
       
        
    }
    // function findTitle(title) {
    //     return title.title === 'Lower Body Strength'
    // }
    // console.log(programA1.eventPush.find(findTitle))
    let compareDate = '2016-06-30'
    // compare date function for find
    function findDate(clickDate) {
        
        let clickFormat = moment(clickDate.start._d).format('YYYY-MM-DD')
        return clickFormat === compareDate
    }
    // get workout title from object with the findDate function based on date chosen
    function getCurrentW() {
        let clientEventsArr = $('#calendar').fullCalendar('clientEvents')
        console.log(clientEventsArr.find(findDate).title)
        return(programA1.eventPush.find(findDate)).title
    }
    getCurrentW()
    function pushWorkout(dayEvents) {
            $('h3.workoutTitle').html(dayEvents[0].descrip)
            $('#workoutList').empty()
            for (let i=0; i < dayEvents[0].list.length; i++) {
                $('#workoutList').append(
                $('<a/>')
                    .addClass('list-group-item')
                    .prop('href', '#')
                    .html('<div class=\'c1\'><h4>' + dayEvents[0].list[i] + '</h4>')
                    
                )
            }
            
        }
}); 