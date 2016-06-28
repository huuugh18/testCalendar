$(document).ready(()=> {
    //-----------------Mod-------------
    MYMOD.hello()
    // -----------set current date on load----------------------
    clickDate(moment())
    // --------------------Submit Button------------------------
    $('#submitDateBtn').click(function() {
        // get date inupt from datepicker
        let startDateInput = $('#datepicker').datepicker( 'getDate' )
        startDateInput = moment(startDateInput)
        // get program from select form
        let selectedProg = document.getElementById('selProgForm').value
        // construct program objects
        let programA1 = new ProgramObj('pA1', 'Hypertension A1', '#', 'hypertension', startDateInput, monthlyA1 )
        // put program objects into array
        let progs = [programA1]
        // get program object from the form value containing program id 
        // let foundProg = getByValue2(progs, selectedProg)
        const foundProg = progs.find(prog => prog.id === selectedProg)
        // clear calendar of events
        const cal = $('#calendar')
        cal.fullCalendar('removeEvents')
        // iterate through workout array in program to add events to calendar
        foundProg.eventPush.forEach( prog =>  cal.fullCalendar('renderEvent', prog, 'stick'))
        // for (let i=0; i<foundProg.eventPush.length; i++) {
        //     cal.fullCalendar('renderEvent', foundProg.eventPush[i], 'stick')
        // }
    })
   
   
    
    //-------------------------------------------------------------------
    //----------------------JQUERY DATE PICKER---------------------------
    //-------------------------------------------------------------------

    $(function() {
        $('#datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: false,
            buttonText: 'Select Start Date'
       
        })
    })
        
    
    
    // -----------------------------------------------------------------
    //------------------ FULL CALENDAR OPTIONS--------------------------
    //------------------------------------------------------------------
    $('#calendar').fullCalendar({
        weekends: true,
        editable: true,
        dayClick: function(date) {
            // PUSH DATE HEADER
            clickDate(date)
            // PUSH WORKOUT DATA
            pushWorkout(date)
        },
        // CLICK ON EVENT AND PUSH DATA TO EVENT WELL
        eventClick: function(event) {
            // PUSH DATE HEADER
            clickEvent(event)
            // PUSH WORKOUT DATA
            pushWorkoutEvent(event)
        },
        allDayDefault: true,
        theme: true ,
        // BUTTON ICONS 
        themeButtonIcons: {
            prev:'circle-triangle-w',
            next:'circle-triangle-e',
            prevYear: 'seek-prev',
            nextYear: 'seek-next'
        },
        events: '',
        // NAVIGATION BUTTONS IN HEADER
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        }
    })
     
    // CHANGE DATE FORMAT FROM SINGLE DIGIT TO DOUBLE DIGIT DAYS AND MONTHS
    function getMoment(time) {
        return moment(time,'YYYY-M-D').format('YYYY-MM-DD')
    }
   
    // PUSH DATE SELECTED TO EXWELL ON CLICK OF DAY AND EVENT 
    function clickEvent(date) {
        let newDate = moment(date.start,'YYYY-MM-DD').format('MMMM D')
        $('h2.dateTitle').html(newDate)
    }
    function clickDate(date) {
        let newDate = moment(date,'YYYY-MM-DD').format('MMMM D')
        $('h2.dateTitle').html(newDate)
    }
    // TODAYS WORKOUT AND DATE PUSH TO EXWELL
    function presentPushWorkout() {
        clickDate(moment())
        pushWorkout(moment())
    }
    // PUSH WORKOUT CONTAINED IN DATE AND EVENT TO EXWELL
    function pushWorkout(date) {
        let dayEvents = $('#calendar').fullCalendar('clientEvents', function(event) {
                return moment(event.start).isSame(date, 'day')
            })
        $('#workoutList').empty()
        $('h3.workoutTitle').html('No Workout Today')
        const nada = _.isEmpty(dayEvents)
        if (!nada && dayEvents[0].descrip !== undefined) {
            $('h3.workoutTitle').html(dayEvents[0].descrip)
            for (let i=0; i < dayEvents[0].list.length; i++) {
                $('#workoutList').append(
                $('<a/>')
                    .addClass('list-group-item list-group-item-success')
                    .prop('target','_blank')
                    .prop('href', dayEvents[0].list[i].url)
                    .html('<div class=\'c1\'><h5>' + dayEvents[0].list[i].title + '</h5>')
                    
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
                    .prop('target','_blank')
                    .prop('href', event.list[i].url)
                    .html('<div class=\'c1\'><h5>' + event.list[i].title + '</h5>')
                    
                )
            }
        }
        
    }
    // FIND SELECTED PROGRAM IN DATA ARRAY CONTAINING ALL PROGRAMS
    function getByValue2(arr, value) {
        var result  = arr.filter(function(o){return o.id == value;} );
        return result? result[0] : null; // or undefined
    }
    

}); 