$(function(){
    $(".header").load("header.html");
    $(".main").load("home.html");
    $(".footer").load("footer.html");
});

function clickNavHome() {
    $(".main").load("home.html");
}

function clickNavViewListEmployees() {
    $(".main").load("viewlistemployees.html");
    initTable();
}

var counter = 0;
var employees = [];

function Employee(name, department, phone) {
    this.id = ++counter;
    this.name = name;
    this.department = department;
    this.phone = phone
}

function initEmployees() {
    if (null != employees && employees.length > 0) {
        return;
    }
    employees.push(new Employee("John Doe", "AdminStration", "(171) 555-2222"));
    employees.push(new Employee("Peter Parker", "Customer Service", "(313) 555-5735"));
    employees.push(new Employee("Fran Wilson", "Human Resource", "(503) 555-9931"));
}

function initTable() {
    setTimeout(() => {
        $('tbody').empty();

        initEmployees();
        employees.forEach(function(item){
            $('tbody').append(
                '<tr>'+
                    '<td>'+item.name+'</td>' +
                    '<td>'+item.department+'</td>'+
                    '<td>'+item.phone+'</td>'+
                    '<td>' +
                        '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateModal('+ item.id +')"><i class="material-icons">&#xE254;</i></a>' +
                        '<a class="delete" title="Delete" data-toggle="tooltip" onclick="openConfirmDelete('+ item.id +')"><i class="material-icons">&#xE872;</i></a>' +
                    '</td>'+
                '</tr>'
            )
        });

    }, 500);
}

function openAddModal() {
    ResetForm();
    openModal();
}

function openModal() {
    $('#myModal').modal('show');
}

function ResetForm() {
    document.getElementById("name").value ="";
    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("phone").value = "";
}

function hideModal() {
    $('#myModal').modal('hide');
}

function addEmployee() {
    var name = document.getElementById("name").value;
    var department = document.getElementById("department").value;
    var phone = document.getElementById("phone").value;

    employees.push(new Employee(name, department, phone));

    hideModal();
    showSuccessAlert();
    initTable();
}

function openUpdateModal(id) {
    var index = employees.findIndex(x => x.id==id);

    document.getElementById("id").value = employees[index].id;
    document.getElementById("name").value = employees[index].name;
    document.getElementById("department").value = employees[index].department;
    document.getElementById("phone").value = employees[index].phone;

    openModal();
}


function save() {
    var id = document.getElementById("id").value;
    if (id == null || id == "") {
        addEmployee();
    } else {
        updateEmployee();
    }
}

function updateEmployee() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var department = document.getElementById("department").value;
    var phone = document.getElementById("phone").value;

    var index = employees.findIndex(x => x.id == id);

    employees[index].name = name;
    employees[index].department = department;
    employees[index].phone = phone;

    hideModal();
    showSuccessAlert();
    initTable();
}

function showSuccessAlert() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").slideUp(500);
    })
}

function openConfirmDelete(id) {
    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);
    var name = employees[index].name;

    var result = confirm("Want to delete " + name + "?");
    if (result) {
        deleteEmployee(id);
    }
}

function deleteEmployee(id) {
    // TODO validate
    var index = employees.findIndex(x => x.id === id);
    employees.splice(index, 1);

    showSuccessAlert();
    initTable();
}
