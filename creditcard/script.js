const form = document.querySelector("#cardForm");
const message = document.querySelector(".message");

function isCardNumberValid(number) {
  return number === "1234123412341234";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  message.textContent = "";
  message.style.color = "red";

  const cardNumber = document.querySelector("#cardNumber").value.trim();
  const month = Number(document.querySelector("#month").value);
  const year = Number(document.querySelector("#year").value);

  if (!isCardNumberValid(cardNumber)) {
    message.textContent = "Card number must be 1234123412341234";
    return;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (2000 + year < currentYear ||
      (2000 + year === currentYear && month < currentMonth)) {
    message.textContent = "Card is expired";
    return;
  }

  message.style.color = "green";
  message.textContent = "Payment Successful!";
});