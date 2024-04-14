document.addEventListener('DOMContentLoaded', function() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const fromAmountInput = document.getElementById('fromAmount');
    const toAmountInput = document.getElementById('toAmount');
    const swapCurrenciesButton = document.getElementById('swapCurrencies');

    // Populating currency options dynamically
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'BRL'];
    currencies.forEach(currency => {
        const option1 = new Option(currency, currency);
        const option2 = new Option(currency, currency);
        fromCurrencySelect.appendChild(option1);
        toCurrencySelect.appendChild(option2);
    });

    // Set the default currency for the 'toCurrencySelect' to BRL
    toCurrencySelect.value = 'BRL';

    // Function to perform currency conversion
    async function convertCurrency() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        let amount;

        // Determine which input is filled and which select is changed
        

        if (fromAmountInput.value !== '' && (fromAmountInput === document.activeElement || fromCurrencySelect === document.activeElement || swapCurrenciesButton === document.activeElement)) {
            amount = fromAmountInput.value;
        } else if (toAmountInput.value !== '' && (toAmountInput === document.activeElement || toCurrencySelect === document.activeElement)) {
            amount = toAmountInput.value;
        } else {
            return; // If both inputs are empty or select doesn't match active input, no conversion needed
        }

        try {
            const response = await fetch(`/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`);
            const data = await response.json();

            // Update the correct input based on which one was empty before
            if (fromAmountInput.value !== '' && (fromAmountInput === document.activeElement || fromCurrencySelect === document.activeElement || swapCurrenciesButton === document.activeElement)) {
                toAmountInput.value = data;
            } else if (toAmountInput.value !== '' && (toAmountInput === document.activeElement || toCurrencySelect === document.activeElement)) {
                fromAmountInput.value = data;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to swap currencies
    function swapCurrencies() {
        const tempCurrency = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = tempCurrency;
        convertCurrency();
    }

    // Update the conversion result whenever the input or select values change
    function updateConversion() {
        convertCurrency();
    }

    // Event listeners to trigger conversion when input or select values change
    fromAmountInput.addEventListener('input', updateConversion);
    fromCurrencySelect.addEventListener('change', updateConversion);
    toAmountInput.addEventListener('input', updateConversion);
    toCurrencySelect.addEventListener('change', updateConversion);

    // Event listener for the 'swapCurrenciesButton'
    swapCurrenciesButton.addEventListener('click', swapCurrencies);
});
