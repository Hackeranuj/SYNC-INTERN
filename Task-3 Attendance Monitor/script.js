

const studentForm = document.getElementById('studentForm');
const attendanceList = document.getElementById('attendanceList');

// Function to create a new student entry in the attendance list
function createStudentEntry(student) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('attendance-entry');
    entryDiv.setAttribute('data-student-id', student.id); // Add data-student-id attribute

    const nameHeading = document.createElement('h3');
    nameHeading.textContent = `${student.name} (ID: ${student.id})`; // Display name and ID

    const attendanceDetails = document.createElement('p');
    const attendance = Object.keys(student.attendance);
    attendanceDetails.textContent = `Attendance: ${attendance.join(', ')}`;

    // Calculate attendance percentage
    const totalDays = Object.keys(student.attendance).length;
    const attendancePercentage = (totalDays / 30) * 100;
    const attendancePercentageRounded = Math.round(attendancePercentage * 10) / 10;

    const attendancePercentageElement = document.createElement('p');
    attendancePercentageElement.textContent = `Attendance Percentage: ${attendancePercentageRounded}%`;

    entryDiv.appendChild(nameHeading);
    entryDiv.appendChild(attendanceDetails);
    entryDiv.appendChild(attendancePercentageElement);

    attendanceList.appendChild(entryDiv);
}

// Function to add a new attendance record to the attendance list
function addAttendanceRecord(studentId, date) {
    const studentEntry = attendanceList.querySelector(`[data-student-id="${studentId}"]`);
    if (studentEntry) {
        const attendanceDetails = studentEntry.querySelector('p');
        const attendance = attendanceDetails.textContent.split(', ');
        attendance.push(date);
        attendanceDetails.textContent = `Attendance: ${attendance.join(', ')}`;

        // Calculate and update attendance percentage
        const totalDays = attendance.length;
        const attendancePercentage = (totalDays / 30) * 100;
        const attendancePercentageRounded = Math.round(attendancePercentage * 10) / 10;

        const attendancePercentageElement = studentEntry.querySelector('p:last-child');
        attendancePercentageElement.textContent = `Attendance Percentage: ${attendancePercentageRounded}%`;
    }
}

// Event listener for student registration form submission
studentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;

    // Mock API call to add a new student
    const newStudent = {
        id: studentId,
        name: studentName,
        attendance: {},
    };

    createStudentEntry(newStudent);
    studentForm.reset();
});

// Mock API call to fetch all students' data
const students = [{
        id: "18",
        name: "Anuj Kumar",
        attendance: {
            "2023-07-01": true,
            "2023-07-02": true,
            "2023-07-03": true,
            "2023-07-04": true,
            "2023-07-05": true,
            "2023-07-06": true,
            "2023-07-07": true,
            "2023-07-08": true,
            // ... Add more attendance data here ...
        },
    },
    // Add more students' data here if needed
];

students.forEach((student) => {
    createStudentEntry(student);
});

// Function to mark attendance for a student on button click (mock API call)
function markAttendance(studentId) {
    const date = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    // Mock API call to mark attendance
    students.forEach((student) => {
        if (student.id === studentId) {
            student.attendance[date] = true;
        }
    });
    addAttendanceRecord(studentId, date);
}

// Event delegation for marking attendance on button click
attendanceList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        const studentEntry = target.closest('.attendance-entry');
        if (studentEntry) {
            const studentId = studentEntry.getAttribute('data-student-id');
            markAttendance(studentId);
        }
    }
});
