const express = require('express');
const app = express();
const port = 3000;
const socket = require('socket.io')
var five = require("johnny-five");


const server = app.listen(port,function(){
  console.log(`listening to requests con port ${port} !`)
})

app.use(express.static('public'));

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


//socket setup
const io = socket(server);
let x= 0.1;
 
const board = new five.Board({
    port: "COM5",
    repl: false
  });

board.on("ready", function() {
  const led = new five.Led(13);
  let valueAnteroir =0
  let first = true
  //led.blink(1000);
  //var sensor = new five.Sensor("A1");
  const potentiometer = new five.Sensor("A3");

  io.on('connection',function(socket){
   // console.log('made socket connection',socket.id) 
    
    socket.on('blink',function(data){
      //console.log(data);
      //led.brightness(data.pwm);
      led.blink(500);
    });

    socket.on('on',function(data){
      //console.log(data.pwm);
      led.stop();
      led.brightness(Number(data.pwm));
    });

    socket.on('off',function(data){
      led.stop();
      led.off();
    });
    setInterval(function() {
        const {value, raw} = potentiometer;
        if (first){
          first = false
          valueAnteroir = value
        }
        if(value > valueAnteroir +2 || value< valueAnteroir -2){
          console.log("sensor = ",value)
      socket.emit('Test',{
        sample : value
      });
    }
    valueAnteroir = value;
    }, 50);
    
  });

});