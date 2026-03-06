// List of questions and answers
const flashcards = [
    { question: "What is normalization in databases?", answer: "The process of organizing data to minimize redundancy and improve data integrity." },
    { question: "What does a project manager do?", answer: "A project manager plans, executes and closes projects to meet specific goals and objectives." },
    { question: "In a computer, what is normally known as the \"brain\"?", answer: "The CPU." },
    { question: "Why do we need to learn anti-corruption?", answer: "To prevent corruption in systems and processes." },
    { question: "What is so important about the use of Malay in Malaysia?", answer: "It is the national language and promotes unity among diverse ethnic groups." },
    { question: "Why do we need to learn web development?", answer: "To create and maintain websites and web applications." },
    { question: "Why do we need to learn maths?", answer: "It is essential for logical reasoning, problem-solving and understanding patterns." },
];

// First flashcard
let currentIndex = 0;

const card = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const counterEl = document.getElementById('counter');

// If they exist, toggle flipped class
if (card && questionEl && answerEl && counterEl) {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
}

// If they don't exist, stop
function updateCard() {
    if (!card || !questionEl || !answerEl || !counterEl) return;
    card.classList.remove('flipped');
    setTimeout(() => {
        questionEl.textContent = flashcards[currentIndex].question;
        answerEl.textContent = flashcards[currentIndex].answer;
        counterEl.textContent = `${currentIndex + 1} / ${flashcards.length}`;
    }, 150);
}

// Move to next card
function nextCard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    updateCard();
}

// Move to previous card
function prevCard() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    updateCard();
}
