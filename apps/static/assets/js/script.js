const genRand = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
    }
    return result;
  }
  
const sleep = (milliseconds) => {
return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function show_success(message) {
    var alert = document.querySelector('#alert')
    var alertMessage = document.querySelector('#alertMessage')

    alert.classList = 'alert alert-success';
    alertMessage.innerHTML = 'success';  
    alertSvg.setAttribute('d', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')
}

function show_error(message) {
    var alert = document.querySelector('#alert')
    var alertMessage = document.querySelector('#alertMessage')
    var alertSvg = document.querySelector('#alertSvg')

    alert.classList = 'alert alert-error';
    alertMessage.innerHTML = message;  
    alertSvg.setAttribute('d', 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z')
}

function hide_message() {
    var alert = document.querySelector('#alert')
    var alertMessage = document.querySelector('#alertMessage')
    var alertSvg = document.querySelector('#alertSvg')

    alert.classList = '';
    alertMessage.innerHTML = '';
    alertSvg.setAttribute('d', '');
}

async function del(id) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var btn = document.getElementById(id)
    

    btn.innerHTML = `
        <span class="loading loading-spinner"></span>
        loading
    `
    await sleep(1000);
    try {
        let response = await fetch('api/student/delete', {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: { 'X-CSRFToken': csrftoken, 'Content-Type': 'application/json' },
            mode: 'same-origin'
        });

        if (response.ok) {
            let data = await response.json();
            console.log('Success:', data);
            show_success('Student Deleted  Successfully')
            btn.parentElement.parentElement.remove();
        } else {
            console.error('Error:', response.status, response.statusText);
            show_error(data.error)
             
        }
    } catch (error) {
        show_error(data.error)   

    }
    setTimeout(() => {
        hide_message()
    }, 2000);
}

async function submit(id){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var row = document.querySelector(`#${id}-row`)
    var btn = document.querySelector(`#${id}`)
    const alert = document.querySelector('#alert')
    const alertMessage = document.querySelector('#alertMessage')

    btn.innerHTML = `
        <span class="loading loading-spinner"></span>
        loading
    `
    var formData = new FormData();
    row.querySelectorAll('input').forEach(input => {
        formData.append(input.name, input.value);
    });
    await sleep(1000);
    try {
        let response = await fetch('api/student/add', {
            method: 'POST',
            body: formData,
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin'
        });

        if (response.ok) {
            let data = await response.json();
            console.log('Success:', data);
            show_success('success')
            btn.innerHTML = 'Delete';
            btn.id = `#${formData.studentId}-del`;
            btn.classList = 'btn btn-error btn-xs';
            btn.setAttribute('onClick', `del(${formData.studentId})`);
        } else {
            let data = await response.json();
            show_error(data.error)
            btn.innerHTML = '';
        }
    } catch (error) {
        show_error(data.error)   
        btn.innerHTML = '';
    }

    setTimeout(() => {
        hide_message();
    }, 2000);
};



window.addEventListener('load', () => {


    
    var addStudentBtn = document.querySelector('#addStudent');
    addStudentBtn.addEventListener('click', () => {
        var table = document.querySelector('#studentTable');
        var newRow = document.createElement('tr');
        rowId = genRand(8)
        newRow.id = `${rowId}-row`

        newRow.innerHTML = `
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <td>
                <div class="flex items-center gap-3">
                    <div class="avatar placeholder">
                        <div class="bg-neutral text-neutral-content rounded-full w-12">
                            <span class="text-lg"></span>
                        </div>
                    </div>
                    <div>
                        <input type="text" name="studentName" class="input input-xs input-bordered w-full max-w-xs" placeholder="Enter Name" />
                        <input type="text" name="studentId" class="input input-xs input-bordered w-full max-w-xs mt-1" placeholder="Enter ID" />
                    </div>
                </div>
            </td>
            <td>
                <input type="text" name="studentPosition" class="input input-xs input-bordered w-full max-w-xs mt-1" placeholder="Enter Position" />
            </td>
            <td>
                <input type="text" name="studentGPA" class="input input-xs input-bordered w-full max-w-xs" placeholder="Enter GPA" />
            </td>
            <th>
                <button id="${rowId}" class="btn btn-ghost btn-xs" onclick="submit(id)">submit</button>
            </th>
        `;

        table.appendChild(newRow);
    });


    

});