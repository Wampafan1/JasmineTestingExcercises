window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values  = { amount: 17000, years: 5, rate: 7 };
  const amountUI = document.getElementById("loan-amount");
  amountUI.value = values.amount;
  const yearsUI = document.getElementById("loan-years");
  yearsUI.value = values.years;
  const rateUI = document.getElementById("loan-rate");
  rateUI.value = values.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues();

  updateMonthly(calculateMonthlyPayment(values));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  // Convert annual interest rate to monthly rate and ensure it's a decimal.
  const monthlyInterestRate = (values.rate / 100) / 12;

  // Calculate the total number of payments.
  const numberOfPayments = values.years * 12;

  // Calculate the monthly payment using the formula.
  const monthlyPayment =
    (values.amount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // Replace with your desired currency code (e.g., 'EUR', 'GBP')
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  document.getElementById('monthly-payment').innerText = formatter.format(monthly);
}
