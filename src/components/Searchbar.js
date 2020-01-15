import React from 'react'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/styles'

const styles = makeStyles({
    search:{
        backgroundColor:"#EFEFEF",
        padding:-10,
        marginLeft:10,
        borderRadius:10
    }
})


const Searchbar = (props)=>{
    const classes = styles()
    return (<Input className={classes.search}></Input>)
}
export default Searchbar