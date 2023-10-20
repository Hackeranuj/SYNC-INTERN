
const ticketForm = document.getElementById('ticketForm');
const ticketList = document.getElementById('ticketList');

// Function to create a new ticket entry in the ticket list
function createTicketEntry(ticket) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('ticket-entry');

    const sourceHeading = document.createElement('h3');
    sourceHeading.textContent = `Source: ${ticket.source}`;

    const destinationHeading = document.createElement('h3');
    destinationHeading.textContent = `Destination: ${ticket.destination}`;

    const dateDetails = document.createElement('p');
    dateDetails.textContent = `Date: ${ticket.date}`;

    entryDiv.appendChild(sourceHeading);
    entryDiv.appendChild(destinationHeading);
    entryDiv.appendChild(dateDetails);

    ticketList.appendChild(entryDiv);
}

// Event listener for ticket booking form submission
ticketForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    // Mock API call to book a ticket
    const newTicket = {
        source: source,
        destination: destination,
        date: date,
    };

    createTicketEntry(newTicket);
    ticketForm.reset();
});