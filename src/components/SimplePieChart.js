import React from 'react'
import PieChart from 'recharts/lib/chart/PieChart'
import Pie from 'recharts/lib/polar/Pie'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import Cell from 'recharts/lib/component/Cell'



const GraficoPizza = (props) => {
    const engajamento = parseFloat(props.data['Engajamento'])
    const colors = ["#49A8FF","#585656"]
    const data = [{ label: "Alunos que utilizaram a plataforma", value: engajamento }, { label: "Alunos que não utilizaram a plataforma", value: 100 - engajamento }]
    return (
        <ResponsiveContainer width="25%" height={225}>
        <PieChart>
            <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={75} label={true} fill="#8884d8">
                {data.map((entry,index)=><Cell fill={colors[index]}></Cell>)}
                </Pie>
        </PieChart>
        </ResponsiveContainer>)
}
export default GraficoPizza