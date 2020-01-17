import React, { Component, useEffect, useState } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';

const styles = theme => ({
    appBar: {
        position: 'relative',
        boxShadow: 'none',
        backgroundColor:'#0091f4',
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
        color:"#565656",
        margin: 10,
        minWidth: "5vw",
        minHeight:"2vh",
        fontSize:10,
        overflow:"hidden"
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
    }
})

const Searchbar = (props) => {
    const { classes } = props;
    const [distritos, setDistritos] = useState([])
    useEffect(() => {
        setDistritos(props.distritos)
    }, [props]
    )
    function setInfo(dist) {
        let data = sessionStorage.getItem('escolas')
        if (data) {
            data = JSON.parse(data).filter(element => element['Distrito'] === dist.distrito)
            const finalData = data.reduce((arr, curr) => {
                arr["Alunos em que foram implantados"] = Number(arr["Alunos em que foram implantados"]) + Number(curr["Alunos em que foram implantados"])
                arr["Vídeos assistidos"] = Number(arr["Vídeos assistidos"]) + Number(curr["Vídeos assistidos"])
                arr["Questões respondidas"] = Number(arr["Questões respondidas"]) + Number(curr["Questões respondidas"])
                arr["Questões corretas (Português - %)"] = (parseFloat(arr["Questões corretas (Português - %)"]) + parseFloat(arr["Questões corretas (Português - %)"])) / 2
                arr["Questões corretas (Matemática - %)"] = (parseFloat(arr["Questões corretas (Matemática - %)"]) + parseFloat(arr["Questões corretas (Matemática - %)"])) / 2
                arr["Engajamento"] = (parseFloat(arr["Engajamento"]) + parseFloat(arr["Engajamento"])) / 2
                return arr
            })
            props.setDist(finalData)
        }

    }
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Grid container alignItems="baseline">
                    <Grid item xs={12} className={classes.flex} justify="center">
                        {distritos.map(dist => (
                            <Button variant="contained" className={classes.select} onClick={() => { setInfo(dist) }}>{dist.distrito}</Button>
                        ))}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


export default withRouter(withStyles(styles)(Searchbar))
