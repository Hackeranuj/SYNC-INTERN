

const voterForm = document.getElementById('voterForm');
const candidateForm = document.getElementById('candidateForm');
const voteForm = document.getElementById('voteForm');
const winnerElement = document.getElementById('winner');

voterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const voterId = document.getElementById('voterId').value;
    const voterName = document.getElementById('voterName').value;
    const voterPassword = document.getElementById('voterPassword').value;

    // Send voter registration data to the backend
    fetch('/voters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: voterId,
                name: voterName,
                password: voterPassword
            }),
        })
        .then(response => response.json())
        .then(data => alert(`Voter registered: ${data.name}`))
        .catch(error => console.error('Error:', error));

    voterForm.reset();
});

candidateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const candidateId = document.getElementById('candidateId').value;
    const candidateName = document.getElementById('candidateName').value;

    // Send candidate registration data to the backend
    fetch('/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: candidateId,
                name: candidateName
            }),
        })
        .then(response => response.json())
        .then(data => alert(`Candidate registered: ${data.name}`))
        .catch(error => console.error('Error:', error));

    candidateForm.reset();
});

voteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const voterId = document.getElementById('voterIdVote').value;
    const candidateId = document.getElementById('candidateIdVote').value;

    // Send vote data to the backend
    fetch('/votes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                voterId,
                candidateId
            }),
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Error:', error));

    voteForm.reset();
});

// Fetch election results from the backend
function fetchResults() {
    fetch('/results')
        .then(response => response.json())
        .then(data => {
            if (data.winner) {
                winnerElement.textContent = `Winner: ${data.winner.name}`;
            } else {
                winnerElement.textContent = 'No winner yet';
            }
        })
        .catch(error => console.error('Error:', error));
}

// Fetch results every 5 seconds (for demonstration purposes)
fetchResults();
setInterval(fetchResults, 5000);
