import React, { useEffect, useState } from 'react'
import { Paper, Grid, List, ListItem, ListSubheader, ListItemText, IconButton, Collapse } from '@material-ui/core'
import { ArrowDropDown, ArrowRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'


const styles = makeStyles({
    paper: {
        maxHeight: "50vh",
        width: "80vw",
        position: "absolute",
        left: "50%",
        marginLeft: "-40vw",
        top: "50%",
        marginTop: "-25vh",
        overflow: "auto"
    }
})


const ModalSelect = (props) => {
    const [distritos, setDistritos] = useState([])
    const [data, setData] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [step, setStep] = useState(false)

    useEffect(() => {

        const dropdown = []
        props.distritos.forEach(dist => {
            dropdown.push({ id: dist.id, state: false })
        })
        setDropdown(dropdown)
        setDistritos(props.distritos)
        const value = sessionStorage.getItem('escolas')
        if (value) {
            setData(JSON.parse(value))
        }
    }, [])

    function checkCollapse(id) {
        const check = dropdown.find(op => {
            return op.id === id
        })
        return check.state
    }

    function dropdownCollapse(id) {
        const newState = dropdown.map(op => {
            if (op.id === id) {
                op.state = !op.state
            }
            return op
        })
        setDropdown(newState)
    }

    function selectDistrito(distri) {
        const resultado = data.filter(esc => {
            return esc.Distrito === distri.distrito
        })
        let final = resultado.reduce((arr, curr) => {
            arr["Alunos em que foram implantados"] = Number(arr["Alunos em que foram implantados"]) + Number(curr["Alunos em que foram implantados"])
            arr["Vídeos assistidos"] = Number(arr["Vídeos assistidos"]) + Number(curr["Vídeos assistidos"])
            arr["Questões respondidas"] = Number(arr["Questões respondidas"]) + Number(curr["Questões respondidas"])
            arr["Questões corretas (Português - %)"] = (parseFloat(arr["Questões corretas (Português - %)"]) + parseFloat(arr["Questões corretas (Português - %)"]))/2
            arr["Questões corretas (Matemática - %)"] = (parseFloat(arr["Questões corretas (Matemática - %)"]) + parseFloat(arr["Questões corretas (Matemática - %)"]))/2
            arr["Engajamento"] = (parseFloat(arr["Engajamento"]) + parseFloat(arr["Engajamento"]))/2   
            return arr
        })
        final.Escola = distri.distrito
        setStep(true)
        props.setData(final)
    }
    function selectEscola(escola) {
        setStep(true)
        props.setData(escola)

    }
    function end(type) {
        props.setType(type)
        props.setSelected(true)
        props.open()
    }
    const classes = styles()
    return (<Paper className={classes.paper} >
        <Grid>
            {step ? (<List>
                <ListItem button={true} onClick={() => { end("grafico") }}>
                    Gráfico
                </ListItem>
                <ListItem button={true} onClick={() => { end("cards") }}>
                    Dados
                </ListItem>
            </List>) : (
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Distritos
                      </ListSubheader>}
                    >
                        {Array.from(distritos).map(dist =>
                            (
                                <List>
                                    <ListItem onClick={() => { dropdownCollapse(dist.id) }} button={true} key={dist.id}>
                                        <ListItemText >
                                            {dist.distrito}
                                        </ListItemText>

                                        <IconButton style={{ float: 'right' }} edge='end' >
                                            {checkCollapse(dist.id) ? (<ArrowDropDown />) : (<ArrowRight />)}
                                        </IconButton>
                                    </ListItem>
                                    <Collapse in={checkCollapse(dist.id)}>
                                        <ListItem
                                            button={true} onClick={() => selectDistrito(dist)}>VER DADOS DO DISTRITO</ListItem>
                                        {// eslint-disable-next-line
                                            data.map(esco => {
                                                if (esco.Distrito === dist.distrito) {
                                                    return (
                                                        <List>
                                                            <ListItem button={true} onClick={() => selectEscola(esco)}>
                                                                {esco.Escola}
                                                            </ListItem>
                                                        </List>
                                                    )
                                                }
                                            })}
                                    </Collapse>
                                </List>
                            ))}
                    </List>)}
        </Grid>
    </Paper>)
}


export default ModalSelect