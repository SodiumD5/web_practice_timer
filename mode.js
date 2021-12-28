const darkmode = document.getElementById("darkmode");
var backcolor = document.querySelectorAll(".backcolor");
const tap_color = document.getElementsByClassName("tap_color");
var doing = document.getElementById("doing");
const main = document.getElementById("main");
const bottom_icon = document.getElementsByClassName("material-icons-round");

var state = "dark";

var icon = document.querySelectorAll("button");

darkmode.addEventListener("click", (event) => {
    event.preventDefault();
    if (state == "light"){ //dark모드로 바꾸기
        state = "dark"
        console.log("dark");
    }
    else {
        state = "light";
        console.log("light");
    }
});

body.addEventListener("click", (event) => {
    dark_light();
})


function dark_light() {
    
    if (state == "light"){ //dark모드로 바꾸기
        document.querySelector('body').style.color ="#dcdde1";
        icon.forEach((e) => {
            e.style.color = "#dcdde1";
        });
        backcolor.forEach((e) => {  //전체 검정색으로 바탕 해주는거 
            e.style.backgroundColor = "#3d3d3d";
        });
        
        doing.style.borderBottom="5px solid #dcdde1";
        darkmode.innerHTML='<span class="material-icons-round">light_mode</span>';
        main.style.color= "#dcdde1";
    
    }
    else {  //light 모드로 바꾸기
        document.querySelector('body').style.color ="#3d3d3d";
        icon.forEach((e) => {
            e.style.color = "#3d3d3d";
        });
        backcolor.forEach((e) => {
            e.style.backgroundColor = "#dcdde1";
        });
        doing.style.borderBottom="5px solid #3d3d3d";
        darkmode.innerHTML='<span class="material-icons-round">dark_mode</span>';
        main.style.color= "#3d3d3d";
    
        }
}
