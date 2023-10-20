document.addEventListener('scroll', function() {
  var contactSection = document.getElementById('contact');
  var contactContent = contactSection.querySelectorAll('p');
  
  var contactPosition = contactSection.getBoundingClientRect().top;

  if (contactPosition <= window.innerHeight / 2) {
    for (var i = 0; i < contactContent.length; i++) {
      contactContent[i].style.animation = 'slideIn 2s forwards';
    }
  } else {
    for (var i = 0; i < contactContent.length; i++) {
      contactContent[i].style.animation = 'none';
    }
  }
});

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';
  
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const dateString = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  
    
  
  
    if ((description.length == 0) || (assignedTo.length == 0)) {
      alert("Please fill all fields with required data.");
      document.getElementById('add-issue').setAttribute("data-toggle", "modal");
      document.getElementById('add-issue').setAttribute("data-target", "#emptyField")
    }
    else {
      document.getElementById('add-issue').removeAttribute("data-toggle", "modal");
      document.getElementById('add-issue').removeAttribute("data-target", "#emptyField")
      const issue = { id, description, severity, assignedTo, status,dateString};
      let issues = [];
      if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
      }
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
  
  
      fetchIssues();
    }
  }
  
  const closeIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status = 'Closed';
    currentIssue.description = `<strike>${currentIssue.description}</strike>`
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  }
  
  const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue => ((issue.id) != id))
    localStorage.removeItem('issues');
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    fetchIssues();
  }
  
  const fetchIssues = () => {
  
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
  
    for (var i = 0; i < issues.length; i++) {
      const { id, description, severity, assignedTo, status,dateString } = issues[i];
  
      issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <p><span class="glyphicon glyphicon-calendar"> ${dateString}</p>
                                <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                                <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                                </div>`;
    }
  }
  fetchIssues();