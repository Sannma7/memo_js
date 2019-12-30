'use strict';

var db = openDatabase('my_memo', '0.1', 'Test DB', 2 * 1024 * 1024);
var msg;
var alertmsg = document.getElementById('alert');
var statusTable = document.getElementById('status');

$(document).ready(function () {
    createTable();
    refreshList();
});