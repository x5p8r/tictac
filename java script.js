// تعريف المتغيرات
let currentPlayer = 'X'; // اللاعب الحالي
let board = ['', '', '', '', '', '', '', '', '']; // لوحة اللعبة
let gameOver = false; // حالة انتهاء اللعبة
let movesCount = 0; // عدد الحركات

// التوليفات الفائزة
const winningCombinations = [
    [0, 1, 2], // الصف الأول
    [3, 4, 5], // الصف الثاني
    [6, 7, 8], // الصف الثالث
    [0, 3, 6], // العمود الأول
    [1, 4, 7], // العمود الثاني
    [2, 5, 8], // العمود الثالث
    [0, 4, 8], // القطر الرئيسي
    [2, 4, 6]  // القطر الثانوي
];

// تحديد العناصر
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

// تفعيل النقر على الخلايا
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

// إعادة تشغيل اللعبة
restartButton.addEventListener('click', restartGame);

// معالجة النقر على الخلية
function handleCellClick(event) {
    if (gameOver) return; // إذا كانت اللعبة قد انتهت، لا تفعل شيئًا

    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // التحقق مما إذا كانت الخلية فارغة
    if (board[index] !== '') return;

    // تحديث اللوحة والخلية
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // زيادة عدد الحركات
    movesCount++;

    // التحقق من الفوز أو التعادل
    if (checkWin()) {
        messageElement.textContent = `اللاعب ${currentPlayer} فاز! 🎉`;
        gameOver = true;
    } else if (movesCount === 9) {
        messageElement.textContent = 'اللعبة انتهت بالتعادل!';
        gameOver = true;
    } else {
        // تغيير اللاعب
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `دور اللاعب: ${currentPlayer}`;
    }
}

// التحقق من الفوز
function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true; // هناك فائز
        }
    }
    return false; // لا يوجد فائز
}

// إعادة تشغيل اللعبة
function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    movesCount = 0;
    messageElement.textContent = `دور اللاعب: ${currentPlayer}`;

    // إعادة تعيين الخلايا
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}