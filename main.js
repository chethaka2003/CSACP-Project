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



const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container1 = document.getElementById('container1');

signUpButton.addEventListener('click', () => {
	container1.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container1.classList.remove("right-panel-active");
});



document.addEventListener("DOMContentLoaded", function () {
    const footerSections = document.querySelectorAll(".footer-section");

    function revealFooter() {
        footerSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, index * 200);
        });
    }

    window.addEventListener("scroll", function () {
        let footer = document.querySelector("footer");
        let footerTop = footer.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;

        if (footerTop < windowHeight - 100) {
            revealFooter();
        }
    });
});

