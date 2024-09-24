// Ensure MeiliSearch is loaded
if (typeof MeiliSearch === 'undefined') {
  console.error('MeiliSearch client is not loaded.');
} else {
  // Initialize Meilisearch Client
  const client = new MeiliSearch({
    host: 'http://127.0.0.1:7700',
    apiKey: '1234'
  });

  // Reference to the grocery index
  const index = client.index('grocery');

  // Debounce function to limit the rate of API calls
  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Function to perform search
  async function performSearch(query) {
    try {
      const startTime = performance.now(); // Start timer

      const searchParams = {
        q: query,
        limit: 50 // Adjust as needed
      };
      const results = await index.search(searchParams.q, searchParams);

      const endTime = performance.now(); // End timer
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Time in seconds with 2 decimal places

      displayResults(results.hits);
      displaySearchTime(timeTaken);
    } catch (error) {
      console.error('Search Error:', error);
      displayResults([]);
      displaySearchTime('Error');
    }
  }

  // Function to display search results
  function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (items.length === 0) {
      resultsDiv.innerHTML = '<p class="text-center text-gray-500">No items found.</p>';
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-white p-4 rounded-lg shadow-md flex flex-col';

      // Image
      const img = document.createElement('img');
      img.src = item.photo_url;
      img.alt = item.name;
      img.className = 'h-40 w-full object-cover rounded-t-lg mb-4';
      card.appendChild(img);

      // Name
      const name = document.createElement('h2');
      name.textContent = item.name;
      name.className = 'text-xl font-semibold mb-2';
      card.appendChild(name);

      // Prices
      const priceContainer = document.createElement('div');
      priceContainer.className = 'mb-2';

      // Original Price
      const originalPrice = document.createElement('span');
      originalPrice.textContent = `$${item.price.toFixed(2)}`;
      originalPrice.className = 'text-gray-500 line-through mr-2';
      priceContainer.appendChild(originalPrice);

      // Current Price
      const currentPrice = document.createElement('span');
      currentPrice.textContent = `$${item.current_price.toFixed(2)}`;
      currentPrice.className = 'text-green-600 font-bold';
      priceContainer.appendChild(currentPrice);

      card.appendChild(priceContainer);

      // Discount Percentage
      if (item.discount_percentage > 0) {
        const discount = document.createElement('span');
        discount.textContent = `${item.discount_percentage}% OFF`;
        discount.className = 'text-sm text-red-500 mb-2';
        card.appendChild(discount);
      }

      // Buy Button
      const buyButton = document.createElement('a');
      buyButton.href = item.buy_button_url;
      buyButton.target = '_blank';
      buyButton.textContent = 'Buy Now';
      buyButton.className = 'mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center';
      card.appendChild(buyButton);

      resultsDiv.appendChild(card);
    });
  }

  // Function to display search time
  function displaySearchTime(time) {
    const searchTimeP = document.getElementById('search-time');
    const timeValueSpan = document.getElementById('time-value');

    if (time === 'Error') {
      timeValueSpan.textContent = 'N/A';
    } else {
      timeValueSpan.textContent = time;
    }

    // Show the search time element
    searchTimeP.classList.remove('hidden');
  }

  // Event Listener for Search Input with Debounce
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      performSearch(query);
    } else {
      // Clear results and hide search time if query is empty
      document.getElementById('results').innerHTML = '';
      document.getElementById('search-time').classList.add('hidden');
    }
  }, 300)); // 300ms delay
}
