'use strict';

var db = openDatabase('my_memo', '0.1', 'Test DB', 2 * 1024 * 1024);
var msg;

function createTable(){
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TODO (title, amount, prograss)');
});
}

function refreshList() {
    document.querySelector('#status').innerHTML = "List:";
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM TODO', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                msg = "<p><b>" + results.rows.item(i).title + " " + results.rows.item(i).prograss + "/" + results.rows.item(i).amount + "</b></p>";
                document.querySelector('#status').innerHTML += msg;
            }
        }, null);
    });
}

function addData() {
    var title = document.getElementById("title").value;
    var amount = document.getElementById("amount").value;
    var prograss = document.getElementById("prograss").value;
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM TODO WHERE title = ?', [title], function (tx, results) {
            if (results.rows.length == 0) {
                tx.executeSql('INSERT INTO TODO (title, amount, prograss) VALUES(?, ?, ?)', [title, amount, prograss]);
            }
            else{
                document.querySelector('#alert').innerHTML = "Already exist!";
            }
            refreshList();
        }, null);
        
    });
}

function deleteData(){
    db.transaction(function(tx){
        tx.executeSql('DELETE FROM TODO WHERE title = ?', [title]);
    });
}