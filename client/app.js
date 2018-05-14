$(document).ready(function() {
	document.getElementById('broadcast').classList.add("visisble"); //if not in .ready, you will not be able to rmeove the class "visible" from this element
	$('.broadcast').addClass('active');

	$('#subsTab')[0].style.backgroundColor = '#EAEAEA'; //for subscriptions tab
	$('#openGrp')[0].style.display = 'none';
	$('#textCircle, #emailCircle').css('background-color', '#fcd8b6');
	
	//sets circle option in add subscriber option to automatically checked off
	$('#textCircle').addClass('isChecked');
	$('#textCircle').empty();
	$('#textCircle').append(`<div class="innerCircle"></div>`);
	$('#emailProtText')[0].style.color = "gray";
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


	$("#optionsGroup").on('click','.option', function(){ //keeps sidebar items white
	  $(this).addClass('active');
	  $(this).siblings().removeClass('active');
	});
	$("#mobileOptionsGroup").on('click','.mobileOption', function(){ //keeps sidebar items white
	  $(this).addClass('active');
	  $(this).siblings().removeClass('active');
	})

	$('#mobileSearchInput').val('');
	$('#mobileSearch')[0].style.height = "0px";
	mobileSearch(this);

	// $('.dropdown').removeClass('activeDots');
	// $('.dropdown').css('display', 'none');
	if($(window).width() < 900) {
		console.log('hiding mobile bar');
		$('#barProp').toggleClass('toggleMenuSize');
		$('#barProp')[0].style.width = "0";
		$('#menu')[0].style.display = "none";
	}
}

$('#menuImg').on('click', function () { //opens/closes the menu 
	$('#barProp').toggleClass('toggleMenuSize');
	console.log('open/close');

	if($('#barProp').hasClass('toggleMenuSize')) {
		$('#barProp')[0].style.width = "0";
		$('#menu')[0].style.display = "none";
	} else {
		$('#barProp')[0].style.width = "220px";
		$('#menu')[0].style.display = "block";
	}
})

$(window).resize(function(){
	if($(window).width() >= 900) {
		$('#barProp')[0].style.width = "220px";
		$('#menu')[0].style.display = "block";
	}
})
// $('.mobileOption').on('click', function () { //automatically closes the menu upon option selection
// 	$('#barProp').toggleClass('toggleMenuSize');
// 	console.log('open/close');

// 	if($('#barProp').hasClass('toggleMenuSize')) {
// 		$('#barProp')[0].style.width = "0";
// 		$('#menu')[0].style.display = "none";
// 	} else {
// 		$('#barProp')[0].style.width = "220px";
// 		$('#menu')[0].style.display = "block";
// 	}
// })


//BROADCAST JS START
var openOverlay;
$('#msgInput').on('click', function(){ //opens overlay for messages
	$('#groupInput').removeAttr('ondrop ondragover');
	$('#msgInput').attr({ondrop:'drop(event, this)', ondragover:'allowDrop(event)'});

	if ($(window).width() <= 599) {
		$('#groupOverlay')[0].style.width = "0";
		$('#msgOverlay')[0].style.width = "270px";
	} else {
		$('#groupOverlay')[0].style.width = "0";
		$('#msgOverlay')[0].style.width = "400px";
	}
	openOverlay = 'msg';
})

$('#groupInput').on('click', function(){ //opens overlay for groups
	$('#msgInput').removeAttr('ondrop ondragover');
	$('#groupInput').attr({ondrop:'drop(event, this)', ondragover:'allowDrop(event)'});

	if ($(window).width() <= 599) {
		console.log("you can do something with this");
		$('#groupOverlay')[0].style.width = "270px";
		$('#msgOverlay')[0].style.width = "0";
	} else {
		$('#groupOverlay')[0].style.width = "400px";
		$('#msgOverlay')[0].style.width = "0";
	}

	// $('#msgOverlay')[0].style.width = "0";
	// $('#groupOverlay')[0].style.width = "400px";
	openOverlay = 'group';
})

$(window).resize(function(){ //resizes overlays when window is resized
	if ($(window).width() <= 599 && $('#msgOverlay').width() !== 0) { //resizes msg overlay
		$('#groupOverlay')[0].style.width = "0";
		$('#msgOverlay')[0].style.width = "270px";
	} else if ($(window).width() > 599 && $('#msgOverlay').width() !== 0) {
		$('#groupOverlay')[0].style.width = "0";
		$('#msgOverlay')[0].style.width = "400px";
	} else if ($(window).width() <= 599 && $('#groupOverlay').width() !== 0) { //resizes grp overlay
		$('#groupOverlay')[0].style.width = "270px";
		$('#msgOverlay')[0].style.width = "0";
	} else if ($(window).width() > 599 && $('#groupOverlay').width() !== 0) {
		$('#groupOverlay')[0].style.width = "400px";
		$('#msgOverlay')[0].style.width = "0";
	}
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
	var dontAppend = false;
	//element.parentElement.id
  event.preventDefault();
  var data = event.dataTransfer.getData("Text");
  
  if($('.broadcast')[0].classList[2] === 'active'){ //only expands message if the broadcast tab is open
	  console.log('dropping in broadcast');
	  if(element.id === 'msgInput' || element.id === 'groupInput'){ //expands message on drop
	  	console.log(element.id)
	  	if(element.id === 'groupInput' && document.getElementById(data).classList[0] === 'draggableMsg'){
	  		dontAppend = true;
	  	}else if(element.id === 'msgInput' && document.getElementById(data).classList[0] === 'draggableGrp'){
	  		dontAppend = true;
	  	}else {
	  		document.getElementById(data).classList.add('expand');
	  	}

	  }else if(element.id === 'msgOverlayWrap' || element.id === 'groupOverlayWrap'){
	  	if(element.id === 'msgOverlayWrap' && document.getElementById(data).classList[0] === 'draggableMsg') {
	  		document.getElementById(data).classList.remove('expand');
	  	}else if(element.id === 'groupOverlayWrap' && document.getElementById(data).classList[0] === 'draggableGrp') {
	  		document.getElementById(data).classList.remove('expand');
	  	}else {
	  		dontAppend = true; //prevents messages from being dragged into grp overlay and groups from being dragged into msg overlay
	  	}
	  }

	} else if($('.subscribers')[0].classList[2] === 'active'){ //checks if subs tab is open (expands card for clone button)
		console.log('dropping in subs');
		if(element.id === 'tempInp'){ //expands message on drop
			clearTimeout(timer);

	  	document.getElementById(data).style.width = "190px"; //sets card to width of temp input
	  	document.getElementById(data).style.height = "75px";


	  	$('#cloneBtn')[0].style.width = "180px";
	  	setTimeout(function(){
				$('#cloneBtn')[0].style.bottom = "120px";
	  	}, 400);
	  }else{ //checks if dragging back to trello like section
	  	document.getElementById(data).style.width = "255px"; //sets card back to original height
	  	document.getElementById(data).style.height = "80px";

	  	element.prepend(document.getElementById(data)); 

	  	if($('#tempSide')[0].style.height === "215px") {
		  	if($('#tempInp')[0].children.length < 1 && $('#clonedInp')[0].children.length < 1) { //prevents clone temp side from closing when a card is inside the cloned input or temp input
		  		clearTimeout(timer);
					$('#cloneBtn')[0].style.bottom = "85px";
					timer = setTimeout(function () {
		        $('#cloneBtn')[0].style.width = '0'; 
		  			setTimeout(function(){
							$('#tempSide')[0].style.width = "0";

							setTimeout(function() { //closes clone button if open
								closeCloneFunc();
							}, 400);
				  	}, 200);
		      }, 5000);
		  	}
		  }else{
		  	if($('#tempInp')[0].children.length < 1) { //prevents clone temp side from closing when a card is inside
		  		clearTimeout(timer);
					$('#cloneBtn')[0].style.bottom = "85px";
					timer = setTimeout(function () {
		        $('#cloneBtn')[0].style.width = '0'; 
		  			setTimeout(function(){
							$('#tempSide')[0].style.width = "0";
				  	}, 200);
		      }, 5000);
		  	}
		  }
	  }
	}

	//sends card back to overlay if there is already a message/group in the input field for broadcast tab
	if(element.id === 'msgInput' && dontAppend === false){
		if(element.children.length > 1 && document.getElementById(data) != element.children[0]){
			element.children[0].classList.remove('expand');
			$('#msgOverlayWrap').prepend(element.children[0]);
		}
	}else if(element.id === 'groupInput' && dontAppend === false){
		if(element.children.length > 1  && document.getElementById(data) != element.children[0]){
			element.children[0].classList.remove('expand');
			$('#groupOverlayWrap').prepend(element.children[0]);
		}
	}else if(element.id === 'tempInp'){
		console.log(element.children.length)
		if(element.children.length > 0  && document.getElementById(data) != element.children[0]){
			let tempInpGrpID = element.children[0].id.split('-')[0];
			let grpCol = "#grp_" + tempInpGrpID;
			console.log('hidden msg');
			element.children[0].style.width = "255px"; //sets card back to original height
	 	  element.children[0].style.height = "80px";
			$(grpCol).prepend(element.children[0])

		}
	}

  //conditional must go after all conditionals above
  if(dontAppend) {
  	return "element prevented from being appended";
  }else {
  	element.prepend(document.getElementById(data)); //adds to top of div

  	if($('.subscribers')[0].classList[2] === 'active'){
			changeSubGroup(data); //must go after the prepend (for switching subscribers)
  	}
  }
	
}

//$(document).on() allows event handlers to be attached to dynamically generated elements
$(document).on('mousedown', '.draggableMsg, .draggableGrp', function() {
	if(openOverlay === 'msg'){
	  $('#msgWarning').text("Drag Your Message Here");	
	}else if(openOverlay == 'group'){
		$('#grpWarning').text("Drag Your Group Here");
	}
});

// $('.draggableMsg').mousedown(function(){ //shows message in message input on hold
// 	if(openOverlay === 'msg'){
// 	  $('#msgWarning').text("Drag Your Message Here");	
// 	}else if(openOverlay == 'group'){
// 		$('#grpWarning').text("Drag Your Group Here");
// 	}
// })

$(document).on('mouseup', '.draggableMsg, .draggableGrp', function() {
	if(openOverlay === 'msg'){
	  $('#msgWarning').text("");	
	}else if(openOverlay == 'group'){
		$('#grpWarning').text("");
	}
});

// $('.draggableMsg').mouseup(function(){ //shows message in group input on hold
// 	if(openOverlay === 'msg'){
// 	  $('#msgWarning').text("");	
// 	}else if(openOverlay == 'group'){
// 		$('#grpWarning').text("");
// 	}
// })

$(document).on('mouseover', '.draggableMsg, .draggableGrp', function() {
	if(openOverlay === 'msg'){
	  $('#msgWarning').text("");	
	}else if(openOverlay == 'group'){
		$('#grpWarning').text("");
	}
});

// $('.draggableMsg').mouseover(function(){ //shows message in group input on hold
// 	if(openOverlay === 'msg'){
// 	  $('#msgWarning').text("");	
// 	}else if(openOverlay == 'group'){
// 		$('#grpWarning').text("");
// 	}
// })
//BROADCAST JS END



//GROUPS JS START
/*$('.customBox span').click(function(){ //checks off boxes
  if($(this).hasClass('isChecked')){
  	$(this).removeClass('isChecked');
  }else{
  	$(this).addClass('isChecked');
  }
});*/

function enableDelete() {
	//console.log($('#grpTable tbody').find('.isCheckedBackground').length);
	if($('#grpTable tbody').find('.isCheckedBackground').length !== 0) {
		$('#trashGrp').attr("onclick", "deleteSelectedGroups();");
		$('#trashGrp')[0].style.opacity = "1";
	}else {
		$('#trashGrp').removeAttr("onclick");
		$('#trashGrp')[0].style.opacity = "0.5";
	}
}

function highlightTopic(selected) {
	let checkBox = selected.firstElementChild.firstElementChild;
	$(checkBox).toggleClass('isChecked');
	$(selected).toggleClass('isCheckedBackground');

	enableDelete();
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

  enableDelete();

})

$('#reloadGrp').click(function(){ //runs refresh button animation
	console.log('grp reload');
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

$('#closePopup').click(function(){ //closes "create group" popup
	$('#addPopup')[0].style.display = "none";
  $('#groupText').val('');
  $('#validNameWarning')[0].innerText = '';
})

var groupIDs = [];
function deleteSelectedGroups(){ //for trash popup
  $('#selectedGroups').empty(); //empties out previously selected groups
  groupIDs = []; //resets groups to delete queue

  let checkedElements = $('#grpTable tbody tr').filter('.isCheckedBackground');
  console.log(checkedElements);
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
  $('#addPopup')[0].style.display = "none"; //closes "add group" popup if open
}

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
$('#subsTab').click(function() {
	console.log('i been click');
	$('#subsTab')[0].style.backgroundColor = '#EAEAEA'; //could condense using css jquery property
	$('#grpTab')[0].style.backgroundColor = '#fcd8b6';
	$('#subsTab')[0].style.position = 'relative';
	$('#grpTab')[0].style.position = '';

	$('#subsTab')[0].style.zIndex = '2';

	$('#openSub')[0].style.display = 'block';
	$('#openGrp')[0].style.display = 'none';

	$('#subsIconRow')[0].style.left = '317px';

	$('#searchBoxSub')[0].style.width = "0px"; //closes search field if open
	$('#searchInputSub').val(''); //empties values of search field
	subSearch();

	$('#saveSub')[0].style.left = "-40px";
	$('#saveSub')[0].style.top = "0px";

	$('#grpTab').removeClass('groupTabOpen');
})

let showSave = false;
$('#grpTab').click(function() {
	console.log('group tab been click');
	$('#subsTab')[0].style.backgroundColor = '#fcd8b6';
	$('#grpTab')[0].style.backgroundColor = 'white';
	$('#grpTab')[0].style.position = 'relative';
	$('#subsTab')[0].style.zIndex = '1';

	$('#openSub')[0].style.display = 'none';
	$('#openGrp')[0].style.display = 'block';

	$('#subsIconRow')[0].style.left = '203px';

	$('#addSubPop')[0].style.display = "none";
	$('#delSubPop')[0].style.display = "none";

	$('#searchBoxSub')[0].style.width = "0px"; //closes search field if open
	$('#searchInputSub').val(''); //empties values of search field
	subGrpSearch();

	if(showSave){ //shows save icon AFTER moving a user
		$('#saveSub')[0].style.left = "0px";
		$('#saveSub')[0].style.top = "65px";
	}

	$('#grpTab').addClass('groupTabOpen');
})

$(window).resize(function() { //returns user to subscription managing page if on grp drag/drop
	if ($(window).width() <= 1229) {
		console.log('setting to subscriptions');
		$('#subsTab')[0].style.backgroundColor = '#EAEAEA'; //could condense using css jquery property
		$('#grpTab')[0].style.backgroundColor = '#fcd8b6';
		$('#subsTab')[0].style.position = 'relative';
		$('#grpTab')[0].style.position = '';

		$('#subsTab')[0].style.zIndex = '2';

		$('#openSub')[0].style.display = 'block';
		$('#openGrp')[0].style.display = 'none';

		$('#subsIconRow')[0].style.left = '317px';

		$('#searchBoxSub')[0].style.width = "0px"; //closes search field if open
		$('#searchInputSub').val(''); //empties values of search field
		subSearch();

		$('#saveSub')[0].style.left = "-40px";
		$('#saveSub')[0].style.top = "0px";

		$('#grpTab').removeClass('groupTabOpen');
	}
});

$('#reloadSub').click(function(){ //runs refresh button animation for subs tab
	if($('#reloadSub img')[0].style.animationName == "reload"){
		$('#reloadSub img')[0].style.animationName = "resetReload";
	}else{
		$('#reloadSub img')[0].style.animationName = "reload"
		$('#reloadSub img')[0].style.animationPlayState = "running";
	}
})

$('#addSub').click(function() {
	$('#addSubPop')[0].style.display = "block";
	$('#delSubPop')[0].style.display = "none";
})

let subIDs = [];
function deleteSelectedSubs() {
  let checkedElements = $('#subsTable tbody tr').filter('.isCheckedBackground'); //filter grabs elements only with that class
  $('#selectedSubs').empty();
  subIDs = [];


  checkedElements.map((currVal, index) => {
  	let insertSubName = $(index).find('.subName')[0].innerText;
  	let insertSubContact = $(index).find('.subContact')[0].innerText;

  	subIDs.push(+$(index).attr('id'));

  	$('#selectedSubs').append(`
			<tr id="selectedSubText">
				<td>${insertSubName}</td>
				<td><span style="font-weight: bold"> Contact:</span>&nbsp; ${insertSubContact}</td>
			</tr>
  	`)
  })

	$('#delSubPop')[0].style.display = "block";
	$('#addSubPop')[0].style.display = "none";
}

$('#closeAddSub').click(function() {
	$('#addSubPop')[0].style.display = "none";
})

$('#closeDelSub').click(function() {
	$('#delSubPop')[0].style.display = "none";
})

$('#deleteSub').click(function(){
	$('#delSubPop')[0].style.display = "none";
  deleteSubs(subIDs);
})


function enableDeleteSubs() {
	//console.log($('#grpTable tbody').find('.isCheckedBackground').length);
	if($('#subsTable tbody').find('.isCheckedBackground').length !== 0) {
		$('#trashSub').attr("onclick", "deleteSelectedSubs();");
		$('#trashSub')[0].style.opacity = "1";
	}else {
		$('#trashSub').removeAttr("onclick");
		$('#trashSub')[0].style.opacity = "0.5";
	}
}

function highlightSub(selected) {
	let checkBox = selected.firstElementChild.firstElementChild;
	$(checkBox).toggleClass('isChecked');
	$(selected).toggleClass('isCheckedBackground');

	enableDeleteSubs();
}

$('#checkAllSubs').click(function(){ //checks all boxes on/off
	if($(this).hasClass('isChecked')){
		$(this).removeClass('isChecked');
		$('.customCheckSub').map((currVal, index) => {
			let selectedRow = index.parentElement.parentElement;
			$(index).removeClass('isChecked');
			$(selectedRow).removeClass('isCheckedBackground');
		});
	}else{
		$(this).addClass('isChecked');
		$('.customCheckSub').map((currVal, index) => {
			let selectedRow = index.parentElement.parentElement;
			$(index).addClass('isChecked');
			$(selectedRow).addClass('isCheckedBackground');
		});
	}

	enableDeleteSubs();
})

$('#textCircle').click(function() {
	$('#emailCircle')[0].style.backgroundColor = "#fcd8b6";
	$('#emailCircle').empty();
	$('#emailCircle').removeClass('isChecked');
	$('#emailProtText')[0].style.color = "gray";

	$(this).addClass('isChecked');
	$('#textCircle').empty();
	$('#textCircle').append(`<div class="innerCircle"></div>`);
	$('#textProtText')[0].style.color = "black";
	$('#contactTitle')[0].innerText = "Phone Number (With International Call Prefix):";
	$('#contactInfo').attr("placeholder", "Ex. 18081234567");
})

$('#emailCircle').click(function() {
	$('#textCircle')[0].style.backgroundColor = "#fcd8b6";
	$('#textCircle').empty();
	$('#textCircle').removeClass('isChecked');
	$('#textProtText')[0].style.color = "gray";

	$(this).addClass('isChecked');
	$('#emailCircle').empty();
	$('#emailCircle').append(`<div class="innerCircle"></div>`);
	$('#emailProtText')[0].style.color = "black";
	$('#contactTitle')[0].innerText = "Email Address:";
	$('#contactInfo').attr("placeholder", "Ex. lanakila@gmail.com");
})

$('#searchSub').click(function(){
	if($('#grpTab').hasClass('groupTabOpen')) {
		$('#searchInputSub').attr({
		  onkeyup: "subGrpSearch();",
		  placeholder: " Filter groups..."
		})
	}else {
		$('#searchInputSub').attr({
		  onkeyup: "subSearch();",
		  placeholder: " Search for subs..."
		})
	}

	if($('#searchBoxSub')[0].style.width === "130px") {
		$('#searchInputSub').val('');
		subSearch(); //needs to run grpSearch() again to reset values
		$('#searchBoxSub')[0].style.width = "0px";
	}else {
		$('#searchBoxSub')[0].style.width = "130px";
	}
})

//adapted from: https://www.w3schools.com/howto/howto_js_filter_lists.asp
function subSearch() { //filters group on search
  var input, filter, tbody, trow, searchName;
  input = $("#searchInputSub");
  filter = input.val().toUpperCase();
  tbody = $("#subsTable tbody");
  trow = $("#subsTable tbody tr");
  for (var i = 0; i < trow.length; i++) {
    searchName = trow[i].getElementsByClassName("subName")[0];
    if (searchName.innerHTML.toUpperCase().indexOf(filter) > -1) {
      trow[i].style.display = "";
    } else {
      trow[i].style.display = "none";
    }
  }
}

function subGrpSearch() { //filters group on search
  var input, filter, container, column, searchGrpName;
  input = $("#searchInputSub");
  filter = input.val().toUpperCase();
  container = $("#openGrp");
  column = $(".colGroup");
  for (var i = 0; i < column.length; i++) {
    searchGrpName = column[i].getElementsByClassName("colTitleSpan")[0];
    if (searchGrpName.innerHTML.toUpperCase().indexOf(filter) > -1) {
      column[i].style.display = "";
    } else {
      column[i].style.display = "none";
    }
  }
}

var changedSubs = [];
function changeSubGroup(id) {
	//first two digits of a sub's id is their original group id
	//the last two digits is their sub id
	let element = document.getElementById(id);
	//console.log(id.split('-'))
	
	/*

	// NEED TO FIX SLICE, IF ID IS ONLY ONE DIGIT IT WILL BE GRABBING A NUMBER AND LETTER
	// to fix issue above, you can add a zero in front of the id number when appending (requests.js), this will ensure it will always grab either 01 or 11
	let personID = element.id.slice(-2); //grabs last two digits of id
	let ogGrpID = element.id.substring(0, 2); //grabs first two digits of id
	let newGrpID = element.parentElement.id.slice(-2); //grabs new group's id
	//console.log(personID, ogGrpID, newGrpID);

	*/

	//should fix issue with id's over two digits
	let personID = element.id.split('-')[1]; //grabs last two digits of id
	let ogGrpID = element.id.split('-')[0]; //grabs first two digits of id
	let newGrpID = element.parentElement.id.slice(-2); //grabs new group's id

	let newObj = {};
	newObj.oldGroup_id = ogGrpID;
	newObj.sub_id = personID;
	newObj.newGroup_id = newGrpID;
	newObj.subInfo = [];

	let jQueryID = "#" + id;
	newObj.subInfo.push($(jQueryID).find('.targetSubName')[0].innerText);
	newObj.subInfo.push($(jQueryID).find('.targetSubContact')[0].innerText);
	newObj.subInfo.push($(jQueryID).find('.subEndpoint')[0].innerText);
	//console.log(newObj)
	
	if(ogGrpID === newGrpID) { //removes data from queue
		for(var i = 0; i < changedSubs.length; i++){
			if(changedSubs[i].oldGroup_id === ogGrpID && changedSubs[i].sub_id === personID){
				changedSubs.splice(i, 1);
			}
		}
	}else { //adds user to subscribe queue
		for(var i = 0; i < changedSubs.length; i++){ //removes other of the same iems from the queue
			if(changedSubs[i].oldGroup_id === ogGrpID && changedSubs[i].sub_id === personID){
				changedSubs.splice(i, 1);
			}
		}

		changedSubs.push(newObj);
	}
	console.log(changedSubs);


	if(changedSubs.length > 0) {
		showSave = true; //show saves indicates whether to show save icon when switching from "Groups" to "All Subscribers" tab
		$('#saveSub')[0].style.left = "0px";
		$('#saveSub')[0].style.top = "65px";	
	}else {
		showSave = false;
		$('#saveSub')[0].style.left = "-40px";
		$('#saveSub')[0].style.top = "0px";
	}
}

$('#saveSub').click(function() { //saves changes to subscribers who switched groups
  for (var i = 0; i < changedSubs.length; i++) { //algorithm to filter out cloned cards to prevent errors
  	if(changedSubs.length > 1) {
	    for (var j = i + 1; j < changedSubs.length; j++) {
	      if (changedSubs[i].sub_id === changedSubs[j].sub_id) {
	      	// console.log(changedSubs[i]);
	      	// console.log(changedSubs[j]);
		    	if(changedSubs[i].oldGroup_id === "00" || +changedSubs[i].oldGroup_id === 0) {
		    		if(changedSubs[i].newGroup_id === changedSubs[j].oldGroup_id) {
		    			changedSubs[i].newGroup_id = changedSubs[j].newGroup_id;

		    			let index = changedSubs.indexOf(changedSubs[j]);
	    				changedSubs.splice(index, 1);
	    				console.log(changedSubs);

	    				changeGrpSubs(changedSubs);
		    		}else {
			    		changeGrpSubs(changedSubs);
			    	}
		    	}else if(changedSubs[j].oldGroup_id === "00" || +changedSubs[j].oldGroup_id === 0) {
		    		if(changedSubs[j].newGroup_id === changedSubs[i].oldGroup_id) {
		    			changedSubs[j].newGroup_id = changedSubs[i].newGroup_id;

		    			let index = changedSubs.indexOf(changedSubs[i]);
	    				changedSubs.splice(index, 1);
	    				console.log(changedSubs);

	    				changeGrpSubs(changedSubs);
		    		}else {
			    		changeGrpSubs(changedSubs);
			    	}
		    	}else {
		    		changeGrpSubs(changedSubs);
		    	}
	      }else {
		    	changeGrpSubs(changedSubs);
		    }
	    }
	  }else {
    	changeGrpSubs(changedSubs);
    }
 	}


	changedSubs = []; //resets sub queue
	showSave = false; //hides save icon
	$('#saveSub')[0].style.left = "-40px";
	$('#saveSub')[0].style.top = "0px";
})

var idZeros = "00";
let clonedSubIds = [];
$('#cloneBtn').click(function() {
	//console.log($('#tempInp')[0].children[0]);
	let tempChild = $('#tempInp')[0].children[0];
	let clonedEl = $(tempChild).clone()[0];
	//console.log(clonedEl);
	let idOfSub = clonedEl.id.split('-')[1];

	if(clonedEl.id.split('-')[0].length > 2 || clonedEl.id.split('-')[0] === "00") {
		clonedEl.id = clonedEl.id.split('-')[0] + "0-" + idOfSub;
		clonedSubIds.push(idOfSub);
		idZeros = idZeros + "0";
		console.log(idZeros);
	}else {
		console.log(clonedSubIds)
		if(clonedSubIds.includes(idOfSub)) {
			clonedEl.id = idZeros + "0-" + idOfSub;
			clonedSubIds.push(idOfSub);
			idZeros = idZeros + "0";
		}else {
		console.log("conditional running")
			clonedEl.id = "00-" + idOfSub;
			clonedSubIds.push(idOfSub);
		}
	}
	//console.log(clonedEl.id)

	$('#tempSide')[0].style.height = "215px";
	$('#tempSide').append(`<div id="clonedInp"></div>`)
	$('#clonedInp').append(clonedEl);

	$('#tempTitle').empty();
	$('#tempTitle').append(`<span id="closeClone">Close Clone</span>`);
})

function closeCloneFunc() {
	$('#tempSide')[0].style.height = "120px";

	$('#tempSide').children().last().fadeOut(200); //removes cloned card
	setTimeout(function(){
		$('#tempSide').children().last().remove();
	}, 200);

	$('#tempTitle').empty();
	$('#tempTitle').append(`<span id="delSubCard">Delete</span> | Hold`);
}

$(document).on('click', '#closeClone', function() {
	closeCloneFunc();
})

$(document).on("mouseover", '#delSubCard', function() {
	$('#tempSide')[0].style.backgroundColor = "red";
	$('#delSubCard')[0].style.color = "white";
})

$(document).on("mouseout", '#delSubCard', function() {
	$('#tempSide')[0].style.backgroundColor = "#F58F31";
	$('#delSubCard')[0].style.color = "black";
})

$(document).on("click", '#delSubCard', function() {
	$('#tempInp').empty();
})
//SUBSCRIBERS JS END



//MESSAGES JS START

function enableDeleteMsgs() {
	//console.log($('#grpTable tbody').find('.isCheckedBackground').length);
	if($('#msgCol').find('.isCheckedBackground').length !== 0) {
		$('#trashMsg')[0].style.opacity = "1";
	}else {
		$('#trashMsg').removeAttr("onclick");
		$('#trashMsg')[0].style.opacity = "0.5";
	}
}

function checkMsg(msgCheck) {
	$(msgCheck).find('.msgCheck').toggleClass('checked');
	//$(msgCheck).toggleClass('checked');
	$(msgCheck).toggleClass('msgReady');
	//console.log('checkkkk');
	let checkBox = msgCheck.firstElementChild.firstElementChild;
	$(msgCheck).toggleClass('isCheckedBackground');
	enableDeleteMsgs();

}

// function enableDeleteMsgs() {
// 	//console.log($('#grpTable tbody').find('.isCheckedBackground').length);
// 	if($('#msgCol').find('.msgReady').length !== 0) {
// 		$('#trashMsg').attr("onclick", "deleteSelectedMsgs();");
// 		$('#trashMsg')[0].style.opacity = "1";
// 	}else {
// 		$('#trashMsg').removeAttr("onclick");
// 		$('#trashMsg')[0].style.opacity = "0.5";
// 	}
// }

$('#addMsg').click(function(){
	$('#addMsgPopup')[0].style.display = "block";
	$('#deleteMsgPopup')[0].style.display = "none"; //closes delete popup if open
})
$('#newMsg').click(function(){
	$('#addMsgPopup')[0].style.display = "block";
	$('#msgOverlay')[0].style.width = "0px";
})
// $('#createMsg').click(function(){
// 	let insertText = $('#typeMsg').val()
	
// 	//get today's date
// 	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// 	let today = new Date();
// 	let dd = today.getDate();
// 	let mm = today.getMonth();
// 	let yyyy = today.getFullYear();

// 	if(dd<10) { //adds 0 to single digit dates
// 		dd = '0' + dd;
// 	}

// 	let date = monthNames[mm] + ' ' + dd + ', ' + yyyy;

// 	//add message to left column
// 	$('#msgCol').prepend(`
// 		<div class="msgGradient">
// 			<div class="msgAndDate">
// 				<p class="message">${insertText}</p>
// 				<span class="date">${date}</span>
// 			</div>
// 			<div class="modeContainer">
// 				<div class="msgCheck"></div>
// 				<button class="msgEdit"><img src="./images/edit.png"></button>
// 			</div>
// 		</div>
// 	`);
// 	$('#addMsgPopup')[0].style.display = "none";
// 	$('#typeMsg').val('');
// });

$('#closeMsgPopup').click(function(){
	$('#addMsgWarning')[0].innerText = "";
	$('#addMsgPopup')[0].style.display = "none";
	$('#typeMsg').val('');
})

var msgIDs = [];
$('#trashMsg').click(function(){
	if($('#msgCol').find('.isCheckedBackground').length !== 0) {
		$('#selectedMessages').empty(); //empties out previously selected groups
		msgIDs = []; //resets groups to delete queue

		let checkedElements = $('#oldMsgContainer #msgCol .msgGradient').filter('.msgReady');
		//console.log(checkedElements);
		checkedElements.map((currVal, index) => {
			let insertMsg = $(index).find('.message')[0].innerText;
			let insertMsgDate = $(index).find('.date')[0].innerText;

			msgIDs.push(+$(index).attr('id').slice(-4)); //needs to be converted to number (unary operator)

	  	$('#selectedMessages').append(`
				<tr id="selectedMsgText">
					<td>${insertMsg}</td>
					<td><span style="font-weight: bold"> Created On:</span>&nbsp; ${insertMsgDate}</td>
				</tr>
	  	`)
		}); //end of checkedElements.map
		//displays popup
		$('#addMsgPopup')[0].style.display = "none";
		$('#deleteMsgPopup')[0].style.display = "block";
		$('#editMsgPopup')[0].style.display = "none";
	}
})

$('#deleteMessage').click(function(){
	$('.msgReady').replaceWith('');
	deleteMessage(msgIDs);

	$('#deleteMsgPopup')[0].style.display = "none";
})

$('#closeMsgDelPopup').click(function(){
	$('#deleteMsgPopup')[0].style.display = "none";
})

var currentEdit;
var oldMsgText; //passed in to update lambda
var editedMsgID;
function editMsgText(currMsgEdit){
	currentEdit = $(currMsgEdit).parent().parent();
	editedMsgID = currentEdit[0].id.slice(-5);
	let insertText = currentEdit.find('.msgAndDate').find('.message').text();
	oldMsgText = insertText;
	console.log(insertText);
	$('#editMsgHere').replaceWith(`
		<textarea rows="10" id="editMsgHere" placeholder="Your original message has been deleted. If unintentional, exit now.">${insertText}</textarea>
	`);

	//adds id to message being edited so it can be accessed later
	currentEdit.find('.msgAndDate').find('.message').attr('id', 'editingOn'); //when edit is saved, text of id is changed, id is removed

	$('#editMsgPopup')[0].style.display = "block";
	$('#addMsgPopup')[0].style.display = "none";
	$('#deleteMsgPopup')[0].style.display = "none"; 
}

$('#saveMessage').click(function(){
	let newMsgText = $('#editMsgHere').val();
	if (!(newMsgText.length === 0 || allMessages.includes(newMsgText)&&newMsgText!==oldMsgText)) {
		let insertText = $('#editMsgHere').val();
		$('#editingOn').replaceWith(`
			<p class="message">${insertText}</p>
		`);
			$('#editMsgPopup')[0].style.display = "none";
		}
	})

	$('#closeMsgEditPopup').click(function(){
		$('#editMsgPopup')[0].style.display = "none";
	})

	$('#reloadMsg').click(function(){ //runs refresh button animation for subs tab
		if($('#reloadMsg img')[0].style.animationName == "reload"){
			$('#reloadMsg img')[0].style.animationName = "resetReload";
		}else{
			$('#reloadMsg img')[0].style.animationName = "reload"
			$('#reloadMsg img')[0].style.animationPlayState = "running";
		}
})


$('#searchMsg').click(function(){//SEARCH MESSAGE
	if($('#msgSearchBox')[0].style.width === "150px"){
		$('#msgSearchInput').val('');
		msgSearch(); //needs to run grpSearch() again to reset values
		$('#msgSearchBox')[0].style.width = "0px";
		console.log('closing');
	}else {
		$('#msgSearchBox')[0].style.width = "150px";
	}
})

//adapted from: https://www.w3schools.com/howto/howto_js_filter_lists.asp
function msgSearch() { //filters group on search
  var input, filter, msgInstance, searchName;
  input = $("#msgSearchInput");
  filter = input.val().toUpperCase();
  msgInstance = $('.msgGradient');
  for (var i = 0; i < msgInstance.length; i++) {
    searchName = msgInstance[i].getElementsByClassName("message")[0];
    if (searchName.innerHTML.toUpperCase().indexOf(filter) > -1) {
      msgInstance[i].style.display = "";
    } else {
      msgInstance[i].style.display = "none";
    }
  }
}
//MESSAGES JS END




//QUICK SEND JS START

//switch between message type and message
$('.tab').on('click', function () {
	console.log(this);
	if ($(this).attr('id') == 'qsTypeTab'){
		// $('#msgTypePanel')[0].addClass('activePanel');
		// $('#msgPanel')[0].removeClass('activePanel');

		$('#msgTypePanel')[0].style.display = 'block';
		$('#msgPanel')[0].style.display = 'none';
	} else{
		// $('#msgPanel')[0].addClass('activePanel');
		// $('#msgTypePanel')[0].removeClass('activePanel');
		$('#msgPanel')[0].style.display = 'block';
		$('#msgTypePanel')[0].style.display = 'none';
	}
	$('#qsTypeTab').toggleClass('activePanel');
	$('#qsMessageTab').toggleClass('activePanel');
})

$('.msgType').on('click', function () {
	$('#msgPanel')[0].style.display = 'block';
	$('#msgTypePanel')[0].style.display = 'none';
})

var currentType;
var currentPanel = "type";

$(window).resize(function(){
    if ($(window).width()>=800){
    	$("#msgPanel").css("display","block")
		$("#msgTypePanel").css("display","block")
		$("#qsBack").css("display","none")

		$("#typeTitle").css("display","block")
		$("#qsmsgTitle").css("display","block")
    }
    else{
	    if (currentPanel=="type"){
	    	$("#msgPanel").css("display","none")
			$("#msgTypePanel").css("display","block")
			$("#qsBack").css("display","none")

			$("#typeTitle").css("display","block")
			$("#qsmsgTitle").css("display","none")
	    }
	    else if (currentPanel=="message"){
	    	$("#msgPanel").css("display","block")
			$("#msgTypePanel").css("display","none")
			$("#qsBack").css("display","block")

			$("#typeTitle").css("display","none")
			$("#qsmsgTitle").css("display","block")
	    }
    }

});
$('#qsBack').on('click', function () {
	console.log("bacl")
	currentPanel = "type"
	$("#msgPanel").css("display","none")
	$("#msgTypePanel").css("display","block")
	$("#typeTitle").css("display","block")
	$("#qsmsgTitle").css("display","none")
	$("#qsBack").css("display","none")
})

function switchType(el){
	if ($(window).width()<=799){
		currentPanel = "message"
		console.log("slide")
		$("#msgPanel").css("display","block")
		$("#qsmsgTitle").css("display","block")
		$("#msgTypePanel").css("display","none")
		$("#typeTitle").css("display","none")
		$("#qsBack").css("display","block")

	}

	currentType=el;
	console.log(currentType)
	for (var i = 0; i < document.getElementsByClassName('msgType').length; i++) {
		document.getElementsByClassName('msgType')[i].style.backgroundColor=document.getElementsByClassName('msgType')[i].style.borderColor;
		//document.getElementsByClassName('msgType')[i].style.color="white";
		//document.getElementsByClassName('msgType')[i].style="border-color: #F58F31;";
	}
	document.getElementById(el).style.backgroundColor="white";
	//document.getElementById(el).style.color="#F58F31";
	//document.getElementById(el).style.borderColor= "#F58F31";
	console.log(qsTypeData)
	console.log(qsTypeData[el] + el)
	document.getElementById('typeHeader').innerHTML=qsTypeData[el];
	for (var i = 0; i < document.getElementsByClassName('msgPre').length; i++) {
		document.getElementsByClassName('msgPre')[i].style.display="none";
	}
	document.getElementById(currentType+"-msg").style.display="block";
	document.getElementById('editBox').style.display="none";
	document.getElementById('edit-saveMsg').src='./images/edit.png';
	document.getElementById('editButton').style.display="flex";

	document.getElementById('editBox').style.display="none";
	document.getElementById('edit-saveMsg').src='./images/edit.png';
	document.getElementById('editButton').style.display="flex";

	document.getElementById("typeHeader").style.display="inline-block";
	document.getElementById('edit-saveType').src='./images/edit.png'
	document.getElementById('edit-saveType').style.display="inline-block"
	if (tempId!==null) {
		document.getElementById('editBox').value = tempId;
	}
	document.getElementById('editTypeBox').style.display="none";
	document.getElementById('note').style.display="none"
	typeEditing=false;
	editing=false;
}

var editing = false;
var oldContent;
var qsid;
var newContent = {};
function convertText(){
	var string = document.getElementById(currentType+"-msg").innerHTML;
	console.log("converting this: "+string)
	var newString = string;
	var pattern = /placeholder="[^"]*"/g;
	newString = newString.replace("<p>","");
	newString = newString.replace("</p>","");
	var current;
	while(current = pattern.exec(string)){
	  var rep = current[0].substring(13, current[0].length-1)
	   console.log(rep)
	   newString = newString.replace('<input type="textbox" placeholder="'+rep+'">',"{"+rep+"}");
	}
	temp=string
	return newString;
}
function editMsg(){
	if (editing == false){
		editing=true;
		//console.log(currentType+"-msg")
		document.getElementById(currentType+"-msg").style.display="none";
		document.getElementById('editBox').style.display="block";
		document.getElementById("editBox").value = convertText();
		document.getElementById('edit-saveMsg').src='./images/save.png'
		document.getElementById('edit-saveType').style.display="none";
		document.getElementById('note').style.display="block";
	}
	else{
		editing=false;
		oldContent= currentType;
		console.log(qsTypeData)
		console.log("current Type: "+currentType)
		console.log(qsTypeData[currentType])
		document.getElementById(currentType+"-msg").style.display="block";
		document.getElementById('editBox').style.display="none";
	    var htmlText = document.getElementById("editBox").value;
	    var regex = /{\s*(.*?)\s*}/g;
		while (m = regex.exec(htmlText)) {
			htmlText = htmlText.replace("{"+m[1]+"}",'<input type="textbox" placeholder="'+m[1]+'">');
		}
		document.getElementById(currentType+"-msg").innerHTML = "<p>"+htmlText+"</p>";
		document.getElementById('edit-saveMsg').src='./images/edit.png';
		document.getElementById('edit-saveType').style.display="inline-block";
		document.getElementById('note').style.display="none";
		newContent.type = qsTypeData[currentType]
		newContent.text =convertText();
		editQS();
	}
}
var typeEditing =false;
var tempId=null;
function editType(){
	if(typeEditing==false){
		typeEditing=true;
		document.getElementById("typeHeader").style.display="none";
		document.getElementById('editTypeBox').value = qsTypeData[currentType];
		tempId=currentType;
		document.getElementById('editTypeBox').style.display="inline-block";
		document.getElementById('edit-saveType').src='./images/save.png'
		document.getElementById('editButton').style.display="none";
	}
	else{
		typeEditing=false;
		oldContent = currentType;
		qsTypeData[currentType]=document.getElementById('editTypeBox').value;
		newContent.type = qsTypeData[currentType];
		newContent.text = convertText();
		document.getElementById(currentType).innerHTML = "<h3>"+document.getElementById('editTypeBox').value+"</h3>"
		document.getElementById(currentType).style.display="block";
		document.getElementById("typeHeader").innerHTML = document.getElementById('editTypeBox').value
		document.getElementById("typeHeader").style.display="inline-block";
		document.getElementById('editTypeBox').style.display="none";
		document.getElementById('edit-saveType').src='./images/edit.png'
		document.getElementById('editButton').style.display="inline-block";
		editQS();
	}
}
//QUICK SEND JS END



//TOOLBAR JS START

$('.dropIcon').on('click', function(){
	let dropdown = $(this).parent().find('.dropdown');
	dropdown.toggleClass('activeDots');
	if (dropdown.hasClass('activeDots') === true) {
		dropdown.css('display', 'flex');
		// dropdown.show()
		// removed show and hide because it 'shows' as block instead of flex
	} else {
		dropdown.css('display', 'none');
		// dropdown.hide()
	}
	console.log('clicking dots');
})

$(window).resize(function(){
	if ($(window).width() >= 900) {
		$('.dropdown').show();
		console.log('afdf');
	}
});

//TOOLBAR JS END


//MESSAGES TAB AFTER START
// this makes sure the width of the popups are the same as the container
$('.afterBtn').on('click', function(){
	let correctWidth = $('.visisble').width();
	$('.msgAfter').width(correctWidth);
})

$(window).resize(function(){
	let correctWidth = $('.visisble').width();
	$('.msgAfter').width(correctWidth);
});
//MESSAGES TAB AFTER END


//SEARCH BAR JS START
let searchIds = [];

$('.searchAll').on('click', function(){
	console.log(this.id);
	searchIds.push(this.id);
	console.log(searchIds);
	$('#mobileSearchInput').focus();
})

function mobileSearch(html) { //may need to fix the event listener for mobile
	let target = searchIds[searchIds.length - 1];
	console.log('accessing ' + target + ' statements');
	if (target == 'searchGrp') {
		var input, filter, tbody, trow, searchName;
		input = $("#mobileSearchInput");
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
	} else if (target == 'searchSub') {
		var input, filter, tbody, trow, searchName;
		input = $("#mobileSearchInput");
		filter = input.val().toUpperCase();
		tbody = $("#subsTable tbody");
		trow = $("#subsTable tbody tr");
		for (var i = 0; i < trow.length; i++) {
			searchName = trow[i].getElementsByClassName("subName")[0];
			if (searchName.innerHTML.toUpperCase().indexOf(filter) > -1) {
				trow[i].style.display = "";
			} else {
				trow[i].style.display = "none";
			}
  		}
	} else if (target == 'searchMsg') {
		var input, filter, msgInstance, searchName;
		input = $("#mobileSearchInput");
		filter = input.val().toUpperCase();
		msgInstance = $('.msgGradient');
		for (var i = 0; i < msgInstance.length; i++) {
			searchName = msgInstance[i].getElementsByClassName("message")[0];
			if (searchName.innerHTML.toUpperCase().indexOf(filter) > -1) {
				msgInstance[i].style.display = "";
			} else {
				msgInstance[i].style.display = "none";
			}
		}
	}
}


$('.searchAll').click(function(){//SEARCH MESSAGE
	if ($(window).width() <= 899) {
		
		if($('#mobileSearch').height() != 0){
			$('#mobileSearchInput').val('');
			$('#mobileSearch')[0].style.height = "0px";
			mobileSearch(this); //needs to run mobileSearch() again to reset values
			console.log('closing');
		}else {
			console.log('open mobile search');
			$('#mobileSearch')[0].style.height = "45px";
		}
	}
})

$(window).resize(function(){
	if ($(window).width() >= 900){
		$('#mobileSearchInput').val('');
		$('#mobileSearch')[0].style.height = "0px";
	}
	mobileSearch(this);

})

$('#closeMobileSearch').on('click', function(){
	$('#mobileSearchInput').val('');
	$('#mobileSearch')[0].style.height = "0px";
	mobileSearch(this);
})
//SEARCH BAR JS END

// WORKSPACE INTEGRATION JS
$(document).ready(function() {
	if ($(window).width() >= 900) {
		$('#barProp').addClass('sideBar')
	} else {
		$('#barProp').addClass('menuOverlay')
	}
})

$(window).resize(function(){
	if ($(window).width() >= 900) {
		$('#barProp').addClass('sideBar');
		$('#barProp').removeClass('menuOverlay');
	} else {
		$('#barProp').addClass('menuOverlay');
		$('#barProp').removeClass('sideBar');
	}
})
// WORKSPACE INTEGRATION JS END