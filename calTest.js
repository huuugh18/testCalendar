$(document).ready(function() {
    
    // match heights of calendar and event well
    let heights = $('.clndrWell').map(function(){return $(this).height()}).get(),
    maxHeight = Math.max.apply(null, heights)
    $('.clndrWell').height(maxHeight)

    // -----------------Start Date -----------------------------
    // let startDateInput = moment('2016-06-20','YYYY-MM-DD')
    let startArr = []
    // let startDateInput = ''

    // --------------------Submit Button------------------------
    $('#submitDateButton').click(function() {
        let startDateInput = $('#datepicker').datepicker( 'getDate' )
        startDateInput = moment(startDateInput)
        console.log(moment.isMoment(startDateInput))
        // $('#calendar').fullCalendar( 'renderEvent', newEvent , 'stick')

        let workoutA1 = [ubfA1,lbsA1,restA1]
        let programA1 = new ProgramObj('pA1', 'Hypertension A1', '#', 'hypertension', startDateInput, workoutA1 )
        console.log(programA1.eventPush)
        $('#calendar').fullCalendar('removeEvents')
        for (let i=0; i<programA1.eventPush.length; i++) {
            $('#calendar').fullCalendar('renderEvent', programA1.eventPush[i], 'stick')
        }
        
        
    })
    

    // -----------------A1 Workout Objs-------------------------
    let ubfA1 = new Workout('ubfA1', 'Upper Flex', 'https://www.youtube.com/watch?v=Ozd_56IHdfM', 'flex', 'Upper Body Flexibility A1', ['Lower Back Mobility','Biceps Stretch', 'Pec Stretch'])
    let lbsA1 = new Workout('lbsA1', 'Lower Strength', 'https://www.youtube.com/watch?v=MYNWjf0qjxE', 'lift', 'Lower Body Strength A1', ['Body Weight Squats', 'Alternating Lunges', 'Swiss Ball Hamstring Curls'])
    let restA1 = new Workout('restA1', 'Rest Day', 'https://www.youtube.com/watch?v=qrx1vyvtRLY', 'rest', 'Rest Day', ['Enjoy your rest day'])
    let cardioA1 = new Workout('cardioA1', 'Cardio', 'https://www.youtube.com/watch?v=iTLtv0hoSHU', 'cardio', 'Cardio Workout', ['Biking', 'Jogging', 'Swimming'])
    //-----------------Workout Array Input----------------------
    // let workoutA1 = [ubfA1,lbsA1,restA1]
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
    // let programA1 = new ProgramObj('pA1', 'Hypertension A1', '#', 'hypertension', startDateInput, workoutA1 )
    // let programA2 = new ProgramObj('pA2', 'Hypertension A2', '#', 'hypertension', startDateInput, workoutA2 )
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
    //-------------------------------------------------------------------
    //----------------------jQuery Date Picker---------------------------
    //-------------------------------------------------------------------

    $(function() {
        $('#datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            // altFormat: 'yy-mm-dd',
            changeMonth: false,
       
        })
    })
        
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
                // url:workoutArr[i].url,
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
        editable: true,
        dayClick: function(date) {
            // get date header
            clickDate(date)
            // get workout data
            pushWorkout(date)
        },
        eventClick: function(event) {
            clickEvent(event)
            pushWorkoutEvent(event)
        },
        allDayDefault: true,
        theme: true ,
        themeButtonIcons: {
            prev:'circle-triangle-w',
            next:'circle-triangle-e',
            prevYear: 'seek-prev',
            nextYear: 'seek-next'
        },
        events: '',
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        }
    })
    // set today date and workout in event well on page load    
    // presentPushWorkout()
    // custom button example
    $('#my-next-button').click(function(){ $('#calendar').fullCalendar('today')})
    
    // change date format so single digit days and months have a 0 in front
    function getMoment(time) {
        return moment(time,'YYYY-M-D').format('YYYY-MM-DD')
    }
    function addDays(date,length){
        return moment(date).add(length,'days')
    }
    // click function for calendar well dates 
    function clickEvent(date) {
        let newDate = moment(date.start,'YYYY-MM-DD').format('MMMM D')
        $('h2.dateTitle').html(newDate)
    }
    function clickDate(date) {
        let newDate = moment(date,'YYYY-MM-DD').format('MMMM D')
        $('h2.dateTitle').html(newDate)
       
        
    }
    function presentPushWorkout() {
        clickDate(moment())
        pushWorkout(moment())
    }
    function pushWorkout(date) {
        let dayEvents = $('#calendar').fullCalendar('clientEvents', function(event) {
                return moment(event.start).isSame(date, 'day')
            })
        $('#workoutList').empty()
        $('h3.workoutTitle').html('No Workout Today')
        if (dayEvents[0].descrip !== undefined) {
            $('h3.workoutTitle').html(dayEvents[0].descrip)
            for (let i=0; i < dayEvents[0].list.length; i++) {
                $('#workoutList').append(
                $('<a/>')
                    .addClass('list-group-item list-group-item-success')
                    .prop('href', '#')
                    .html('<div class=\'c1\'><h5>' + dayEvents[0].list[i] + '</h5>')
                    
                )
            }
        }
        
    }
    function pushWorkoutEvent(event) {
        $('#workoutList').empty()
        $('h3.workoutTitle').html('No Workout Today')
        if (event !== undefined) {
            $('h3.workoutTitle').html(event.descrip)
            for (let i=0; i <event.list.length; i++) {
                $('#workoutList').append(
                $('<a/>')
                    .addClass('list-group-item list-group-item-success')
                    .prop('href', '#')
                    .html('<div class=\'c1\'><h5>' + event.list[i] + '</h5>')
                    
                )
            }
        }
        
    }
}); 