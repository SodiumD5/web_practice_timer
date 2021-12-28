const taps_align = document.getElementById("taps-align");
var todo_input = document.getElementById("todo_input");
var todo_ul = document.getElementById("todo-holder");
const doing_now = document.getElementById("doing");

const todo_reset = document.getElementById("reset");
const bottom_align = document.getElementById("bottom_align");

var check_Array = [];
var value_Array = [];
local_to_array();
changeValue();
taps_align.addEventListener("submit", (event) => {
    event.preventDefault();
    check_Array = [];
    value_Array = [];
    check_Array.push("false");
    value_Array.push(todo_input.value);

    local_to_array();
});

bottom_align.addEventListener("click", (event) => {
    localStorage.clear();
    check_Array = [];
    value_Array = [];
    todo_ul.innerHTML = "";
});

function array_to_local() {
    for (var i = 0; i < check_Array.length; i++) {
        if (value_Array[i] != '') {
            localStorage.setItem(value_Array[i], check_Array[i]);
        }
    }
}

function local_to_array() {
    for (var i = 0; i < localStorage.length; i++) {
        check_Array.push(localStorage.getItem(localStorage.key(i)));
        value_Array.push(localStorage.key(i));
    }
    submit();
}

// 삭제버튼 의문 미수사건???

function submit() {
    todo_ul.innerHTML = "";
    foreach_check();
    //바뀌었을때 changeValue 함수 실행
    todo_input.value = null;
    array_to_local();
}

function foreach_check() {
    check_Array.forEach((value, index) => {
        if (value_Array[index] != "") {
            if (value === "false") {
                todo_ul.innerHTML += `<li><input type="checkbox" onChange="changeValue(${index})"><span>${value_Array[index]}</span>
                <button style="width = 20px; height:20px; border:1px solid black;" onclick="deleteToDo(${index})">삭제</button>
                <button style="width = 20px; height:20px; border:1px solid black;" onclick="ChoseToDo(${index})">선택</button>
                <div></div></li>`;
            } else {
                todo_ul.innerHTML += `<li><input type="checkbox" onChange="changeValue(${index})" checked/><span><del>${value_Array[index]}</del></span>
                <button style="width = 20px; height:20px; border:1px solid black;" onclick="deleteToDo(${index})">삭제</button>
                <button style="width = 20px; height:20px; border:1px solid black;" onclick="ChoseToDo(${index})">선택</button></li>`;
            }
        }
    });
}

function changeValue(index) {
    if (check_Array[index] == "false") {
        check_Array[index] = "true";
    } else {
        check_Array[index] = "false";
    }
    array_to_local();
}

function deleteToDo(index) {
    check_Array.splice(index, 1);
    value_Array.splice(index, 1);

    localStorage.clear();
    array_to_local();

    todo_ul.innerHTML = "";
    foreach_check();
}

function ChoseToDo(index) {
    if (value_Array != "") {
        doing_now.innerHTML = `<div style="font-size : 30px;";>${value_Array[index]}</div>`;
    } else {
        doing_now.innerHTML = "";
    }
}
