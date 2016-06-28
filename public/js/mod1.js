const MYMOD = {
    hello:() =>  console.log('hello world')

}
    let startArr = []

    //-------------------------------------------------------------------
    //-----------------------CONSTRUCTORS--------------------------------
    //-------------------------------------------------------------------
        
        // --------------------EXERCISE CONSTRUCTOR--------------------------
        function Exercise(title, url) {
            this.title = title
            this.url = url
        }

        //--------------------WORKOUT CONSTRUCTORS---------------------------
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
        
        //--------------PROGRAM CONSTRUCTOR-------------------------
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

        // GET BACKGROUND COLOR FOR CLASS
        function getBG(className){
            switch(className){
                case 'rest': return '#83CDE6'
                case 'cardio': return '#E8002B'
                case 'lift': return '#FAAC2F'
                case 'flex': return '#19BD04'
            }
        }
        // GET TEXT COLOR FOR CLASS
        function getTxt(className){
            switch(className){
                case 'rest': return '#1c2833'
                case 'cardio': return '#FEFEFE'
                case 'lift': return '#05182a'
                case 'flex': return '#32050e'
            }
        }

    
    
    
    
    
    // -------------------A1 Exercice Objects -------------------------
        // -----------------Upper Flex Lower Strength ---------------------
            const neckSixStretch = new Exercise('Six Direction Neck Stretch', 'https://youtu.be/RTQ-qgBvcQA')
            const wristExtensorStretch = new Exercise('Wrist Extensor Stretch', 'https://youtu.be/i72ijRnySsQ')
            const fingerWavesStretch = new Exercise('Finger Waves','https://youtu.be/NX2x3TAEszs')
            const shoulderPendStretch = new Exercise('Shoulder Pendulum' , 'https://youtu.be/Wr--7ncxDvc')
            const heelRaiseStrength = new Exercise('Heel Raises' , ' https://youtu.be/sBBBKKopNDg')
            const arcQuadExtStrength = new Exercise('Short Arc Quads Extension', 'https://youtu.be/l5V84SOa7KM')
            const strtLegRaiseStrength = new Exercise('Straight Leg Raise' , 'https://youtu.be/Seuapn_ZQnM')
            const footShortStrength = new Exercise('Foot Shortening', 'https://youtu.be/mrBKuMMczR8')
            const a1ufls = [neckSixStretch, wristExtensorStretch, fingerWavesStretch, shoulderPendStretch, heelRaiseStrength, arcQuadExtStrength, strtLegRaiseStrength, footShortStrength]
        // -----------------Upper Strength Lower Flex --------------------------
            const gripStrength = new Exercise('Gripping Exercise', 'https://youtu.be/yyP9WDMDymM')
            const kneePushupStrength = new Exercise('Knee Pushups', 'https://youtu.be/HrN4KrTz6P8')
            const resistBiStrength = new Exercise('Resisted Biceps Curls', 'https://youtu.be/i63jFQUvyPY')
            const resistWristFlexStrength = new Exercise('Resisited Wrist Flexion', 'https://youtu.be/sp-3E-pP87o')
            const ankleRotFlex = new Exercise('Ankle Rotations', 'https://youtu.be/ib6mEkC7HQ4')
            const tblHamFlex = new Exercise('Table Hamstring Stretch', 'https://youtu.be/ldUWWVzLo4U')
            const assistGroinFlex = new Exercise('Assisted Groin Stretch', 'https://youtu.be/9tG8PfPjEVo')
            const gluteFlex = new Exercise('Gluteal Stretch', 'https://youtu.be/XcJln-8Eed4')
            const a1uslf = [gripStrength, kneePushupStrength, resistBiStrength,resistWristFlexStrength, ankleRotFlex, tblHamFlex, assistGroinFlex, gluteFlex]

        // --------------------------Core ---------------------------------
            const catDogCore = new Exercise('Cat and Dog Stretch', 'https://youtu.be/9ZGoOTv3V3g')
            const lowAbsCore = new Exercise('Lower Abs', 'https://youtu.be/JAST1CHOcss')
            const stomHollowCore = new Exercise('Stomach Hollowing', 'https://youtu.be/LCq32AtcK6I')
            const proneAbStretchCore = new Exercise('Prone Abdominal Stretch', 'https://youtu.be/CSkENbCF-wc')
            const a1Core = [catDogCore, lowAbsCore, stomHollowCore, proneAbStretchCore]
            
        
        //  -------------------Aerobic Exercise ----------------------------
            const aeroTreadmill = new Exercise('Treadmill Running', '#')
            const aeroSwimming = new Exercise('Swimming', '#')
            const aeroSkating = new Exercise('Skating', '#')
            const aeroOther = new Exercise('Other', '#')
            const a1Aerobic = [aeroTreadmill, aeroSwimming, aeroSkating, aeroOther]
        // -----------------------Rest Day----------------------------------
            const restDay = new Exercise('Rest Day', '#')
        
    // --------------------A1 Workout Objs------------------------------
            let A1Day1 = new Workout('A1Day1', 'A1 Day 1', '#', 'lift', 'Strength and Flexibility', a1ufls)
            let A1Day2 = new Workout('A1Day2', 'A1 Day 2', '#', 'cardio', 'Aerobic Exercise', a1Aerobic)
            let A1Day3 = new Workout('A1Day3', 'A1 Day 3', '#', 'core', 'Core Abdominal Exercise', a1Core)
            let A1Day4 = new Workout('A1Day4', 'A1 Day 4', '#', 'rest', 'Rest Day', restDay)
            let A1Day5 = new Workout('A1Day5', 'A1 Day 5', '#', 'lift', 'Strength and Flexibility', a1uslf)
            let A1Day6 = new Workout('A1Day6', 'A1 Day 6', '#', 'cardio', 'Aerobic Exercise', a1Aerobic)
            let A1Day7 = new Workout('A1Day7', 'A1 Day 7', '#', 'rest' ,'Rest Day', restDay )

    //--------------------Workout Array Input---------------------------
            let workoutA1 = [A1Day1,A1Day2,A1Day3,A1Day4,A1Day5,A1Day6,A1Day7]
            // ------------modify to make monthly program
            let monthlyA1 = addWeeks(workoutA1)
            
        

    //GET DATES INTO SCHEDULE
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

    //CREATE DATES FROM STARTING DATE INPUT
    function dateCalc(startDate,length) {
        for (let j=0; j < length; j++) {
            startArr[j] = addDays(startDate,j)
        }
        return startArr
    }

     // FOR dateCalc FUNCTION TO ADD DAYS TO STARTING DATE
    function addDays(date,length){
        return moment(date).add(length,'days')
    }

      // ---------------Trying to get function to increase length of 
     // ---------------weekly program to monthly but copying pushing elements of array into itself...------------
    
    
    function addWeeks(workout) {
        let addWorkout = workout.concat(workout,workout,workout)
        return addWorkout
    }
