const button = document.querySelector('button')
const buttonClickHandler = (event) => {
  // alert('Hi there!');
  console.log(event)
}
button.addEventListener('click', buttonClickHandler)