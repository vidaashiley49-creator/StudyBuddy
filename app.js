function openNotes() {
    window.location.href = "notes.html";
}

function openTasks() {
    window.location.href = "tasks.html";
}

function openQuizzes() {
    window.location.href = "quiz.html";
}

function openTimer() {
    window.location.href = "timer.html";
}

function goHome() {
    window.location.href = "index.html";
}


/* ================================
   NOTES
================================ */

let notes =
    JSON.parse(localStorage.getItem("studyNotes")) || [];


function saveNote() {

    let titleInput = document.getElementById("noteTitle");
    let textInput = document.getElementById("noteText");

    if (!titleInput || !textInput) {
        return;
    }

    let title = titleInput.value.trim();
    let text = textInput.value.trim();

    if (title === "" || text === "") {
        alert("Please enter a title and note.");
        return;
    }

    notes.push({
        title: title,
        text: text
    });

    localStorage.setItem(
        "studyNotes",
        JSON.stringify(notes)
    );

    titleInput.value = "";
    textInput.value = "";

    showNotes();
}


function showNotes() {

    let notesList =
        document.getElementById("notesList");

    if (!notesList) {
        return;
    }

    notesList.innerHTML = "";

    notes.forEach(function(note, index) {

        createNoteElement(
            note,
            index,
            notesList
        );

    });
}


function createNoteElement(note, index, container) {

    let noteBox =
        document.createElement("div");

    noteBox.className = "note";


    let title =
        document.createElement("h3");

    title.textContent =
        note.title;


    let text =
        document.createElement("p");

    text.textContent =
        note.text;


    let deleteButton =
        document.createElement("button");

    deleteButton.textContent =
        "🗑️ Delete";


    deleteButton.onclick =
        function() {

            notes.splice(index, 1);

            localStorage.setItem(
                "studyNotes",
                JSON.stringify(notes)
            );

            searchNotes();

        };


    noteBox.appendChild(title);
    noteBox.appendChild(text);
    noteBox.appendChild(deleteButton);

    container.appendChild(noteBox);
}


function searchNotes() {

    let searchInput =
        document.getElementById("noteSearch");

    let notesList =
        document.getElementById("notesList");

    if (!searchInput || !notesList) {
        return;
    }

    let searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    notesList.innerHTML = "";


    notes.forEach(function(note, index) {

        let title =
            note.title.toLowerCase();

        let text =
            note.text.toLowerCase();


        if (
            title.includes(searchText) ||
            text.includes(searchText)
        ) {

            createNoteElement(
                note,
                index,
                notesList
            );

        }

    });

}


showNotes();


/* ================================
   TASKS
================================ */

let tasks =
    JSON.parse(localStorage.getItem("studyTasks")) || [];

let taskFilter = "all";


function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


function addTask() {

    let taskInput =
        document.getElementById("taskInput");

    if (!taskInput) {
        return;
    }

    let task =
        taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    showTasks();
}


function handleTaskKey(event) {

    if (event.key === "Enter") {
        addTask();
    }

}


function setTaskFilter(filter) {

    taskFilter = filter;

    showTasks();

}


function clearCompletedTasks() {

    tasks =
        tasks.filter(function(task) {
            return !task.completed;
        });

    saveTasks();

    showTasks();

}


function showTasks() {

    let taskList =
        document.getElementById("taskList");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";


    let progress =
        document.getElementById("taskProgress");


    if (progress) {

        let completed =
            tasks.filter(function(task) {
                return task.completed;
            }).length;

        progress.textContent =
            completed +
            " of " +
            tasks.length +
            " tasks completed";
    }


    let visibleTasks =
        tasks.filter(function(task) {

            if (taskFilter === "active") {
                return !task.completed;
            }

            if (taskFilter === "completed") {
                return task.completed;
            }

            return true;

        });


    if (visibleTasks.length === 0) {

        let emptyMessage =
            document.createElement("p");

        emptyMessage.style.textAlign =
            "center";

        emptyMessage.textContent =
            "No tasks here yet. 📚";

        taskList.appendChild(
            emptyMessage
        );

        return;
    }


    visibleTasks.forEach(function(task) {

        let originalIndex =
            tasks.indexOf(task);


        let item =
            document.createElement("li");


        let text =
            document.createElement("span");

        text.textContent =
            task.text;


        if (task.completed) {

            text.style.textDecoration =
                "line-through";

            text.style.opacity =
                "0.55";
        }


        let completeButton =
            document.createElement("button");

        completeButton.textContent =
            task.completed ? "↩️" : "✅";


        completeButton.onclick =
            function() {

                tasks[originalIndex].completed =
                    !tasks[originalIndex].completed;

                saveTasks();

                showTasks();

            };


        let deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "🗑️";


        deleteButton.onclick =
            function() {

                tasks.splice(
                    originalIndex,
                    1
                );

                saveTasks();

                showTasks();

            };


        item.appendChild(text);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);

        taskList.appendChild(item);

    });

}


showTasks();


/* ================================
   QUIZ
================================ */

let quizBank = [

    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
    },

    {
        question: "What planet do we live on?",
        answers: ["Mars", "Earth", "Venus", "Jupiter"],
        correct: "Earth"
    },

    {
        question: "What is 10 × 2?",
        answers: ["10", "15", "20", "25"],
        correct: "20"
    },

    {
        question: "What is 15 ÷ 3?",
        answers: ["3", "5", "6", "8"],
        correct: "5"
    },

    {
        question: "Which gas do humans need to breathe?",
        answers: [
            "Oxygen",
            "Carbon dioxide",
            "Hydrogen",
            "Helium"
        ],
        correct: "Oxygen"
    },

    {
        question: "How many days are in a week?",
        answers: ["5", "6", "7", "8"],
        correct: "7"
    },

    {
        question: "What is 7 × 8?",
        answers: ["54", "56", "58", "64"],
        correct: "56"
    },

    {
        question: "Which organ pumps blood around the body?",
        answers: [
            "Brain",
            "Lungs",
            "Heart",
            "Kidney"
        ],
        correct: "Heart"
    },

    {
        question: "What is the capital of Ghana?",
        answers: [
            "Kumasi",
            "Accra",
            "Tamale",
            "Cape Coast"
        ],
        correct: "Accra"
    },

    {
        question: "Which language is mainly used to structure a web page?",
        answers: [
            "HTML",
            "CSS",
            "Python",
            "SQL"
        ],
        correct: "HTML"
    },

    {
        question: "What is 100 - 45?",
        answers: ["45", "50", "55", "65"],
        correct: "55"
    },

    {
        question: "Which device is used to type text into a computer?",
        answers: [
            "Monitor",
            "Keyboard",
            "Speaker",
            "Printer"
        ],
        correct: "Keyboard"
    },

    {
        question: "What is the largest ocean on Earth?",
        answers: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Pacific Ocean",
            "Arctic Ocean"
        ],
        correct: "Pacific Ocean"
    },

    {
        question: "What is 9²?",
        answers: ["18", "72", "81", "90"],
        correct: "81"
    },

    {
        question: "Which part of a plant absorbs water from the soil?",
        answers: [
            "Flower",
            "Leaf",
            "Root",
            "Fruit"
        ],
        correct: "Root"
    },

    {
        question: "What is 50% of 100?",
        answers: ["25", "40", "50", "75"],
        correct: "50"
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            "Earth",
            "Mars",
            "Saturn",
            "Neptune"
        ],
        correct: "Mars"
    },

    {
        question: "How many months are in one year?",
        answers: ["10", "11", "12", "13"],
        correct: "12"
    },

    {
        question: "Which one is a programming language?",
        answers: [
            "Python",
            "Chrome",
            "Windows",
            "Google"
        ],
        correct: "Python"
    }

];


let currentQuiz = [];
let currentQuestion = 0;
let score = 0;
let answerSelected = false;


function shuffleQuestions(array) {

    return [...array].sort(function() {
        return Math.random() - 0.5;
    });

}


function startQuiz() {

    currentQuestion = 0;
    score = 0;
    answerSelected = false;

    currentQuiz =
        shuffleQuestions(quizBank).slice(0, 10);

    let nextButton =
        document.getElementById("nextButton");

    if (!nextButton) {
        return;
    }

    nextButton.style.display =
        "block";

    nextButton.textContent =
        "Next Question";

    nextButton.onclick =
        nextQuestion;

    showQuestion();

}


function showQuestion() {

    let questionElement =
        document.getElementById("question");

    if (!questionElement) {
        return;
    }

    let question =
        currentQuiz[currentQuestion];

    questionElement.textContent =
        question.question;

    document.getElementById("score").textContent =
        "Score: " + score;

    document.getElementById("result").textContent =
        "";

    let answers =
        document.getElementById("answers");

    answers.innerHTML = "";


    question.answers.forEach(function(answer) {

        let button =
            document.createElement("button");

        button.textContent =
            answer;

        button.onclick =
            function() {
                checkQuizAnswer(answer);
            };

        answers.appendChild(button);

    });

    answerSelected = false;

}


function checkQuizAnswer(answer) {

    if (answerSelected) {
        return;
    }

    answerSelected = true;

    let question =
        currentQuiz[currentQuestion];

    let result =
        document.getElementById("result");


    if (answer === question.correct) {

        score++;

        result.textContent =
            "Correct! 🎉";

    } else {

        result.textContent =
            "Wrong! The correct answer is " +
            question.correct;
    }


    document.getElementById("score").textContent =
        "Score: " + score;

}


function nextQuestion() {

    if (!answerSelected) {

        document.getElementById("result").textContent =
            "Choose an answer first.";

        return;
    }

    currentQuestion++;


    if (currentQuestion >= currentQuiz.length) {

        let percentage =
            (score / currentQuiz.length) * 100;


        localStorage.setItem(
            "lastQuizScore",
            JSON.stringify({
                score: score,
                total: currentQuiz.length,
                percentage: percentage
            })
        );


        document.getElementById("question").textContent =
            "Quiz Complete! 🎉";

        document.getElementById("answers").innerHTML =
            "";


        let message = "";


        if (percentage === 100) {

            message = "Perfect score! 🔥";

        } else if (percentage >= 70) {

            message = "Great job! Keep it up! 👏";

        } else if (percentage >= 50) {

            message = "Good effort! Keep practicing! 💪";

        } else {

            message = "Keep studying and try again! 📚";

        }


        document.getElementById("result").textContent =
            "Your score: " +
            score +
            " / " +
            currentQuiz.length +
            " (" +
            percentage +
            "%) — " +
            message;


        let nextButton =
            document.getElementById("nextButton");

        nextButton.textContent =
            "🔄 Try Again";

        nextButton.style.display =
            "block";

        nextButton.onclick =
            startQuiz;

        return;
    }


    showQuestion();

}


if (document.getElementById("question")) {
    startQuiz();
}


/* ================================
   TIMER
================================ */

let timeLeft = 25 * 60;
let timerInterval = null;


function updateTimer() {

    let timer =
        document.getElementById("timer");

    if (!timer) {
        return;
    }

    let minutes =
        Math.floor(timeLeft / 60);

    let seconds =
        timeLeft % 60;

    seconds =
        seconds.toString().padStart(2, "0");

    timer.textContent =
        minutes + ":" + seconds;

}


function startTimer() {

    if (timerInterval !== null) {
        return;
    }


    let status =
        document.getElementById("timerStatus");


    if (status) {
        status.textContent =
            "Study session in progress... 📚";
    }


    timerInterval =
        setInterval(function() {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimer();

            } else {

                clearInterval(timerInterval);

                timerInterval = null;


                let sessions =
                    parseInt(
                        localStorage.getItem(
                            "studySessions"
                        )
                    ) || 0;


                sessions++;


                localStorage.setItem(
                    "studySessions",
                    sessions
                );


                let status =
                    document.getElementById(
                        "timerStatus"
                    );


                if (status) {

                    status.textContent =
                        "Session complete! 🎉";

                }


                alert(
                    "Study session complete! 🎉"
                );

            }

        }, 1000);

}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;


    let status =
        document.getElementById("timerStatus");


    if (status) {

        status.textContent =
            "Timer paused ⏸️";

    }

}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();


    let status =
        document.getElementById("timerStatus");


    if (status) {

        status.textContent =
            "Ready to study 📚";

    }

}


updateTimer();


/* ================================
   HOME DASHBOARD
================================ */

function updateDashboard() {

    let dashboardTasks =
        document.getElementById(
            "dashboardTasks"
        );


    let dashboardNotes =
        document.getElementById(
            "dashboardNotes"
        );


    let dashboardQuiz =
        document.getElementById(
            "dashboardQuiz"
        );


    let dashboardSessions =
        document.getElementById(
            "dashboardSessions"
        );


    if (
        !dashboardTasks &&
        !dashboardNotes &&
        !dashboardQuiz &&
        !dashboardSessions
    ) {
        return;
    }


    let savedTasks =
        JSON.parse(
            localStorage.getItem("studyTasks")
        ) || [];


    let completedTasks =
        savedTasks.filter(function(task) {
            return task.completed;
        }).length;


    let savedNotes =
        JSON.parse(
            localStorage.getItem("studyNotes")
        ) || [];


    let savedQuiz =
        JSON.parse(
            localStorage.getItem("lastQuizScore")
        );


    let sessions =
        parseInt(
            localStorage.getItem(
                "studySessions"
            )
        ) || 0;


    if (dashboardTasks) {

        dashboardTasks.textContent =
            "✅ Tasks completed: " +
            completedTasks;

    }


    if (dashboardNotes) {

        dashboardNotes.textContent =
            "📝 Notes created: " +
            savedNotes.length;

    }


    if (dashboardQuiz) {

        if (savedQuiz) {

            dashboardQuiz.textContent =
                "🧠 Last quiz score: " +
                savedQuiz.score +
                " / " +
                savedQuiz.total +
                " (" +
                savedQuiz.percentage +
                "%)";

        } else {

            dashboardQuiz.textContent =
                "🧠 Last quiz score: No quiz yet";

        }

    }


    if (dashboardSessions) {

        dashboardSessions.textContent =
            "⏱️ Study sessions: " +
            sessions;

    }

}


updateDashboard();