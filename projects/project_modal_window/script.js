/*
 * In this project we add and remove classes from
 * elements to change the properties of those elements
 */
'use strict';
// Arrow function to show both the modal window
// and the overlay
const showModalWindow = () => {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};
// Arrow function to hide both the modal window
// and the overlay
const hideModalWindow = () => {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};
// A group of three buttons. No matter which one
// you click, the modal window will appear
const showModalButtons = document.querySelectorAll('.show-modal');
// Button that closes the modal window
const hideModalButton = document.querySelector('.close-modal');
// The modal window
const modal = document.querySelector('.modal');
// A transparent but blurred window that
// appears behind the modal window
const overlay = document.querySelector('.overlay');
// Add an event listener to each button in showModalButtons
// in order to show the modal window no matter which button
// was click
for (let i = 0; i < showModalButtons.length; i++)
	showModalButtons[i].addEventListener('click', showModalWindow);
// Add event listeners to hide the modal window
hideModalButton.addEventListener('click', hideModalWindow);
overlay.addEventListener('click', hideModalWindow);
// When an event happens, we can access to the information
// of the event in the event handler
document.addEventListener('keydown', e => {
	// e stands for event
	// To see the event details, run:
	// console.log(e);
	// Escape key can also be used to
	// hide the modal window
	if (
		e.key === 'Escape' &&
		!modal.classList.contains('hidden') &&
		!overlay.classList.contains('hidden')
	)
		hideModalWindow();
});
