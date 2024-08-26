function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    updateIcon();
}

function updateIcon() {
    const icon = document.querySelector('#moon');
    if (icon) {
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    document.body.style.visibility = 'visible';
    updateIcon();
});

const moonIcon = document.querySelector('.fa-moon');
if (moonIcon) {
    moonIcon.addEventListener('click', toggleDarkMode);
}

document.getElementById("openNav").addEventListener('click' , ()=>{
    document.getElementById("navList").style.right = "0";
});
document.getElementById("closeNav").addEventListener('click' , ()=>{
    document.getElementById("navList").style.right = "-170px";
});
document.querySelectorAll("li").forEach(i => i.addEventListener("click" , ()=>{
    document.getElementById("navList").style.right = "-170px";
}));

const deleteBtns = document.querySelectorAll('#deleteBtn');
deleteBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
        const blogBtnContainer = event.target.closest('.blog__btn');
        const deleteBox = blogBtnContainer.querySelector('.deleteBox');
        deleteBox.classList.toggle('show');
    });
});
const noDelete = document.querySelectorAll(".cancel")
noDelete.forEach(i => i.addEventListener("click", () => {
    const deleteBox = i.closest('.blog__btn').querySelector('.deleteBox');
    deleteBox.classList.remove('show');
}));
