// HTML elements
const salesTable = document.getElementById('sales-tbody');
const formContent = document.getElementById('form-content');
const dateInput = document.getElementById('date');
const openDayBtn = document.getElementById('open-day-btn');
const closeDayBtn = document.getElementById('close-day-btn');
const addItemBtn = document.getElementById('add-item-btn');
const saveSaleBtn = document.getElementById('save-sale-btn');
const productNameInput = document.getElementById('product-name');
const quantityInput = document.getElementById('quantity');
const unitPriceInput = document.getElementById('unit-price');
const discountInput = document.getElementById('discount');
const paymentInput = document.getElementById('payment');
const paymentTypeInput = document.getElementById('paymentType');
const paymentDateInput = document.getElementById('paymentDate');
const productList = document.getElementById('product-list');
const itemsSummary = document.getElementById('items-summary');
const buyerInput = document.getElementById('buyer');

// Initial variables
let sales = [];
let products = {};
let currentEditingItemIndex = null;
let currentEditingSaleIndex = null;

// Load sales and products from localStorage on page load
function loadSales() {
    const savedSales = localStorage.getItem('sales');
    if (savedSales) {
        sales = JSON.parse(savedSales);
    }

    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }

    updateProductList();
    renderTable();
}

// Save sales to localStorage
function saveSales() {
    localStorage.setItem('sales', JSON.stringify(sales));
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Render sales table
function renderTable() {
    let html = '';
    sales.forEach((sale, index) => {
        html += `
        <tr data-index="${index}">
            <td>${sale.date}</td>
            <td>${sale.buyer}</td>
            <td>${renderItems(sale.items, index)}</td>
            <td>${sale.total}</td>
            <td>${sale.discount}</td>
            <td>${sale.payment}</td>
            <td>${sale.paymentType || ''}</td>
            <td>${sale.paymentDate || ''}</td>
            <td>${sale.balance}</td>
            <td>
                <button type="button" onclick="editSale(${index})">ویرایش</button>
                <button type="button" onclick="deleteSale(${index})">حذف</button>
            </td>
        </tr>`;
    });

    salesTable.innerHTML = html;
}

// Render items in a sale
function renderItems(items, saleIndex) {
    return items.map((item, itemIndex) => {
        const [productName, quantity, unitPrice] = item.split('-');
        return `${productName} (${quantity} عدد) - ${unitPrice} تومان
                <button type="button" class="edit-item-btn hidden" onclick="editItem(${saleIndex}, ${itemIndex})">ویرایش</button>
                <button type="button" class="delete-item-btn hidden" onclick="deleteItem(${saleIndex}, ${itemIndex})">حذف</button>`;
    }).join('<br>');
}

// Update product list dropdown
function updateProductList() {
    productList.innerHTML = Object.keys(products).map(product => `<option value="${product}">`).join('');
}

// Edit a sale
function editSale(index) {
    const sale = sales[index];
    currentEditingSaleIndex = index;
    dateInput.value = sale.date;
    buyerInput.value = sale.buyer;
    itemsSummary.value = sale.items.join('\n');
    discountInput.value = sale.discount;
    paymentInput.value = sale.payment;
    paymentTypeInput.value = sale.paymentType || '';
    paymentDateInput.value = sale.paymentDate || '';

    formContent.classList.remove('hidden');
    openDayBtn.disabled = true;
    closeDayBtn.disabled = false;

    // Show item edit and delete buttons
    const editItemButtons = document.querySelectorAll(`tr[data-index="${index}"] .edit-item-btn`);
    const deleteItemButtons = document.querySelectorAll(`tr[data-index="${index}"] .delete-item-btn`);
    editItemButtons.forEach(btn => btn.classList.remove('hidden'));
    deleteItemButtons.forEach(btn => btn.classList.remove('hidden'));
}

// Delete a sale
function deleteSale(index) {
    sales.splice(index, 1);
    saveSales();
    renderTable();
}

// Open day button event listener
openDayBtn.addEventListener('click', () => {
    formContent.classList.remove('hidden');
    openDayBtn.disabled = true;
    closeDayBtn.disabled = false;
    dateInput.disabled = true;
});

// Close day button event listener
closeDayBtn.addEventListener('click', () => {
    localStorage.removeItem('sales');
    localStorage.removeItem('products');
    clearForm();
    formContent.classList.add('hidden');
    dateInput.disabled = false;
    openDayBtn.disabled = false;
});

// Add item to items summary
addItemBtn.addEventListener('click', () => {
    const productName = productNameInput.value.trim();
    const quantity = parseInt(quantityInput.value, 10);
    const unitPrice = parseFloat(unitPriceInput.value);

    if (!productName || isNaN(quantity) || isNaN(unitPrice)) return;

    const itemString = `${productName}-${quantity}-${unitPrice}`;
    const currentSummary = itemsSummary.value.split('\n').filter(item => item.trim() !== '');

    if (currentEditingItemIndex !== null) {
        currentSummary[currentEditingItemIndex] = itemString;
        currentEditingItemIndex = null;
    } else {
        currentSummary.push(itemString);
    }

    itemsSummary.value = currentSummary.join('\n');
});

// Clear form inputs
function clearForm(clearBuyer = true) {
    if (clearBuyer) {
        buyerInput.value = '';
    }
    productNameInput.value = '';
    quantityInput.value = 1;
    unitPriceInput.value = '';
    discountInput.value = '0';
    paymentInput.value = '0';
    paymentTypeInput.value = '';
    paymentDateInput.value = '';
}

// Save sale button event listener
saveSaleBtn.addEventListener('click', () => {
    const date = dateInput.value;
    const buyer = buyerInput.value.trim();
    const discount = parseFloat(discountInput.value);
    const payment = parseFloat(paymentInput.value);
    const paymentType = paymentTypeInput.value.trim();
    const paymentDate = paymentDateInput.value;
    const itemsSummaryList = itemsSummary.value.split('\n').filter(item => item.trim() !== '');
    const total = itemsSummaryList.reduce((sum, item) => sum + parseFloat(item.split('-')[2] * item.split('-')[1]), 0);
    const balance = total - discount - payment;

    const sale = {
        date,
        buyer,
        items: itemsSummaryList,
        total: total,
        discount: discount,
        payment: payment,
        paymentType,
        paymentDate,
        balance: balance,
    };

    if (currentEditingSaleIndex !== null) {
        sales[currentEditingSaleIndex] = sale;
        currentEditingSaleIndex = null;
    } else {
        sales.push(sale);
    }

    saveSales();
    renderTable();
    clearForm();
    itemsSummary.value = '';
    dateInput.disabled = true;
});

// Edit an item in items summary
function editItem(saleIndex, itemIndex) {
    const sale = sales[saleIndex];
    const items = sale.items;
    const item = items[itemIndex];
    const [productName, quantity, unitPrice] = item.split('-');

    productNameInput.value = productName;
    quantityInput.value = quantity;
    unitPriceInput.value = unitPrice;

    currentEditingItemIndex = itemIndex;
}

// Delete an item from items summary
function deleteItem(saleIndex, itemIndex) {
    const sale = sales[saleIndex];
    sale.items.splice(itemIndex, 1);
    saveSales();
    renderTable();
}

// Convert Gregorian date to Jalali date (if needed)
function toJalaali(date) {
    // Implementation for converting Gregorian date to Jalali can be added here if necessary
    return date; // Placeholder, replace with actual implementation
}

// Convert Jalali date to Gregorian date (if needed)
function toGregorian(date) {
    // Implementation for converting Jalali date to Gregorian can be added here if necessary
    return date; // Placeholder, replace with actual implementation
}

// Load sales and products on page load
window.onload = function () {
    loadSales();
    const today = new Date();
    const gregorianToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    dateInput.value = toJalaali(gregorianToday);
};
