// UAE VAT Calculator Logic

let currentMode = 'add'; // 'add' = amount is excl. VAT, 'remove' = amount is incl. VAT

const addBtn = document.getElementById('addModeBtn');
const removeBtn = document.getElementById('removeModeBtn');
const amountLabel = document.getElementById('amountLabel');

addBtn.addEventListener('click', function () {
  currentMode = 'add';
  addBtn.classList.add('active');
  removeBtn.classList.remove('active');
  amountLabel.textContent = 'Amount Excluding VAT (AED)';
});

removeBtn.addEventListener('click', function () {
  currentMode = 'remove';
  removeBtn.classList.add('active');
  addBtn.classList.remove('active');
  amountLabel.textContent = 'Amount Including VAT (AED)';
});

document.getElementById('calculateBtn').addEventListener('click', function () {
  const amount = parseFloat(document.getElementById('amount').value);
  const vatRate = parseFloat(document.getElementById('vatRate').value);

  if (!amount || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  let netAmount, vatAmount, totalAmount;

  if (currentMode === 'add') {
    // User gave the amount before VAT — add VAT on top
    netAmount = amount;
    vatAmount = netAmount * (vatRate / 100);
    totalAmount = netAmount + vatAmount;
  } else {
    // User gave the total including VAT — work backwards to find the VAT portion
    totalAmount = amount;
    netAmount = totalAmount / (1 + vatRate / 100);
    vatAmount = totalAmount - netAmount;
  }

  document.getElementById('netAmount').textContent = netAmount.toFixed(2) + ' AED';
  document.getElementById('vatAmount').textContent = vatAmount.toFixed(2) + ' AED';
  document.getElementById('totalAmount').textContent = totalAmount.toFixed(2) + ' AED';
  document.getElementById('vatRateDisplay').textContent = vatRate;

  document.getElementById('result').style.display = 'block';
});

document.getElementById('printBtn').addEventListener('click', function () {
  window.print();
});
