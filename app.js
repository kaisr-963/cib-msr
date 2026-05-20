let selectedWatch = null;

// =============================
// Page Initialization
// =============================
document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);

    // Success State
    if (params.get('done') === '1') {

        const mainContent = document.getElementById('mainContent');
        const doneSection = document.getElementById('doneSection');

        if (mainContent) {
            mainContent.style.display = 'none';
        }

        if (doneSection) {
            doneSection.classList.add('active');
        }
    }

    // Restore Selected Watch
    const savedWatch = localStorage.getItem('selectedWatch');

    if (savedWatch) {
        selectedWatch = savedWatch;
    }
});

// =============================
// Request Selection
// =============================
function selectRequest(type) {

    switch (type) {

        case 'smart_watch':
        case 'smart_watch_premium':

            document.getElementById('mainContent').style.display = 'none';

            document.getElementById('watchSelection').classList.add('active');

            smoothScrollToTop();

            break;

        case 'credit_card':
        case 'daily_prizes':

            window.location.href = 'registration.html';

            break;

        default:
            console.warn('Unknown request type:', type);
    }
}

// =============================
// Watch Selection
// =============================
function selectWatch(watchId, element) {

    document.querySelectorAll('.watch-item').forEach(item => {
        item.classList.remove('selected');
    });

    element.classList.add('selected');

    selectedWatch = watchId;

    localStorage.setItem('selectedWatch', watchId);

    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    setTimeout(() => {
        window.location.href = 'registration.html';
    }, 800);
}

// =============================
// Helpers
// =============================
function smoothScrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// =============================
// Registration Form
// =============================
function submitForm(event) {

    event.preventDefault();

    const formData = {
        fullName: document.getElementById('fullName')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        email: document.getElementById('email')?.value || '',
        selectedWatch: localStorage.getItem('selectedWatch') || 'none'
    };

    console.log('Submitted Data:', formData);

    localStorage.setItem(
        'registrationData',
        JSON.stringify(formData)
    );

    window.location.href = 'index.html?done=1';
}