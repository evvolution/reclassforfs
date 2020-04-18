// 初始化选项框
function initQuestion(sender) {
	let choices = document.getElementsByClassName('choices row')
	let choicesArr = Array.from(choices)
	if (!sender) {
		// 单选
		choicesArr.forEach((element) => {
			element.addEventListener('click', singleSelection)
		})
	} else {
		// 复选
		choicesArr.forEach((element) => {
			element.addEventListener('click', multipleSelection)
		})
	}
}
// 单选
function singleSelection(e) {
	let choiceDiv = e.currentTarget
	if (choiceSelection) {
		choiceSelection.classList.remove('choice-selected')
	}
	choiceDiv.classList.add('choice-selected')
	choiceSelection = choiceDiv
	// 刷新题目状态
	refreshNextState()
}

// 复选
function multipleSelection(e) {
	var choiceDiv = e.currentTarget
	if (choiceDiv.classList.contains('choice-selected')) {
		choiceDiv.classList.remove('choice-selected')
		deleteItem(choiceDiv.id)
	} else {
		choiceDiv.classList.add('choice-selected')
		choiceSelections.push(choiceDiv.id)
	}
	// 刷新题目状态
	refreshNextState()
}

// 初始化选项 问题
function initChoicesView(exercise) {
	var choicesContainer = document.getElementById('choices-container')
  var imageArr = ['img/A.png', 'img/B.png', 'img/C.png', 'img/D.png']
  var sectionArr = ['A','B','C','D']
	var choices = exercise.keys
	var question = exercise.questions
	var questiondetail = document.getElementsByClassName('questiondetail')[0]
	questiondetail.innerHTML = question

	// 创建选项
	choices.forEach((element, index) => {
		var div = document.createElement('div')
		var demoChoice = document.getElementById('demo-choice')
		demoChoice.classList.remove('display-none')

		var innerHTML = demoChoice.innerHTML
		innerHTML = innerHTML.replace('**答案**', element)
		div.innerHTML = innerHTML.replace('**图片**', imageArr[index])

		div.id = 'choices' + sectionArr[index]
		div.className = 'choices row'
		choicesContainer.appendChild(div)
	})

	// 初始化题目
	initQuestion(exercise.type)
}

// 开始答题
function beginAnswer() {
	bindgetquestions((data) => {
		totalExercises = data.questionandkey
		var exercise = totalExercises[examIndex]
		initChoicesView(exercise)
	})
}

// 下一题
function next() {
  examIndex++

	if (examIndex < totalExercises.length) {
    if (choiceSelection) {
      // 单选题
      totalAnswer.push(choiceSelection.id)
      choiceSelection = null;
    }
    if (choiceSelections.length > 0) {
      totalAnswer.push(choiceSelections.join(','))
      choiceSelections = []
    }
		var choicesContainer = document.getElementById('choices-container')
		choicesContainer.innerHTML = ''
		var exercise = totalExercises[examIndex]
		initChoicesView(exercise)
		refreshNextState()
	} else {
    var answerArr = []
    totalAnswer.forEach(element=>{
      element = element.replace(/choices/g,'')
      answerArr.push(element)
    })
    console.log(answerArr)
	}
}

// 提示还未作答
function tipsNext() {}

function refreshNextState() {
	var nextBtn = document.getElementById('nextBtn')
	var disNextBtn = document.getElementById('dis-nextBtn')
	if (choiceSelection || choiceSelections.length > 0) {
		// 已选
		nextBtn.style.display = ''
		disNextBtn.style.display = 'none'
	} else {
		nextBtn.style.display = 'none'
		disNextBtn.style.display = ''
	}
}

function deleteItem(str) {
	var index = choiceSelections.indexOf(str)
	if (index >= 0) {
		choiceSelections.splice(index, 1)
	}
}

var examIndex = 0
var choiceSelection = null

var choiceSelections = []
// 总共的题目
var totalExercises = []
// 总共的答案
var totalAnswer = []
