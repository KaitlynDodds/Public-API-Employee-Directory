
// fetch employee data 
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us&exc=login',
  dataType: 'json',
  success: (data) => {
  	buildDirectoryUI(data);
  }
});

/*
<div class="card">
	<img class="avatar" src="https://randomuser.me/api/portraits/women/26.jpg" alt="profile image">
	<div>
		<p class="name">Alaster Dangerfield</p>
		<span class="email">alaster.danger@somewhere.com</span>
		<span class="city">Columbus</span>
	</div>
</div>
*/

function createACard(employee) {
	const card = $('<div>');
	card.addClass('card');

	const avatar = $('<img>');
	avatar.addClass('avatar');
	avatar.attr('src', employee.picture.large);
	avatar.appendTo(card);

	const infoDiv = $('<div>');

	const name = $('<p>');
	name.text(`${employee.name.first} ${employee.name.last}`);
	name.addClass('name');
	name.appendTo(infoDiv);

	const email = $('<span>');
	email.addClass('email');
	email.text(employee.email);
	email.appendTo(infoDiv);

	const city = $('<span>');
	city.addClass('city');
	city.text(employee.location.city);
	city.appendTo(infoDiv);

	infoDiv.appendTo(card);

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