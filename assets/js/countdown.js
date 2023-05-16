var countDownDate = new Date("June 23, 2023 23:59:59").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="countdown"
  if(document.getElementById("countdown")){
     document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  }
  else{
    document.getElementById("gerisayim").innerHTML = days + "g " + hours + "s "
    + minutes + "d " + seconds + "s ";
  }

 
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    if(document.getElementById("countdown")){
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
    else{
        document.getElementById("gerisayim").innerHTML = "EXPIRED";
    }
    
  }
}, 1000);