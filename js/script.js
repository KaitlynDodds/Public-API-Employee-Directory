
let employees = {};
let lightboxTargetCard = null;

/** AJAX GET Employee Data 
****************************/ 
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: (data) => {
  	handleEmployeeData(data);
  }
});

function handleEmployeeData(data) {
	// isolate employee data
	employees = (data.results);

	buildDirectoryUI(employees);
}

/** Build UI Functions
****************************/

/* handle employee data and add directory UI to page */
function buildDirectoryUI(employees) {

	// build card for each employee 
	const cards = employees.map(employee => {
		// build card div for employee
		const card = createACard(employee);
		
		// add reference to card div to employee data 
		employee['card'] = card;

		return card;
	});

	// add individual cards to UI 
	cards.forEach(card => card.appendTo('.directory'));
}

/* Populate lightbox with employee data */
function buildLightBox(employeeData) {
	$('.lightbox .avatar').attr('src', employeeData.picture.large);
	$('.lightbox .username').text(`${employeeData.login.username}`);
	$('.lightbox .name').text(`${employeeData.name.first} ${employeeData.name.last}`);
	$('.lightbox .email').text(`${employeeData.email}`);
	$('.lightbox .city').text(`${employeeData.location.city}`);
	$('.lightbox .phone').text(`${employeeData.cell}`);
	$('.lightbox .address').text(getFormattedAddress(employeeData));
	$('.lightbox .dob').text(`Birthday: ${getFormattedDate(new Date(employeeData.dob))}`);

	$('.lightbox').css('display', 'block');
}


/** Event Handlers
*********************/

// user closes lightbox 
$('.lightbox .close').on('click', handleLightboxClose);

// user clicks employee card 
$('body').on('click', '.directory .card', handleUserCardClick);

$('.search input').on('input', handleSearchInput);

$('.lightbox .back').on('click', handleLightBoxBack);

$('.lightbox .forward').on('click', handleLightBoxForward);

function handleLightBoxBack(e) {
	// find card of currently viewed employee 
	const targetCard = lightboxTargetCard;

	// find previous sibling of currently viewed employee
	let prevCard = $(targetCard).prev('.card');
	// select from only visible cards 
	while (prevCard.hasClass('hidden')) {
		prevCard = prevCard.prev('.card');	
	}

	// find corresponding employee data 
	let employeeData = findEmployee(prevCard.find('.name').text(), prevCard.find('.email').text());

	// no 'previous' card
	if (employeeData === undefined) return;
	// update lightbox target card
	lightboxTargetCard = prevCard;
	// build new lightbox 
	buildLightBox(employeeData);
}

function handleLightBoxForward(e) {
	// find card of currently viewed employee 
	const targetCard = lightboxTargetCard;

	// find next sibling of currently viewed employee 
	let nextCard = $(targetCard).next('.card');
	// select from only visible cards 
	while (nextCard.hasClass('hidden')) {
		nextCard = nextCard.next('.card');	
	}

	// find corresponding employee data 
	let employeeData = findEmployee(nextCard.find('.name').text(), nextCard.find('.email').text());

	// no 'next' card
	if (employeeData === undefined) return;

	// update lightbox target card
	lightboxTargetCard = nextCard;
	// build new lightbox 
	buildLightBox(employeeData);
}

function handleSearchInput(e){
	// display only the employees whos names or username matches/contains the input
	const input = e.target.value.toLowerCase();

	employees.forEach(employee => {
		if (employee.name.first.includes(input) || 
			employee.name.last.includes(input) ||
			employee.login.username.includes(input)) {
			$(employee.card[0]).removeClass('hidden');
		} else {
			$(employee.card[0]).addClass('hidden');
		}
	});
}


function handleLightboxClose(e) {
	$('.lightbox').css('display', 'none');
}

function handleUserCardClick(e) {

	lightboxTargetCard = e.currentTarget;
	
	// get employee info that corresponds to selected card
	const match = employees.filter(employee => employee.card[0] === lightboxTargetCard);

	const lightbox = buildLightBox(match[0]);
} 


/** Helper Functions
***********************/

function findEmployee(fullName, email) {
	for (let i = 0; i < employees.length; i++) {
		if (`${employees[i].name.first} ${employees[i].name.last}` === fullName 
			&& employees[i].email === email) 
		{
			return employees[i];
		}
	}
}

/* Generate card for each employee */
function createACard(employee) {

	// setup
	const card = $('<div>');
	const infoDiv = $('<div>');
	card.addClass('card');

	// element factory 
	function createElement(type, attribute, value, className="") {
		const element = $(type);
		element.addClass(className);

		if (attribute === 'text') {
			element.text(value);
		} else {
			element.attr(attribute, value);	
		}

		return element;
	}

	function appendToParent(child, parent) {
		child.appendTo(parent);
	}

	// constructing card div 
	appendToParent(createElement('<img>', 'src', employee.picture.large, 'avatar'), card);
	appendToParent(createElement('<p>', 'text', `${employee.name.first} ${employee.name.last}`, 'name'), infoDiv);
	appendToParent(createElement('<span>', 'text', employee.email, 'email'), infoDiv);
	appendToParent(createElement('<span>', 'text', employee.location.city, 'city'), infoDiv);
	appendToParent(infoDiv, card);

	return card;
}

function getFormattedAddress(employeeData) {
	return `${employeeData.location.street}, ${getStateAbbr(employeeData.location.state)}, ${employeeData.location.postcode}`;
}

function getFormattedDate(date) {

	function formatWithTwoDigits(val) {
		return (val.toString().length > 1 ? `${val}` : `0${val}`);
	}

	const formattedDate = "";

	const formattedMonth = formatWithTwoDigits(date.getMonth() + 1);
	const formattedDay = formatWithTwoDigits(date.getDay() + 1);
	const formattedShortYear = `${date.getFullYear().toString().substring(2)}`;

	return `${formattedMonth}/${formattedDay}/${formattedShortYear}`;
}

function getStateAbbr(state) {
	var states = {
        'arizona': 'AZ',
        'alabama': 'AL',
        'alaska': 'AK',
        'arizona': 'AZ',
        'arkansas': 'AR',
        'california': 'CA',
        'colorado': 'CO',
        'connecticut': 'CT',
        'delaware': 'DE',
        'florida': 'FL',
        'georgia': 'GA',
        'hawaii': 'HI',
        'idaho': 'ID',
        'illinois': 'IL',
        'indiana': 'IN',
        'iowa': 'IA',
        'kansas': 'KS',
        'kentucky': 'KY',
        'kentucky': 'KY',
        'louisiana': 'LA',
        'maine': 'ME',
        'maryland': 'MD',
        'massachusetts': 'MA',
        'michigan': 'MI',
        'minnesota': 'MN',
        'mississippi': 'MS',
        'missouri': 'MO',
        'montana': 'MT',
        'nebraska': 'NE',
        'nevada': 'NV',
        'new hampshire': 'NH',
        'new jersey': 'NJ',
        'new mexico': 'NM',
        'new york': 'NY',
        'north carolina': 'NC',
        'north dakota': 'ND',
        'ohio': 'OH',
        'oklahoma': 'OK',
        'oregon': 'OR',
        'pennsylvania': 'PA',
        'rhode island': 'RI',
        'south carolina': 'SC',
        'south dakota': 'SD',
        'tennessee': 'TN',
        'texas': 'TX',
        'utah': 'UT',
        'vermont': 'VT',
        'virginia': 'VA',
        'washington': 'WA',
        'west virginia': 'WV',
        'wisconsin': 'WI',
        'wyoming': 'WY',
    };

    return states[state];
}



















