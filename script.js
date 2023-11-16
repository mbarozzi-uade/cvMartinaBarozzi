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
      question: '¿que idiomas hablo?',
      answers: [
          { text: 'español y aleman', correct: false },
          { text: 'español', correct: false },
          {text: 'español e ingles', correct: true },
          {text: 'frances', correct: false}
      ]
  },
  {
      question: '¿en que escuela termine mis estudios?',
      answers: [
          { text: 'colegio san fernando', correct: false },
          { text: 'colegio san patricio', correct: true},
          {text: 'escuela nro 3', correct: false},
          {text: 'colegio etcheverry boneo', correct: false}
      ]
  },
  {
      question: '¿en que estado estan mis estudios universitarios?',
      answers: [
          { text: 'carrera universitaria completa', correct: false },
          { text: 'carrera universitaria en transcurso', correct: true},
          {text: 'posgrado en transcurso', correct: false},
          {text: 'terciario terminado', correct: false}
      ]
  },
      {
      question: '¿que carrera estudio?',
        answers: [
          { text: 'marketing', correct: false },
          { text: 'desarrollo de software', correct: true },
          { text: 'ingenieria de software', correct: false },
          { text: 'desarrollo de videojuegos', correct: false }

        ]
      },
      { question: '¿en donde trabajo?',
      answers: [
        { text: 'estudio juridico', correct: false },
          { text: 'Estudio Barozzi', correct: true},
          {text: 'cerro catedral' correct: false},
          {text: 'aerolineas argentinas', correct: false}
      ]
    }
    ]
