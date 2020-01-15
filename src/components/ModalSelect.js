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

    useEffect(() => {
        console.log(props)
        const dropdown = []
        props.distritos.forEach(dist => {
            dropdown.push({ id: dist.id, state: false })
        })
        setDropdown(dropdown)
        setDistritos(props.distritos)
        const value = sessionStorage.getItem('escolas')
        if(value){
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
    function selectDistrito(dist){
        const resultado = data.filter(esc=>{
            return esc.Distrito === dist.Distrito
        })
        props.setData(resultado)
        props.open()
    }
    function selectEscola(escola){
        props.setSelected(true)
        props.setData(escola)
        props.open()
    }
    const classes = styles()
    return (<Paper className={classes.paper} >
        <Grid>
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
                                button={true} onClick={()=>selectDistrito(dist)}>VER DADOS DO DISTRITO</ListItem>
                                {// eslint-disable-next-line
                                    data.map(esco => {
                                        if (esco.Distrito === dist.distrito) {
                                            return (
                                                <List>
                                                    <ListItem button={true} onClick={()=>selectEscola(esco)}>
                                                        {esco.Escola}
                                                    </ListItem>
                                                </List>
                                            )
                                        }
                                    })}
                            </Collapse>
                        </List>
                    ))}
            </List>
        </Grid>
    </Paper>)
}


export default ModalSelect