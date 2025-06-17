// Grab the HTML template for user cards (hidden <template> in the HTML)
const userCardTemplate = document.querySelector("[data-user-template]")

// Grab the container where user cards will be displayed
const userCardContainer = document.querySelector("[data-user-cards-container]")

// Grab the search input field
const searchInput = document.querySelector("[data-search]")

// Create an empty array to store the user data + card element
let users = []

// Add an event listener to the input box so that it runs this code whenever the user types
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase() // Get the input text and make it lowercase for case-insensitive matching

  // For each user object in the users array, check if it should be visible
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) || // check if name matches
      user.email.toLowerCase().includes(value)   // check if email matches

    // Show or hide the card based on whether it's a match
    user.element.classList.toggle("hide", !isVisible)
  })
})

// Fetch the user data from an online API
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json()) // Convert response to JSON
  .then(data => {
    // For each user returned, do the following:
    users = data.map(user => {
      // Clone the template element
      const card = userCardTemplate.content.cloneNode(true).children[0]
      // Find the header and body inside the card
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")

      // Set the text content of the header and body
      header.textContent = user.name
      body.textContent = user.email

      // Add the card to the page
      userCardContainer.append(card)

      // Return a custom object that includes user info and the DOM element
      return { name: user.name, email: user.email, element: card }
    })
  })
