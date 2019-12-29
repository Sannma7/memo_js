'use strict';


function createTable() {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS TODO (title, amount, prograss)');
    });
}

function refreshList() {
    $("#status").empty();
    statusTable.innerHTML = "List:<br>";
    db.transaction(function (tx) {
        tx.executeSql('SELECT rowid,* FROM TODO', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                msg = "<b>" + results.rows.item(i).title + " " + results.rows.item(i).prograss + "/" + results.rows.item(i).amount + "</b>";
                $("#status").append(msg);
                $("#status").append($('<input type="button" value="删除" onclick=deleteData(' + results.rows.item(i).rowid + ')>'));
                $("#status").append("<br>");
            }
        }, null);
    });
}

function addData() {
    var title = document.getElementById("title").value;
    var amount = document.getElementById("amount").value;
    var prograss = document.getElementById("prograss").value;
    if (title == "") {
        alertmsg.innerHTML = "No title";
        return;
    }
    if (amount == "") {
        alertmsg.innerHTML = "No amount";
        return;
    }
    if (prograss == "") {
        alertmsg.innerHTML = "No prograss";
        return;
    }
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM TODO WHERE title = ?', [title], function (tx, results) {
            if (results.rows.length == 0) {
                tx.executeSql('INSERT INTO TODO (title, amount, prograss) VALUES(?, ?, ?)', [title, amount, prograss]);
                document.querySelector('#alert').innerHTML = "Success!";
            }
            else {
                document.querySelector('#alert').innerHTML = "Already exist!";
            }
            refreshList();
        }, null);
    });
}

function deleteData(rowid) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM TODO WHERE rowid = ?', [rowid]);
    });
    refreshList();
}

function createInput() {
    $("status").append($('<input type="button" value="new but" />'));
}