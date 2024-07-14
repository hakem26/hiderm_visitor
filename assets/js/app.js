// Initialize date picker for all input elements with data-jdp attribute
document.addEventListener('DOMContentLoaded', () => {
    jalaliDatepicker.startWatch();
});

// Function to handle partner selection and switch to month selection
function selectPartner() {
    document.getElementById('partnerSelection').style.display = 'none';
    document.getElementById('monthSelection').style.display = 'block';
}

// Function to handle month selection and display data for the selected month
function selectMonth() {
    const selectedMonth = document.getElementById('month').value; // Changed 'monthSelect' to 'month'
    console.log('دکمه انتخاب ماه کلیک شد');
    // Implement logic to display data for the selected month
    document.getElementById('monthSelection').style.display = 'none';
    document.getElementById('dataDisplay').style.display = 'block';
}

// Add event listener for the select month button
document.getElementById('selectMonthBtn').addEventListener('click', selectMonth);

// Function to add an item to the invoice
function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = parseFloat(document.getElementById('itemQuantity').value);
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (itemName && itemQuantity > 0 && itemPrice > 0) {
        const table = document.getElementById('itemsTable');
        const row = table.insertRow(-1);
        row.insertCell(0).textContent = itemName;
        row.insertCell(1).textContent = itemQuantity;
        row.insertCell(2).textContent = itemPrice.toFixed(2);
        row.insertCell(3).textContent = (itemQuantity * itemPrice).toFixed(2);

        // Reset form fields
        document.getElementById('itemName').value = '';
        document.getElementById('itemQuantity').value = '';
        document.getElementById('itemPrice').value = '';
    } else {
        alert('Please enter valid item details.');
    }
}

// Function to calculate and update totals
function updateTotals() {
    const rows = document.querySelectorAll('#itemsTable tr');
    let totalAmount = 0;

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 3) {
            totalAmount += parseFloat(cells[3].textContent);
        }
    });

    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

// Function to save the invoice
function saveInvoice() {
    const invoiceDate = document.getElementById('invoiceDate').value;
    const customerName = document.getElementById('customerName').value;
    const totalAmount = parseFloat(document.getElementById('totalAmount').textContent);

    if (invoiceDate && customerName && totalAmount > 0) {
        const invoice = {
            date: invoiceDate,
            customer: customerName,
            total: totalAmount,
            items: Array.from(document.querySelectorAll('#itemsTable tr')).map(row => {
                const cells = row.querySelectorAll('td');
                return {
                    name: cells[0].textContent,
                    quantity: parseFloat(cells[1].textContent),
                    price: parseFloat(cells[2].textContent),
                    total: parseFloat(cells[3].textContent),
                };
            }).filter(item => item.name)
        };

        console.log('Invoice saved:', invoice);
        alert('Invoice saved successfully!');
        // Implement logic to save invoice to server or local storage
    } else {
        alert('Please enter valid invoice details.');
    }
}

// Function to delete an item from the invoice
function deleteItem(row) {
    row.parentNode.removeChild(row);
    updateTotals();
}

// Event listener for item form submission
document.getElementById('itemForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addItem();
});

// Event listener for save invoice button
document.getElementById('saveInvoiceButton').addEventListener('click', saveInvoice);

// Event listener for delete item button
document.querySelectorAll('.deleteItemButton').forEach(button => {
    button.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        deleteItem(row);
    });
});
