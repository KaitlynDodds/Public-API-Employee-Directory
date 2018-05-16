
let employees = {};

// fetch employee data 
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us&exc=login',
  dataType: 'json',
  success: (data) => {
  	buildDirectoryUI(data);
  }
});


// Generate UI for each employee 
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

	appendToParent(createElement('<img>', 'src', employee.picture.large, 'avatar'), card);
	appendToParent(createElement('<p>', 'text', `${employee.name.first} ${employee.name.last}`, 'name'), infoDiv);
	appendToParent(createElement('<span>', 'text', employee.email, 'email'), infoDiv);
	appendToParent(createElement('<span>', 'text', employee.location.city, 'city'), infoDiv);
	appendToParent(infoDiv, card);

	return card;
}


// construct and add directory UI to page 
function buildDirectoryUI(data) {
	// isolate employee data
	employees = (data.results);
	
	// build card for each employee 
	const cards = employees.map(employee => {
		const card = createACard(employee);
		employee['card'] = card;
		return card;
	});

	console.log(employees);

	// add individual cards to UI 
	cards.forEach(card => card.appendTo('.directory'));
}

$('.lightbox button').on('click', handleLightboxBtnClick);

function handleLightboxBtnClick(e) {
	$('.lightbox').css('display', 'none');
}


$('body').on('click', '.directory .card', handleUserCardClick);

function handleUserCardClick(e) {

	const targetCard = e.currentTarget;
	
	// get employee info that corresponds to selected card
	const match = employees.filter(employee => employee.card[0] === targetCard);

	const lightbox = buildLightBox(match[0]);
} 

function buildLightBox(employeeData) {
	$('.lightbox .avatar').attr('src', employeeData.picture.large);

	$('.lightbox .name').text(`${employeeData.name.first} ${employeeData.name.last}`);

	$('lightbox .email').text(`${employeeData.email}`);

	$('.lightbox .city').text(`${employeeData.location.city}`);

	$('.lightbox .phone').text(`${employeeData.cell}`);

	$('.lightbox .address').text(getFormattedAddress(employeeData));

	$('.lightbox .dob').text(`Birthday: ${getFormattedDate(new Date(employeeData.dob))}`);

	$('.lightbox').css('display', 'block');
}

function getFormattedAddress(employeeData) {
	return `${employeeData.location.street}, ${getStateAbbr(employeeData.location.state)}, ${employeeData.location.postcode}`;
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





















