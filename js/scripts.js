// var select = document.getElementById('select');
// var costs = document.getElementById('costs');
// var title = document.getElementById('title');
// var button = document.getElementById('add');
var incomeTable;
var expensesTable;


function App() {
    this.saldo = 0;
    this.income = 0;
    this.expenses = 0;
    this.date = new Date();
    this.item = {};
    this.fields = {
        sal: document.getElementById('saldo'),
        inc: document.getElementById('income'),
        exp: document.getElementById('expenses')

    }
    this.form = {
        select: document.getElementById('select'),
        costs: document.getElementById('costs'),
        title: document.getElementById('title'),
        button: document.getElementById('add')
    };

    this.form.button.onclick = function () {
        //validate
        this.getItem();
        this.updateFields();
        this.addToTable();

    }.bind(this);

}

App.prototype.init = function () {
    var months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',
        'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik',
        'Listopad', 'Grudzień'];
    var dataField = document.getElementById('date');
    dataField.innerHTML = months[this.date.getMonth()] + " " + this.date.getFullYear();
    this.fields.sal.innerHTML = +this.saldo + " zł";
    this.fields.inc.innerHTML = +this.income + " zł";
    this.fields.exp.innerHTML = +this.expenses + " zł";
}

App.prototype.getItem = function () {
    this.item = {
        sign: select.options[select.selectedIndex].value,
        costs: costs.value,
        title: title.value
    }
}

function formatNumbers(number) {
    return number.toLocaleString("de-DE");
}

App.prototype.updateFields = function () {
    if (this.item.sign === "+") {
        this.saldo += Number.parseFloat(this.item.costs);
        this.income += Number.parseFloat(this.item.costs);
        this.fields.inc.innerHTML = formatNumbers(this.income) + " zł";
        formatNumbers(this.income);
    }
    else {
        this.saldo -= Number.parseFloat(this.item.costs);
        this.expenses -= Number.parseFloat(this.item.costs);
        this.fields.exp.innerHTML = this.expenses + " zł";
    }


    if (this.saldo !== 0) {
        if (this.saldo > 0) {
            this.fields.sal.classList.remove('negative');
            this.fields.sal.classList.add('positive');
            this.fields.sal.innerHTML = "+" + formatNumbers(Number(this.saldo)) + " zł";
        } else if (this.saldo < 0) {
            this.fields.sal.classList.remove('positive');
            this.fields.sal.classList.add('negative');
            this.fields.sal.innerHTML = +this.saldo + " zł";
        }
    } else {
        this.fields.sal.classList.remove('positive', 'negative');
    }

    //resetForm
    this.form.costs.value = "";
    this.form.title.value = "";
    this.form.select.selectedIndex = 0;
    this.form.button.disabled = true;


}


App.prototype.addToTable = function () {
    var table;
    if (this.item.sign === "+") table = document.getElementById('incomeTable').getElementsByTagName('tbody')[0];
    else table = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];

    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = this.item.title;
    cell2.innerHTML = this.item.sign + " " + this.item.costs + " zł";

}


var app = new App();
app.init();
var validate = new Validator(app.form);


function Validator(form) {
    this.form = form;
    this.fields = {
        costs: this.form.costs,
        title: this.form.title,
        button: this.form.button
    },
        this.isValid1 = false;
    this.isValid2 = false;

    this.fields.costs.oninput = function () {
        this.isValid1 = this.validateNum(this.fields.costs);

        if (this.isValid1 && this.isValid2) this.fields.button.disabled = false;
        else this.fields.button.disabled = true;

    }.bind(this);

    this.fields.title.oninput = function () {
        this.isValid2 = this.validateString(this.fields.title);

        if (this.isValid1 && this.isValid2) this.fields.button.disabled = false;
        else this.fields.button.disabled = true;

    }.bind(this);

    // this.fields.button




}

// Validator.prototype.showErrors=function(){

// }
Validator.prototype.validate = function (fields) {
    var valid = true;
    //number Field validate
    this.validateNum(this.fields.costs);

    //textField validate
    this.validateString(this.fields.title);

    // if(valid) this.fields.button.disabled=false;


}

Validator.prototype.validateNum = function (field) {
    var value = Number(field.value);

    if (Number.isNaN(value) || value < 0 || value > 100000000) {
        field.classList.add('invalid');
        return false;
    } else {
        field.classList.remove('invalid');
        return true;
    }
}

Validator.prototype.validateString = function (field) {
    var fieldValid = field.validity.valid;

    if (!fieldValid) {
        field.classList.add('invalid');
        return false;
    } else {
        field.classList.remove('invalid');
        return true;
    }

}