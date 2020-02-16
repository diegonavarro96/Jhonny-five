// Make connection

const socket = io.connect('http://localhost:3000');


//Query DOM
const blink = document.getElementById('blink');
const on = document.getElementById('on');
const off = document.getElementById('off');
const pwm = document.getElementById('pwm');
const start = document.getElementById('start');


//Emit events

blink.addEventListener('click',function(){
    socket.emit('blink','blink')
});

on.addEventListener('click',function(){
   // console.log(pwm);
    socket.emit('on',{ 
        pwm: pwm.value
     })
});

off.addEventListener('click',function(){
    socket.emit('off','off')
});
let x = 0;
//listen for events
start.addEventListener('click',function(){
    if(x === 2){
        x = 0;
    }

    const myChart = document.getElementById('lineChart');
let xAxis = [2,3,4,5,6,7,8,9,10]
let yAxis =[[0,1,2,3,4,5,6,7,8,9,10,11,12],[11,12,13,14,15]]
let chartData = {
    labels: xAxis,//X axis
    datasets: [{ 
        data: yAxis[x],//Y axis
        label: "Motor",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  }

let massPopChart = new Chart(myChart,{
    type:'line',
    data: chartData,
    options: {
        title: {
          display: true,
          text: 'World population per region (in millions)'
        }
      }

})
x++;

})
