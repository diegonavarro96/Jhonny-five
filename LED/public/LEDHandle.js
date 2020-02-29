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
let xAxis = [1,2,3,4,5,6,7,8,9,10]
let yAxis =[]
let x = 0;
let drawChart = false;
let getSamples = false;
socket.on('Test',function(data){
  if(getSamples){
  yAxis.push(data.sample)
  x++;
  }
  if(x >20){
    x =0;
    getSamples = false;
    const myChart = document.getElementById('lineChart');
    let chartData = {
      labels: xAxis,//X axis
      datasets: [{ 
          data: yAxis,//Y axis
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
            text: 'PID bevavoir'
          }
        }
  })
  yAxis = [];
  }
});
//listen for events
start.addEventListener('click',function(){
  getSamples = true;
})
