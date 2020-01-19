var hiscore = 0;
function start(){
    var score = 0;
    var color = "blue";

    function sigmoid(t){
        return 1/(1+Math.pow(Math.E, -t));
    }

    function random(min,max){
        return Math.round(Math.random() * (max-min) + min);
    }

    function setBG(){
    if (Math.round(Math.random())){
        return "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Frankenstein-icon.png";
    } else {
        return "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Scream-icon.png";
    }
    }

    function rand_with_interval(min,max,min_dist){
        // gives a sorted array within the max-min range, with a minimum distance between each element
        var imax = Math.round(Math.random()*(max-min)/min_dist)
        var ratio_arr = [];
        for(i=0;i<imax;i++){
            ratio_arr[i] = Math.random();
        }
        ratio_arr.sort();
        var distributed_arr = [];
        var pre_num=0;
        for(i=0;i<imax;i++){
            if(i==0){
                distributed_arr[i] = pre_num + (max-min-imax*min_dist)*ratio_arr[i];
                pre_num = distributed_arr[i];
            }else{
                distributed_arr[i] = pre_num + min_dist + (max-min-imax*min_dist)*(ratio_arr[i]-ratio_arr[i-1]);
                pre_num = distributed_arr[i];
            }
        }
        console.log(min);
        console.log(max);
        console.log(min_dist);
        console.log(distributed_arr);
        return(distributed_arr);
    }

    function dropBox(pos){
    var length = pos;
        //var length = random(100, ($(".game").width() - 100));
    var velocity = random(6500, 10000)/(0.02*score+1);
    var size = random(50, 150); 
    var thisBox = $("<div/>", {
        class: "box",
        style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
    });
    
    //set data and bg based on data
    thisBox.data("test", Math.round(Math.random()));
    if(thisBox.data("test")){
        //good: thisBox.data("test") = 1
        thisBox.css({"background": "url('good_data.png')", "background-size":"contain"});
    } else {
        //bad: thisBox.data("test") = 0
        thisBox.css({"background": "url('bad_data.png')", "background-size":"contain"});
    }
    
    
    //insert gift element
    $(".game").append(thisBox);
    
    //random start for animation
    setTimeout(function(){
        thisBox.addClass("move");
    }, random(0, 5000) );
    
    //remove this object when animation is over
    thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function(event) {
                    if(thisBox.data("test")){
                        // good data reach bottom
                        // increase score
                        score = score + 1;
                        $(".score").html(score);
                        $(this).remove();
                    }else{
                        //bad data reach bottom -> game over
                        GameOver();
                    }
                    

    });
    }
    var pos_arr = rand_with_interval(100,$(".game").width()-100,100);
    for(i=0;i<pos_arr.length;i++){ 
        dropBox(pos_arr[i]);
    }

    $(document).on('click', '.box', function(){

    
    if($(this).data("test")){
        // killed a good data -> gameover
        GameOver();
    } else {
        
    }
    
    $(".score").html(score);
    $(this).remove();
    });
    var time_counter=0; // used to determine how quickly new boxes are spawned
    var runGame = setInterval(function(){
                    time_counter++;
                    if(time_counter>=Math.round(Math.pow(10,1-sigmoid(0.2*score-5)))){
                        time_counter=0;
                        var pos_arr = rand_with_interval(100,$(".game").width()-100,100);
                        for(i=0;i<pos_arr.length;i++){ 
                            dropBox(pos_arr[i]);
                        }
                    }
                }, 500);

    function countdown() {
            var seconds = 600;
            function tick() {
                var counter = document.getElementById("counter");
                seconds--;
                counter.innerHTML = (seconds < 10 ? "0" : "")  + String(seconds) + "S";
                if( seconds > 0 ) {
                    setTimeout(tick, 1000);

                } else {
                    alert("Game over");
                    clearInterval(runGame);
                }
            }
            tick();
        }
    function GameOver(){
        var boxes = document.getElementsByClassName('box');
        var demo = document.getElementById('playgame');
        var hi = document.getElementById('high');
        var st = "Highscore = "
        while(boxes[0]){
            boxes[0].parentNode.removeChild(boxes[0]);}
        clearInterval(runGame);
        alert("game over. Score = " + score);
        demo.innerHTML = "Play";
        if (score > hiscore){
        hiscore = score;
        }
        else{

        }
        hi.innerHTML = st.concat(hiscore);//start();
    }
    start.GameOver = GameOver;
    //countdown();
}
//start();