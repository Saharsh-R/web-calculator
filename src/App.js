import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import  { useState } from 'react';
import { Typography } from '@material-ui/core'; 

const useStyles = makeStyles((theme) => ({
  
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width:'min(500px, 100vw)',
    // maxWidth: 500,
  },
  display: {
    backgroundColor: 'black',
    minHeight: 70,
    color: 'white',
    paddingRight: 10
  },
  button : {
    minHeight: 70,
    height: '100%',
    width: '100%',
    borderRadius: 0,
    fontSize:25,
  }

}));

const idDic = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
}

function App() {
  const classes = useStyles();
  const [input, setInput] = useState('0')
  const [result, setResult] = useState('') 
  
  const clear = () => {
    setInput('0')
    setResult('')
  }

  const numberPress = (val) => {
    if (input == '0'){
      if (val != 0){
        setInput(val.toString())
      }
    }
    else{
      setInput(c => c + val)
    }
  }
  const opPress = (op) => {
    if (input){
      setResult(r => r + input + op)
      setInput('')
    }
    if (!input ){
      if (op == '-' && result ){
        if (result[result.length - 1].match(/[+/*]/)){
          setResult(r => r + op)
        }
        else if (result[result.length - 1] == '-' && result[result.length - 2].match(/[0-9]/)){
          setResult(r => r + op)
        }
      } else{
        if (result[result.length - 2].match(/[0-9]/)){
          setResult(r => r.slice(0, -1) + op)
        } else{
          setResult(r => r.slice(0, -2) + op)
        }
      }
    }
  }


  const calculate =  () => {
    
    if (input){

      setResult(r => r + input);
      setResult(r =>{
        setInput(eval(r))
        return ''
      })

    
    }
  }

  const decimal =  () => {
     setInput(c => {
      if (!c){
        return '0.'
      }
      if (c.includes(".")){
        return c
      } else{
        return (`${c}.`)
      }
    })
    
  }



  return (
    <div id="App">
      <div className="main-content">
        <Paper className={classes.paper}>

          <Grid container >
             
            <Grid item xs={9} container  zeroMinWidth direction="column" justify="flex-end" alignItems="flex-end" className={classes.display}>
              <Grid item xs >
                <Typography variant="body1" style={{overflowWrap: 'break-word'}}> 
                  {result}
                </Typography> 
              </Grid>

              <Grid item xs >
                <Typography id='display' noWrap variant="h4" style={{direction: 'rtl' }}>{input}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={3}>
                <Button id='clear' variant="contained" onClick={() => clear()} color="secondary" className={classes.button}>AC</Button>
              </Grid>

            <Grid item container xs={9}  >
              {[7,8,9,4,5,6,1,2,3,0].map((value) => (
              <Grid item xs={4}>
                <Button id={idDic[value]} variant="outlined" onClick={() => numberPress(value)} className={classes.button}>{value}</Button>
              </Grid>
            ))}
              <Grid item xs={4}>
                <Button id='decimal' variant="outlined" onClick={() => decimal()}className={classes.button}>.</Button>
              </Grid>

              <Grid item xs={4}>
                <Button id='equals' onClick={() => calculate()} variant="contained" color='primary' className={classes.button}>=</Button>
              </Grid>
            </Grid>

            <Grid item container xs={3}  >
              {['/', '*', '-', '+'].map((value) => (
              <Grid item xs={12}>
                <Button id={idDic[value]} onClick={() => opPress(value)} variant="contained" color='green' className={classes.button}>{value}</Button>
              </Grid>
            ))}
            </Grid>

          </Grid> 

        </Paper>
        
      </div>
    </div>
  );
}

export default App;
