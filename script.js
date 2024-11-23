let timer;
let timeLeft = 60;
const quizBody = document.getElementById("quiz-body");

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("reset-btn").addEventListener("click", resetQuiz);

function startQuiz() {
    timeLeft = 60;
    document.getElementById("time-left").innerText = timeLeft;
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("reset-btn").classList.remove("hidden");
    quizBody.innerHTML = ""; // 前の問題をクリア
    generateQuestion(); // 最初の問題を生成

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("時間切れ！クイズ終了です。");
            document.getElementById("start-btn").classList.remove("hidden");
            document.getElementById("reset-btn").classList.add("hidden");
            // 入力フィールドをすべて無効化
            const inputs = document.querySelectorAll("input");
            inputs.forEach(input => input.disabled = true);
        }
    }, 1000);
}

function resetQuiz() {
    clearInterval(timer);
    timeLeft = 0;
    document.getElementById("time-left").innerText = "60";
    document.getElementById("start-btn").classList.remove("hidden");
    document.getElementById("reset-btn").classList.add("hidden");
    quizBody.innerHTML = "";
}

function generateQuestion() {
    // 既存の行をクリアして新しい問題を表示する
    quizBody.innerHTML = "";

    const row = document.createElement("tr");
    const questionCell = document.createElement("td");
    const inputCell = document.createElement("td");
    const answerCell = document.createElement("td");
    const resultCell = document.createElement("td");

    // **入力欄にフォーカスを設定**
    answerInput.focus();

    // 2桁＋2桁の足し算を生成
    const num1 = Math.floor(Math.random() * (99 - 10 + 1)) + 10; // 10～99
    const num2 = Math.floor(Math.random() * (99 - 10 + 1)) + 10; // 10～99
    const correctAnswer = num1 + num2;

    questionCell.innerText = `${num1} + ${num2}`;

    const inputField = document.createElement("input");
    inputField.type = "number";
    inputField.addEventListener("change", () => {
        const userAnswer = parseInt(inputField.value);
        if (userAnswer === correctAnswer) {
            resultCell.innerText = "正解";
            resultCell.style.color = "green";
        } else {
            resultCell.innerText = "不正解";
            resultCell.style.color = "red";
        }
        answerCell.innerText = correctAnswer;
        inputField.disabled = true;

        // 0.2秒後に次の問題を表示
        setTimeout(() => {
            if (timeLeft > 0) {
                generateQuestion();
            }
        }, 200);

        // **入力欄にフォーカスを設定**
        answerInput.focus();
    });

    inputCell.appendChild(inputField);
    row.appendChild(questionCell);
    row.appendChild(inputCell);
    row.appendChild(answerCell);
    row.appendChild(resultCell);
    quizBody.appendChild(row);
}
