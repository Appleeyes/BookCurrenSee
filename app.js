document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".nav-menu");
  const close = document.querySelector("#close");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  if (close) {
    close.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }
  
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
        `${googleBooksApiUrl}?q=${encodeURIComponent([
          "science",
          "javascript",
          "php",
        ])}&key=${googleBooksApiKey}`
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

  getRandomFeaturedBooks()
    .then((randomFeaturedBooksData) =>
      addFeaturedBooksToDOM(randomFeaturedBooksData)
    )
    .catch((error) =>
      console.error("Failed to fetch random featured books:", error)
    );

  // Function to add all books to the DOM
  function addAllBooksToDOM(books) {
    const allBooksContainer = document.getElementById("all-books-container");

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

      allBooksContainer.appendChild(bookElement);
    });
  }

  async function getRandomBooks() {
    const desiredCount = 52;
    let fetchedBooks = [];
    let offset = 0;

    while (fetchedBooks.length < desiredCount) {
      try {
        const response = await fetch(
          `${googleBooksApiUrl}?q=${encodeURIComponent([
            "science",
            "javascript",
            "php",
          ])}&key=${googleBooksApiKey}&startIndex=${offset}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        const newBooks = data.items || [];
        fetchedBooks = fetchedBooks.concat(newBooks);

        offset += newBooks.length;
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    }

    const shuffledBooks = fetchedBooks.sort(() => Math.random() - 0.5);

    return shuffledBooks.slice(0, desiredCount);
  }

  getRandomBooks()
    .then((randomBooksData) => addAllBooksToDOM(randomBooksData))
    .catch((error) => console.error("Failed to fetch random books:", error));

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
    <h2 style="font-size: 12px";>${book.volumeInfo.title}</h2>
    <p>Author(s): ${
      book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author"
    }</p>
    <p style="font-size: 10px";>Price: ${generateRandomPrice()}</p>
    <p style="font-size: 10px";>Description: ${
      book.volumeInfo.description || "No description available."
    }</p>
    
    <img style="width: 50px; height: 50px;" src="${
      book.volumeInfo.imageLinks?.thumbnail || "placeholder-image.jpg"
    }" alt="Book Cover">
  `;

    modal.appendChild(closeButton);
    modal.appendChild(details);
    bookDetailsContainer.appendChild(modal);
  }

  const bookQueryInput = document.getElementById("book-query");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", function () {
    const query = bookQueryInput.value.trim();

    if (query.length > 0) {
      const allBooksContainer = document.getElementById("all-books-container");
      allBooksContainer.innerHTML = "";
      searchBooks(query);
    }
  });

  async function searchBooks(query) {
    try {
      const response = await fetch(
        `${googleBooksApiUrl}?q=${encodeURIComponent(
          query
        )}&key=${googleBooksApiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      const books = data.items || [];

      addAllBooksToDOM(books);
    } catch (error) {
      console.error("Error searching books:", error);
      throw error;
    }
  }
});
