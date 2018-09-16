const op1 = {
    legend: { display: false },
    title: {
        display: true,
        text: 'precio Moda'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
const op2 = {
    legend: { display: false },
    title: {
        display: true,
        text: 'Precencia'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
var data1 = $.post("/dash", { data: "1" }, function (e) {

    var ctx = document.getElementById("myChart1").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red Bull", "Rush", "Ciclon 500ml", "Black", "Monster"],
            datasets: [{
                label: 'Precio',
                data: e,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    '#7E57C2',
                    '#37474F',
                    '#43A047'
                ],
                borderWidth: 1
            }]
        },
        options: op1
    });

});
var data2 = $.post("/dash",{data:"2"},function(e){
    var ctx = document.getElementById("myChart2").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red Bull", "Rush", "Ciclon 500ml", "Black", "Monster"],
            datasets: [{
                label: '# de clientes',
                data: e,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    '#7E57C2',
                    '#37474F',
                    '#43A047'
                ],
                borderWidth: 1
            }]
        },
        options: op2
    });
});
var data3 = $.post("/dash",{data:"3"},function(e){
    console.log(e)
    var ctx = document.getElementById("myChart3").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: e.lab,
            datasets: [{
                data: e.valor,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    "#004D40",
                    "#FF6D00",
                    "#00C853"
                ],
                borderWidth: 1
            }]
        },
        options:{
            legend: { display: true },
            title: {
                display: true,
                text: 'Precencia'
            }
        }
    });
});
var data4 = $.post("/dash",{data:"4"},function(e){
    var data_G = document.getElementsByClassName("valor1");
    data_G[0].innerHTML = e[0];
    data_G[1].innerHTML = e[1];
    data_G[2].innerHTML = e[2];
})