import React, { Component, useEffect, useState } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Button, Tab, Tabs, ButtonGroup } from '@material-ui/core';
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
        margin: 10,
        minWidth: "5vw",
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
    const [tab, setTab] = useState(5)
    const [selectDist, setSelectDist] = useState()
    const [selectedAno, setSelectedAno] = useState(true)
    useEffect(() => {
        setDistritos(props.distritos)
    }, [props]
    )
    useEffect(() => {
        let data = sessionStorage.getItem('escolas')

        if (data && selectDist) {
            data = JSON.parse(data).filter(element => {
                return element['Distrito'] === selectDist.distrito && element['Serie'] === tab
            })
            if (data.length > 0) {
                const finalData = data.reduce((arr, curr) => {

                    return {
                        "Alunos em que foram implantados": Number(arr["Alunos em que foram implantados"]) + Number(curr["Alunos em que foram implantados"]),
                        "Vídeos assistidos": Number(arr["Vídeos assistidos"]) + Number(curr["Vídeos assistidos"]),
                        "Questões respondidas": Number(arr["Questões respondidas"]) + Number(curr["Questões respondidas"]),
                        "Questões corretas (Português - %)": (parseFloat(arr["Questões corretas (Português - %)"]) + parseFloat(curr["Questões corretas (Português - %)"])) / 2,
                        "Questões corretas (Matemática - %)": (parseFloat(arr["Questões corretas (Matemática - %)"]) + parseFloat(curr["Questões corretas (Matemática - %)"])) / 2,
                        "Engajamento": (parseFloat(arr["Engajamento"]) + parseFloat(curr["Engajamento"])) / 2
                    }
                })
                finalData.ano = tab
                return props.setDist(finalData)
            }
            props.setDist([0])
        }

    }, [tab, selectDist])
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Grid container justify="center">
                    <Grid container className={classes.flex} justify="center">

                        {distritos.map(dist => (
                            <ToggleButton selected={selectDist === dist} key={dist.id} className={classes.select} onClick={() => { setSelectDist(dist) }}>{dist.distrito}</ToggleButton>
                        ))}

                    </Grid>
                    <ButtonGroup>
                        <ToggleButton selected={tab == 5} variant="contained" className={classes.tab} onClick={() => setTab(5)}>5º</ToggleButton>
                        <ToggleButton selected={tab == 9} variant="contained" className={classes.tab} onClick={() => setTab(9)}>9º</ToggleButton>
                    </ButtonGroup>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


export default withRouter(withStyles(styles)(Searchbar))
