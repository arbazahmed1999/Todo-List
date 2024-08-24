const btn = document.getElementById("adduser");
const btntext = btn.innerHTML
const textfield = document.getElementById("username");
const displayrecords = document.getElementById("display-records");
let userArray = [];
let edit_data = null;

let objstr = localStorage.getItem("users");

if (objstr != null) {
    userArray = JSON .parse(objstr);
}
displayinfo();
btn.onclick = () => {
    const name = textfield.value;
    console.log(name)
    if(!name){
        alert("please fill the inputs given")
    }
    else if (edit_data != null) {
        // edit data
        userArray.splice(edit_data, 1, { name: name })
        console.log(userArray)
        edit_data = null;
    } else {
        // insert data
        userArray.push({ name: name });
    }

    saveinfo(userArray);

    textfield.value = "";
   
    btn.innerHTML = btntext;
};

function saveinfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem("users", str);
    displayinfo();
}

function displayinfo() {
    let displayData = "";
    userArray.forEach((user, i) => {
        displayData += ` <tr>
        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white btn-primary bi bi-pencil-square mx-1" onclick="editinfo(${i})"></i> <i class="btn text-white btn-success bi bi-trash-fill" onclick="deleteinfo(${i})" ></i></td>
    </tr>`;
    });

    displayrecords.innerHTML = displayData;
}

function editinfo(id) {
    edit_data = id;
    textfield.value = userArray[id].name;
    btn.innerHTML = "Save Changes"
}

function deleteinfo(id) {
    userArray.splice(id, 1);
    saveinfo(userArray);
}
