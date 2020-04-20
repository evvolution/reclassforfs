function initBeginView(passIndex, answerResult) {
	if (passIndex > 2) {
    if (answerResult) {
      var nextPassBtn = document.getElementsByClassName('nextPassBtn')[0]
      var checkScoreBtn = document.getElementsByClassName('checkScoreBtn')[0]
      var createPosterBtn = document.getElementsByClassName(
        'createPosterBtn'
      )[0]
      nextPassBtn.style.display = 'none'
      if (answerResult.score * 5 === 100) {
        checkScoreBtn.style.display = 'none'
        createPosterBtn.style.display = ''
      } else {
        checkScoreBtn.style.display = ''
        createPosterBtn.style.display = 'none'
      }
    }
    
		return
	}
	var titleImg = $('#passBegin .titleImg')
	var descImg = $('#passBegin .descImg')
	titleImg.attr('src', './img/beginTitle-' + (passIndex + 1) + '.png')
	descImg.attr('src', './img/beginDesc-' + (passIndex + 1) + '.png')

}

function initPassView(passIndex) {
	if (passIndex > 2) {
		return
	}
  var topTitles = ['一', '二', '三']
  var medalTitles = ['卫生','校园','心理']
	var topTitle = $('#passFinish .top-medalContainer .title')
	var topMedal = $('#passFinish .top-medalContainer .icon')
	var bottomItems = Array.from($('#passFinish .bottom-medalContainer .item'))
	topTitle.text(
    '恭喜你完成第'+ topTitles[passIndex] +'关， 成功获得一枚'+ medalTitles[passIndex] + '防疫勋章'
	)
	topMedal.attr('src', './img/topMedal-' + (passIndex + 1) + '.png')
	bottomItems.forEach((element, index) => {
		var bottomImg = element.children[0]
		var bottomTitle = element.children[1]
		bottomTitle.style.color = '#333'
		if (index === 0) {
			// 第一个
			// bottomImg.attr("src", './img/bottomMedal-1.png')
			bottomImg.src = './img/bottomMedal-1.png'
		} else if (index === 1) {
			// 第二个
			if (passIndex < 1) {
				bottomImg.src = './img/disMedal-2.png'
				bottomTitle.style.color = '#CCC'
			} else {
				bottomImg.src = './img/bottomMedal-2.png'
			}
		} else if (index === 2) {
			// 第三个
			if (passIndex < 2) {
				bottomImg.src = './img/disMedal-3.png'
				bottomTitle.style.color = '#CCC'
			} else {
				bottomImg.src = './img/bottomMedal-3.png'
			}
		}
	})
}

// 设置分数页面
function initScoreView(answerResult) {
	var scoreDom = Array.from($('.pointSection .scoreTitle'))[0]
	scoreDom.innerHTML = answerResult.score * 5 + '分'
	var details = answerResult.detail

	var wrongContainer = $('.pointSection .wrongContainer')
	details.forEach((element) => {
		if (!element.is_correct || element.is_correct === '0') {
			var appendHtml =
				'<div class="wrongItem">' +
				element.id +
				'<img src="./img/wrongItem.png" alt=""></div>'
			wrongContainer.append(appendHtml)
		}
	})
}

// 设置打卡页面数据
function initClockView(name, content, school) {
	var contentDoms = Array.from($('.clockSection .clock-container p'))
	console.log(contentDoms)
	contentDoms.forEach((element, index) => {
		if (index === 0) {
			// 标题
			element.innerHTML = name
		}
		if (index === 1) {
			element.innerHTML = content
		}
		if (index === 2) {
			element.innerHTML = school
		}
	})
}
