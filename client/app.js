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

var timer;
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
	}else if($('.subscribers')[0].classList[2] === 'active'){ //checks if subs tab is open
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

	  	clearTimeout(timer);
			$('#cloneBtn')[0].style.bottom = "75px";
			timer = setTimeout(function () {
        $('#cloneBtn')[0].style.width = '0'; 
  			setTimeout(function(){
					$('#tempSide')[0].style.width = "0";
		  	}, 200);
      }, 5000);
	  }
	}

	if(element.id === 'msgInput'){
		if(element.children.length > 1){
			element.children[0].classList.remove('expand');
			$('#msgOverlayWrap').prepend(element.children[0]);
		}
	}else if(element.id === 'groupInput'){
		if(element.children.length > 1){
			element.children[0].classList.remove('expand');
			$('#groupOverlayWrap').prepend(element.children[0]);
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
/*$('.customBox span').click(function(){ //checks off boxes
  if($(this).hasClass('isChecked')){
  	$(this).removeClass('isChecked');
  }else{
  	$(this).addClass('isChecked');
  }
});*/

function highlightTopic(selected) {
	let checkBox = selected.firstElementChild.firstElementChild;
	$(checkBox).toggleClass('isChecked');
	$(selected).toggleClass('isCheckedBackground');
}

$('#checkAll').click(function(){ //checks all boxes on/off
	if($(this).hasClass('isChecked')){
		$(this).removeClass('isChecked');
		$('.customCheck').map((currVal, index) => {
			let selectedRow = index.parentElement.parentElement;
			$(index).removeClass('isChecked');
			$(selectedRow).removeClass('isCheckedBackground');
		});
	}else{
		$(this).addClass('isChecked');
		$('.customCheck').map((currVal, index) => {
			let selectedRow = index.parentElement.parentElement;
			$(index).addClass('isChecked');
			$(selectedRow).addClass('isCheckedBackground');
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

/*
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
$('#grpTable tbody tr td').click(function(){ //highlights whole row
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
*/

$('#addGrp').click(function(){
	$('#addPopup')[0].style.display = "block";
	$('#deletePopup')[0].style.display = "none"; //closes delete popup if open
})

$('#closePopup').click(function(){
	$('#addPopup')[0].style.display = "none";
})

var groupIDs = [];
$('#trashGrp').click(function(){
  $('#selectedGroups').empty(); //empties out previously selected groups
  groupIDs = [];

  let checkedElements = $('#grpTable tbody tr').filter('.isCheckedBackground');
  checkedElements.map((currVal, index) => {
  	let insertGrpName = $(index).find('.groupName')[0].innerText;
  	let insertGrpDate = $(index).find('.groupDate')[0].innerText;

  	groupIDs.push(+$(index).attr('id')); //needs to be converted to number (unary operator)

  	$('#selectedGroups').append(`
			<tr id="selectedGroupText">
				<td>${insertGrpName}</td>
				<td><span style="font-weight: bold"> Created On:</span>&nbsp; ${insertGrpDate}</td>
			</tr>
  	`)
  })

  $('#deletePopup')[0].style.display = "block";
  $('#addPopup')[0].style.display = "none"; //closes add popup if open
})

$('#closeDelPopup').click(function(){
	$('#deletePopup')[0].style.display = "none";
})

$('#deleteGroup').click(function(){
	$('#deletePopup')[0].style.display = "none";
  deleteTopics(groupIDs);
})

$('#searchGrp').click(function(){
	if($('#searchBox')[0].style.width === "150px"){
		$('#searchInput').val('');
		grpSearch(); //needs to run grpSearch() again to reset values
		$('#searchBox')[0].style.width = "0px";
	}else {
		$('#searchBox')[0].style.width = "150px";
	}
})

//adapted from: https://www.w3schools.com/howto/howto_js_filter_lists.asp
function grpSearch() { //filters group on search
  var input, filter, tbody, trow, searchName;
  input = $("#searchInput");
  filter = input.val().toUpperCase();
  tbody = $("#grpTable tbody");
  trow = $("#grpTable tbody tr");
  for (var i = 0; i < trow.length; i++) {
    searchName = trow[i].getElementsByClassName("groupName")[0];
    if (searchName.innerHTML.toUpperCase().indexOf(filter) > -1) {
      trow[i].style.display = "";
    } else {
      trow[i].style.display = "none";
    }
  }
}
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

//QS START
function switchType(el){
	var header = el.charAt(0).toUpperCase() + el.slice(1);
	for (var i = 0; i < document.getElementsByClassName('msgType').length; i++) {
		document.getElementsByClassName('msgType')[i].style.backgroundColor="#F58F31";
		document.getElementsByClassName('msgType')[i].style.color="white";
		document.getElementsByClassName('msgType')[i].style="border-color: #F58F31;";
	}
	document.getElementById(el).style.backgroundColor="white";
	document.getElementById(el).style.color="#F58F31";
	document.getElementById(el).style.borderColor= "#F58F31";
	document.getElementById('typeHeader').innerHTML=header;
	for (var i = 0; i < document.getElementsByClassName('msg').length; i++) {
		document.getElementsByClassName('msg')[i].style.display="none";
	}
	document.getElementById(el+"-msg").style.display="block";
}