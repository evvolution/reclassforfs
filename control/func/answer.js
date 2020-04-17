function initQuestion(sender) {
	let choices = document.getElementsByClassName('choices row')
	let choicesArr = Array.from(choices)

	console.log(typeof choicesArr)
	if (sender) {
		// 单选
		choicesArr.forEach((element) => {
			console.log(element)
			element.addEventListener('click', singleSelection)
		})
	} else {
		// 复选
		choicesArr.forEach((element) => {
			console.log(element)
			element.addEventListener('click', multipleSelection)
		})
	}
}
// 单选
function singleSelection(e) {
	let choiceDiv = e.currentTarget
	if (choiceSelection) {
    choiceSelection.classList.remove('selected')
	}
  choiceDiv.classList.add('selected')
	choiceSelection = choiceDiv
}

// 复选
function multipleSelection(e) {
	var choiceDiv = e.currentTarget
	if (choiceDiv.classList.contains('selected')) {
		choiceDiv.classList.remove('selected')
	} else {
		choiceDiv.classList.add('selected')
	}
}

let choiceSelection = null
let choiceSelections = []
