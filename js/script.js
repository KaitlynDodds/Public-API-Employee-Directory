
// fetch employee data 
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us&exc=login',
  dataType: 'json',
  success: (data) => {
  	buildDirectoryUI(data);
  }
});


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

function buildDirectoryUI(data) {
	// isolate employee data
	const employees = (data.results);
	console.log(employees);
	
	// build card for each employee 
	const cards = employees.map(employee => createACard(employee));

	// add individual cards to UI 
	cards.forEach(card => card.appendTo('.directory'));
}