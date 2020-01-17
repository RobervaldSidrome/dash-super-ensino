import React from 'react'

import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'

import BarChart from 'recharts/lib/chart/BarChart'
import Bar from 'recharts/lib/cartesian/Bar'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'
import { CardContent, Card, CardHeader } from '@material-ui/core'


const BarCard = (props) => {

    let questoesPT = props.portugues
    let questoesMAT = props.matematica
    if(typeof questoesPT || typeof questoesMAT){
        questoesMAT = parseFloat(questoesMAT)
        questoesPT = parseFloat(questoesPT)
    }
    const dataBar = [{ name: "Questões Corretas", "Português": questoesPT, "Matemática": questoesMAT }]
    return (
        <Card style={{margin:20}}>
            <CardHeader title="Questões Corretas da Prova Brasil">

            </CardHeader>
            <CardContent style={{ minWidth: 600 }}>
                <ResponsiveContainer minWidth="250" width="100%" height={250}>
                    <BarChart data={dataBar}>
                        <XAxis dataKey="name"></XAxis>
                        <YAxis unit="%" type="number" domain={[0,100]}></YAxis>
                        <Legend align="center" verticalAlign="top" height={36} />
                        <Tooltip />
                        <Bar dataKey="Português" fill="#8884d8" />
                        <Bar dataKey="Matemática" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>)
}

export default BarCard
