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
                var rowId = results.rows.item(i).rowid;
                $("#status").append($('<div id=status' + rowId + '></div>'));
                $("#status" + rowId).append(results.rows.item(i).title + "　　　");
                $("#status" + rowId).append($('<input type= "number" id = "statusPrograss' + 
                                        rowId + '" style="width:50px" min = 0 max = '+ results.rows.item(i).amount + 
                                        ' value = ' + results.rows.item(i).prograss + 
                                        ' onblur = "var num = Number(this.value);if(num>this.max){this.value=this.max;}if(num<this.min)this.value=this.min;">'));
                $("#status" + rowId).append("/" + results.rows.item(i).amount+ "　　　");
                $("#status" + rowId).append($('<button id = "statusDel' + 
                                        rowId + '" onclick=updateData(' + 
                                        rowId + ')>更新</button>'));
                $("#status" + rowId).append($('<button id = "statusDel' + 
                                        rowId + '" onclick=deleteData(' + 
                                        rowId + ')>删除</button>'));
            }
        }, null);
    });
}

function addData() {
    var title = document.getElementById("title").value;
    var amount = document.getElementById("amount").value;
    if (title == "") {
        alertmsg.innerHTML = "No title";
        return;
    }
    if (amount == "") {
        alertmsg.innerHTML = "No amount";
        return;
    }
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM TODO WHERE title = ?', [title], function (tx, results) {
            if (results.rows.length == 0) {
                tx.executeSql('INSERT INTO TODO (title, amount, prograss) VALUES(?, ?, ?)', [title, amount, 0]);
                document.querySelector('#alert').innerHTML = "Success!";
            }
            else {
                document.querySelector('#alert').innerHTML = "Already exist!";
            }
            refreshList();
        }, null);
    });
}

function updateData(rowid){
    var prograss = $("#statusPrograss" + rowid).val();
    db.transaction(function(tx) {
        tx.executeSql('UPDATE TODO SET prograss=? WHERE rowid=?',[prograss, rowid]);
    });
    document.querySelector('#alert').innerHTML = "updated";
    refreshList();
}

function deleteData(rowid) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM TODO WHERE rowid = ?', [rowid]);
    });
    refreshList();
}