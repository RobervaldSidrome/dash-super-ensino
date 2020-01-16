import { CardHeader, Card, CardContent, Button, Grid, IconButton, Modal } from '@material-ui/core/'
import React, { useState, useEffect } from 'react'
import Searchbar from '../Searchbar'
import { makeStyles } from '@material-ui/styles'
import { AddCircleOutline, Close } from '@material-ui/icons/'
import ModalSelect from '../ModalSelect'

const styles = makeStyles({
    size: {
        width: 1245,
        margin: 20,
        height: "40vh"

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
            array = Array.from(array).filter(arr => { if (arr) return true })
            array = array.map(dist => {
                dist = { id: ++id, distrito: dist }
                return dist
            })
            setDistritos(array)
            console.log(data)
            if (data.length <= 0 && !data) setData(JSON.parse(esc))
        }
    }, [open])

    return (<Card className={classes.size}>
        <CardHeader
            title={(
                <div className={classes.closeButton}>
                <span>{selected?data['Escola']:"Escolha um card para exibir"}</span>
            <IconButton color="default" onClick={() => deleteCard()}>
                        <Close></Close>
                    </IconButton>
                </div>
            )}
            className={classes.header}
        >

        </CardHeader>
        <CardContent style={{ textAlign: "center", height: "30vh" }}>
            {
                selected ? (
                    <Grid container justify="center">
                        <Card className={classes.subCards}>
                            <CardHeader title="Alunos Implantados" />
                            <CardContent style={{ fontSize: "48px" }}>{data['Alunos em que foram implantados']}</CardContent>
                        </Card>
                        <Card className={classes.subCards}>
                            <CardHeader title="Vídeos Assistidos" />
                            <CardContent style={{ fontSize: "48px" }}>{data['Vídeos assistidos']}</CardContent>
                        </Card>
                        <Card className={classes.subCards}>
                            <CardHeader title="Questões Respondidas" />
                            <CardContent style={{ fontSize: "48px" }}>{data['Questões respondidas']}</CardContent>
                        </Card>
                    </Grid>
                ) : (
                        <Grid className={classes.unselected} container alignContent="center" style={{ border: "solid thick gray", borderStyle: "dashed" }} justify="center">
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={open}
                                onClose={handleClose}
                            >
                                <ModalSelect setSelected={setSelected} setData={setData} distritos={distritos} open={handleClose} />
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