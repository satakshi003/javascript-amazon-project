export function setupUserGreeting() {
  const greetingContainer = document.querySelector('.js-user-greeting');
  if (!greetingContainer) return;

  let userName = localStorage.getItem('userName');

  if (!userName) {
    userName = prompt('Welcome! What is your name?');
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }

  if (userName) {
    greetingContainer.textContent = `Hello, ${userName}! Welcome back.`;
  }
}
