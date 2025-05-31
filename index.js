let btn = document.querySelector(".btn-start")
let start = document.querySelector(".start")
let main = document.querySelector(".box")
let num1 = document.querySelector(".number1")
let num2 = document.querySelector(".number2")
let op = document.querySelector(".operator")
let asd = document.querySelectorAll(".answer button")
let data_answered = 0
let correct = 0

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let operator = ['+', '-']

let answer

btn.addEventListener('click', function(){
        start.style.display = "none"
        main.style.display = "block"
        answer = random()
        startTimer()
})

let menu = document.querySelector(".menu")
let list = document.querySelector('.display ul')

menu.addEventListener('click', function(){
    list.innerHTML = ""
    let value = (document.cookie.split('='))[1]
    let data = value.split(",")
    console.log(data)

    for (i = 0; i < data.length; i++){
        list.innerHTML += `<li>${data[i]}</li>`
    }

    list.style.display = "block"
})


for (i = 0; i<asd.length; i++){
    asd[i].addEventListener('click', function(){
        if (answer == this.getAttribute("data-id")){
            this.style.background = "#38ff49"
            correct++
        }
        else{
            this.style.background = "#ff0a0a"
        }
        setTimeout(() =>{
            this.style.background = 'none'
            answer = random()
        }, 1000)
    })
}

function random(){
        quest1 = getRandomInt(101)
        quest2 = getRandomInt(101)
        num1.innerHTML = quest1
        num2.innerHTML = quest2

        let oprt = operator[getRandomInt(2)]
        op.innerHTML = oprt

        let ans

        if (oprt == "+"){
            ans = quest1 + quest2
        }
        else{
            ans = quest1 - quest2
        }
        
        let ansindex = getRandomInt(5)

        asd[ansindex].innerHTML = ans

        for (i = 0; i<asd.length; i++){
            if (i != ansindex){
                asd[i].innerHTML = getRandomInt(101)
            }
        }
        data_answered++
        return ansindex
}

let end_screen = document.querySelector('.end')
let text = document.querySelector('.title')
let box = document.querySelector('.box')
function startTimer(){
    setTimeout(function(){
        box.style.display = "none"
        end_screen.style.display = "block"
        if (data_answered == 0){
            text.innerHTML = "The timer has ended! In conclusion, you got 0 questions correct with an accuracy of 0%"
        }
        else{
            text.innerHTML = "The timer has ended! In conclusion, you got " + correct + " questions correct with an accuracy of " + ((correct/data_answered) * 100).toFixed(1) + "%"
        }
        let cookie = document.cookie.split(";")
        if(cookie[0]==""){
            let new_cookie = `accuracy=${((correct/data_answered) * 100).toFixed(1)}; max-age=10000000000`
            document.cookie = new_cookie
        }
        else{
            let accuracy = (cookie[0].split('='))[1]
            accuracy = accuracy + "," + ((correct/data_answered) * 100).toFixed(1)
            let new_cookie2 = `accuracy=${accuracy}; max-age=1000000000`
            document.cookie = new_cookie2
            console.log(accuracy)
        }

        
    }, 10000)
}

function hide(){
    end_screen.style.display = "none"
    box.style.display = "block"
    startTimer()
    answer = 0
    correct = 0
    data_answered = 0
}