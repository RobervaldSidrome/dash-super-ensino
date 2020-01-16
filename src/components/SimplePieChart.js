import React from 'react'
import { Grid } from '@material-ui/core/'
import PieChart from 'recharts/lib/chart/PieChart'
import Pie from 'recharts/lib/polar/Pie'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import Cell from 'recharts/lib/component/Cell'
import BarChart from 'recharts/lib/chart/BarChart'
import Bar from 'recharts/lib/cartesian/Bar'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

const GraficoPizza = (props) => {
    const engajamento = parseFloat(props.data['Engajamento'])
    const questoesPT = parseFloat(props.data['Questões corretas (Português - %)'])
    const questoesMAT = parseFloat(props.data['Questões corretas (Matemática - %)'])
    const dataBar = [{ name: "Questões Corretas", "Português": questoesPT, "Matemática": questoesMAT }]


    const colors = ["#49A8FF", "#585656"]
    const dataPie = [{ label: "Utilizaram a plataforma", value: engajamento }, { label: "Não utilizaram a plataforma", value: 100 - engajamento }]
    return (
        <Grid container justify="center">
            
            <ResponsiveContainer width="50%" height={250}>
                <PieChart>
                <Tooltip />
                    <Pie 
                    data={dataPie} 
                    dataKey="value" 
                    nameKey="label" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={75} 
                    label={true} 
                    fill="#8884d8"
                    >
                        {dataPie.map((entry, index) => <Cell fill={colors[index]}></Cell>)}
                    </Pie>
                    <Legend align="center" verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height={250}>
                <BarChart data={dataBar}>
                    <XAxis dataKey="name"></XAxis>
                    <YAxis unit="%" type="number"></YAxis>
                    <Legend align="center" verticalAlign="top" height={36} />
                    <Tooltip />
                    <Bar dataKey="Português" fill="#8884d8" />
                    <Bar dataKey="Matemática" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Grid>)
}
export default GraficoPizza