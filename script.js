/* ============================================
   SECTION 1: INTERACTIVE FORM HANDLING
   - Read username and email
   - Prevent page refresh
   - Display a personalized message
============================================ */

const orderForm =
    document.querySelector("#order-form") ||
    document.querySelector("#feedback-form") ||
    document.querySelector("form");

if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usernameInput = document.querySelector("#username");
        const emailInput = document.querySelector("#email");
        const formMessage = document.querySelector("#form-message");

        const username = usernameInput ? usernameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";

        if (username !== "" && email !== "") {
            if (formMessage) {
                formMessage.textContent =
                    `Thank you for visiting, ${username}! We will contact you at ${email}.`;
            }
        } else {
            if (formMessage) {
                formMessage.textContent =
                    "Please enter your name and email address.";
            }
        }
    });
}


/* ============================================
   SECTION 2: PRODUCT TABLE ROW HIGHLIGHTING
   - Highlight a row on mouseover
   - Restore its background on mouseout
============================================ */

const productTable = document.querySelector("#product-table");

if (productTable) {
    const tableRows = productTable.querySelectorAll("tbody tr");

    tableRows.forEach(function (row) {
        row.addEventListener("mouseover", function () {
            row.style.backgroundColor = "#e1ebe6";
        });

        row.addEventListener("mouseout", function () {
            row.style.backgroundColor = "";
        });
    });
}

/* ============================================
   SECTION 3: LIGHT / DARK THEME SWITCHER
============================================ */

const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", function () {

        // Switch between light and dark themes
        document.body.classList.toggle("dark-mode");

        // Update button icon
        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "☀️";
            themeButton.setAttribute("aria-label", "Switch to light mode");
        } else {
            themeButton.textContent = "🌙";
            themeButton.setAttribute("aria-label", "Switch to dark mode");
        }
    });
}


/* ============================================
   SECTION 4: DYNAMIC ORDER TOTAL CALCULATOR
   - Read checked product prices
   - Recalculate total when a checkbox changes
============================================ */

const priceCheckboxes = document.querySelectorAll(
    '#order-form input[type="checkbox"][data-price]'
);

const totalElement = document.querySelector("#total");

function calculateOrderTotal() {
    let total = 0;

    priceCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            total += Number(checkbox.dataset.price) || 0;
        }
    });

    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    return total;
}

priceCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", calculateOrderTotal);
});

calculateOrderTotal();


/* ============================================
   SECTION 5: BIRTH YEAR AND DISCOUNT CHECK
   - Convert birth year using parseInt()
   - Calculate age using 2026
   - Display student/senior discount information
============================================ */

const birthYearInput = document.querySelector("#birth-year");
const discountMessage = document.querySelector("#discount-message");

if (birthYearInput) {
    birthYearInput.addEventListener("input", function () {
        const birthYear = parseInt(birthYearInput.value, 10);

        if (!discountMessage) {
            return;
        }

        if (birthYearInput.value.trim() === "") {
            discountMessage.textContent = "";
        } else if (
            Number.isNaN(birthYear) ||
            birthYear < 1900 ||
            birthYear > 2026
        ) {
            discountMessage.textContent =
                "Please enter a valid birth year.";
        } else {
            const age = 2026 - birthYear;

            if (age >= 16 && age <= 25) {
                discountMessage.textContent =
                    `Your age is ${age}. You may qualify for a student discount.`;
            } else if (age >= 60) {
                discountMessage.textContent =
                    `Your age is ${age}. You may qualify for a senior discount.`;
            } else {
                discountMessage.textContent =
                    `Your age is ${age}. No age-based discount applies.`;
            }
        }
    });
}


/* ============================================
   SECTION 6: READ MORE / READ LESS
   - Show or hide the extra About ANDAAZ text
   - Change the button label
============================================ */

const readMoreButton = document.querySelector("#read-more-btn");
const moreText = document.querySelector(".more-text");

if (readMoreButton && moreText) {
    // Start with the extra text hidden.
    moreText.style.display = "none";
    readMoreButton.textContent = "Read More";

    readMoreButton.addEventListener("click", function () {
        const isHidden = moreText.style.display === "none";

        if (isHidden) {
            moreText.style.display = "block";
            readMoreButton.textContent = "Read Less";
        } else {
            moreText.style.display = "none";
            readMoreButton.textContent = "Read More";
        }
    });
}


/* ============================================
   SECTION 7: LIVE PRODUCT CATEGORY FILTER
   - Works with existing .filter-btn buttons
   - Uses data-category values in your HTML
   - Supports All, Men, Women, Accessories
============================================ */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.category;

        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        // Show matching products and hide the others.
        productCards.forEach(function (card) {
            const productCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === productCategory
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* ============================================
   SECTION 8: DYNAMIC OPENING STATUS
   - Read the current hour
   - Open from 8 AM until 8 PM
   - Update the status text and color
============================================ */

const openingStatus = document.querySelector("#opening-status");

function updateOpeningStatus() {
    if (!openingStatus) {
        return;
    }

    const currentHour = new Date().getHours();

    if (currentHour >= 8 && currentHour < 20) {
        openingStatus.textContent = "We are Open!";
        openingStatus.style.color = "green";
    } else {
        openingStatus.textContent = "Closed - Open at 8 AM";
        openingStatus.style.color = "red";
    }
}

updateOpeningStatus();


/* ============================================
   SECTION 9: SPECIAL REQUEST CHARACTER COUNTER
   - Maximum length is 100 characters
   - Update the remaining count while typing
============================================ */

const specialNotes = document.querySelector("#special-notes");
const characterCount = document.querySelector("#character-count");

function updateCharacterCount() {
    if (!specialNotes || !characterCount) {
        return;
    }

    const remaining = 100 - specialNotes.value.length;

    characterCount.textContent =
        `${remaining} characters remaining`;
}

if (specialNotes && characterCount) {
    specialNotes.addEventListener("input", updateCharacterCount);
    updateCharacterCount();
}
