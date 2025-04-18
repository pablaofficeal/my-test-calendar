const calendar = document.getElementById('calendar');
const monthSelect = document.getElementById('month-select');
const modal = document.getElementById('note-modal');
const modalDate = document.getElementById('modal-date');
const noteText = document.getElementById('note-text');
let selectedDate = null;

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar(month) {
    calendar.innerHTML = `
        <div class="day-name">Mon</div>
        <div class="day-name">Tue</div>
        <div class="day-name">Wed</div>
        <div class="day-name">Thu</div>
        <div class="day-name">Fri</div>
        <div class="day-name">Sat</div>
        <div class="day-name">Sun</div>
    `;

    const firstDay = new Date(2025, month, 1).getDay();
    const daysInMonth = new Date(2025, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < offset; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'day empty';
        calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<span>${day}</span>`;
        const dateKey = `2025-${month + 1}-${day}`;
        const note = localStorage.getItem(dateKey);
        if (note) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.textContent = note;
            dayDiv.appendChild(noteDiv);
        }
        dayDiv.onclick = () => openModal(day, month);
        calendar.appendChild(dayDiv);
    }
}

function openModal(day, month) {
    selectedDate = `2025-${month + 1}-${day}`;
    modalDate.textContent = `${day} ${months[month]} 2025`;
    const note = localStorage.getItem(selectedDate) || '';
    noteText.value = note;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    selectedDate = null;
    noteText.value = '';
}

function saveNote() {
    if (selectedDate) {
        const note = noteText.value.trim();
        if (note) {
            localStorage.setItem(selectedDate, note);
        } else {
            localStorage.removeItem(selectedDate);
        }
        renderCalendar(monthSelect.value);
        closeModal();
    }
}

monthSelect.addEventListener('change', () => {
    renderCalendar(parseInt(monthSelect.value));
});

renderCalendar(0);