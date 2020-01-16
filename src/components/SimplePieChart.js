import React from 'react'
import {Grid} from '@material-ui/core/'
import PieChart from 'recharts/lib/chart/PieChart'
import Pie from 'recharts/lib/polar/Pie'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import Cell from 'recharts/lib/component/Cell'
import BarChart from 'recharts/lib/chart/BarChart'
import Bar from 'recharts/lib/cartesian/Bar'
import XAxis from 'recharts/lib/cartesian/XAxis'



const GraficoPizza = (props) => {
    const engajamento = parseFloat(props.data['Engajamento'])
    const questoesPT = parseFloat(props.data['Questões corretas (Português - %)'])
    const questoesMAT = parseFloat(props.data['Questões corretas (Matemática - %)'])
    const dataBar = [{name:"Questões Corretas",pt:questoesPT,mat:questoesMAT}]
 
    const colors = ["#49A8FF","#585656"]
    const dataPie = [{ label: "Alunos que utilizaram a plataforma", value: engajamento }, { label: "Alunos que não utilizaram a plataforma", value: 100 - engajamento }]
    return (
        <Grid container>
        <div>Engajamento</div>
        <ResponsiveContainer width="25%" height={225}>
        <PieChart>
            <Pie data={dataPie} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={75} label={true} fill="#8884d8">
                {dataPie.map((entry,index)=><Cell fill={colors[index]}></Cell>)}
                </Pie>
        </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="25%" height={225}>
            <BarChart data={dataBar}>
                <XAxis dataKey="name"></XAxis>
                <Bar dataKey="pt" fill="#8884d8" />
                <Bar dataKey="mat" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
        </Grid>)
}
export default GraficoPizza