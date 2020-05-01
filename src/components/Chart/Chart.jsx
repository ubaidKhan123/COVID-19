import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';

import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
       // console.log(dailyData);
    });

    const lineChart = (
        dailyData.length
        ?(
        <Line
        data={{
            labels: dailyData.map(({ date })=> date),
            datasets: [{
                data: dailyData.map(({ confirmed } ) => confirmed),
                label:'Infected',
                borderColor: '#0000FF',
                fill: true,
            },{
                data: dailyData.map(({ deaths } ) => deaths),
                label:'Deaths',
                borderColor: '#FF0000',
                fill: true,
            }],
        }}
        />) : null
    );

    const barChart =(
        confirmed ?
        (
            <Bar
                data ={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgb(5, 5, 207)','rgb(5, 207, 5)', 'rgb(255, 0, 0)'],
                        
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]    
                }}
                options={{
                    legend: {display : false},
                    title : {display: true, text: `Current State in ${country}`},
                }}
            />
        ) : null
    );
    
    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
}

export default Chart;