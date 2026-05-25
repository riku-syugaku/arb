// ==========================================
// 1. 画面の要素をキャッチ
// ==========================================
const question = document.getElementById('question');
const timescore = document.getElementById('timescore');
const Qnum = document.getElementById('Qnum');
const yanswer = document.getElementById('yanswer'); // 裏方の隠し入力欄

// モーダル関係
const modal2 = document.getElementById('modal2'); // すべての画面でここを兼用

const closeBtn = document.getElementById('close');
const loseLabel = document.getElementById('lose');

// ==========================================
// 2. クイズデータ（全48問・1レベル6問ずつ）
// ==========================================
const q1 = [
  // 【レベル1】(0〜5番目)
  {q:'8',c:'2√2'},   {q:'12',c:'2√3'},  {q:'20',c:'2√5'},  {q:'18',c:'3√2'},  {q:'27',c:'3√3'},  {q:'45',c:'3√5'},
  // 【レベル2】(6〜11番目)
  {q:'63',c:'3√7'},  {q:'24',c:'2√6'},  {q:'28',c:'2√7'},  {q:'54',c:'3√6'},  {q:'50',c:'5√2'},  {q:'75',c:'5√3'},
  // 【レベル3】(12〜17番目)
  {q:'40',c:'2√10'}, {q:'44',c:'2√11'}, {q:'90',c:'3√10'}, {q:'99',c:'3√11'}, {q:'160',c:'4√10'},{q:'250',c:'5√10'},
  // 【レベル4】(18〜23番目)
  {q:'32',c:'4√2'},  {q:'48',c:'4√3'},  {q:'80',c:'4√5'},  {q:'96',c:'4√6'},  {q:'72',c:'6√2'},  {q:'98',c:'7√2'},
  // 【レベル5】(24〜29番目)
  {q:'360',c:'6√10'},{q:'125',c:'5√5'}, {q:'640',c:'8√10'},{q:'52',c:'2√13'}, {q:'56',c:'2√14'}, {q:'60',c:'2√15'},
  // 【レベル6】(30〜35番目)
  {q:'200',c:'10√2'},{q:'300',c:'10√3'},{q:'500',c:'10√5'},{q:'600',c:'10√6'},{q:'700',c:'10√7'},{q:'800',c:'20√2'},
  // 【レベル7】(36〜41番目)
  {q:'810',c:'9√10'},{q:'150',c:'5√6'}, {q:'108',c:'6√3'}, {q:'180',c:'6√5'}, {q:'128',c:'8√2'}, {q:'162',c:'9√2'},
  // 【レベル8】(42〜47番目)
  {q:'147',c:'7√3'}, {q:'112',c:'4√7'}, {q:'175',c:'5√7'}, {q:'216',c:'6√6'}, {q:'192',c:'8√3'}, {q:'320',c:'8√5'}
];

let currentLevel = 1;
let currentIdx = 0; 
let endIdx = 0;     

let timer = null;
let timeLimit = 30000;
let timeRemaining = 0;
let startTime = 0;

let originalFrogSrc = "";

// ==========================================
// 🧮 リアルタイム数式表示
// ==========================================
function updateMathDisplay() {
  const mathArea = document.getElementById('yanswer-math');
  const hiddenInput = document.getElementById('yanswer');
  if (!mathArea || !hiddenInput) return;

  let currentText = hiddenInput.value || "";

  if (currentText === "") {
    mathArea.innerHTML = ""; 
    return;
  }

  if (currentText.endsWith('√')) {
    let baseText = currentText.slice(0, -1); 
    mathArea.innerHTML = `\\( ${baseText}\\sqrt{\\color{transparent}{0}} \\)`;
  } else {
    let formatted = currentText.replace(/√(\d+)/g, '\\sqrt{$1}');
    mathArea.innerHTML = `\\( ${formatted} \\)`;
  }

  if (window.MathJax) {
    if (MathJax.typesetPromise) {
      MathJax.typesetPromise([mathArea]).catch(function(e) { console.log(e); });
    } else if (MathJax.typeset) {
      mathArea.style.visibility = 'hidden'; 
      MathJax.typeset();
      mathArea.style.visibility = 'visible';
    }
  }
}

// ==========================================
// 3. ゲーム開始の処理
// ==========================================
function autoStart() {
  const urlParams = new URLSearchParams(window.location.search);
  const lvlParam = urlParams.get('lvl');
  
  currentLevel = lvlParam ? parseInt(lvlParam, 10) : 1;
  
  // 0番目スタートで完全に計算を統一
  currentIdx = (currentLevel - 1) * 6; 
  endIdx = currentIdx + 5; 

  startTime = performance.now();
  startTimer();
  showQuestion();
}

function showQuestion() {
  const remainingQuestions = endIdx - currentIdx + 1;
  Qnum.textContent = `あと${remainingQuestions}問`;
  
  if (q1[currentIdx]) {
    question.innerHTML = `\\( \\sqrt{${q1[currentIdx].q}} \\)`;
  }

  if (window.MathJax) {
    if (MathJax.typesetPromise) MathJax.typesetPromise();
    else if (MathJax.typeset) MathJax.typeset();
  }
}

// ==========================================
// 4. タイマー処理
// ==========================================
function startTimer() {
  clearInterval(timer); // 二重起動を絶対に防止
  timeRemaining = timeLimit;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeRemaining -= 1000;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      timescore.textContent = "あと00秒";
      showTimeOver();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

// タイマー表示
function updateTimerDisplay() {
  const seconds = Math.floor(timeRemaining / 1000);
  timescore.textContent = `あと${seconds < 10 ? '0' : ''}${seconds}秒`;
}

// 時間切れ処理
function showTimeOver() {
  const targetModal = document.getElementById('modal2');
  const targetDialog = targetModal.querySelector('.modal-content') || targetModal.firstElementChild;
  const targetTitle = targetModal.querySelector('h2') || targetModal.querySelector('p') || targetModal;
  const targetAnswerLabel = document.getElementById('answer');
  const targetOkayBtn = document.getElementById('okay');
  const frogImg = targetModal.querySelector('img');

  if (targetDialog) targetDialog.style.backgroundColor = '#ffffff'; 
  if (targetTitle) {
    targetTitle.textContent = '時間切れ！！';
    targetTitle.style.color = '#0f2547'; 
  }
  if (frogImg) frogImg.src = 'img/lose.png'; 
  if (targetAnswerLabel) targetAnswerLabel.style.display = 'none'; 

  if (targetOkayBtn) {
    targetOkayBtn.style.display = 'inline-block';
    targetOkayBtn.textContent = 'もう一度挑戦';
    targetOkayBtn.onclick = function() {
      window.location.href = 'index.html';
    };
  }

  targetModal.classList.remove('hidden');
}

// ==========================================
// 5. 答え合わせ・クリア処理
// ==========================================
function checkAnswer() {
  const hiddenInput = document.getElementById('yanswer');
  if (!hiddenInput) return;
  
  const userAns = hiddenInput.value.trim();
  const correctAns = q1[currentIdx].c.trim();

  const targetModal = document.getElementById('modal2');
  const targetDialog = targetModal.querySelector('.modal-content') || targetModal.firstElementChild;
  const targetTitle = targetModal.querySelector('h2') || targetModal.querySelector('p') || targetModal;
  const targetAnswerLabel = document.getElementById('answer');
  const targetOkayBtn = document.getElementById('okay');
  const frogImg = targetModal.querySelector('img');

  if (frogImg && !originalFrogSrc) {
    originalFrogSrc = frogImg.getAttribute('src') || "";
  }

  if (userAns === correctAns) {
    // ⭕【正解時】
    if (targetDialog) targetDialog.style.backgroundColor = '#ffffff'; 
    if (targetTitle) {
      targetTitle.textContent = '正解！！';
      targetTitle.style.color = '#0f2547'; 
    }
    if (frogImg) frogImg.src = 'img/ok.png'; 
    if (targetAnswerLabel) targetAnswerLabel.style.display = 'none'; 

    targetModal.classList.remove('hidden');

    // 現在の問題が最後の問題（6問目）ならクリア画面へ
    if (currentIdx === endIdx) {
      clearInterval(timer); // タイマーを止める
      setTimeout(() => {
        targetModal.classList.add('hidden');
        showClear(); 
      }, 800);
    } else {
      // まだ途中なら次の問題へ
      setTimeout(() => {
        targetModal.classList.add('hidden');
        currentIdx++; 
        hiddenInput.value = ""; 
        updateMathDisplay();    
        showQuestion(); 
      }, 800);
    }

  } else {
    // ❌ 【不正解時】
    if (targetDialog) targetDialog.style.backgroundColor = '#ffffff'; 
    if (targetTitle) {
      targetTitle.textContent = '残念！！やり直し！';
      targetTitle.style.color = '#0f2547'; 
    }
    if (frogImg && originalFrogSrc) frogImg.src = originalFrogSrc; 
    if (targetAnswerLabel) {
      targetAnswerLabel.style.display = 'block'; 
      targetAnswerLabel.style.color = '#0f2547'; 
    }

    let rawCorrectAns = q1[currentIdx].c;
    let mathCorrectAns = rawCorrectAns.replace(/√(\d+)/g, '\\sqrt{$1}');
    targetAnswerLabel.innerHTML = `\\( \\sqrt{${q1[currentIdx].q}} = ${mathCorrectAns} \\)`;

    targetModal.classList.remove('hidden');

    if (window.MathJax) {
      if (MathJax.typesetPromise) MathJax.typesetPromise([targetAnswerLabel]).catch(e => console.log(e));
      else if (MathJax.typeset) MathJax.typeset();
    }

    targetOkayBtn.onclick = function() {
      targetModal.classList.add('hidden');
      hiddenInput.value = ""; 
      updateMathDisplay(); 
      clearInterval(timer); 
      currentIdx = (currentLevel - 1) * 6; 
      startTime = performance.now();
      startTimer();
      showQuestion();
    };
  }

  // 正解の時だけOKボタンを絶対に非表示にする完全上書きガード
  if (targetOkayBtn) {
    if (targetTitle && targetTitle.textContent === '正解！！') {
      targetOkayBtn.style.setProperty('display', 'none', 'important');
    } else {
      targetOkayBtn.style.display = 'inline-block';
      targetOkayBtn.textContent = 'OK';
      targetOkayBtn.style.width = '85%';
      targetOkayBtn.style.maxWidth = '140px';
      targetOkayBtn.style.backgroundColor = '#0f2547'; 
      targetOkayBtn.style.color = '#ffffff'; 
      targetOkayBtn.style.padding = '10px 20px';
      targetOkayBtn.style.borderRadius = '20px';
      targetOkayBtn.style.border = 'none';
    }
  }
}

// 🏆 全問クリア処理
function showClear() {
  clearInterval(timer);
  const elapsedTime = Math.round((performance.now() - startTime) / 1000);

  const targetModal = document.getElementById('modal2');
  const targetDialog = targetModal.querySelector('.modal-content') || targetModal.firstElementChild;
  const targetTitle = targetModal.querySelector('h2') || targetModal.querySelector('p') || targetModal;
  const targetAnswerLabel = document.getElementById('answer');
  const targetOkayBtn = document.getElementById('okay');
  const frogImg = targetModal.querySelector('img');

  if (targetDialog) targetDialog.style.backgroundColor = '#ffffff'; 
  if (targetTitle) {
    targetTitle.textContent = `レベル ${currentLevel} クリア！`;
    targetTitle.style.color = '#0f2547';
  }
  if (frogImg) frogImg.src = 'img/win.png'; 
  
  if (targetAnswerLabel) {
    targetAnswerLabel.style.display = 'block';
    targetAnswerLabel.innerHTML = `タイム: ${elapsedTime} 秒`;
    targetAnswerLabel.style.fontSize = '22px';
    targetAnswerLabel.style.color = '#0f2547';
  }
  
  if (targetOkayBtn) {
    targetOkayBtn.style.setProperty('display', 'inline-block', 'important'); // クリア時は強制表示
    targetOkayBtn.textContent = '選択画面へ戻る';
    targetOkayBtn.style.width = '85%';                
    targetOkayBtn.style.maxWidth = '240px';           
    targetOkayBtn.style.backgroundColor = '#0f2547'; 
    targetOkayBtn.style.color = '#ffffff';           
    targetOkayBtn.style.fontSize = '18px';            
    targetOkayBtn.style.fontWeight = 'bold';          
    targetOkayBtn.style.padding = '14px 20px';        
    targetOkayBtn.style.border = 'none';              
    targetOkayBtn.style.borderRadius = '25px';        

    targetOkayBtn.onclick = function() {
      targetModal.classList.add('hidden');
      window.location.href = 'index.html';
    };
  }

  targetModal.classList.remove('hidden');
}

// ==========================================
// 6. 画面のボタン（キーパッド）との連動設定
// ==========================================
function initButtons() {
  const getHiddenInput = () => document.getElementById('yanswer');

  document.getElementById('zero').onclick  = function() { let inp = getHiddenInput(); if(inp){ inp.value += '0'; updateMathDisplay(); } };
  document.getElementById('one').onclick   = function() { let inp = getHiddenInput(); if(inp){ inp.value += '1'; updateMathDisplay(); } };
  document.getElementById('two').onclick   = function() { let inp = getHiddenInput(); if(inp){ inp.value += '2'; updateMathDisplay(); } };
  document.getElementById('three').onclick = function() { let inp = getHiddenInput(); if(inp){ inp.value += '3'; updateMathDisplay(); } };
  document.getElementById('four').onclick  = function() { let inp = getHiddenInput(); if(inp){ inp.value += '4'; updateMathDisplay(); } };
  document.getElementById('five').onclick  = function() { let inp = getHiddenInput(); if(inp){ inp.value += '5'; updateMathDisplay(); } };
  document.getElementById('six').onclick   = function() { let inp = getHiddenInput(); if(inp){ inp.value += '6'; updateMathDisplay(); } };
  document.getElementById('seven').onclick = function() { let inp = getHiddenInput(); if(inp){ inp.value += '7'; updateMathDisplay(); } };
  document.getElementById('eight').onclick = function() { let inp = getHiddenInput(); if(inp){ inp.value += '8'; updateMathDisplay(); } };
  document.getElementById('nine').onclick  = function() { let inp = getHiddenInput(); if(inp){ inp.value += '9'; updateMathDisplay(); } };
  document.getElementById('root').onclick = function() { let inp = getHiddenInput(); if(inp){ inp.value += '√'; updateMathDisplay(); } };
  document.getElementById('clear').onclick = function() { let inp = getHiddenInput(); if(inp){ inp.value = ''; updateMathDisplay(); } };
  document.getElementById('check').onclick = function() { checkAnswer(); };
}

// ==========================================
// 7. キーボード入力の完全対応
// ==========================================
function initKeyboardInput() {
  document.addEventListener('keydown', function(event) {
    const hiddenInput = document.getElementById('yanswer');
    if (!hiddenInput) return;

    const targetModal = document.getElementById('modal2');
    const isModalActive = targetModal && !targetModal.classList.contains('hidden');

    if (isModalActive) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const targetOkayBtn = document.getElementById('okay');
        if (targetOkayBtn && targetOkayBtn.style.display !== 'none') {
          targetOkayBtn.click();
        }
      }
      return; 
    }

    if (event.key >= '0' && event.key <= '9') {
      hiddenInput.value += event.key;
      updateMathDisplay();
    } else if (event.key === '/') { // 「r」の入力を完全に無効化し、スラッシュのみ対応
      event.preventDefault(); 
      hiddenInput.value += '√';
      updateMathDisplay();
    } else if (event.key === 'Backspace' || event.key === 'c' || event.key === 'C') {
      hiddenInput.value = ''; 
      updateMathDisplay();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      checkAnswer();
    }
  });
}

// ==========================================
// 8. ページが開いた瞬間に自動スタート
// ==========================================
window.onload = function() {
  initButtons();
  initKeyboardInput(); 
  autoStart();
};