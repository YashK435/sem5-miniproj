let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Days in each month
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Update the days of the month based on leap year
function getDaysInMonth(month, year) {
    if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
        return 29; // February in leap years
    }
    return daysInMonth[month];
}

// Update the calendar display
function updateCalendar() {
    const monthYearDisplay = document.getElementById('monthYear');
    monthYearDisplay.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    generateDays(currentMonth, currentYear);
}

// Create habit day checkboxes based on the number of days in the month
function generateDays(month, year) {
    const daysHeader = document.getElementById('daysHeader');
    const habitRows = document.querySelectorAll('#habitList tr');

    // Clear previous columns
    daysHeader.innerHTML = '';
    habitRows.forEach(row => row.querySelector('#habitDays').innerHTML = '');

    const days = getDaysInMonth(month, year);
    
    // Add day columns
    for (let day = 1; day <= days; day++) {
        // Header
        const th = document.createElement('th');
        th.innerText = day;
        daysHeader.appendChild(th);

        // Add checkboxes for each day in the habit rows
        habitRows.forEach(row => {
            const dayCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'habit-check';
            checkbox.setAttribute('data-day', day);

            checkbox.addEventListener("change", updateAchieved);
            dayCell.appendChild(checkbox);
            row.querySelector('#habitDays').appendChild(dayCell);
        });
    }
}

// Navigate between months
document.getElementById('prevMonthBtn').addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

document.getElementById('nextMonthBtn').addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

updateCalendar();  // Initialize calendar on page load

// Add new habit row
document.getElementById("addHabitBtn").addEventListener("click", function() {
    const habitList = document.getElementById("habitList");

    // Create a new row for the new habit
    const newRow = document.createElement("tr");

    // Prompt the user to enter a new habit name
    const habitName = prompt("Enter the name of the new habit:");

    // Habit name column
    const habitCell = document.createElement("td");
    habitCell.innerText = habitName;
    newRow.appendChild(habitCell);

    // Create a cell to hold habit day checkboxes
    const habitDaysCell = document.createElement("td");
    habitDaysCell.id = "habitDays";
    newRow.appendChild(habitDaysCell);

    // Generate day checkboxes for the new habit row
    const days = getDaysInMonth(currentMonth, currentYear);
    for (let day = 1; day <= days; day++) {
        const dayCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "habit-check";
        checkbox.setAttribute('data-day', day);

        checkbox.addEventListener("change", updateAchieved);
        dayCell.appendChild(checkbox);
        habitDaysCell.appendChild(dayCell);
    }

    // Goal column
    const goalCell = document.createElement("td");
    goalCell.innerText = "20";  // Default goal for a new habit
    newRow.appendChild(goalCell);

    // Achieved column
    const achievedCell = document.createElement("td");
    achievedCell.innerText = "0"; // Default achieved value for new habit
    achievedCell.className = "achieved-count";
    newRow.appendChild(achievedCell);

    // Delete column
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-row";
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", function() {
        newRow.remove();
    });
    deleteCell.appendChild(deleteBtn);
    newRow.appendChild(deleteCell);

    // Append the new row to the table
    habitList
    habitList.appendChild(newRow);
});

// Update the "Achieved" count when checkboxes are changed
function updateAchieved() {
    const row = this.closest("tr");
    const checkboxes = row.querySelectorAll(".habit-check");
    let achievedCount = 0;

    // Count how many checkboxes are checked
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            achievedCount++;
        }
    });

    // Update the achieved count in the row
    const achievedCell = row.querySelector(".achieved-count");
    achievedCell.innerText = achievedCount;
}
