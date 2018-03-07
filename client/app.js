$(document).ready(function() {
	document.getElementById('broadcast').classList.add("visisble"); //if not in .ready, you will not be able to rmeove the class "visible" from this element
	$('.broadcast').addClass('active');

	$('#subsTab')[0].style.backgroundColor = '#EAEAEA'; //for subscriptions tab
	$('#openGrp')[0].style.display = 'none';
})

function switchWorkspace(el) {
	let elClass = el.classList[1];
	var children = $('#workspace')[0].children;
	for (var i = 0; i < children.length; i++) { //makes current workspace disappear
		children[i].classList.remove("visisble");
		children[i].classList.add("hidden");
	}
	document.getElementById(elClass).classList.remove("hidden");
	document.getElementById(elClass).classList.add("visisble");
}

$("#optionsGroup").on('click','.option', function(){ //keeps sidebar items white
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
})

//BROADCAST JS START
var openOverlay;
$('#msgInput').on('click', function(){ //opens overlay for messages
	$('#groupInput').removeAttr('ondrop ondragover');
	$('#msgInput').attr({ondrop:'drop(event, this)', ondragover:'allowDrop(event)'});

	$('#groupOverlay')[0].style.width = "0";
	$('#msgOverlay')[0].style.width = "400px";
	openOverlay = 'msg';
})

$('#groupInput').on('click', function(){ //opens overlay for groups
	$('#msgInput').removeAttr('ondrop ondragover');
	$('#groupInput').attr({ondrop:'drop(event, this)', ondragover:'allowDrop(event)'});

	$('#msgOverlay')[0].style.width = "0";
	$('#groupOverlay')[0].style.width = "400px";
	openOverlay = 'group';
})

$('#closeMsg').on('click', function(){ //closes message overlay
	$('#msgOverlay')[0].style.width = "0";
})

$('#closeGroup').on('click', function(){ //closes group overlay
	$('#groupOverlay')[0].style.width = "0";
})

$('.option').on('click', function(){ //closes open overlay when switching workspace
	$('#msgOverlay')[0].style.width = "0";
	$('#groupOverlay')[0].style.width = "0";
})

//functions for drag and drop items
function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, element) {
	//element.parentElement.id
  event.preventDefault();
  var data = event.dataTransfer.getData("Text");
  
  if($('.broadcast')[0].classList[2] === 'active'){ //only expands message if the broadcast tab is open
	  if(element.id === 'msgInput' || element.id === 'groupInput'){ //expands message on drop
	  	document.getElementById(data).classList.add('expand');
	  }else if(element.id === 'msgOverlayWrap' || element.id === 'groupOverlayWrap'){
	  	document.getElementById(data).classList.remove('expand');
	  }
	}else if($('.subscribers')[0].classList[2] === 'active'){
		if(element.id === 'tempInp'){ //expands message on drop
	  	document.getElementById(data).style.width = "190px"; //sets card to width of temp input
	  	document.getElementById(data).style.height = "60px";

	  	$('#cloneBtn')[0].style.width = "180px";
	  	setTimeout(function(){
				$('#cloneBtn')[0].style.bottom = "100px";
	  	}, 400);
	  }else{
	  	document.getElementById(data).style.width = "255px"; //sets card back to original height
	  	document.getElementById(data).style.height = "100px";

	  	setTimeout(function(){ //withdraws temp input
	  		if($('#tempInp').children().length > 0){ //checks if somethings is still in temp input
	  			$('#tempSide')[0].style.width = "220px";
	  		}else{
					$('#cloneBtn')[0].style.bottom = "75px";
	  			$('#tempSide').delay(5000).queue(function (next) { 
	    			$(this).css('width', '0'); 
	    			next(); 
	  			});

	  			$('#cloneBtn').delay(4000).queue(function (next) { 
	    			$(this).css('width', '0'); 
	    			next(); 
	  			});
	  		}	
	  	}, 400);
	  }
	}

  //conditional must go before appending
  element.prepend(document.getElementById(data)); //adds to top of div
}

$('.draggable').mousedown(function(){ //shows message in message input on hold
	if(openOverlay === 'msg'){
	  $('#msgWarning').text("Drag Your Message Here");	
	}else if(openOverlay == 'group'){
		$('#grpWarning').text("Drag Your Group Here");
	}
})

$('.draggable').mouseup(function(){ //shows message in group input on hold
	if(openOverlay === 'msg'){
	  $('#msgWarning').text("");	
	}else if(openOverlay == 'group'){
		$('#grpWarning').text("");
	}
})

$('.draggable').mouseover(function(){ //shows message in group input on hold
	if(openOverlay === 'msg'){
	  $('#msgWarning').text("");	
	}else if(openOverlay == 'group'){
		$('#grpWarning').text("");
	}
})
//BROADCAST JS END



//GROUPS JS START
$('.customBox span').click(function(){ //checks off boxes
  if($(this).hasClass('isChecked')){
  	$(this).removeClass('isChecked');
  }else{
  	$(this).addClass('isChecked');
  }
});

$('#checkAll span').click(function(){ //checks all boxes on/off
	if($(this).hasClass('isChecked')){
		$(this).removeClass('isChecked');
		$('.customBox span').map((currVal, index) => {
			$(index).removeClass('isChecked');
			index.parentElement.parentElement.parentElement.style.backgroundColor = "white";
		});
	}else{
		$(this).addClass('isChecked');
		$('.customBox span').map((currVal, index) => {
			$(index).addClass('isChecked');
			index.parentElement.parentElement.parentElement.style.backgroundColor = "#fcd8b6";
		});
	}
})

$('#reloadGrp').click(function(){ //runs refresh button animation
	if($('#reloadGrp img')[0].style.animationName == "reload"){
		$('#reloadGrp img')[0].style.animationName = "resetReload";
	}else{
		$('#reloadGrp img')[0].style.animationName = "reload"
		$('#reloadGrp img')[0].style.animationPlayState = "running";
	}
})

function addHighlight(currCheck, row) {
	$(currCheck).addClass('isChecked');
	row.style.backgroundColor = "#fcd8b6";

	let img = $('<img/>').attr({class:'editBtn', src:'./images/edit.png'});
	row.getElementsByTagName('td')[1].append(img[0]);
}

function removeHighlight(currCheck, row) {
	$(currCheck).removeClass('isChecked');
  row.style.backgroundColor = "white";

  //console.log(row.getElementsByTagName('td')[1].lastChild);
  row.getElementsByTagName('td')[1].lastElementChild.remove(); //removes edit button
}

var editingGrp = false;
$('#grpTable tr td').click(function(){ //highlights whole row
	let row = this.parentElement;
	let currCheck = this.parentElement.firstElementChild.firstElementChild.lastElementChild;

	let iterate = 0;
	if(event.target.tagName === 'SPAN' || event.target.tagName === 'INPUT'){
		iterate++;
		$(currCheck).hasClass('isChecked') === false && iterate === 1 ? removeHighlight(currCheck, row) : addHighlight(currCheck, row);
	}else if($(currCheck).hasClass('isChecked')){
		console.log('real first')
		if(event.target.className === 'editBtn' || event.target.className === 'tempInp' || event.target.className === 'saveBtn'){ //checks if clicking on edit button
			editingGrp = true;
			let ogGrpName = event.target.parentElement.firstChild.nodeValue;

			if(event.target.className === 'editBtn'){ //removes current group name and replaces it with input field
				event.target.parentElement.firstChild.remove();
				let input = $('<input>').attr({type:'text', value: ogGrpName, class:'tempInp'});
				event.target.parentElement.prepend(input[0]);

				let toSave = row.getElementsByTagName('td')[1].lastElementChild;
				$(toSave).attr({class:'saveBtn', src:'./images/save.png'}); //show save button
			}else if(event.target.className === 'saveBtn'){
				let newGrpName = event.target.parentElement.firstChild.value
				event.target.parentElement.firstChild.remove();
				event.target.parentElement.prepend(newGrpName);
				row.getElementsByTagName('td')[1].lastElementChild.remove(); //remove save button

				editingGrp = false;
				removeHighlight(currCheck, row);
			}
		}else if(editingGrp === false){ //if not editing, remove edit button and unhighlight
			removeHighlight(currCheck, row);
		}
  }else if(editingGrp === false){ //adds edit button and highlights
  	console.log('first')
  	addHighlight(currCheck, row);
  }else{
  	alert("Save Group Name First");
  }
})


//GROUPS JS END



//SUBSCRIBERS JS START
$('#subsTab').click(function(){
	$('#subsTab')[0].style.backgroundColor = '#EAEAEA';
	$('#grpTab')[0].style.backgroundColor = '#fcd8b6';
	$('#subsTab')[0].style.position = 'relative';
	$('#grpTab')[0].style.position = '';

	$('#openSub')[0].style.display = 'block';
	$('#openGrp')[0].style.display = 'none';
})

$('#grpTab').click(function(){
	$('#subsTab')[0].style.backgroundColor = '#fcd8b6';
	$('#grpTab')[0].style.backgroundColor = 'white';
	$('#grpTab')[0].style.position = 'relative';
	$('#subsTab')[0].style.position = '';

	$('#openSub')[0].style.display = 'none';
	$('#openGrp')[0].style.display = 'block';
})

$('.singleSub').on('mousedown', function(event){
	$('#tempSide')[0].style.width = "220px";
})


//SUBSCRIBERS JS END