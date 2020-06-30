const log = console.log

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

msgOne.textContent = ''
msgTwo.textContent = ''

// The argument 'e' stands for event
weatherForm.addEventListener('submit', (e)=> {
    // preventDefault stops the submit button to reload the page
    //   allowing us to manipulate data
    e.preventDefault()
    msgOne.textContent = 'Loading data...'
    msgTwo.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) msgOne.textContent = data.error
            else{
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})