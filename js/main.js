
const question = document.getElementById('question');
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
//const win = document.getElementById('win');



let answer = document.getElementById('answer');
const isCorrected = document.getElementById('isCorrected');

//modal.classList.remove('hidden');

const q1 = [
  {q:'√20',c:'2√5'},
  {q:'√180',c:'6√5'},
  {q:'√56',c:'2√14'},
  {q:'√360',c:'6√10'},
  {q:'√150',c:'5√6'},
  {q:'√80',c:'4√5'},
  {q:'√250',c:'5√10'},
  {q:'√28',c:'2√7'},
  {q:'√96',c:'4√6'},
  {q:'√175',c:'5√7'},
  {q:'√216',c:'6√6'},
  {q:'√125',c:'5√5'},
  {q:'√40',c:'2√10'},
  {q:'√12',c:'2√3'},
  {q:'√45',c:'3√5'},
  {q:'√160',c:'4√10'},
  {q:'√72',c:'6√2'},
  {q:'√98',c:'7√2'},
  {q:'√18',c:'3√2'},
  {q:'√63',c:'3√7'},
  {q:'√32',c:'4√2'},
  {q:'√147',c:'7√3'},
  {q:'√52',c:'2√13'},
  {q:'√75',c:'5√3'},
  {q:'√90',c:'3√10'},
  {q:'√8',c:'2√2'},
  {q:'√54',c:'3√6'},
  {q:'√27',c:'3√3'},
  {q:'√112',c:'4√7'},
  {q:'√490',c:'7√10'},
      ];
      
     
      // function QuizSet5(){
      //   Qnum.textContent = `あと${b - a}問`;
      //   question.textContent = q1[a].q; }
      let a = 0;
      let b = 0;


        
      function buttonClick1(){ 
        //alert('No1');  
        a = 0; b=10;
        Qnum.textContent = `あと${b - a}問`;
        question.textContent = q1[a].q;

         }


      function buttonClick2(){ 
       // alert('No2');
        a = 10; b=20;
        Qnum.textContent = `あと${b - a}問`;
        question.textContent = q1[a].q;
         }


         
      function buttonClick3(){ 
       // alert('No3');
       a=20;b=30;
        Qnum.textContent = `あと${b - a}問`;
        question.textContent = q1[a].q;
         }
      
         function getNum(btn) {
          if(btn.value === "check"){
                 //document.kotae.yanswer.value =  " ";
                //checkA();
     //             let a = 0;
                let yanswer = document.getElementById("yanswer");
               

                if(yanswer.value === q1[a].c){
             
                 a ++;
               modal3.classList.remove('hidden');
               isCorrected.textContent = `正解！`;  
               setTimeout(()=>{
                modal3.classList.add('hidden');
      
                choice1.removeEventListener('click',event);
      
                  if(a === 10 ||a === 20 ||a === 30  ){
        
                    let z = 0;
                    if(a === 10){z=1}
                    else if(a === 20){z=2}
                    else{z=3}

                win.textContent = ` その  ${z} クリアです。`;


                  modal.classList.remove('hidden');
                      
                    close.addEventListener('click',()=>{
                      location.reload();
                  })
                }
                
                else{
                  Qnum.textContent = `あと${b - a}問`;
                  question.textContent = q1[a].q; 
                    //次の問題へ
                }
      
              },500)
                  document.kotae.yanswer.value =  "";
                  
               
                
     
                 }
                else{
                  
                 // let a = 0;
                  modal2.classList.remove('hidden');
  
          answer.textContent = ` ${question.textContent} は「 ${q1[a].c} 」です。やり直し！`;
    
          okay.addEventListener('click',()=>{
            modal2.classList.add('hidden');
            choice1.removeEventListener('click',event);})

                document.kotae.yanswer.value =  "";


                if(a<9){ a =0;b =10;}
                else if(a>19){ a =20;b =30; }
                else{a =10;b =20;}
          

               
                Qnum.textContent = `あと${b - a}問`;
               question.textContent = q1[a].q; }
                
              }   
                else if( btn.value == "root"){ document.kotae.yanswer.value +=  "√";}
                else if(btn.value == "clear"){document.kotae.yanswer.value =  "";}
                else{document.kotae.yanswer.value +=  btn.value;
              let yanswer = document.getElementById("yanswer");
                 }
               }
    

function buttonClick5(){location.reload();}
let button = document.getElementById('reset');
//button.onclick = buttonClick;

 


