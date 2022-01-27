function getInputValue(val) {
    const input = document.getElementById(val);

    return input.value
}


console.log('HI')
const loginForm = document.querySelector('form')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

loginForm.addEventListener('submit', (e) => {
    e. preventDefault();

    const user = getInputValue('username-input')
    const pass = getInputValue('password-input')

    console.log(user);
    console.log(pass);

    alert(`Welcome Back ${user}`)
    messageOne.textContent = `Your username is: ${user}`
    messageTwo.textContent = `Your username is: ${pass}`

})
