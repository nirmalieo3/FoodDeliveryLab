$(function(){
	 $('#open').on('click',function(){
       $('#sideNav').css({
       	   height:'200px',
       	   backgroundColor: 'blue',
       	   
       })
     for(var i = 0; i < items.length; i++){
        items[i].style.width = '10px';
    }
  })
  $('#sideNav').on('click',function(){
       $('#sideNav').css('height', '0') 
    })
   $(document).ready(function(e){
    $('.fancybox').fancybox({autoPlay:true, playSpeed:2000});
     })

})

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openForm2() {
  document.getElementById("myForm2").style.display = "block";
  document.getElementById("myForm").style.display = "none";
}
function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}
function openForm3() {
  document.getElementById("myForm3").style.display = "block";
  document.getElementById("myForm").style.display = "none";
}
function closeForm3() {
  document.getElementById("myForm3").style.display = "none";
}


