let dataList = [];
var table = document.getElementById("container");
var i = 0, temp = 0, editId = null;
var isEdit = false;

function onsub() {
    if (isEdit === false) {
        temp = temp + 1;
        var data = {
            name: document.getElementById("fname").value,
            age: document.getElementById("age").value,
            mail: document.getElementById("mail").value,
            id: temp,
        }
        document.getElementById("fname").value = '';
        document.getElementById("age").value = '';
        document.getElementById("mail").value = '';
        console.log("id val ", data.id)
        dataList.push(data);
        generateTable(data);
    }else{
        for(let i=0;i<dataList.length;i++){
            if(dataList[i].id === editId){
                dataList[i].name = document.getElementById("fname").value;
                dataList[i].age = document.getElementById("age").value;
                dataList[i].mail = document.getElementById("mail").value;
                break;
            }
        }
        isEdit = false;
        while (table.children.length > 1) {
            table.removeChild(table.children[1]);
        }
        dataList.forEach(data => generateTable(data));
    }
}


function generateTable(data) {
    var cols = ["name", "age", "mail"];

    var row = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
        var td = document.createElement("td");
        td.innerText = data[cols[i]];
        row.appendChild(td);
    }

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    row.appendChild(editButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    row.appendChild(deleteButton);

    table.appendChild(row);

    i += 1;
    // console.log(i);

    editButton.addEventListener('click', () => {
        editFunc(data);
    })
    console.log("before", dataList);
    deleteButton.addEventListener('click', () => {
        deleteFunc(data);
    });
}

function editFunc(data) {
    editId = data.id;
    var toBeEdited = dataList.filter(item => item.id === editId);
    console.log(toBeEdited);
    document.getElementById("fname").value = toBeEdited[0].name;
    document.getElementById("age").value = toBeEdited[0].age;
    document.getElementById("mail").value = toBeEdited[0].mail;
    isEdit = true;
}

function deleteFunc(data) {
    var temp = data.id;
    const newDataList = dataList.filter(item => item.id !== temp);
    dataList = newDataList;
    console.log("new", dataList);
    while (table.children.length > 1) {
        table.removeChild(table.children[1]);
    }
    dataList.map(obj => generateTable(obj));
}

