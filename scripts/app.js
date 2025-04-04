// Dummy teacher data with schedules from 8 AM to 5 PM
const teachers = [
    {
        id: 1,
        name: "Dr. Smith",
        department: "Computer Science",
        profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        schedule: {
            "8:00": "Available",
            "9:00": "CS101 - Room A12",
            "10:00": "CS101 - Room A12",
            "11:00": "Office Hours",
            "12:00": "Lunch",
            "13:00": "CS201 - Room B05",
            "14:00": "CS201 - Room B05",
            "15:00": "Available",
            "16:00": "Department Meeting",
            "17:00": "Available"
        }
    },
    {
        id: 2,
        name: "Prof. Johnson",
        department: "Mathematics",
        profilePic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        schedule: {
            "8:00": "MATH202 - Room C10",
            "9:00": "MATH202 - Room C10",
            "10:00": "Available",
            "11:00": "MATH105 - Room D03",
            "12:00": "MATH105 - Room D03",
            "13:00": "Lunch",
            "14:00": "Office Hours",
            "15:00": "Research Time",
            "16:00": "Available",
            "17:00": "Available"
        }
    },
    {
        id: 3,
        name: "Dr. Williams",
        department: "Physics",
        profilePic: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
        schedule: {
            "8:00": "Available",
            "9:00": "PHYS301 - Lab 2",
            "10:00": "PHYS301 - Lab 2",
            "11:00": "Available",
            "12:00": "PHYS101 - Room E15",
            "13:00": "PHYS101 - Room E15",
            "14:00": "Lunch",
            "15:00": "Department Meeting",
            "16:00": "Research Time",
            "17:00": "Office Hours"
        }
    },
    {
        id: 4,
        name: "Prof. Brown",
        department: "English",
        profilePic: "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg",
        schedule: {
            "8:00": "ENG205 - Room F22",
            "9:00": "ENG205 - Room F22",
            "10:00": "Available",
            "11:00": "Office Hours",
            "12:00": "Lunch",
            "13:00": "ENG102 - Room G07",
            "14:00": "ENG102 - Room G07",
            "15:00": "Available",
            "16:00": "Faculty Seminar",
            "17:00": "Available"
        }
    },
    {
        id: 5,
        name: "Dr. Davis",
        department: "Biology",
        profilePic: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        schedule: {
            "8:00": "BIO303 - Lab 3",
            "9:00": "BIO303 - Lab 3",
            "10:00": "Available",
            "11:00": "BIO101 - Room H14",
            "12:00": "BIO101 - Room H14",
            "13:00": "Lunch",
            "14:00": "Research Time",
            "15:00": "Office Hours",
            "16:00": "Available",
            "17:00": "Department Meeting"
        }
    }
];

// Current time display and schedule updates
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// Initialize the schedule table
function initScheduleTable() {
    const tableBody = document.getElementById('schedule-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        
        // Teacher name cell
        const nameCell = document.createElement('td');
        nameCell.className = 'px-6 py-4 whitespace-nowrap';
        nameCell.innerHTML = `
            <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="${teacher.profilePic}" alt="${teacher.name}">
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${teacher.name}</div>
                    <div class="text-sm text-gray-500">${teacher.department}</div>
                </div>
            </div>
        `;
        row.appendChild(nameCell);

        // Time slot cells
        const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
        timeSlots.forEach(time => {
            const cell = document.createElement('td');
            cell.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-500';
            
            const status = teacher.schedule[time];
            if (status === 'Available') {
                cell.innerHTML = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>';
            } else if (status.includes('Room') || status.includes('Lab')) {
                cell.innerHTML = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">${status}</span>`;
            } else {
                cell.textContent = status;
            }
            
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const noResults = document.getElementById('no-results');
    
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', debounce(() => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTeachers = teachers.filter(teacher => 
            teacher.name.toLowerCase().includes(searchTerm) ||
            teacher.department.toLowerCase().includes(searchTerm)
        );

        searchResults.innerHTML = '';
        
        if (filteredTeachers.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
            filteredTeachers.forEach(teacher => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded-lg shadow-md overflow-hidden';
                card.innerHTML = `
                    <div class="p-4 flex items-center">
                        <img class="h-16 w-16 rounded-full object-cover" src="${teacher.profilePic}" alt="${teacher.name}">
                        <div class="ml-4">
                            <h3 class="text-lg font-bold">${teacher.name}</h3>
                            <p class="text-gray-600">${teacher.department}</p>
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <a href="schedule.html" class="text-blue-600 hover:text-blue-800 font-medium">View Schedule</a>
                    </div>
                `;
                searchResults.appendChild(card);
            });
        }
    }, 300));
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Get current time slot (8:00, 9:00, etc.)
function getCurrentTimeSlot() {
    const now = new Date();
    const hours = now.getHours();
    return `${hours}:00`;
}

// Initialize availability cards
function initAvailability() {
    const container = document.getElementById('availability-cards');
    const searchInput = document.getElementById('availability-search');
    
    if (!container) return;

    function updateAvailabilityCards(filter = '') {
        container.innerHTML = '';
        const currentTime = getCurrentTimeSlot();
        const searchTerm = filter.toLowerCase();

        teachers.forEach(teacher => {
            if (searchTerm && !teacher.name.toLowerCase().includes(searchTerm)) {
                return;
            }

            const status = teacher.schedule[currentTime];
            const isAvailable = status === 'Available';
            
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md overflow-hidden';
            card.innerHTML = `
                <div class="p-4 flex items-center">
                    <img class="h-16 w-16 rounded-full object-cover" src="${teacher.profilePic}" alt="${teacher.name}">
                    <div class="ml-4">
                        <h3 class="text-lg font-bold">${teacher.name}</h3>
                        <p class="text-gray-600">${teacher.department}</p>
                    </div>
                    <div class="ml-auto">
                        <span class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                            ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${isAvailable ? 'Available Now' : 'Currently Busy'}
                        </span>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <p class="text-sm text-gray-600">Current: ${status}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Initial load
    updateAvailabilityCards();

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            updateAvailabilityCards(searchInput.value);
        }, 300));
    }
}

// Initialize appropriate functions based on current page
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute

    if (document.getElementById('schedule-body')) {
        initScheduleTable();
    }

    if (document.getElementById('search-input')) {
        initSearch();
    }

    if (document.getElementById('availability-cards')) {
        initAvailability();
    }
});
