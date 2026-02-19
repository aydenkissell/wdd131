const paymentSelect = document.querySelector("#paymentMethod");
const creditSection = document.querySelector("#creditCardSection");
const paypalSection = document.querySelector("#paypalSection");
const form = document.querySelector("#checkoutForm");

paymentSelect.addEventListener("change", function () {

  creditSection.classList.add("hide");
  paypalSection.classList.add("hide");

  if (paymentSelect.value === "creditCard") {
    creditSection.classList.remove("hide");
  }

  if (paymentSelect.value === "paypal") {
    paypalSection.classList.remove("hide");
  }
});

function isCardNumberValid(number) {
  return number === "1234123412341234";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let errorMessage = "";
  document.querySelector(".errors").textContent = "";

  if (paymentSelect.value === "creditCard") {

    const cardNumber = document.querySelector("#creditCardNumber").value.trim();

    if (!/^\d{16}$/.test(cardNumber)) {
      errorMessage += "Card must be 16 digits\n";
    } else if (!isCardNumberValid(cardNumber)) {
      errorMessage += "Card number is not valid\n";
    }

    const month = Number(document.querySelector("#month").value);
    const year = Number(document.querySelector("#year").value);
    const currentDate = new Date();

    if (2000 + year < currentDate.getFullYear()) {
      errorMessage += "Card is expired\n";
    }
  }

  if (errorMessage !== "") {
    document.querySelector(".errors").textContent = errorMessage;
    return;
  }

  form.innerHTML = "<h2>Thank you for your purchase.</h2>";
});
