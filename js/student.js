// Data structure to store attendance
let attendanceData = [];

function addAttendance() {
    const studentID = document.getElementById('studentID').value;
    const studentName = document.getElementById('studentName').value;
    const courseName = document.getElementById('courseName').value;
    const date = document.getElementById('date').value;
    const attendanceStatus = document.getElementById('attendanceStatus').value;
    const reason = document.getElementById('reason').value;
    const timeIn = document.getElementById('timeIn').value;
    const timeOut = document.getElementById('timeOut').value;

    // Add the attendance data to the array
    attendanceData.push({
        studentID, studentName, courseName, date, attendanceStatus, reason, timeIn, timeOut
    });

    // Clear the form
    document.getElementById('attendanceForm').reset();

    // Update the table
    updateAttendanceTable();
    updateAttendanceSummary();
}

function updateAttendanceTable() {
    const tableBody = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Clear the table body

    // Populate table with attendance data
    attendanceData.forEach((attendance, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = attendance.studentID;
        row.insertCell(1).innerText = attendance.studentName;
        row.insertCell(2).innerText = attendance.courseName;
        row.insertCell(3).innerText = attendance.date;
        row.insertCell(4).innerText = attendance.attendanceStatus;
        row.insertCell(5).innerText = attendance.reason || '-';
        row.insertCell(6).innerText = attendance.timeIn || '-';
        row.insertCell(7).innerText = attendance.timeOut || '-';

        // Action button (delete row)
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('btn');
        deleteButton.style.backgroundColor = '#e74c3c';
        deleteButton.addEventListener('click', () => deleteAttendance(index));
        row.insertCell(8).appendChild(deleteButton);
    });
}

function deleteAttendance(index) {
    // Remove the attendance data from the array
    attendanceData.splice(index, 1);
    // Update the table and summary
    updateAttendanceTable();
    updateAttendanceSummary();
}

function updateAttendanceSummary() {
    const totalClasses = attendanceData.length;
    const totalPresent = attendanceData.filter(item => item.attendanceStatus === 'Present').length;

    const attendancePercentage = totalClasses > 0 ? (totalPresent / totalClasses) * 100 : 0;
    document.getElementById('attendancePercentage').innerText = `Attendance Percentage: ${attendancePercentage.toFixed(2)}%`;
}
