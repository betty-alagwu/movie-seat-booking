const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')


// 1st add the seat click event
container.addEventListener('click', e => {
    // console.log(e.target)
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target)
        e.target.classList.toggle('selected')

        updateSelectedCount()
    }
})


// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    // console.log(selectedSeats)

    let ticketPrice = +movieSelect.value

    const selectedSeatsCount = selectedSeats.length
    // console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice

    // copy selected seats into array
    // map through that array
    // return a new Array of indexes
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)) 
    console.log(seatsIndex)
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})


// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


// get the data from localStorage and populate the UI
function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    console.log(selectedSeats)
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex =selectedMovieIndex
    }
}
populateUi()
// initial cound and total set
updateSelectedCount()