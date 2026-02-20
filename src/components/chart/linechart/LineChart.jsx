/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import colors from '../../../config/colors';
import { isArray } from '../../../Utilities/utils';

export default function LineChart({
  labels = [],
  label1 = 'First Dataset',
  label2 = 'Second Dataset',
  label3 = 'Third Dataset',
  data1,
  data2,
  data3,
  fill1 = true,
  fill2 = true,
  fill3 = true,
  borderColor1 =  colors.primary,
  borderColor2 = colors.orange,
  borderColor3 = colors.success, 
  backgroundColor1 = 'transparent',
  backgroundColor2 = 'transparent',
  backgroundColor3 = 'transparent',
  dash1 = [0, 0],
  dash3 = [4, 4],
  dash2 = [0, 0],
  tag
}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      const dataSets = [];
        if (data1) {
          dataSets.push({
                    label: `${label1}(${tag})`,
                    data: data1,
                    fill: fill1,
                    tension: 0.4,
                    borderColor: borderColor1,
                    borderDash: isArray(dash1) ? dash1 : [dash1, dash1],
                    backgroundColor: backgroundColor1
                });
        }
        if (data2) {
          dataSets.push({
                    label: `${label2}(${tag})`,
                    data: data2,
                    fill: fill2,
                    borderDash: isArray(dash2) ? dash2 : [dash2, dash2],
                    tension: 0.4,
                    borderColor: borderColor2,
                    backgroundColor: backgroundColor2
                });
        }
        if (data3) {
          dataSets.push({
                    label: `${label3}(${tag})`,
                    data: data3,
                    fill: fill3,
                    borderColor: borderColor3,
                    borderDash: isArray(dash3) ? dash3 : [dash3, dash3],
                    tension: 0.4,
                    backgroundColor: backgroundColor3
                });
        }
        const data = {
            labels,
            datasets: dataSets
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: colors.darkSecondary
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: colors.darkSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: colors.darkSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [data1, data2, data3 ]);

    return (
      <Chart type="line" data={chartData} options={chartOptions} />
    )
}
        