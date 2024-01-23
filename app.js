document.addEventListener("DOMContentLoaded", function () {
  const googleBooksApiKey = "AIzaSyC45ditKLqG1YRLC-i06rDASh5MT2WAg-Q";
  const googleBooksApiUrl = "https://www.googleapis.com/books/v1/volumes";

  const openExchangeRatesApiKey = "3157cd2485ae40ed94bebd39ab3024d8";
  const openExchangeRatesApiUrl = "https://open.er-api.com/v6/latest";

  function generateRandomPrice() {
    const randomPrice = (Math.random() * (100 - 20) + 20).toFixed(2);
    return `$ ${randomPrice}`;
  }

  // Function to add featured books to the DOM
  function addFeaturedBooksToDOM(books) {
    const featuredBooksContainer = document.getElementById(
      "featured-books-container"
    );

    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("books");

      const image = document.createElement("img");
      image.src =
        book.volumeInfo.imageLinks?.thumbnail || "placeholder-image.jpg";
      image.alt = "Book Cover";

      const title = document.createElement("h3");
      title.textContent = book.volumeInfo.title;

      const author = document.createElement("p");
      author.textContent = book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author";

      const priceDiv = document.createElement("div");
      priceDiv.classList.add("price");

      const originalPrice = parseFloat(generateRandomPrice().slice(2));
      priceDiv.setAttribute("data-original-price", originalPrice);

      const price = document.createElement("p");
      price.textContent = generateRandomPrice();

      const seeDetailsButton = document.createElement("button");
      seeDetailsButton.textContent = "See Details";
      seeDetailsButton.addEventListener("click", () => showBookDetails(book));

      priceDiv.appendChild(price);

      bookElement.appendChild(image);
      bookElement.appendChild(title);
      bookElement.appendChild(author);
      bookElement.appendChild(priceDiv);
      bookElement.appendChild(seeDetailsButton);

      featuredBooksContainer.appendChild(bookElement);
    });
  }

  async function getRandomFeaturedBooks() {
    try {
      const response = await fetch(
        `${googleBooksApiUrl}?q=${encodeURIComponent(
          "JavaScript"
        )}&key=${googleBooksApiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch featured books");
      }

      const data = await response.json();
      const shuffledBooks = data.items.sort(() => Math.random() - 0.5);
      const randomFeaturedBooks = shuffledBooks.slice(0, 4);

      return randomFeaturedBooks;
    } catch (error) {
      console.error("Error fetching featured books:", error);
      throw error;
    }
  }

  // Example usage to fetch random featured books
  getRandomFeaturedBooks()
    .then((randomFeaturedBooksData) =>
      addFeaturedBooksToDOM(randomFeaturedBooksData)
    )
    .catch((error) =>
      console.error("Failed to fetch random featured books:", error)
    );

  const commonCurrencies = [
    "USD",
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL",
  ];

  // Function to update currency dropdown options
  function updateCurrencyDropdownOptions() {
    const toCurrencySelect = document.getElementById("to-currency");

    toCurrencySelect.innerHTML = "";

    commonCurrencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = currency;
      toCurrencySelect.appendChild(option);
    });
    toCurrencySelect.value = "EUR";
  }

  updateCurrencyDropdownOptions();

  // Function to handle currency conversion for a price
  async function convertPriceAndDisplay(
    priceDiv,
    originalPrice,
    targetCurrency
  ) {
    try {
      const exchangeRates = await getExchangeRates();
      const conversionRate = exchangeRates[targetCurrency];
      const convertedPrice = originalPrice * conversionRate;

      const price = document.createElement("p");

      priceDiv.textContent = `${targetCurrency} ${convertedPrice.toFixed(2)}`;
    } catch (error) {
      console.error("Currency conversion error:", error);
      throw error;
    }
  }

  // Function to get exchange rates
  async function getExchangeRates() {
    try {
      const response = await fetch(
        `${openExchangeRatesApiUrl}?apikey=${openExchangeRatesApiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      throw error;
    }
  }

  // Function to handle currency conversion for all prices
  async function handleCurrencyConversionForAll() {
    try {
      const currencySelect = document.getElementById("to-currency");
      const selectedCurrency = currencySelect.value;

      const priceDivs = document.querySelectorAll(".price");
      const conversionPromises = Array.from(priceDivs).map(async (priceDiv) => {
        const originalPrice = parseFloat(
          priceDiv.getAttribute("data-original-price")
        );
        await convertPriceAndDisplay(priceDiv, originalPrice, selectedCurrency);
      });

      await Promise.all(conversionPromises);
    } catch (error) {
      console.error("Currency conversion error:", error);
      throw error;
    }
  }

  // Event listener for the "Convert Currency" button
  const convertCurrencyButton = document.getElementById(
    "convert-currency-button"
  );
  convertCurrencyButton.addEventListener(
    "click",
    handleCurrencyConversionForAll
  );

  function showBookDetails(book) {
    const bookDetailsContainer = document.getElementById(
      "book-details-container"
    );
    bookDetailsContainer.innerHTML = "";

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      bookDetailsContainer.innerHTML = "";
    });

    const details = document.createElement("div");
    details.innerHTML = `
    <h2>${book.volumeInfo.title}</h2>
    <p>Author(s): ${
      book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author"
    }</p>
    <p>Price: ${generateRandomPrice()}</p>
    <p>Description: ${
      book.volumeInfo.description || "No description available."
    }</p>
    
    <img src="${
      book.volumeInfo.imageLinks?.thumbnail || "placeholder-image.jpg"
    }" alt="Book Cover">
  `;

    modal.appendChild(closeButton);
    modal.appendChild(details);
    bookDetailsContainer.appendChild(modal);
  }


  // async function getExchangeRates() {
  //   try {
  //     const response = await fetch(
  //       `${openExchangeRatesApiUrl}?apikey=${openExchangeRatesApiKey}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch exchange rates");
  //     }

  //     const data = await response.json();
  //     return data.rates;
  //   } catch (error) {
  //     console.error("Error fetching exchange rates:", error);
  //     throw error;
  //   }
  // }

  // // Function to handle currency conversion
  // async function handleConvert(amount, fromCurrency, toCurrency) {
  //   try {
  //     const exchangeRates = await getExchangeRates();

  //     const fromRate = exchangeRates[fromCurrency];
  //     const toRate = exchangeRates[toCurrency];

  //     if (isNaN(amount) || !fromRate || !toRate) {
  //       throw new Error("Invalid currency selection or amount");
  //     }

  //     const convertedAmount = (amount / fromRate) * toRate;
  //     return convertedAmount.toFixed(2);
  //   } catch (error) {
  //     console.error("Currency conversion error:", error);
  //     throw error;
  //   }
  // }

  // // Function to handle currency conversion and update the DOM
  // async function handleCurrencyConversion() {
  //   const amountInput = document.getElementById("amount");
  //   const fromCurrencySelect = document.getElementById("from-currency");
  //   const toCurrencySelect = document.getElementById("to-currency");

  //   const amount = parseFloat(amountInput.value);
  //   const fromCurrency = fromCurrencySelect.value;
  //   const toCurrency = toCurrencySelect.value;

  //   if (!isNaN(amount)) {
  //     try {
  //       const convertedAmount = await handleConvert(
  //         amount,
  //         fromCurrency,
  //         toCurrency
  //       );
  //       const conversionResultContainer =
  //         document.getElementById("conversion-results");
  //       conversionResultContainer.textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
  //     } catch (error) {
  //       alert("Failed to convert currency. Please check your inputs.");
  //     }
  //   } else {
  //     alert("Please enter a valid numeric amount for conversion.");
  //   }
  // }

  // function updateBookSearchDOM(bookData) {
  //   const bookResultsContainer = document.getElementById("book-results");
  //   bookResultsContainer.innerHTML = ""; // Clear previous results

  //   bookData.forEach((book) => {
  //     const bookCard = document.createElement("div");
  //     bookCard.classList.add("book-card");

  //     const title = document.createElement("h3");
  //     title.textContent = book.volumeInfo.title;

  //     const coverImage = document.createElement("img");
  //     coverImage.src =
  //       book.volumeInfo.imageLinks?.thumbnail || "placeholder-image.jpg";
  //     coverImage.alt = "Book Cover";

  //     const description = document.createElement("p");
  //     description.textContent =
  //       book.volumeInfo.description || "No description available.";

  //     bookCard.appendChild(title);
  //     bookCard.appendChild(coverImage);
  //     bookCard.appendChild(description);

  //     bookResultsContainer.appendChild(bookCard);
  //   });
  // }

  // function updateCurrencyConverterDOM(exchangeRates) {
  //   const conversionResultsContainer =
  //     document.getElementById("conversion-results");
  //   conversionResultsContainer.innerHTML = ""; // Clear previous results

  //   const currencies = Object.keys(exchangeRates);

  //   currencies.forEach((currency) => {
  //     const conversionResult = document.createElement("div");
  //     conversionResult.classList.add("conversion-result");

  //     const currencyCode = document.createElement("span");
  //     currencyCode.textContent = currency;

  //     const rate = document.createElement("span");
  //     rate.textContent = exchangeRates[currency].toFixed(2);

  //     conversionResult.appendChild(currencyCode);
  //     conversionResult.appendChild(rate);

  //     conversionResultsContainer.appendChild(conversionResult);
  //   });
  // }

  // // Function to handle book search
  // function handleBookSearch() {
  //   const bookQueryInput = document.getElementById("book-query");
  //   const bookQuery = bookQueryInput.value.trim();

  //   if (bookQuery) {
  //     getBookDetails(bookQuery)
  //       .then((bookData) => updateBookSearchDOM(bookData))
  //       .catch((error) => console.error("Book search failed:", error));
  //   } else {
  //     alert("Please enter a book title or author to search.");
  //   }
  // }

  // // Event listener for the convert button
  // const convertButton = document.getElementById("convert-button");
  // convertButton.addEventListener("click", handleCurrencyConversion);

  // // Event listener for the search button
  // const searchButton = document.getElementById("search-button");
  // searchButton.addEventListener("click", handleBookSearch);

  // // Example usage
  // const bookQuery = "JavaScript"; // User's book search query
  // getBookDetails(bookQuery)
  //   .then((bookData) => updateBookSearchDOM(bookData))
  //   .catch((error) => console.error("Book search failed:", error));

  // getExchangeRates()
  //   .then((exchangeRates) => updateCurrencyConverterDOM(exchangeRates))
  //   .catch((error) => console.error("Exchange rates update failed:", error));

  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');
  const close = document.querySelector('#close')

  hamburger.addEventListener("click", () =>{
     hamburger.classList.toggle("active");
     menu.classList.toggle("active");
  });

  if (close) {
    close.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

});
