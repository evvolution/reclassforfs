
function initBeginView(passIndex) {
    var titleImg = $('#passBegin .titleImg')
    var descImg = $('#passBegin .descImg')
    titleImg.attr("src", './img/beginTitle-' + (passIndex + 1) + '.png')
    descImg.attr("src", './img/beginDesc-' + (passIndex + 1) + '.png')

}

function initPassView(passIndex) {
    var topTitles = ['一', '二', '三']
    var topTitle = $('#passFinish .top-medalContainer .title')
    var topMedal = $('#passFinish .top-medalContainer .icon')
    var bottomItems = Array.from($('#passFinish .bottom-medalContainer .item'))
    topTitle.text("恭喜你完成第" + topTitles[passIndex] + "关，成功获得一枚勋章")
    console.log(topMedal)
    topMedal.attr("src", './img/topMedal-' + (passIndex + 1) + '.png')
    bottomItems.forEach((element,index) => {
        var bottomImg = element.children[0]
        var bottomTitle = element.children[1]
        bottomTitle.style.color = "#333"
        console.log(bottomImg)
        if (index === 0) {
            // 第一个
            // bottomImg.attr("src", './img/bottomMedal-1.png')
            bottomImg.src = './img/bottomMedal-1.png'
        }else if (index === 1) {
            // 第二个
            if (passIndex < 1) {
                bottomImg.src = './img/disMedal-2.png'
                bottomTitle.style.color = "#CCC"
            }else {
                bottomImg.src = './img/bottomMedal-2.png'
            }
            
        }else if (index === 2) {
            // 第三个
            if (passIndex < 2) {
                bottomImg.src = './img/disMedal-3.png'
                bottomTitle.style.color = "#CCC"
            }else {
                bottomImg.src = './img/bottomMedal-3.png'
            }
        }
    });
}