// 변수설정
const timer = document.getElementById("timer");
const up = document.getElementById("up");
const down = document.getElementById("down");
const setting_time = document.getElementById("setting-time");
const play_stop = document.getElementById("play-stop");
const reset = document.getElementById("reset");
const total_hour = document.getElementById("total_hour");
const total_minute = document.getElementById("total_minute");
const total_secend = document.getElementById("total_secend");
const tap = document.getElementById("tap");
const tapopen = document.getElementById("tap-open");
//const light_dark = document.getElementById("light-dark");
var play_button = "play";
let minute = 0;
let secend = 0;
let first_minute = 0;
let total_time = 0;
let overtime = 0;

//초기값 설정
setting_time.innerHTML =
    leadingZeros(minute, 2) + ":" + leadingZeros(secend, 2);
play_stop.innerHTML = `<span class="material-icons-round icon">play_arrow</span>`;
playcheck();
reset.style.visibility = "hidden";
var tapclick = "close";
var time=0;
var overtimecal=0;
var call_overtime = "no";
//클릭 이벤트 감지
up.addEventListener("click", (event) => {
    if (minute < 150) {
        event.preventDefault();
        minute = minute + 1; //잠시 1로 바꿔서 실험할거임-----------------------------
        first_minute = minute;
        setting_time.innerHTML =
            leadingZeros(minute, 2) + ":" + leadingZeros(secend, 2);
    }
    playcheck();
});

down.addEventListener("click", (event) => {
    if (minute > 0) {
        event.preventDefault();
        minute = minute - 1; //잠시 1로 바꿔서 실험할거임-----------------------------
        first_minute = minute;
        setting_time.innerHTML =
            leadingZeros(minute, 2) + ":" + leadingZeros(secend, 2);
    }
    playcheck();
});

play_stop.addEventListener("click", (event) => {
    event.preventDefault();
    call_overtime="no";
    if (play_button == "play") {
        play_button = "stop";
        play_stop.innerHTML =
            '<span class="material-icons-round icon">pause</span>';
        up.style.visibility = "hidden";
        down.style.visibility = "hidden";
        reset.style.visibility = "hidden";
        time= setInterval(function () {
            left_time();
            study_time();
        }, 1000);
    } else if (play_button == "stop") {
        play_button = "play";
        play_stop.innerHTML = `<span class="material-icons-round icon">play_arrow</span>`;
        reset.style.visibility = "visible";
        clearInterval(time);
    }
});

reset.addEventListener("click", (event) => {
    if (overtime>0){
        alert(overtime + "초 더 지났습니다");
    }
    setting_time.innerHTML = leadingZeros(first_minute, 2) + ":00";
    minute = first_minute;
    secend = 0;
    up.style.visibility = "visible";
    down.style.visibility = "visible";
    reset.style.visibility = "hidden";
    play_stop.style.visibility = "visible";
    timer.innerHTML = "Timer";
    overtime=0;
    clearInterval(time);
    clearInterval(overtimecal);
});

tapopen.addEventListener("click", (event) => {
    if (tapclick == "close") {
        tapclick = "open";
        tap.style.visibility = "visible";
    } else {
        tapclick = "close";
        tap.style.visibility = "hidden";
    }
    tapopen.style.visibility = "visible";
});

//각종 함수들
function playcheck() {
    if (minute == 0) {
        play_stop.style.visibility = "hidden";
    } else {
        play_stop.style.visibility = "visible";
    }
}

function leadingZeros(date, num) {
    var zero = "";
    date = date.toString();

    if (date.length < num) {
        for (i = 0; i < num - date.length; i++) zero += "0";
    }
    return zero + date;
}

function left_time() {
    if (secend > 0) {
        secend = secend - 1;
        setting_time.innerHTML =
        leadingZeros(minute, 2) + ":" + leadingZeros(secend, 2);
    } else if (minute > 0) {
        minute = minute - 1;
        secend = 59;
        setting_time.innerHTML =
        leadingZeros(minute, 2) + ":" + leadingZeros(secend, 2);
    } else {
        timer.innerHTML = "<div style='color :red'>Time's Up</div>";
        if (call_overtime == "no"){
            minute = 0;
            secend = 0;
            overtimecal = setInterval(function(){
                over_time();
            }, 1000);
            call_overtime="yes";
        }
        overtimecal;
        play_stop.style.visibility = "hidden";
        reset.style.visibility = "visible";
        play_button = "play";
        play_stop.innerHTML = `<span class="material-icons-round icon">play_arrow</span>`;
    }
    
}

function over_time() {
    overtime = overtime +1;
    var overminute = Math.floor(overtime/60);
    var oversecend = overtime % 60; 
    setting_time.innerHTML =
        leadingZeros(overminute, 2) + ":" + leadingZeros(oversecend, 2);
}

function study_time() {
    total_time = total_time + 1;
    var totalhour = Math.floor(total_time / 3600);
    var totalminute = Math.floor((total_time - totalhour * 3600) / 60);
    var totalsecend = total_time % 60;

    total_secend.innerHTML = totalsecend + "초";
    total_minute.innerHTML = totalminute + "분";
    total_hour.innerHTML = totalhour + "시간";
}
