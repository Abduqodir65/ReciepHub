const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());

const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const imageElement = imagePreview.querySelector('.image-preview__image');
const defaultText = imagePreview.querySelector('.image-preview__default-text');
const fileLabel = document.querySelector('.custom-file-upload');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            imageElement.setAttribute('src', this.result);
            imageElement.style.display = 'block';
            defaultText.style.display = 'none';

            // Tugmani matnini o'zgartiramiz
            fileLabel.textContent = 'Edit Picture';
        });

        reader.readAsDataURL(file);
    } else {
        imageElement.setAttribute('src', '');
        imageElement.style.display = 'none';
        defaultText.style.display = 'block';

        // Tugmani matnini qaytarib qo'yamiz
        fileLabel.textContent = 'Choose Profile Picture';
    }
});
