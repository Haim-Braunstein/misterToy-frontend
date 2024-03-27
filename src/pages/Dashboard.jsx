import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.actions';
import { PriceChart } from '../cmps/PriceChart';


export function Dashboard() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    if (!toys) return <h4>loading</h4>

    // useEffect(() => {
    //     loadToys()
    //         .catch(err => {
    //             console.log('cannot load toys')
    //         })
    // }, [])

    ChartJS.register(ArcElement, Tooltip, Legend)

    const labels = toyService.getLabels()


    const labelsMap = toys.reduce((acc, toy) => {
        toy.labels.forEach(label => {
            acc[label] = acc[label] || { total: 0, inStock: 0 }
            acc[label].total++;
            acc[label].inStock += toy.inStock ? 1 : 0
        });
        return acc
    }, {})

    const toysPercent = Object.keys(labelsMap).map(label => {
        const count = labelsMap[label]
        const percentage = (count.inStock / count.total) * 100
        return percentage
    })

    const data = {
        labels: labels,

        datasets: [
            {
                label: '% of Toys in Stock',
                data: toysPercent,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
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
                    size: 25
                },
                color: 'lightcoral',
            },
        },

    }

    return (
        <>
            <h1 className='chart-heading'>Shop Stats</h1>
            <div className=' charts-container flex'>
                <div className="stock-chart-container" style={{ width: '400px', height: '400px' }}>
                    <Doughnut data={data}
                        options={options}
                    />
                </div>
                <div className="price-chart-container" style={{ width: '300px', height: '300px' }}>
                    <PriceChart
                        toys={toys}
                    />
                </div>
            </div>
        </>
    )

}
