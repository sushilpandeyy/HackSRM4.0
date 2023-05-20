//GETTING DATA FOR SAVING TASK & THEN SAVING IT IN LOCAL STORAGE AS WELL AS VARIABLE
const d = new Date();
let da = d.getDay();         //Today's Day Code 0 Sunday
user=[]  
tt=[]
links=[] 
time=[]
occ=[]
currenttask=0 //INDEX NUMBER FOR NEW TASK
currentdomain="" //Current domain value
start=0 //Start of TIMER
tak()//CALLING FOR SAVED DATA
buttonstatus()
taskid=-1  //TASKID
hidden=0  //Status for STOP BUtton 
saveworklocal()
workt=0 //IT is a variable to store data about work done in streaks
//STREAK DATABASE
streak=0
let totalwork
if(localStorage.getItem(totalwork)){
totalwork=JSON.parse(localStorage.getItem('totalwork'))
}
else{
    totalwork=0
    localStorage.setItem('totalwork', JSON.stringify(totalwork))
}
weeklyexp=[0,0,0,0,0,0,0]
weeklydone=[0,0,0,0,0,0,0]
getobdata()
getweeklydone()
function getobdata(){
  if(localStorage.getItem('task_title')){
  const ret_weekexp = JSON.parse(localStorage.getItem('weeklyexp_save'))
  console.log("RET WEEKEXP ",ret_weekexp)
  weeklyexp[1]=ret_weekexp[1]
  weeklyexp[2]=ret_weekexp[2]
  weeklyexp[3]=ret_weekexp[3]
  weeklyexp[4]=ret_weekexp[4]
  weeklyexp[5]=ret_weekexp[5]
  weeklyexp[6]=ret_weekexp[6]
  weeklyexp[0]=ret_weekexp[0]
}
}
function getweeklydone(){
  const ret_weekdone = JSON.parse(localStorage.getItem('weeklydone'))
  if(localStorage.getItem(ret_weekdone)){
  if(ret_weekdone[0]=='null'){
    ret_weekdone[0]=0
  }
  if(ret_weekdone[1]=='null'){
    ret_weekdone[1]=0
  }
  if(ret_weekdone[2]=='null'){
    ret_weekdone[2]=0
  }
  if(ret_weekdone[3]=='null'){
    ret_weekdone[3]=0
  }
  if(ret_weekdone[4]=='null'){
    ret_weekdone[4]=0
  }
  if(ret_weekdone[5]=='null'){
    ret_weekdone[5]=0
  }
  if(ret_weekdone[6]=='null'){
    ret_weekdone[6]=0
  }
  weeklydone[1]=ret_weekdone[1]
  weeklydone[2]=ret_weekdone[2]
  weeklydone[3]=ret_weekdone[3]
  weeklydone[4]=ret_weekdone[4]
  weeklydone[5]=ret_weekdone[5]
  weeklydone[6]=ret_weekdone[6]
  weeklydone[0]=ret_weekdone[0]
  console.log("value of ",weeklydone[4])
}
}
var savev = document.getElementById("save");             //TO CALL SAVE FUNCTION BUTTON
savev.addEventListener("click", function(){
  savedata();
})
function buttonstatus(){                               //STATUS FOR BUTTON VISIBILITY
  hidden=JSON.parse(localStorage.getItem('hidden'))
  if(hidden==1){
    var stopbutton = document.getElementById('actoff');
    stopbutton.style.display = "block"
    var startbutton = document.getElementById('act');
    startbutton.style.display="none"
  }
  else if(hidden==0){
    var stopbutton = document.getElementById('actoff');
    stopbutton.style.display = "none"
    var startbutton = document.getElementById('act');
    startbutton.style.display="block"
  }
}
function savedata(){                       //SAVING DATA
    //GETTING INPUT VALUES
      tt[currenttask]=document.getElementById("title").value;
      links[currenttask]=document.getElementById("link").value;
      time[currenttask]=document.getElementById("select").value;
      occ[currenttask]=document.getElementById("select2").value;
      user[currenttask]=0;
      if(occ[currenttask]=="Weekly"){
        weeklyexp[da]=Number(weeklyexp[da])+Number(time[currenttask])
      }
      else{
        weeklyexp[0]=Number(weeklyexp[0])+Number(time[currenttask])
        weeklyexp[1]=Number(weeklyexp[1])+Number(time[currenttask])
        weeklyexp[2]=Number(weeklyexp[2])+Number(time[currenttask])
        weeklyexp[3]=Number(weeklyexp[3])+Number(time[currenttask])
        weeklyexp[4]=Number(weeklyexp[4])+Number(time[currenttask])
        weeklyexp[5]=Number(weeklyexp[5])+Number(time[currenttask])
        weeklyexp[6]=Number(weeklyexp[6])+Number(time[currenttask])
        console.log("THE SAVING PART RAN")
      }
      console.log("The Day is: ",da)
      localStorage.setItem('weeklyexp_save', JSON.stringify(weeklyexp))
      localStorage.setItem('task_title', JSON.stringify(tt));
      localStorage.setItem('task_Links', JSON.stringify(links));
      localStorage.setItem('task_time', JSON.stringify(time));
      localStorage.setItem('task_occ', JSON.stringify(occ));
      localStorage.setItem('user_data', JSON.stringify(user)); 
       update()
    }
//UPDATING THIS DATA IN CHROME EXTENSION
function update(){
    let listItems = ""
    for(a=0; a<currenttask; a++){
      if(links[a]!=currentdomain){
      listItems += `
          <li>
            <h4>Title:  ${tt[a]}</h4><p>Daily:  ${Math.floor(time[a]/60)} mins</p><p>Occurance:  ${occ[a]} </p><br><p>Today:  ${Math.floor(user[a]/60)} mins</p>
           </li> 
           <br><br>
            `   
    }
  }
    tasklist.innerHTML=listItems
    
  }
//GETTING OLD SAVED DATA
function tak(){                       
    if(localStorage.getItem('task_title')){
    const ret_tt = JSON.parse(localStorage.getItem('task_title'))
    const ret_links = JSON.parse(localStorage.getItem('task_Links'))
    const ret_time = JSON.parse(localStorage.getItem('task_time'))
    const ret_occ = JSON.parse(localStorage.getItem('task_occ'))
    const ret_user = JSON.parse(localStorage.getItem('user_data'))
    
    for(a=0; a<ret_tt.length; a++){
        tt[a]=ret_tt[a]
        links[a]=ret_links[a]
        time[a]=ret_time[a]
        occ[a]=ret_occ[a]
        user[a]=ret_user[a]
    }  
    currenttask=tt.length
      update()
    }
  }
  //AUTOMATIC INPUT VALUE FOR LINKS INPUT BOX & IF THE URL MATCHES WITH ANY OF OUR TASK THEN IT WILL COME IN FEATURED
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){     //GETTING VALUE IN LINK BOX
    var parser = document.createElement('a');         //CURRENT DOMAIN
      parser.href = tabs[0].url;
      currentdomain=parser.hostname
      link.value = currentdomain                    //UPDATING IN THE INPUT BOX
      console.log(currentdomain)
      let listfeat = ""
      for(a=0; a<currenttask; a++){
        console.log("Links ",links[a])
        if(links[a]==currentdomain){
            taskid=a
          listfeat += `
          <li>
            <h2>${tt[a]}</h2><br><br><p>This is a ${occ[a]} taks</p><p>Today Spent: ${Math.floor(user[a]/60)} mins</p>
           </li> 
            `   
          document.getElementById("feat").innerHTML=listfeat
      }
  }}) 
//ADDING TIMER VIA START BUTTON
const inputBtn = document.querySelector('button[id="act"]');
inputBtn.addEventListener("click",function startclicked(){
                                           //START BUTTON CLICKED
  start=Date.now();
  console.log("TIME : ",start)
  hidden=1
  chrome.storage.local.set({hidden}, function() {   
    console.log("UPDATED HIDDEN")
  });
  localStorage.setItem('hidden', JSON.stringify(hidden));
  chrome.storage.local.set({start}, function() {     //SAVING THE START TIME
   });
   buttonstatus()
})

const stopbtn = document.getElementById("actoff");
stopbtn.addEventListener("click",function(){
  hidden=0
  chrome.storage.local.set({hidden}, function() {     
  });
  localStorage.setItem('hidden', JSON.stringify(hidden));
  setstartup()
})

function setstartup(){
chrome.storage.local.get("start", function(result) { //Function TO GET DATA
  starut = result.start;
  stopbutton();
 });
}
function stopbutton(){
 // redirect=0
 // chrome.storage.local.set({redirect}, function() {  //turn off redirect
 // });
   end=0
   console.log("STOPBUTTON DATA ",starut)
   end=Date.now();
   console.log("END: ",end)
   work=(end-starut)*0.001 
   console.log("WORK", work)
   totalwork=totalwork+work
   
   console.log("Weekly Done Before null is ",weeklydone[da])
   if(weeklydone[da]=='null' || weeklydone[da]==undefined){
    weeklydone[da]=0
   }
   const weekdo = JSON.parse(localStorage.getItem('weeklydone'))
   if(weeklydone[da]===undefined || weeklydone[da]===null){
    weeklydone[da]=0
   }
   weeklydone[da]=work + weeklydone[da]
   localStorage.setItem('weeklydone', JSON.stringify(weeklydone))
   percent()
   workt=work
   chrome.storage.local.set({work}, function(){})       //SAVED TOTAL WORK 
   localStorage.setItem('totalwork', JSON.stringify(totalwork))
   changestart()
   saveworklocal()
}
function saveworklocal(){
  workto=0
    chrome.storage.local.get("work", function(result) { 
      workto=result.work
        if(workto){
          if(user[taskid]=='null'){
            user[taskid]=0
          }
           user[taskid]=user[taskid]+result.work
           localStorage.setItem('user_data', JSON.stringify(user));
           work=0
           chrome.storage.local.set({work}, function(){
            buttonstatus()
           })
        }
       })
}
function changestart(){
  start=0
  chrome.storage.local.set({start}, function() { 
  });
}
focusbutton=document.getElementById("focus")
focusbutton.addEventListener("click",function startclicked(){
  chrome.storage.local.get("focus", function(result) { //Function TO GET DATA
    focus = result.focus;
    console.log("FOCUS ACTIVE ")
    if(focus==1){
      focus=0
      chrome.storage.local.set({focus}, function() { 
      });
    }
    else if(focus==0){
      focus=1
      chrome.storage.local.set({focus}, function() { 
      });
    }
    else{
      focus=1
      chrome.storage.local.set({focus}, function() { 
      });
    }
    });
})

function percent(){
  per=[]
  const per_weekdone = JSON.parse(localStorage.getItem('weeklydone'))
  for(a=0; a<7; a++){
    if(per_weekdone[a]==undefined || per_weekdone[a]==null){
        per_weekdone[a]=0
    }
    if(weeklyexp[a]==undefined || weeklyexp[a]==null){
        weeklydexp[a]=0
    }
    console.log(per_weekdone[a])
    per[a]=(per_weekdone[a]/weeklyexp[a])*100
  }
  localStorage.setItem('percentage', JSON.stringify(per));
  console.log("Percentage Calculated ")
  streakcount()
  chrome.storage.local.set({per}, function() { 
  });
}
streakv=document.getElementById("streakopen")
streakv.addEventListener("click",function(){
  chrome.tabs.create({ url: 'streak.html' });
})
function streakcount(){
    for(a=0; a<7; a++){
        const percen = JSON.parse(localStorage.getItem('percentage'));
        if(percen[a]>=50){
            streak++
        }
    }
    localStorage.setItem('streak', JSON.stringify(streak))
}