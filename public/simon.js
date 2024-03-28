let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let max=Number.MIN_VALUE;

let h2=document.querySelector("h2");
let btns=["red","yellow","green","purple"];
let body=document.querySelector("body");

//for starting the game 
document.addEventListener("keypress",function(){
  if(started===false)  {
    started=true;
    console.log("game started");
     
    levelUp();
  }

});

// level up function
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=` Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let btn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(btn); 
    
} 

//check ans 
function checkAns(idx){
     
      
    if(gameSeq[idx]===userSeq[idx]){
       
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        } 
         
    }else {
       
        h2.innerText=`Game over your score is ${level} \n please enter key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },250);
        if(max<level){
            max=level;
        }
        let h3=document.createElement("h3");
        h3.innerText=`your max score is ${max}`;
        body.append(h3);
        setTimeout(function(){
            body.removeChild(h3);
        },1000);
        
        setTimeout(reset,1000);
    
    }
}



//flash the game button 
function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  },250);
} 
//flash the user clicked btn
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function btnPress(){
    let btn=this; 

   let usercolor=btn.getAttribute("id");
    userSeq.push(usercolor);
    userFlash(btn);
    console.log(userSeq);
    checkAns(userSeq.length-1);
    
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
 btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
     
}


