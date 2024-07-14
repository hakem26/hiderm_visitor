// tableHandler.js

/**
 * Add a new row to the sales table.
 * @param {Object} data - The data for the new row.
 */
function addRowToTable(data) {
    const table = document.getElementById('salesTable');
    const row = table.insertRow();

    row.insertCell(0).innerText = data.date;
    row.insertCell(1).innerText = data.productName;
    row.insertCell(2).innerText = data.quantity;
    row.insertCell(3).innerText = data.unitPrice;
    row.insertCell(4).innerText = data.discount;
    row.insertCell(5).innerText = data.totalPrice;
    row.insertCell(6).innerText = data.paymentType;
    row.insertCell(7).innerText = data.paymentDate;
    row.insertCell(8).innerText = data.balance;
}

/**
 * Update an existing row in the sales table.
 * @param {number} rowIndex - The index of the row to update.
 * @param {Object} data - The updated data.
 */
function updateRowInTable(rowIndex, data) {
    const table = document.getElementById('salesTable');
    const row = table.rows[rowIndex];

    row.cells[0].innerText = data.date;
    row.cells[1].innerText = data.productName;
    row.cells[2].innerText = data.quantity;
    row.cells[3].innerText = data.unitPrice;
    row.cells[4].innerText = data.discount;
    row.cells[5].innerText = data.totalPrice;
    row.cells[6].innerText = data.paymentType;
    row.cells[7].innerText = data.paymentDate;
    row.cells[8].innerText = data.balance;
}

/**
 * Delete a row from the sales table.
 * @param {number} rowIndex - The index of the row to delete.
 */
function deleteRowFromTable(rowIndex) {
    const table = document.getElementById('salesTable');
    table.deleteRow(rowIndex);
}

/**
 * Clear all rows from the sales table.
 */
function clearTable() {
    const table = document.getElementById('salesTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}
