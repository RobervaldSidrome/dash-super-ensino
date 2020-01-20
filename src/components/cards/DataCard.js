import React, { useEffect,useState } from 'react'
import { makeStyles } from "@material-ui/styles"
import { Card, CardHeader, CardContent } from "@material-ui/core"


const styles = makeStyles({
    subCards: {
        margin: 20,
        fontSize: "64px",
        minWidth: 200,
        minHeight: 200

    },
    title:{
        fontSize: "30px",
        color:"#565656"
    },
    content:{
        textAlign:"center"
    }
})

const DataCard = (props) => {
    const classes = styles()
    const [data,setData] = useState(0)
    const [title,setTitle] = useState("")
    useEffect(()=>{
        console.log(props)
        setData(props.data)
        setTitle(props.title)
    },[props])

    return (
        <Card className={classes.subCards}>
            <CardHeader className={classes.title} title={title}/>
            <CardContent className={classes.content}>{data}</CardContent>
        </Card>)
}

export default DataCard