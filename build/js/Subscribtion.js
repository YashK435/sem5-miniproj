// Pricing for each plan
const monthlyPrices = {
    trial: 'Free',
    fastStart: " 99",
    accelerate: " 199",
  };
  
  const annualPrices = {
    trial: 'Free',
    fastStart: " 599", // Multiply by 10 for annual
    accelerate: " 999", // Multiply by 10 for annual
  };
  
  // Get the buttons and price elements
  const monthlyBtn = document.getElementById('monthlyBtn');
  const annualBtn = document.getElementById('annualBtn');
  const price1 = document.getElementById('price1');
  const price2 = document.getElementById('price2');
  const price3 = document.getElementById('price3');
  
  // Function to update prices
  function updatePrices(pricing) {
    price1.textContent = pricing.trial;
    price2.textContent = `₹${pricing.fastStart}`;
    price3.textContent = `₹${pricing.accelerate}`;
  }
  
  // Event listeners for the buttons
  monthlyBtn.addEventListener('click', function () {
    this.classList.add('active');
    annualBtn.classList.remove('active');
    updatePrices(monthlyPrices);
  });
  
  annualBtn.addEventListener('click', function () {
    this.classList.add('active');
    monthlyBtn.classList.remove('active');
    updatePrices(annualPrices);
  });
  