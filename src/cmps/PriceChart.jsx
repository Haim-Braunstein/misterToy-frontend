import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


export function PriceChart({ toys }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    function averagePriceToy() {

        const averagePrices = {}

        toys.forEach(toy => {
            toy.labels.forEach(label => {
                averagePrices[label] = averagePrices[label] || { totalPrice: 0, count: 0 }
                averagePrices[label].totalPrice += toy.price
                averagePrices[label].count++
            })
        })

        for (const label in averagePrices) {
            averagePrices[label].averagePrice = (averagePrices[label].totalPrice / averagePrices[label].count).toFixed(2)
        }

        const chartData = Object.keys(averagePrices).map(label => {
            return {
                label: label,
                data: [parseFloat(averagePrices[label].averagePrice)]
            }
        })

        return chartData

    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Toys price per label',
                font: {
                    size: 25,
                },
                color: 'lightcoral',
            },

        },
    }

    const charData = averagePriceToy()

    const data = {
        labels: charData.map(item => item.label),
        datasets: [
            {
                label: 'Average price per label',
                data: charData.map(item => item.data[0]),
                backgroundColor: 'lightblue',

            }
        ]
    }

    return (
        <div className="price-chart-container" style={{ width: '600px', height: '600px' }}>
            <Bar options={options} data={data} />
        </div>
    )
}
