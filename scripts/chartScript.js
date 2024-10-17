$(document).ready(function () {
  const currency = "zł";
  const myChart = document.querySelector("#chart").getContext("2d");

  let bank = parseFloat(localStorage.getItem("bank")) || 0;
  let cash = parseFloat(localStorage.getItem("cash")) || 0;
  let savings = parseFloat(localStorage.getItem("savings")) || 0;

  const moneyChart = new Chart(myChart, {
    type: "doughnut",
    data: {
      labels: ["Bank", "Gotowka", "Oszczednosci"],
      datasets: [{
        label: "money",
        data: [bank, cash, savings],
        backgroundColor: ["#F44336", "#4CAF50", "#FFC107"],
        borderWidth: 1,
        borderColor: "black",
        width: "15px",
      }],
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 1,
      legend: {
        display: false,
      },
      cutoutPercentage: 65,
    },
  });

  function chartLoadUpdate() {
    const total = bank + cash + savings;
    moneyChart.data.datasets[0].data = [bank, cash, savings];
    moneyChart.update();

    if(total != 0){

    $("#bankBalance").html(
      `<span style="color: #F44336; font-weight: bold;">Bank: </span> ${bank} ${currency} (${((bank / total) * 100).toFixed(2)}%)`
    );
    $("#cashBalance").html(
      `<span style="color: #4CAF50; font-weight: bold;">Gotówka: </span> ${cash} ${currency} (${((cash / total) * 100).toFixed(2)}%)`
    );
    $("#savingsBalance").html(
      `<span style="color: #FFC107; font-weight: bold;">Oszczędności: </span> ${savings} ${currency} (${((savings / total) * 100).toFixed(2)}%)`
    );
  } else{
    $("#bankBalance").html(
      `<span style="color: #F44336; font-weight: bold;">Bank: </span> ${bank} ${currency} (0%)`
    );
    $("#cashBalance").html(
      `<span style="color: #4CAF50; font-weight: bold;">Gotówka: </span> ${cash} ${currency}  (0%)`
    );
    $("#savingsBalance").html(
      `<span style="color: #FFC107; font-weight: bold;">Oszczędności: </span> ${savings} ${currency}  (0%)`
    );
  }
}

  chartLoadUpdate();

  $("#Submit").click(function () {
    const amount = parseFloat($("#Amount").val());
    const acc = $("#account").val();

    if ($("#Deposit").prop("checked")) {
      switch (acc) {
        case "Bank":
          bank += amount;
          break;
        case "Cash":
          cash += amount;
          break;
        case "Savings":
          savings += amount;
          break;
      }
    } else if ($("#Withdrawal").prop("checked")) {
      switch (acc) {
        case "Bank":
          bank -= amount;
          break;
        case "Cash":
          cash -= amount;
          break;
        case "Savings":
          savings -= amount;
          break;
      }
    }

    localStorage.setItem("bank", bank.toString());
    localStorage.setItem("cash", cash.toString());
    localStorage.setItem("savings", savings.toString());
    chartLoadUpdate();
  });
});
