const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
      question: '¿Cual es la capital de Venezuela?',
      answers: [
          { text: 'Valencia', correct: false },
          { text: 'Barcelona', correct: false },
          {text: 'Caracas', correct: true },
          {text: 'Cucuta', correct: false}
      ]
  },
  {
      question: '¿Qué es el sol?',
      answers: [
          { text: 'Planeta', correct: false },
          { text: 'Estrella', correct: true},
          {text: 'Universo', correct: false},
          {text: 'Agujero', correct: false}
      ]
  },
  {
      question: '¿En que año nos encontramos actualmente?',
      answers: [
          { text: '1998', correct: false },
          { text: 'Yo que sé', correct: true},
          {text: '2020', correct: false},
          {text: '2021', correct: false}
      ]
  },
      {
      question: '¿Cuanto es 4 * 2?',
        answers: [
          { text: '6', correct: false },
          { text: '8', correct: true },
          { text: '10', correct: false },
          { text: '23', correct: false }

        ]
      },
      { question: '¿Cuál es streamer favorito?',
      answers: [
        { text: 'Pedra', correct: false },
          { text: 'Eljuja y Baitybai', correct: true},
          {text: 'Willyrex', correct: false},
          {text: 'Pedra-kun', correct: false}
      ]
    }
    ]
