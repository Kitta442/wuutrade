const notifyForm = document.getElementById("notify_form");
if (notifyForm) {
    notifyForm.addEventListener('submit', function (event) {
        notifyForm.classList.add('was-validated');
        event.preventDefault();
        event.stopPropagation();

        if (notifyForm.checkValidity()) {
            //submit form if success
            const page = window.location.pathname;
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST.html", notifyForm.getAttribute("data-action-url"), true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]')
                .getAttribute('content'));

            xhttp.send(
                "email=" + document.getElementById("notify-email").value +
                "&page=" + page
            );

            xhttp.onload = function () {
                var response = JSON.parse(xhttp.response);

                if (xhttp.status === 200) {

                    showModal(response.title, response.message, response.className);
                    notifyForm.classList.remove('was-validated');
                    document.getElementById("notify_email").value = "";
                }
            }
        }

    }, false)
}

const modalToggle = document.getElementById('modal-investment');
if (modalToggle) {
    const modalInvestment = new bootstrap.Modal('#modal-investment')
    const modalInvestmentSession = sessionStorage.getItem("modalInvestment")
    window.addEventListener('load', (event) => {
        if (modalInvestmentSession != 'hidden') {
            console.log("not hidden")
            modalInvestment.show(modalToggle)
        }
        modalToggle.addEventListener('hide.bs.modal', event => {
            console.log("now hidden")
            sessionStorage.setItem("modalInvestment", "hidden")
        })
    });
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        $('.close-button').click();
    }
});

if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.document.addEventListener('touchmove', e => {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, {
        passive: false
    });
}


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



document.getElementById('scroll-top').addEventListener('click' ,()=>{
    document.getElementById('main_nav').classList.remove('show');
})