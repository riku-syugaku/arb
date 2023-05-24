const question = document.getElementById('question');
const timescore = document.getElementById('timescore');
const choice1 = document.getElementById('choice1');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const scoreLabel = document.querySelector('#result > p')
const item1 = document.createElement('li');
const item2 = document.createElement('li');
const close = document.getElementById('close');
const modal = document.getElementById('modal');
const modal2 = document.getElementById('modal2');
const modal3 = document.getElementById('modal3');
const No1 = document.getElementById('No1');
const No2 = document.getElementById('No2');
const No3 = document.getElementById('No3');
const No4 = document.getElementById('No4');
const okay = document.getElementById('okay');
const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');
const ten = document.getElementById('10');
const eleven = document.getElementById('11');
const twelve = document.getElementById('12');
const thirteen = document.getElementById('13');
const fourteen = document.getElementById('14');
const fifteen = document.getElementById('15');
const check = document.getElementById('check');
const root = document.getElementById('root');
const display = document.getElementById('display');
const ab = document.getElementById('ab');
let start = 0;
let end = 0;
let timeLimit = 60000;


let answer = document.getElementById('answer');
const isCorrected = document.getElementById('isCorrected');

const q1 = [
{q:'√18',c:'3√2'},{q:'√32',c:'4√2'},
{q:'√48',c:'4√3'},{q:'√52',c:'2√13'},
{q:'√54',c:'3√6'},{q:'√24',c:'2√6'},
{q:'√28',c:'2√7'},{q:'√12',c:'2√3'},
{q:'√44',c:'2√11'},{q:'√8',c:'2√2'},

{q:'√20',c:'2√5'},{q:'√72',c:'6√2'},
{q:'√68',c:'2√17'},{q:'√112',c:'4√7'},
{q:'√40',c:'2√10'},{q:'√50',c:'5√2'},
{q:'√90',c:'3√10'},{q:'√45',c:'3√5'},
{q:'√27',c:'3√3'},{q:'√99',c:'3√11'},

{q:'√125',c:'5√5'},
{q:'√56',c:'2√14'},
{q:'√63',c:'3√7'},
{q:'√98',c:'7√2'},
{q:'√120',c:'2√30'},
{q:'√75',c:'5√3'},
{q:'√80',c:'4√5'},
{q:'√96',c:'4√6'},
{q:'√60',c:'2√15'},
{q:'√180',c:'6√5'},

{q:'√490',c:'7√10'},
{q:'√175',c:'5√7'},
{q:'√128',c:'8√2'},
{q:'√160',c:'4√10'},
{q:'√700',c:'10√7'},
{q:'√250',c:'5√10'},
{q:'√150',c:'5√6'},
{q:'√500',c:'10√5'},
{q:'√162',c:'9√2'},
{q:'√600',c:'10√6'},
{q:'√240',c:'4√15'},
{q:'√360',c:'6√10'},
{q:'√147',c:'7√3'},
{q:'√800',c:'20√2'},
{q:'√216',c:'6√6'},

      ];
      
     let a = 0;
      let b = 0;
    const arr = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20];

    let startTime;
    let endTime;

      function buttonClick1(){ 
         a = 0; b=10;  
        startTime = null;
        endTime = null; 
        timeGet();
        gamestart();
        
         }
      function buttonClick2(){ 
        a = 10; b=20;
        startTime = null;
        endTime = null;  
        timeGet();    
        gamestart();
         }
      function buttonClick3(){ 
       a=20;b=30;
       startTime = null;
       endTime = null;   
       timeGet();   
       gamestart();
         }
      function buttonClick4(){ 
       a=30;b=45;
       startTime = null;
       endTime = null;  
       timeGet();    
       gamestart();
         }
        function displayTime(time) {
          const seconds = Math.floor((time % timeLimit) / 1000);
          const timeString = `${padZero(seconds)}`;
          console.log(timeString); // 時間を表示する場合は、表示する要素に代入するなど適宜変更してください
          timescore.textContent = `あと${padZero(seconds)}秒`;
        }
        function padZero(number) {
          return number < 10 ? `0${number}` : number;
        }
        function startTimer(duration) {
          timeRemaining = duration;
        
          timer = setInterval(() => {
            timeRemaining -= 1000;
        
            if (timeRemaining < 0) {
              clearInterval(timer);
              displayTime(0);
              console.log("時間切れです");
              // 制限時間が終了した後の処理をここに追加する

              let z = 0;
              if(a === 2){z=1}
              else if(a === 20){z=2}
              else if(a === 30){z=3}
              else{z=4}

              
              win.textContent = ` 時間切れです！`;
              
            modal.classList.remove('hidden');
                
              close.addEventListener('click',()=>{
                location.reload();
            })


            } else {
              displayTime(timeRemaining);
            }
          }, 1000);
        }
        function stopTimer() {
          clearInterval(timer);
        }
        function restartTimer() {
          stopTimer();
          resetTimer(duration);
          startTimer(duration);
        }       
      function gamestart(){ 

        start = performance.now();
        Qnum.textContent = `あと${b - a}問`;
        question.textContent = q1[a].q;
                      } 
 function timeGet(){ 
                        startTime = new Date();
                        let timer = null;
                        let timeRemaining = 0;
                        const duration = timeLimit;
                        // 初回のタイマースタート
                     startTimer(duration);                
                                      }             
      function onAnswerSubmitted(correct) {
              if (!correct) {
                attempts++;
                if (attempts < maxAttempts) {
                  console.log("不正解です。再度挑戦してください。");
                  restartTimer();
                } else {
                  console.log("3回間違えました。");
                  stopTimer();
                  resetTimer(duration);
                  // 3回間違えた後の処理をここに追加する
                }
              } else {
                console.log("正解です！");
                stopTimer();
              }
            }
                 
     function getNum(btn) {
          if(btn.value === "check"){
               

                if(yanswer.value === q1[a].c){
                  endTime = new Date();

                 a ++;
               modal3.classList.remove('hidden');
               isCorrected.textContent = `正解！`;  
               setTimeout(()=>{
                modal3.classList.add('hidden');
      
                choice1.removeEventListener('click',event);
      
                  if(a === 10 ||a === 20 ||a === 30 ||a === 45  ){

                    let z = 0;
                    if(a === 10){z=1}
                    else if(a === 20){z=2}
                    else if(a === 30){z=3}
                    else{z=4}

                    let end = performance.now();
                    
                    win.textContent = ` レベル  ${z} クリア！
                      「
                    ${(Math.round((timeLimit - timeRemaining)/1000))} 秒」`;
                    
                  modal.classList.remove('hidden');
                      
                    close.addEventListener('click',()=>{
                      location.reload();
                  })

                  }
                
                else{

                  Qnum.textContent = `あと${b - a}問`;
                  question.textContent = q1[a].q; 
                }
      
              },500)
                  document.kotae.yanswer.value =  "";

                 }
                else{
                  
               
                  modal2.classList.remove('hidden');
  
          answer.textContent = ` ${question.textContent} は「 ${q1[a].c} 」です。やり直し！`;
          
          okay.addEventListener('click',()=>{
            modal2.classList.add('hidden');
            choice1.removeEventListener('click',event);})
            
            document.kotae.yanswer.value =  "";

                if(a<9){ a =0;b =10;timeRemaining = timeLimit;}
                else if(a>9 && a<19){ a =10;b =20;timeRemaining=timeLimit;}
                else if(a>19 && a<29){ a =20;b =30;timeRemaining=timeLimit;}
                else if(a>29 && a<45){ a =30;b =45;timeRemaining=timeLimit;}
                else{a =30;b =45;timeRemaining=timeLimit;}

            

              }   
              gamestart(); 
            }
                else if( btn.value == "root"){ document.kotae.yanswer.value +=  "√";}
                else if(btn.value == "clear"){document.kotae.yanswer.value =  "";}
                else{document.kotae.yanswer.value +=  btn.value;
              let yanswer = document.getElementById("yanswer");
                 }
               }
              
         function endTimer() {
                endTime = performance.now();
                const elapsedTime = endTime - startTime;
                

                    let z = 0;
                    if(a === 10){z=1}
                    else if(a === 20){z=2}
                    else if(a === 30){z=3}
                    else{z=4}

                   
                    let end = performance.now();


                    win.textContent = ` レベル  ${z} クリア！
                      「
                    ${(Math.round((elapsedTime)/1000))} 秒
                    」`;
                    

                  modal.classList.remove('hidden');
                      
                    close.addEventListener('click',()=>{
                      location.reload();

                  })

              }
            
              function resetTimer() {
                startTime = null;
                endTime = null;
              }

 function displayTimer() {
      const timerElement = document.getElementById("timer");
      const elapsedTime = endTime - startTime;
      timerElement.textContent = "経過時間: " + (elapsedTime / 1000) + "秒";
    }

      function displayQ(){
        Qnum.textContent = `あと${b - a}問`;
        question.textContent = q1[a].q;
        startTime = new Date();
      } 
function buttonClick5(){location.reload();}
let button = document.getElementById('reset');

 


