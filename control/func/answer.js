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
	initBeginView(passIndex)
	initPassView(passIndex)

	var choicesContainer = document.getElementById('choices-container')
	var imageArr = ['img/A.png', 'img/B.png', 'img/C.png', 'img/D.png']
	var sectionArr = ['A', 'B', 'C', 'D']
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
	actionIn('#choices-container', 'action_scale', 0.4, 'linear')
	// 初始化题目
	initQuestion(exercise.type)
}

// 开始答题
function beginAnswer() {
	infoArr = fsquestions.info
	totalPassExercises = fsquestions.questionandkey
	currentExercises = totalPassExercises[passIndex]
	var exercise = currentExercises[examIndex]
	initChoicesView(exercise)
	initVideo(exercise)
}

// 下一题
function next() {
	examIndex++
	// 重置
	if (choiceSelection) {
		// 单选题
		totalAnswer.push(choiceSelection.id)
		choiceSelection = null
	}
	if (choiceSelections.length > 0) {
		totalAnswer.push(choiceSelections.join(','))
		choiceSelections = []
	}
	if (examIndex < currentExercises.length) {
		actionOut(
			'#choices-container',
			'action_scaleOut',
			0.4,
			'linear',
			() => {
				var choicesContainer = document.getElementById(
					'choices-container'
				)
				choicesContainer.innerHTML = ''
				var exercise = currentExercises[examIndex]
				initChoicesView(exercise)
				initVideo(exercise)
				refreshNextState()
			}
		)
	} else {
		// 最后一关
		if (passIndex === 2) {
			// 提交数据
			bindsubmit(totalAnswer, (data) => {
				answerResult = data
				initBeginView(passIndex + 1, data)
				$.fn.fullpage.moveSectionDown()
			})
		} else {
			initBeginView(passIndex + 1)
			$.fn.fullpage.moveSectionDown()
		}
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

// 下一关
function nextPass() {
	passIndex++
	if (passIndex >= totalPassExercises.length) {
		// 全部通关
		$.fn.fullpage.moveSectionDown()
	} else {
		// 下一关
		examIndex = -1
		currentExercises = totalPassExercises[passIndex]
		next()
		$.fn.fullpage.silentMoveTo(2, 0)
	}
}

function initVideo(exercise) {
	var videoDiv = document.getElementById('videoContainer')
	var videoObj = videojs('videoContainer')
	if (exercise.video && exercise.video.length > 0) {
		if (videoSrc != exercise.video) {
			videoObj.src(exercise.video)
			videoObj.poster(exercise.poster)
			videoObj.load(exercise.video)
			videoSrc = exercise.video
		}
		videoDiv.style.display = ''
	} else {
		videoSrc = ''
		videoObj.pause()
		videoDiv.style.display = 'none'
	}
}

// 查看我的成绩
function checkScore() {
	$.fn.fullpage.moveSectionDown()
	initScoreView(answerResult)
}

// 打卡按钮
function createPoster() {
	$.fn.fullpage.moveTo(6,0)
}

// 第几道题
var examIndex = 0

var passIndex = 0

var choiceSelection = null

var choiceSelections = []
// 当前关总共的题目
var currentExercises = []

// 总共的题目
var totalPassExercises = []
// 总共的答案
var totalAnswer = []
// 信息
var infoArr = []
// 视频源
var videoSrc = ''

// 答题结果
var answerResult = {}

/*obj,actionName,speed都是 string,time(秒)是int类型*/
function actionIn(obj, actionName, time, speed) {
	$(obj).show()
	$(obj).css({
		animation: actionName + ' ' + time + 's' + ' ' + speed,
		'animation-fill-mode': 'forwards',
		'-webkit-animation': actionName + ' ' + time + 's' + ' ' + speed,
		'-webkit-animation-fill-mode': 'forwards',
	})
}

/*obj,actionName,speed都是 string,time(秒)是int类型*/
function actionOut(obj, actionName, time, speed, callBack) {
	$(obj).css({
		animation: actionName + ' ' + time + 's' + ' ' + speed,
		'-webkit-animation': actionName + ' ' + time + 's' + ' ' + speed,
	})
	var setInt_obj = setInterval(function () {
		$(obj).hide()
		clearInterval(setInt_obj)
		callBack()
	}, time * 1000)
}
