// src/Skjema.js
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';

const bonusMenu = [
  {
    value: '1',
    label: 'bonus 1',
  },
  {
    value: '2',
    label: 'bonus 2',
  },
  {
    value: '3',
    label: 'bonus 3',
  },
  {
    value: '4',
    label: 'bonus 4',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
  },
  textField: {
    width: 200,
  },
  fourtyeight: {
    marginBottom: 48,
  },
  seventytwo: {
    marginBottom: 72,
  },
  nintisix: {
    marginBottom: 96,
  },
  twelvezero: {
    marginBottom: 120,
  },
  topForm: {
    marginBottom: 96,
    marginTop: 96,
  },
  betweenButtons: {
    marginRight: 20,
    background:'#000000',
    textTransform: 'none',
    color: 'white',
  },
  buttonStyle: {
    background:'#FFFFFF',
    textTransform: 'none',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

  

export default function Skjema() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const [regnr, setRegnr] = React.useState('');
  const [bonus, setBonus] = React.useState('');
  const [birthnr, setBirthnr] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const [errors, setErrors] = React.useState(
  {
    regnr: {
      errormessage:'',
      errorState: true,
    },
    name:{
      errormessage:'',
      errorState: true,
    },
    surname:{
      errormessage:'',
      errorState: true,
    },
    birthnr: {
      errormessage:'',
      errorState: true,
    },
    email: {
      errormessage:'',
      errorState: true,
    }
  });

  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'regnr':
        if(value.length === 0){
          setErrors(prev => ({
            ...prev,
            regnr: {
              errormessage:'registreringsnummer* må fylles',
              errorState: true,
            }
          }))    
          setRegnr(value);
        }else{
          setErrors(prev => ({
            ...prev,
            regnr: {
              errormessage:'',
              errorState: false,
            }
          }))
          setRegnr(value);
        }
        break;
      case 'bonus':
        setBonus(value);
        break;
      case 'birthnr':
        if(value.length === 0){
          setErrors(prev => ({
            ...prev,
            birthnr: {
              errormessage:'Fødselsnummer* må fylles',
              errorState: true,
            }
          }))    
          setBirthnr(value);
        }else if(value.length !== 11){
          setErrors(prev => ({
            ...prev,
            birthnr: {
              errormessage:'Skriv inn gyldig Fødselsnummer*',
              errorState: true,
            }
          }))    
          setBirthnr(value);
        }else{
          setErrors(prev => ({
            ...prev,
            birthnr: {
              errormessage:'',
              errorState: false,
            }
          }))    
          setBirthnr(value);
        }
        break;

      case 'name':
        if(value.length === 0){
          setErrors(prev => ({
            ...prev,
            name: {
              errormessage:'Fornavn* må fylles',
              errorState: true,
            }
          }))    
          setName(value);
        }else{
          setErrors(prev => ({
            ...prev,
            name: {
              errormessage:'',
              errorState: false,
            }
          }))    
          setName(value);
        }
        break;

      case 'surname':
        if(value.length === 0){
          setErrors(prev => ({
            ...prev,
            surname: {
              errormessage:'Etternavn* må fylles',
              errorState: true,
            }
          }))    
          setSurname(value);
        }else{
          setErrors(prev => ({
            ...prev,
            surname: {
              errormessage:'',
              errorState: false,
            }
          }))    
          setSurname(value);
        }
        break;

      case 'email':
        if(value.length === 0){
          setErrors(prev => ({
            ...prev,
            email: {
              errormessage:'Epost* må fylles',
              errorState: true,
            }
          }))    
          setEmail(value);
        }else if(validEmailRegex.test(value)!== true){
          setErrors(prev => ({
            ...prev,
            email: {
              errormessage:'Skriv inn en gyldig Epost*',
              errorState: true,
            }
          }))    
          setEmail(value);
        }else{
          setErrors(prev => ({
            ...prev,
            email: {
              errormessage:'',
              errorState: false,
            }
          }))    
          setEmail(value);
        }
        break;
          
    }
  }

  const validateForm = () => {
    let invalid = false
    console.log(errors)
    Object.values(errors).map((textfield) => {
      console.log(textfield.errorState)
      if(textfield.errorState === true){
        invalid = true
      }
    })
    return invalid
  }

  const submitForm = () => {
    if(validateForm()=== false){
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const avbrytForm = () => {
    //clear form
    setRegnr('');
    setBonus('Placeholder');
    setBirthnr('');
    setName('');
    setSurname('');
    setEmail('');
  }

  return (
    <Container fixed>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.topForm}>
          <div className={classes.fourtyeight}><h1>Kjøp Bilforsikring</h1></div>
          <p>
            Det er fire forskjellige forsikringer å velge mellom. 
            Ansvarsforsikring er lovpålagdt om kjøretøyet
            er registrert og skal brukes på veien. I tillegg kan du 
            utvide forsikringen avhengig av hvor gammel bilen din er 
            og hvordan du bruker den.
          </p>
        </div>
        <div className={classes.seventytwo}>
          <div >
          Bilens registreringsnummer
          </div>
          <div><TextField required id="standard-required-regnr" error={errors.regnr.errorState} helperText={errors.regnr.errormessage} name="regnr" value={regnr} onChange={handleChange} placeholder="e.g. AB 12345" /></div>
        </div>
        <div className={classes.nintisix}>
          <div>
          Din bonus
          </div>
          <div>
          <TextField
            id="select-basic"
            select
            name="bonus"
            value={bonus}
            onChange={handleChange}
            helperText="Hjelpetekst står her"
          >{bonusMenu.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
            ))}
          </TextField>
          </div>
        </div>
        <div className={classes.seventytwo}>
          <div>
          Fødselsnummer
          </div>
          <div>
          <TextField name="birthnr" required id="standard-required-birthnr" error={errors.birthnr.errorState} helperText={errors.birthnr.errormessage} value={birthnr} onChange={handleChange} placeholder="11 siffer" />
          </div>
        </div>
        <div className={classes.seventytwo}>
          <div>
          Fornavn
          </div>
          <div >
            <TextField name="name" required id="standard-required-name" error={errors.name.errorState} helperText={errors.name.errormessage}  value={name} onChange={handleChange} placeholder="Placeholder" />
          </div>
          </div>
          <div className={classes.seventytwo}>
          <div>Etternavn</div>
          <div >
            <TextField name="surname" required id="standard-required-surname" error={errors.surname.errorState} helperText={errors.surname.errormessage}  value={surname} onChange={handleChange} placeholder="Placeholder" />
          </div>
        </div>
        <div className={classes.twelvezero}>
          <div>Epost</div>
          <div >
            <TextField name="email" required id="standard-required-email" error={errors.email.errorState} helperText={errors.email.errormessage} value={email} onChange={handleChange} placeholder="123@email.no" />
          </div>
        </div>

        <div className={classes.fourtyeight}>
          <Fab variant="extended" size="medium" className={classes.betweenButtons} onClick={submitForm}>
          Beregn pris
          </Fab>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          ><div style={modalStyle} className={classes.paper}>
          <h2>Beregnet pris: 920</h2>
          <Fab size="medium" variant="extended" className={classes.betweenButtons} onClick={handleClose}>
            Gå til betaling
          </Fab>
          <Fab size="medium" variant="extended" className={classes.buttonStyle} onClick={handleClose}>
            Avbryt
          </Fab>
        </div></Modal>
          <Fab size="medium" variant="extended" className={classes.buttonStyle} onClick={avbrytForm}>
            Avbryt
          </Fab>
        </div>
      </form>
    </Container>
  );
};