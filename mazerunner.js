window.addEventListener("load", function() {
	var state = "none"
	var randomStepsLeft = 10
	var position = [2,2]
	var lastMotion = "X"
	var mapId = "Basic 5x5"
	document.getElementById("selectMap").value = mapId
	var rawMapData = {}
	rawMapData["Basic 3x3"] = [
		"2-1-2",
		"| | |",
		"1-X-1",
		"| | |",
		"2-1-2"
	]
	rawMapData["Basic 5x5"] = [
		"4-3-2-3-4",
		"| | | | |",
		"3-2-1-2-3",
		"| | | | |",
		"2-1-X-1-2",
		"| | | | |",
		"3-2-1-2-3",
		"| | | | |",
		"4-3-2-3-4"
	]
	rawMapData["Basic 7x7"] = [
		"6-5-4-3-4-5-6",
		"| | | | | | |",
		"5-4-3-2-3-4-5",
		"| | | | | | |",
		"4-3-2-1-2-3-4",
		"| | | | | | |",
		"3-2-1-X-1-2-3",
		"| | | | | | |",
		"4-3-2-1-2-3-4",
		"| | | | | | |",
		"5-4-3-2-3-4-5",
		"| | | | | | |",
		"6-5-4-3-4-5-6"
	]
	rawMapData["Basic 9x9"] = [
		"8-7-6-5-4-5-6-7-8",
		"| | | | | | | | |",
		"7-6-5-4-3-4-5-6-7",
		"| | | | | | | | |",
		"6-5-4-3-2-3-4-5-6",
		"| | | | | | | | |",
		"5-4-3-2-1-2-3-4-5",
		"| | | | | | | | |",
		"4-3-2-1-X-1-2-3-4",
		"| | | | | | | | |",
		"5-4-3-2-1-2-3-4-5",
		"| | | | | | | | |",
		"6-5-4-3-2-3-4-5-6",
		"| | | | | | | | |",
		"7-6-5-4-3-4-5-6-7",
		"| | | | | | | | |",
		"8-7-6-5-4-5-6-7-8"
	]
	rawMapData["Basic 19x19"] = [
		"I-H-G-F-E-D-C-B-A-9-A-B-C-D-E-F-G-H-I",
		"| | | | | | | | | | | | | | | | | | |",
		"H-G-F-E-D-C-B-A-9-8-9-A-B-C-D-E-F-G-H",
		"| | | | | | | | | | | | | | | | | | |",
		"G-F-E-D-C-B-A-9-8-7-8-9-A-B-C-D-E-F-G",
		"| | | | | | | | | | | | | | | | | | |",
		"F-E-D-C-B-A-9-8-7-6-7-8-9-A-B-C-D-E-F",
		"| | | | | | | | | | | | | | | | | | |",
		"E-D-C-B-A-9-8-7-6-5-6-7-8-9-A-B-C-D-E",
		"| | | | | | | | | | | | | | | | | | |",
		"D-C-B-A-9-8-7-6-5-4-5-6-7-8-9-A-B-C-D",
		"| | | | | | | | | | | | | | | | | | |",
		"C-B-A-9-8-7-6-5-4-3-4-5-6-7-8-9-A-B-C",
		"| | | | | | | | | | | | | | | | | | |",
		"B-A-9-8-7-6-5-4-3-2-3-4-5-6-7-8-9-A-B",
		"| | | | | | | | | | | | | | | | | | |",
		"A-9-8-7-6-5-4-3-2-1-2-3-4-5-6-7-8-9-A",
		"| | | | | | | | | | | | | | | | | | |",
		"9-8-7-6-5-4-3-2-1-X-1-2-3-4-5-6-7-8-9",
		"| | | | | | | | | | | | | | | | | | |",
		"A-9-8-7-6-5-4-3-2-1-2-3-4-5-6-7-8-9-A",
		"| | | | | | | | | | | | | | | | | | |",
		"B-A-9-8-7-6-5-4-3-2-3-4-5-6-7-8-9-A-B",
		"| | | | | | | | | | | | | | | | | | |",
		"C-B-A-9-8-7-6-5-4-3-4-5-6-7-8-9-A-B-C",
		"| | | | | | | | | | | | | | | | | | |",
		"D-C-B-A-9-8-7-6-5-4-5-6-7-8-9-A-B-C-D",
		"| | | | | | | | | | | | | | | | | | |",
		"E-D-C-B-A-9-8-7-6-5-6-7-8-9-A-B-C-D-E",
		"| | | | | | | | | | | | | | | | | | |",
		"F-E-D-C-B-A-9-8-7-6-7-8-9-A-B-C-D-E-F",
		"| | | | | | | | | | | | | | | | | | |",
		"G-F-E-D-C-B-A-9-8-7-8-9-A-B-C-D-E-F-G",
		"| | | | | | | | | | | | | | | | | | |",
		"H-G-F-E-D-C-B-A-9-8-9-A-B-C-D-E-F-G-H",
		"| | | | | | | | | | | | | | | | | | |",
		"I-H-G-F-E-D-C-B-A-9-A-B-C-D-E-F-G-H-I"
	]
	rawMapData["Bricks 9x9"] = [
		"  7-8-7-8-7-8-7  ",
		"  |   |   |   |  ",
		"7-6-5-6-5-6-5-6-7",
		"|   |   |   |   |",
		"6-5-4-3-4-3-4-5-6",
		"  |   |   |   |  ",
		"5-4-3-2-1-2-3-4-5",
		"|   |   |   |   |",
		"4-3-2-1-X-1-2-3-4",
		"  |   |   |   |  ",
		"5-4-3-2-3-2-3-4-5",
		"|   |   |   |   |",
		"6-5-4-5-4-5-4-5-6",
		"  |   |   |   |  ",
		"7-6-7-6-7-6-7-6-7",
		"|   |   |   |   |",
		"8-9-8-9-8-9-8-9-8"
	]
	rawMapData["Castle 9x9"] = [
		"8-7-6-5   5-6-7-8",
		"| |   |   |   | |",
		"7-6-5-4-5-4-5-6-7",
		"| |   |   |   | |",
		"6 5-4-3   3-4-5 6",
		"| | | |   | | | |",
		"5-4-3-2-3-2-3-4-5",
		"|   | |   | |   |",
		"6   4 1-X-1 4   6",
		"|   | |   | |   |",
		"5-4-3-2-3-2-3-4-5",
		"| | | |   | | | |",
		"6 5-4-3   3-4-5 6",
		"| |   |   |   | |",
		"7-6-5-4-5-4-5-6-7",
		"| |   |   |   | |",
		"8-7-6-5   5-6-7-8"
	]
	var mapData = {}
	var mapParsData = {}
	var mapStart = {}
	for(var key in rawMapData) {
		if(!rawMapData.hasOwnProperty(key)) continue;
		var value = rawMapData[key]
		var rows = (value.length+1)/2
		var columns = (value[0].length+1)/2
		// initialize mapData/mapParsData objects
		mapData[key] = []
		mapParsData[key] = []
		for(var r=0; r<rows; r++) {
				mapData[key].push([])
				mapParsData[key].push([])
			for(var c=0; c<columns; c++) {
				var charValue = value[r*2].charAt(c*2)
				var parValue = 0
				var cheese = false
				if(charValue=='X') {
					parValue = 0
					mapStart[key] = [r,c]
					cheese = true
				} else if(charValue=='A') {
					parValue = 10
				} else if(charValue=='B') {
					parValue = 11
				} else if(charValue=='C') {
					parValue = 12
				} else if(charValue=='D') {
					parValue = 13
				} else if(charValue=='E') {
					parValue = 14
				} else if(charValue=='F') {
					parValue = 15
				} else if(charValue=='G') {
					parValue = 16
				} else if(charValue=='H') {
					parValue = 17
				} else if(charValue=='I') {
					parValue = 18
				} else if(charValue==' ') {
					parValue = 1
				} else {
					parValue = parseInt(charValue)
				}
				mapParsData[key][r].push(parValue)
				var mapValue = {}
				mapValue['C'] = (cheese?1:0)
				mapValue['L'] = (c>0&&value[r*2].charAt(c*2-1)=='-'?1:0)
				mapValue['R'] = (c+1<columns&&value[r*2].charAt(c*2+1)=='-'?1:0)
				mapValue['U'] = (r>0&&value[r*2-1].charAt(c*2)=='|'?1:0)
				mapValue['D'] = (r+1<rows&&value[r*2+1].charAt(c*2)=='|'?1:0)
				mapData[key][r].push(mapValue)
			}
		}
		//alert(JSON.stringify(mapStart[key]))
		//alert(JSON.stringify(mapParsData[key]))
		//alert(JSON.stringify(mapData[key]))
	}
	var directedPathStart = [2,2]
	var directedPathLength = 0
	var noSleep = new NoSleep()
	var sleepStatus = "asleep"
	document.getElementById("toggleActive").addEventListener("click", toggleActive);
	function toggleActive() {
		if(sleepStatus=="asleep") {
			sleepStatus = "awake"
			noSleep.enable()
			document.getElementById("toggleActive").textContent = "Push to Stop"
			state = "random"
			randomStepsLeft = Math.floor(Math.random()*20)
			position = mapStart[mapId]
			lastMotion = "X"
			resetImage()
		} else {
			sleepStatus = "asleep"
			noSleep.disable()
			document.getElementById("toggleActive").textContent = "Push to Start"
			state = "none"
			randomStepsLeft = Math.floor(Math.random()*20)
			position = mapStart[mapId]
			lastMotion = "X"
			resetImage()
		}
	}
	function resetImage() {
	// TODO: figure out how to get SVG event timings to work properly so that rect does not reset to initial position while still visible
	//alert(document.getElementById("svgId").getCurrentTime())
	//alert(document.getElementById("leftToRight").getAttribute("begin"))
	//document.getElementById("leftToRight").endElement()
	//document.getElementById("leftToLeft").beginElement()
		document.getElementById("cheese").style.visibility = "hidden"
		document.getElementById("leftHall").style.visibility = "hidden"
		document.getElementById("rightHall").style.visibility = "hidden"
		document.getElementById("topHall").style.visibility = "hidden"
		document.getElementById("bottomHall").style.visibility = "hidden"
		if(mapData[mapId][position[0]][position[1]]["C"]==1) {
			document.getElementById("cheese").style.visibility = "visible"
		}
		if(mapData[mapId][position[0]][position[1]]["L"]==1) {
			document.getElementById("leftHall").style.visibility = "visible"
		}
		if(mapData[mapId][position[0]][position[1]]["R"]==1) {
			document.getElementById("rightHall").style.visibility = "visible"
		}
		if(mapData[mapId][position[0]][position[1]]["U"]==1) {
			document.getElementById("topHall").style.visibility = "visible"
		}
		if(mapData[mapId][position[0]][position[1]]["D"]==1) {
			document.getElementById("bottomHall").style.visibility = "visible"
		}
		if(state=="random"&&randomStepsLeft<=0) {
			state = "directed-waiting"
			document.getElementById("advice").innerHTML = "Use the arrow keys or the buttons to find your way back to the cheese."
			// TODO: why doesn't this update correctly when I set the list variable directly, why do I have to set individual elements?
			directedPathStart[0] = position[0]
			directedPathStart[1] = position[1]
			directedPathLength = 0
		}
		if((state=="directed-waiting"||state=="directed-moving")&&mapData[mapId][position[0]][position[1]]["C"]==1) {
			state = "random"
			randomStepsLeft = Math.floor(Math.random()*20)
			document.getElementById("advice").innerHTML = "Well done! Try to keep track of where the mouse is in the maze."
			if(directedPathLength>0) {
				var par = mapParsData[mapId][directedPathStart[0]][directedPathStart[1]]
				var score = par/directedPathLength
				document.getElementById("accuracy").textContent = "Accuracy: "+Math.floor(score*100)+"% ("+directedPathLength+" steps on par "+par+")"
			}
		}
		if(state=="random") {
			randomStepsLeft = randomStepsLeft-1
			setTimeout(moveRandom,1000)
		} else if(state=="directed-moving") {
			state="directed-waiting"
			// wait for bodyClick event
		}
	}
	resetImage()
	function animateLeftToRight() {
		document.getElementById("cheese").style.visibility = "hidden"
		document.getElementById("rightHall").style.visibility = "hidden"
		document.getElementById("topHall").style.visibility = "hidden"
		document.getElementById("bottomHall").style.visibility = "hidden"
		document.getElementById("leftToRight").beginElement()
		setTimeout(resetImage,1000)
	}
	function animateRightToLeft() {
		document.getElementById("cheese").style.visibility = "hidden"
		document.getElementById("leftHall").style.visibility = "hidden"
		document.getElementById("topHall").style.visibility = "hidden"
		document.getElementById("bottomHall").style.visibility = "hidden"
		document.getElementById("rightToLeft").beginElement()
		setTimeout(resetImage,1000)
	}
	function animateTopToBottom() {
		document.getElementById("cheese").style.visibility = "hidden"
		document.getElementById("leftHall").style.visibility = "hidden"
		document.getElementById("rightHall").style.visibility = "hidden"
		document.getElementById("bottomHall").style.visibility = "hidden"
		document.getElementById("topToBottom").beginElement()
		setTimeout(resetImage,1000)
	}
	function animateBottomToTop() {
		document.getElementById("cheese").style.visibility = "hidden"
		document.getElementById("leftHall").style.visibility = "hidden"
		document.getElementById("rightHall").style.visibility = "hidden"
		document.getElementById("topHall").style.visibility = "hidden"
		document.getElementById("bottomToTop").beginElement()
		setTimeout(resetImage,1000)
	}
	function moveRandom() {
		if(state!="random") return;
		var options = []
		if(mapData[mapId][position[0]][position[1]]["L"]==1) {
			options.push("L")
			if(lastMotion!="R") {
				options.push("L")
				options.push("L")
				options.push("L")
			}
		}
		if(mapData[mapId][position[0]][position[1]]["R"]==1) {
			options.push("R")
			if(lastMotion!="L") {
				options.push("R")
				options.push("R")
				options.push("R")
			}
		}
		if(mapData[mapId][position[0]][position[1]]["U"]==1) {
			options.push("U")
			if(lastMotion!="D") {
				options.push("U")
				options.push("U")
				options.push("U")
			}
		}
		if(mapData[mapId][position[0]][position[1]]["D"]==1) {
			options.push("D")
			if(lastMotion!="U") {
				options.push("D")
				options.push("D")
				options.push("D")
			}
		}
		var option = options[Math.floor(Math.random()*options.length)]
		lastMotion = option
		if(option=="L") {
			animateLeftToRight()
			position[1] = position[1]-1
			return
		}
		if(option=="R") {
			animateRightToLeft()
			position[1] = position[1]+1
			return
		}
		if(option=="U") {
			animateTopToBottom()
			position[0] = position[0]-1
			return
		}
		if(option=="D") {
			animateBottomToTop()
			position[0] = position[0]+1
			return
		}
	}
	function bodyClick(event) {
		var x = event.keyCode;
		if (x == '37') {
			arrowClick("L")
		} else if (x == '39') {
			arrowClick("R")
		} else if (x == '38') {
			arrowClick("U")
		} else if (x == '40') {
			arrowClick("D")
		}
	}
	document.getElementById("leftArrow").addEventListener("click", function(){arrowClick("L")});
	document.getElementById("upArrow").addEventListener("click", function(){arrowClick("U")});
	document.getElementById("rightArrow").addEventListener("click", function(){arrowClick("R")});
	document.getElementById("downArrow").addEventListener("click", function(){arrowClick("D")});
	function arrowClick(optionChar) {
		if(state!="directed-waiting") return;
		if(mapData[mapId][position[0]][position[1]][optionChar]==0) return;
		state = "directed-moving"
		directedPathLength = directedPathLength+1
		if (optionChar=="L") {
			animateLeftToRight()
			position[1] = position[1]-1
		} else if(optionChar=="R") {
			animateRightToLeft()
			position[1] = position[1]+1
		} else if(optionChar=="U") {
			animateTopToBottom()
			position[0] = position[0]-1
		} else if(optionChar=="D") {
			animateBottomToTop()
			position[0] = position[0]+1
		}
	}
	document.getElementById("selectMap").addEventListener("change", updateSelectMap);
	function updateSelectMap() {
		mapId = document.getElementById("selectMap").value
		if(sleepStatus=="awake") {
			toggleActive()
		}
		position = mapStart[mapId]
		state = "none"
		resetImage()
	}
});