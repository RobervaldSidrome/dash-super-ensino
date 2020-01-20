import React from 'react'
import PieChart from 'recharts/lib/chart/PieChart'
import Pie from 'recharts/lib/polar/Pie'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import Cell from 'recharts/lib/component/Cell'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'
import { Card, CardContent, CardHeader } from '@material-ui/core'

const PieCard = (props) => {

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }
    let engajamento = props.data
    if(typeof engajamento != Number){
        engajamento = parseFloat(engajamento)
    }
    const colors = ["#49A8FF", "#585656"]
    const dataPie = [{ label: "Utilizaram a plataforma", value: engajamento }, { label: "Não utilizaram a plataforma", value: 100 - engajamento }]
    return (
        <Card style={{margin:20}}>
            <CardHeader title="Engajamento">
            </CardHeader>
            <CardContent style={{ minWidth: 600 }}>
                <ResponsiveContainer minWidth="250" width="100%" height={250}>
                    <PieChart>
                        <Tooltip />
                        <Pie
                            data={dataPie}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            outerRadius={75}
                            label={renderCustomizedLabel}
                            fill="#8884d8"
                            labelLine={false}
                        >
                            {dataPie.map((entry, index) => <Cell key={entry} fill={colors[index]}></Cell>)}
                        </Pie>
                        <Legend align="center" verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>


    )
}

export default PieCard