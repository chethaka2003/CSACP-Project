document.addEventListener('DOMContentLoaded', function() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navPlaceholder) {
        fetch('/components/navigation.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
                highlightCurrentPage();
            });
    }

    if (footerPlaceholder) {
        fetch('/components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            });
    }
});

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-indigo-700', 'text-white');
            link.classList.remove('text-indigo-100', 'hover:bg-indigo-500');
        }
    });
}





document.addEventListener("DOMContentLoaded", function () {
    const footerSections = document.querySelectorAll(".footer-section");
    const footer = document.querySelector("footer");

    function revealFooter() {
        footerSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, index * 200);
        });
    }

    function checkFooterVisibility() {
        let footerTop = footer.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;

        if (footerTop < windowHeight - 100) {
            revealFooter();
            window.removeEventListener("scroll", checkFooterVisibility); // Stop checking once revealed
        }
    }

    // Check on load and scroll
    checkFooterVisibility();
    window.addEventListener("scroll", checkFooterVisibility);
});




//Forms Validations and Effects

let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)


document.addEventListener("DOMContentLoaded", function () {
    function validateForm(event, formType) {
        event.preventDefault(); // Prevent form submission initially

        let form = document.querySelector(`.${formType}`);
        let batchIdField = form.querySelector(`input[placeholder="Batch ID"]`);
        let emailField = form.querySelector(`input[placeholder="Email"]`);
        let passwordField = form.querySelector(`input[placeholder="Password"]`);
        let confirmPasswordField = form.querySelector(`input[placeholder="Confirm password"]`);

        let batchId = batchIdField.value.trim();
        let email = emailField?.value.trim();
        let password = passwordField.value.trim();
        let confirmPassword = confirmPasswordField?.value.trim();

        let errors = 0;

        function showError(inputField, message) {
            errors++;
            inputField.value = ""; // Clear the input field
            inputField.placeholder = message; // Set the error message as placeholder
            inputField.classList.add("error-input");

            // Shake animation
            inputField.classList.add("shake");
            setTimeout(() => {
                inputField.classList.remove("shake");
            }, 500);
        }

        function clearError(inputField) {
            if (inputField && inputField.classList.contains("error-input")) {
                inputField.classList.remove("error-input");
                inputField.placeholder = inputField.getAttribute("data-original-placeholder");
            }
        }

        // Store original placeholders only once
        document.querySelectorAll("input").forEach(field => {
            if (!field.hasAttribute("data-original-placeholder")) {
                field.setAttribute("data-original-placeholder", field.placeholder);
            }
        });

        // Clear previous errors in the clicked form only
        function clearAllErrors(currentForm) {
            const formFields = currentForm.querySelectorAll("input");
            formFields.forEach(clearError);
        }

        clearAllErrors(form); // Clear errors in the current form before validating

        // Batch ID Validation
        if (batchId === "") {
            showError(batchIdField, "Batch ID required!");
        } else if (!/^[a-zA-Z0-9]+$/.test(batchId)) {
            showError(batchIdField, "Alphanumeric only!");
        }

        // Email Validation (Only for Sign-Up)
        if (emailField && formType === "sign-up") {
            if (email === "") {
                showError(emailField, "Email required!");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError(emailField, "Invalid email!");
            }
        }

        // Password Validation
        if (password === "") {
            showError(passwordField, "Password required!");
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            showError(passwordField, "Weak password!");
        }

        // Confirm Password Validation (Only for Sign-Up)
        if (confirmPasswordField && formType === "sign-up") {
            if (confirmPassword === "") {
                showError(confirmPasswordField, "Confirm password!");
            } else if (confirmPassword !== password) {
                showError(confirmPasswordField, "Passwords don’t match!");
            }
        }

        // If all fields are empty, show an alert
        if (!batchId && (!email || emailField) && !password && (!confirmPassword || confirmPasswordField)) {
            showError(batchIdField, "All fields empty!");
            if (emailField) showError(emailField, "All fields empty!");
            showError(passwordField, "All fields empty!");
            if (confirmPasswordField) showError(confirmPasswordField, "All fields empty!");
        }

        // If no errors, allow form submission
        if (errors === 0) {
            alert(`${formType} form is valid!`);
        }
    }

    // Attach event listeners for Sign-Up and Sign-In buttons
    document.querySelector(".sign-up button").addEventListener("click", function (event) {
        validateForm(event, "sign-up");
    });

    document.querySelector(".sign-in button").addEventListener("click", function (event) {
        validateForm(event, "sign-in");
    });

    // Clear error when user **clicks (focuses)** on an input field
    document.querySelectorAll("input").forEach(inputField => {
        inputField.addEventListener("focus", function () {
            this.classList.remove("error-input");  // Remove error styling
            this.placeholder = this.getAttribute("data-original-placeholder");  // Restore original placeholder
        });
    });
});









const cityData = [
    {
        name: "New York City",
        total: 438,
        solved: 285,
        pending: 95,
        clearanceRate: 65
    },
    {
        name: "Chicago",
        total: 695,
        solved: 389,
        pending: 172,
        clearanceRate: 56
    },
    {
        name: "Los Angeles",
        total: 397,
        solved: 245,
        pending: 89,
        clearanceRate: 62
    },
    {
        name: "Houston",
        total: 435,
        solved: 252,
        pending: 98,
        clearanceRate: 58
    },
    {
        name: "Philadelphia",
        total: 516,
        solved: 289,
        pending: 121,
        clearanceRate: 56
    },
    {
        name: "Dallas",
        total: 220,
        solved: 127,
        pending: 58,
        clearanceRate: 58
    },
    {
        name: "Jacksonville",
        total: 245,
        solved: 142,
        pending: 67,
        clearanceRate: 58
    },
    {
        name: "Boston",
        total: 278,
        solved: 181,
        pending: 65,
        clearanceRate: 65
    },
    {
        name: "Nashville",
        total: 234,
        solved: 140,
        pending: 62,
        clearanceRate: 60
    },
    {
        name: "Las Vegas",
        total: 325,
        solved: 189,
        pending: 86,
        clearanceRate: 58
    },
];

function animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.innerText);
    const increment = (target - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || 
            (increment < 0 && current <= target)) {
            clearInterval(timer);
            current = target;
        }
        element.innerText = Math.round(current).toLocaleString();
    }, 16);
}

function createCityCard(city) {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `
        <div class="city-name">${city.name}</div>
        <div class="stat-row">
            <span>Total Cases:</span>
            <div class="stat-value-container">
                <span class="number-counter" data-target="${city.total}">0</span>
            </div>
        </div>
        <div class="stat-row">
            <span>Solved Cases:</span>
            <div class="stat-value-container">
                <span class="number-counter" data-target="${city.solved}">0</span>
            </div>
        </div>
        <div class="stat-row">
            <span>Pending Cases:</span>
            <div class="stat-value-container">
                <span class="number-counter" data-target="${city.pending}">0</span>
            </div>
        </div>
        <div class="stat-row">
            <span>Clearance Rate:</span>
            <div class="stat-value-container">
                <span class="number-counter" data-target="${city.clearanceRate}">0</span>
                <span class="percentage-mark">%</span>
            </div>
        </div>
    `;
    return card;
}

function initializeObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.querySelectorAll('.number-counter').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.city-card').forEach(card => {
        observer.observe(card);
    });
}

function renderCities(cities) {
    const grid = document.getElementById('cityGrid');
    grid.innerHTML = '';
    cities.forEach(city => {
        grid.appendChild(createCityCard(city));
    });
    initializeObserver();
}

const ctx = document.getElementById('topCitiesChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: cityData.map(city => city.name),
        datasets: [{
            label: 'Total Cases',
            data: cityData.map(city => city.total),
            backgroundColor: 'rgba(255, 215, 0, 0.3)',
            borderColor: '#ffd700',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Total Cases by City',
                color: '#ffd700'
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 215, 0, 0.1)'
                },
                ticks: {
                    color: '#ffd700'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 215, 0, 0.1)'
                },
                ticks: {
                    color: '#ffd700'
                }
            }
        }
    }
});

document.getElementById('searchCity').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCities = cityData.filter(city => 
        city.name.toLowerCase().includes(searchTerm)
    );
    renderCities(filteredCities);
});

document.getElementById('sortCities').addEventListener('change', (e) => {
    const sortType = e.target.value;
    const sortedCities = [...cityData].sort((a, b) => {
        if (sortType === 'name') return a.name.localeCompare(b.name);
        if (sortType === 'total') return b.total - a.total;
        if (sortType === 'solved') return b.solved - a.solved;
        return 0;
    });
    renderCities(sortedCities);
});

renderCities(cityData);


document.getElementById('getStarted').addEventListener('click', function() {
    document.getElementById('getStartedSection').scrollIntoView({ behavior: 'smooth' });
  });
  
document.getElementById('getStarted').addEventListener('click', function() {
    document.getElementById('getStartedSection').scrollIntoView({ behavior: 'smooth' });
  });
  
document.getElementById('analytics').addEventListener('click', function() {
    document.getElementById('barGraphAndCards').scrollIntoView({ behavior: 'smooth' });
});
  



let currentDetailsIndex = null;  // To keep track of currently opened details

// Initialize map
const map = L.map('map').setView([37.0902, -95.7129], 5); // Centered on the USA
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Homicide crime data for 20 cities with significant crime rates
const crimeLocations = [
    { lat: 34.0522, lon: -118.2437, name: "Los Angeles" },
    { lat: 40.7128, lon: -74.0060, name: "New York City" },
    { lat: 41.8781, lon: -87.6298, name: "Chicago" },
    { lat: 29.7604, lon: -95.3698, name: "Houston" },
    { lat: 39.9526, lon: -75.1652, name: "Philadelphia" },
    { lat: 42.3314, lon: -83.0458, name: "Detroit" },
    { lat: 39.2904, lon: -76.6122, name: "Baltimore" },
    { lat: 33.4484, lon: -112.0740, name: "Phoenix" },
    { lat: 33.7490, lon: -84.3880, name: "Atlanta" },
    { lat: 37.7749, lon: -122.4194, name: "San Francisco" }
];

// Add markers to the map for each crime location
crimeLocations.forEach(location => {
    L.marker([location.lat, location.lon])
        .addTo(map)
        .bindPopup(location.name);
});

// Toggle the details display
function toggleDetails(index) {
    // Hide the details of the previously opened suspect
    if (currentDetailsIndex !== null && currentDetailsIndex !== index) {
        document.getElementById(`details-${currentDetailsIndex}`).style.display = "none";
    }

    const details = document.getElementById(`details-${index}`);
    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        details.style.display = "block";
    }

    currentDetailsIndex = index; 
}