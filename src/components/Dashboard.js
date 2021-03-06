import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Topbar from './Topbar';
import Searchbar from './Searchbar';
import DataCard from './cards/DataCard';
import PieCard from './cards/PieCard';
import BarCard from './cards/BarCard';
import { Hidden } from '@material-ui/core';


const numeral = require('numeral');
numeral.defaultFormat('0,000');

const backgroundShape = require('../images/BACKGROUND.png');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'auto',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 0px',
    paddingBottom: 400
  },
  grid: {
    width: 1400,
    minHeight: "50vh",
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },

  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

});
const Dashboard = (props) => {

  const [data, setData] = useState([])
  const [distritos, setDistritos] = useState([])



  useEffect(() => {
    const esc = sessionStorage.getItem('escolas')
    if (esc) {
      let array = new Set([])
      JSON.parse(esc).forEach(escola => {
        array.add(escola.Distrito)
      })
      let id = 0
      array = Array.from(array)
      array = array.map(dist => {
        dist = { id: ++id, distrito: dist }
        return dist
      })
      setDistritos(array)
    }
  }, [])

  // addCard() {
  //   const index = ++this.state.index
  //   const cards = this.state.cards
  //   cards.push(index + 1)
  //   this.setState({ index: index, cards: cards })
  // }
  // deleteCard() {
  //   const index = --this.state.index
  //   const cards = this.state.cards
  //   cards.shift(index + 1)
  //   this.setState({ index: index, cards: cards })
  // }


  const { classes } = props;
  const currentPath = props.location.pathname




  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <Hidden xsUp={!distritos.length}>
        <Searchbar distritos={distritos} data={data} setDist={setData} />
      </Hidden>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid container direction="row" justify="center" className={classes.grid}>
            <DataCard title="Alunos Implantados" data={data['Alunos em que foram implantados'] ? data['Alunos em que foram implantados'] : 0} />
            <DataCard title="Vídeos Assistidos" data={data['Vídeos assistidos'] ? data['Vídeos assistidos'] : 0} />
            <DataCard title="Questões Respondidas" data={data['Questões respondidas'] ? data['Questões respondidas'] : 0} />
            <PieCard className={classes.chartCard} data={data['Engajamento'] ? data['Engajamento'] : 0} />
            <BarCard portugues={data['Questões corretas (Português - %)'] ? data['Questões corretas (Português - %)'] : 0} matematica={data['Questões corretas (Matemática - %)'] ? data['Questões corretas (Matemática - %)'] : 0} />
          </Grid>
        </Grid>


      </div>
    </React.Fragment>
  )
}


export default withRouter(withStyles(styles)(Dashboard));
