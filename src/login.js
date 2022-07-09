function submit_name_handler(){
    localStorage.setItem("name", document.getElementById("name").value)
    location.href = 'hangman.html';
}

const submit_btn = document.getElementById('name_submit_btn')
submit_btn.addEventListener('click', submit_name_handler)
