import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { ButtonGroup } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab'


const styles = theme => ({
    appBar: {
        position: 'relative',
        boxShadow: 'none',
        backgroundColor: '#0091f4',
        backgroundPosition: "200px"

    },
    inline: {
        display: 'inline'
    },
    flex: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    productLogo: {
        display: 'inline-block',
        borderLeft: `1px solid ${theme.palette.grey['A100']}`,
        marginLeft: 32,
        paddingLeft: 24,
        [theme.breakpoints.up('md')]: {
            paddingTop: '1.5em'
        }
    },
    tagline: {
        display: 'inline-block',
        marginLeft: 10,
        [theme.breakpoints.up('md')]: {
            paddingTop: '0.8em'
        }
    },
    iconContainer: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    iconButton: {
        float: 'right'
    },
    select: {
        borderRadius: "5px",
        backgroundColor: "white",
        color: "#565656",
        minWidth: "5vw",
        margin: 10,
        minHeight: "2vh",
        fontSize: 10,
        overflow: "hidden"
    },
    tabContainer: {
        marginLeft: 32,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    tabItem: {
        paddingTop: 20,
        paddingBottom: 20,
        minWidth: 'auto'
    },
    tab: {
        backgroundColor: "white"
    }
})

const Searchbar = (props) => {
    const { classes } = props;
    const [distritos, setDistritos] = useState([])
    const [tab, setTab] = useState(0)
    const [selectDist, setSelectDist] = useState("")

    useEffect(() => {
        setDistritos(props.distritos)
    }, [props.distritos]
    )
    useEffect(() => {
        let data = sessionStorage.getItem('escolas')
        data = data ? JSON.parse(data) : []
        data = data.filter(element => {
            return (element['Distrito'] === selectDist.distrito || !selectDist) && (element['Serie'] === tab || tab === 0)
        })
        if (data.length > 0) {
            const finalData = data.reduce((arr, curr, index) => {
                if (index === 1) {
                    arr['Engajamento'] = arr['Engajamento'].replace(',', '.')
                    arr['Questões corretas (Português - %)'] = arr['Questões corretas (Português - %)'].toString().replace(',', '.')
                    arr['Questões corretas (Matemática - %)'] = arr['Questões corretas (Matemática - %)'].toString().replace(',', '.')
                }
                return {
                    "Alunos em que foram implantados": Number(arr["Alunos em que foram implantados"]) + Number(curr["Alunos em que foram implantados"]),
                    "Vídeos assistidos": Number(arr["Vídeos assistidos"]) + Number(curr["Vídeos assistidos"]),
                    "Questões respondidas": Number(arr["Questões respondidas"]) + Number(curr["Questões respondidas"]),
                    "Questões corretas (Português - %)": (parseFloat(arr["Questões corretas (Português - %)"]) + parseFloat(curr["Questões corretas (Português - %)"].toString().replace(',', '.'))),
                    "Questões corretas (Matemática - %)": (parseFloat(arr["Questões corretas (Matemática - %)"]) + parseFloat(curr["Questões corretas (Matemática - %)"].toString().replace(',', '.'))),
                    "Engajamento": (parseFloat(arr["Engajamento"]) + parseFloat(curr["Engajamento"].replace(',', '.')))
                }
            })
            if (data.length > 1) {
                finalData['Engajamento'] = (finalData['Engajamento'] / data.length).toFixed(2)
                finalData['Questões corretas (Português - %)'] = (finalData['Questões corretas (Português - %)'] / data.length).toFixed(2)
                finalData['Questões corretas (Matemática - %)'] = (finalData['Questões corretas (Matemática - %)'] / data.length).toFixed(2)
            }
            finalData.ano = tab
            return props.setDist(finalData)
        }
        return props.setDist(0)
        //eslint-disable-next-line
    }, [tab, selectDist])
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Grid container justify="center">
                    <Grid container className={classes.flex} justify="center">
                        <ButtonGroup className={classes.select}>
                            {distritos.map(dist => (
                                <ToggleButton value={dist} selected={selectDist === dist} key={dist.id} onClick={() => { selectDist === dist ? setSelectDist("") : setSelectDist(dist) }}>{dist.distrito}</ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Grid>
                    <ButtonGroup className={classes.tab}>
                        <ToggleButton selected={tab === 5} value={5} onClick={() => tab === 5 ? setTab(0) : setTab(5)}>5º</ToggleButton>
                        <ToggleButton selected={tab === 9} value={9} onClick={() => tab === 9 ? setTab(0) : setTab(9)}>9º</ToggleButton>
                    </ButtonGroup>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


export default withRouter(withStyles(styles)(Searchbar))
