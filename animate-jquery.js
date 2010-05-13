/*
 
originally found here: http://net.tutsplus.com/tutorials/html-css-techniques/learn-how-to-create-a-retro-animated-flip-down-clock/

simple jQuery Port made by team Odeon. http://od-eon.com

*/
    var current = {
        "h": -1,
        "m1": -1,
        "m2": -1,
        "s1": -1,
        "s2": -1
    }
    
    var paths = {
        "singles": 'Single',
        "doubles": 'Double'
    }
    
    
    function flip(upperId, lowerId, changeNumber, pathUpper, pathLower){
        var upperBackId = upperId+"Back";
        $(upperId)
            .attr('src', $(upperBackId).attr('src'))
            .height("64px")
            .css({"visibility": "visible", 'display': 'inline-block' });
        
        $(upperBackId).attr('src', pathUpper + parseInt(changeNumber) + ".png");
        
        $(lowerId)
            .attr('src', pathLower + parseInt(changeNumber) + ".png")
            .height('0px')
            .css({"visibility": "visible", 'display': 'inline-block'});
        
        $(upperId).animate({'height': 0}, { 'duration': 200, defaultEasing: 'easeinoutsine', 'complete': function(){
            $(lowerId).animate({'height': 64}, { 'duration': 200, defaultEasing: 'easeinoutsine', 'complete': function(){
                $(lowerId + "Back").attr('src', $(lowerId).attr('src') );
                $(lowerId).add(upperId).css({"visibility": "hidden",
                                             "display": 'inline-block' }).height('0');
            } } )
        } })
    }

    
    function tick(){
        
        var now = new Date(),
            h = now.getHours(),
            m1 = now.getMinutes() / 10,
            m2 = now.getMinutes() % 10,
            s1 = now.getSeconds() / 10,
            s2 = now.getSeconds() % 10,
            pathSingle = paths.singles,
            pathDouble = paths.doubles;
         
        if(h < 12)
           ap = "AM";
        else{ 
           if( h == 12 )
               ap = "PM";
           else{
               ap = "PM";
               h -= 12;
           }
        }
         
        if( h != current.h){
            flip('#hoursUp', '#hoursDown', h, pathSingle + '/Up/'+ap+'/', pathSingle + '/Down/'+ap+'/');
            current.h = h;
        }
        
        if( m2 != current.m2){
            flip('#minutesUpRight', '#minutesDownRight', m2, pathDouble + '/Up/Right/', pathDouble + '/Down/Right/');
            current.m2 = m2;
            
            flip('#minutesUpLeft', '#minutesDownLeft', m1, pathDouble + '/Up/Left/', pathDouble + '/Down/Left/');
            current.m1 = m1;
        }
        
         if (s2 != current.s2){
            flip('#secondsUpRight', '#secondsDownRight', s2, pathDouble + '/Up/Right/', pathDouble + '/Down/Right/');
            current.s2 = s2;
            
            flip('#secondsUpLeft', '#secondsDownLeft', s1, pathDouble + '/Up/Left/', pathDouble + '/Down/Left/');
            current.s1 = s1;
        }

    }
    

    function retroClock(){
        tick();
        setInterval('tick()', 1000);
    }
    

    $(function(){
        retroClock();
    })