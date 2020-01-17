import { CardHeader, Card, CardContent, Button, Grid, IconButton, Modal, Fade, Backdrop } from '@material-ui/core/'
import React, { useState, useEffect } from 'react'
import Searchbar from '../Searchbar'

import { makeStyles } from '@material-ui/styles'
import { AddCircleOutline, Close } from '@material-ui/icons/'
import ModalSelect from '../ModalSelect'
import GraficoPizza from '../SimplePieChart'

const styles = makeStyles({
    size: {
        width: 1245,
        margin: 20,
        overflow: "hidden",

    },
    header: {

    },
    closeButton: {
        textAlign: "center"
    },
    subheader: {
        backgroundColor: "white",
        color: "gray",
        textAlign: "start"
    },
    subCards: {
        margin: 20,
        fontSize: "48px"

    },
    unselected: {
        height: "28vh",
    },
})

const InfoCard = (props) => {

    const [data, setData] = useState({})
    const [distritos, setDistritos] = useState([])
    const [selected, setSelected] = useState(false)
    const [open, setOpen] = useState(false)
    const [type, setType] = useState("")
    const classes = styles()

    function handleClose() {
        setOpen(false)
    }
    function deleteCard() {
        setSelected(false)
    }

    useEffect(() => {
        const esc = sessionStorage.getItem('escolas')
        if (esc) {
            let array = new Set([])
            JSON.parse(esc).forEach(escola => {
                array.add(escola.Distrito)
            })
            let id = 0
            // eslint-disable-next-line
            array = Array.from(array)
            array = array.map(dist => {
                dist = { id: ++id, distrito: dist }
                return dist
            })
            setDistritos(array)
            if (data.length <= 0 && !data) setData(JSON.parse(esc))
        }
    }, [open])

    return (<Card className={classes.size}>
        <CardHeader
            title={(
                <div>
                    <Grid container direction="row">
                        <Grid style={{ alignSelf: "center" }} item xs="11">
                            <span>{selected ? data['Escola'] : "Escolha um card para exibir"}</span>
                        </Grid>
                        <Grid item style={{ textAlign: "end" }} xs="1">
                            <IconButton color="default" onClick={() => deleteCard()}>
                                <Close></Close>
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
            )}
            className={classes.header}
        >

        </CardHeader>
        <CardContent style={{ textAlign: "center", }}>
            {
                selected ? (

                    <Fade in={selected}>
                        {type === "cards" ? (
                            <Grid container justify="center">
                                <Card className={classes.subCards}>
                                    <CardHeader title="Alunos Implantados" />
                                    <CardContent >{data['Alunos em que foram implantados']}</CardContent>
                                </Card>
                                <Card className={classes.subCards}>
                                    <CardHeader title="Vídeos Assistidos" />
                                    <CardContent >{data['Vídeos assistidos']}</CardContent>
                                </Card>
                                <Card className={classes.subCards}>
                                    <CardHeader title="Questões Respondidas" />
                                    <CardContent >{data['Questões respondidas']}</CardContent>
                                </Card>
                            </Grid>) :
                            <div>
                                <GraficoPizza data={data}></GraficoPizza>
                            </div>
                        }
                    </Fade>
                ) : (

                        <Grid className={classes.unselected} container alignContent="center" style={{ border: "solid thick gray", borderStyle: "dashed" }} justify="center">
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <ModalSelect setType={setType} setSelected={setSelected} setData={setData} distritos={distritos} open={handleClose} />
                                </Fade>
                            </Modal>

                            <IconButton onClick={() => setOpen(true)} >
                                <AddCircleOutline />
                            </IconButton>

                        </Grid>
                    )}
        </CardContent>
    </Card>)
}

export default InfoCard