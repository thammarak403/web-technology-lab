const form = document.getElementById("budgetForm");
const itemInput = document.getElementById("item");
const amountInput = document.getElementById("amount");
const typeInputs = document.querySelectorAll('input[name="ประเภท"]');

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const balance = document.getElementById("balance");

const transactionList = document.getElementById("transactionList");

let transactions = [
  { id: 1, title: "เงินค่าขนม", amount: 1000, type: "รายรับ" },
  { id: 2, title: "ค่าอาหาร", amount: 80, type: "รายจ่าย" },
  { id: 3, title: "ค่าเดินทาง", amount: 50, type: "รายจ่าย" },
  { id: 4, title: "เงินเดือนพิเศษ", amount: 500, type: "รายรับ" },
  { id: 5, title: "ค่าน้ำมัน", amount: 100, type: "รายจ่าย" }
];

function renderTransactions() {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = "<li>ยังไม่มีรายการ</li>";
    return;
  }

  transactions.forEach(function (transaction) {
    const listItem = document.createElement("li");
    listItem.textContent = transaction.title + " : " + transaction.amount + " บาท (" + transaction.type + ") ";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "ลบ";

    deleteBtn.addEventListener("click", function () {
      if (!confirm("ต้องการลบรายการนี้ใช่ไหม?")) return;

      transactions = transactions.filter(function (t) {
        return t.id !== transaction.id;
      });
      renderTransactions();
      updateSummary();
    });

    listItem.appendChild(deleteBtn);
    transactionList.appendChild(listItem);
  });
}

function updateSummary() {
  const incomeList = transactions.filter(function (t) {
    return t.type === "รายรับ";
  });
  const incomeSum = incomeList.reduce(function (sum, t) {
    return sum + t.amount;
  }, 0);

  const expenseList = transactions.filter(function (t) {
    return t.type === "รายจ่าย";
  });
  const expenseSum = expenseList.reduce(function (sum, t) {
    return sum + t.amount;
  }, 0);

  const balanceSum = incomeSum - expenseSum;

  totalIncome.textContent = "รายรับรวม: " + incomeSum + " บาท";
  totalExpense.textContent = "รายจ่ายรวม: " + expenseSum + " บาท";
  balance.textContent = "ยอดคงเหลือ: " + balanceSum + " บาท";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = itemInput.value;
  const price = Number(amountInput.value);

  let type = "";
  typeInputs.forEach(function (input) {
    if (input.checked) {
      type = input.value;
    }
  });

  const newTransaction = {
    id: transactions.length + 1,
    title: title,
    amount: price,
    type: type
  };

  transactions.push(newTransaction);
  renderTransactions();
  updateSummary();
  form.reset();
});

renderTransactions();
updateSummary();