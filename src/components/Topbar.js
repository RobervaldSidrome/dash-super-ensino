import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link as MaterialLink } from '@material-ui/core'
import Menu from './Menu';
// import ArrowRight from '@material-ui/icons/ArrowRight'
// import ArrowDrop from '@material-ui/icons/ArrowDropDown'
// import Collapse from '@material-ui/core/Collapse'
// import ListSubheader from '@material-ui/core/ListSubheader'
// import Drawer from '@material-ui/core/Drawer'


const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

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
    }
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

class Topbar extends Component {

  state = {
    value: 0,
    menuDrawer: false,
    sideMenuDrawer: false,
    escolas: [],
    distritos: [],
    open: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }
  sideMenuOpen = (event) => {
    this.setState({ sideMenuDrawer: true });
  }

  sideMenuClose = (event) => {
    this.setState({ sideMenuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const esc = sessionStorage.getItem('escolas')
    if (esc) {
      const state = []
      let array = new Set([])
      this.setState({ escolas: JSON.parse(esc) })
      JSON.parse(esc).forEach(escola => {
        array.add(escola.Distrito)
      })
      let id = 0
      // eslint-disable-next-line
      array = Array.from(array).filter(arr => { if (arr) return true })
      array = array.map(dist => {
        dist = { id: ++id, distrito: dist }
        state.push({ id: id, state: false })
        return dist
      })
      this.setState({ escolas: JSON.parse(esc), distritos: array })
      this.setState({ open: state })
    }
  }

  current = () => {
    if (this.props.currentPath === '/home') {
      return 0
    }
    if (this.props.currentPath === '/dashboard') {
      return 1
    }
    if (this.props.currentPath === '/signup') {
      return 2
    }
    if (this.props.currentPath === '/wizard') {
      return 3
    }
    if (this.props.currentPath === '/cards') {
      return 4
    }

  }
  checkCollapse(id) {
   const check = this.state.open.find(op=>{
      return op.id === id
    })
    return check.state
  }

  openCollapse(id){
    const newState = this.state.open.map(op=>{
      if(op.id===id){
        op.state = !op.state
      }
      return op
    })
    this.setState(newState)
  }

  render() {
    const logo = require('../images/logo-super-aluno-horz.svg')
    const { classes } = this.props;

    return (
      <AppBar color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container  alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  {/* <Drawer anchor="left" open={this.state.sideMenuDrawer} onClose={this.sideMenuClose}>

                    <List
                      subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                          Distritos
                      </ListSubheader>}
                    >
                      {Array.from(this.state.distritos).map(dist =>
                        (
                          <List>
                            <ListItem onClick={()=>{this.openCollapse(dist.id)}} button={true} key={dist.id}>
                              <ListItemText onClick={()=>{console.log("clickado")}} >
                              {dist.distrito}
                              </ListItemText>
                             
                              <IconButton style={{float:'right'}} edge='end' >
                                  {this.checkCollapse(dist.id)?(<ArrowDrop/>):(<ArrowRight/>)}
                              </IconButton>
                            </ListItem>
                            <Collapse in={this.checkCollapse(dist.id)}>
                              <ListItem>Ir para o distrito</ListItem>
                              {// eslint-disable-next-line
                              this.state.escolas.map(esco => {
                                if (esco.Distrito === dist.distrito) {
                                  return (
                                    <List>
                                      <ListItem button={true}>
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
                  </Drawer>*/}
                  {/* <IconButton onClick={this.sideMenuOpen}>
                    <MenuIcon />
                  </IconButton> */}

                  <Link to='/' className={classes.link}>
                    <IconButton>
                      <img width={160} src={logo} alt="Super Ensino"></img>
                    </IconButton>
                  </Link>
                </Typography>
              </div>
              {!this.props.noTabs && (
                <React.Fragment>

                  <div className={classes.iconContainer}>
                    <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                      <MenuIcon />
                    </IconButton>

                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                      <AppBar title="Menu" />
                      <List>
                        {Menu.map((item, index) => (
                          <ListItem component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : { pathname: item.pathname, search: this.props.location.search }} button key={item.label}>
                            <ListItemText primary={item.label} />
                          </ListItem>
                        ))}
                      </List>
                    </SwipeableDrawer>
                    <Tabs
                      value={this.current() || this.state.value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      {Menu.map((item, index) => (
                        <Tab key={index} component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : { pathname: item.pathname, search: this.props.location.search }} classes={{ root: classes.tabItem }} label={item.label} />
                      ))}
                    </Tabs>
                  </div>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Topbar))
