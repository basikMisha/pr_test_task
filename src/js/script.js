document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fio = document.getElementById('fio').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;


    if(validateForm(fio, phone, age)) {
        const formData = new FormData();
        formData.append('fio', fio);
        formData.append('phone', phone);
        formData.append('age', age);

        fetch("./src/php/submit_form.php", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
        if (data.success) {
            updateCounter();
            document.getElementById('form').reset();
        } else {
            alert(data.message);
        }
      })
      .catch(error => console.error(error));
    }
});

function updateCounter() {
    fetch('./src/php/get_leads_count.php')
    .then(response => response.json())
    .then(data => {
        document.getElementById('counter').textContent = data.count;
    }).catch(error => console.error(error));
}

function showErrorMessage(id, show) {
    const elem = document.getElementById(id);
    if(show) {
        elem.classList.add('show_error');
    }else {
        elem.classList.remove('show_error');
    }
}   

function validateForm(fio, phone, age) {
    const regexForPhone = /^\+375\s?(\(17\)|17|\(25\)|25|\(29\)|29|\(33\)|33|\(44\)|44)\s?\d{3}\s?\d{2}\s?\d{2}$/;
    let formIsValid = true;

    if (!fio || /\d/.test(fio)) {
        formIsValid = false;
        showErrorMessage('fioError', true);
    } else {
        showErrorMessage('fioError', false);
    }

    if (!phone || !regexForPhone.test(phone)) {
        formIsValid = false;
        showErrorMessage('phoneError', true);
    } else {
        showErrorMessage('phoneError', false);
    }

    if (!age || isNaN(age) || age <= 18 && age >= 99) {
        formIsValid = false;
        showErrorMessage('ageError', true);
    } else {
        showErrorMessage('ageError', false);
    }

    return formIsValid;
}

updateCounter();