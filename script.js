var grid = document.getElementById('grid');
var test = false;
createGrid();
function createGrid() {
  grid.innerHTML="";
  for (var i=0; i<10; i++) {
    row = grid.insertRow(i);
    for (var j=0; j<10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var mine = document.createAttribute("mine-data");       
      mine.value = "false";             
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}
function addMines() {
  for (var i = 0; i < 20; i++) {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("mine-data", "true");
    if (test) cell.innerHTML = "O";
  }
}
function showMines() {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = grid.rows[i].cells[j];
      if (cell.getAttribute("mine-data") == "true")
        cell.className = "mine";
    }
  }
}
function check() {
  var win = true;
  for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++)
      if ((grid.rows[i].cells[j].getAttribute("mine-data") == "false") && (grid.rows[i].cells[j].innerHTML == ""))
        win = false;
  if (win)
    showMines();
}
const clickCell = (cell) => {

  if (cell.getAttribute("mine-data") == "true") {
    showMines();
    alert("Game Finished");
  } else {
    cell.className = "clicked";
    var mineCount = 0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;

    for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
      for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
        if (grid.rows[i].cells[j].getAttribute("mine-data") == "true") {
          mineCount++;
        }
      }
    }
    cell.innerHTML = mineCount;
    if (mineCount == 0) {
      for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
          if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    check();
  }
}