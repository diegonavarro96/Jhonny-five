// Make connection

const socket = io.connect('http://localhost:3000');

//Query DOM
const blink = document.getElementById('blink');
const on = document.getElementById('on');
const off = document.getElementById('off');
const pwm = document.getElementById('pwm');


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
var x =0;
var cnt =0;

//listen for events
