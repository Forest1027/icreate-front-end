import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        marginTop: '25px'
    },
    label: {
        height: '100%',
    },
    submitButton: {
        backgroundColor: '#660033',
        color: 'white',
        height: '100%',
        textAlign: 'left',
        marginTop: '25px'
    },
    textBox: {
        marginBottom: '25px'
    },
    '@media (min-width:550px)': {
        inputClass: {
            fullWidth: true,
        },
        title: {
            textAlign: 'left'
        },
    },
}));

const CredentialForm = (props) => {
    const classes = useStyles();
    return (
        <Box justifyContent="center" display="flex" flexWrap='wrap'>
            <form className={classes.root}>
                <Box justifyContent="center">
                    {Object.keys(props.formData).map(fieldName=>(
                        <Box justifyContent="center" className={classes.textBox} key={fieldName}>
                            <Grid container justify="center" direction="row" alignItems="center" spacing={1}>
                                <Grid item xs={12} sm={6} className={classes.title}>
                                    <Typography variant="h6">
                                        {props.formData[fieldName].display}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id={props.formData[fieldName].name}
                                        label={props.formData[fieldName].placeholder}
                                        variant="outlined"
                                        className={classes.inputClass}
                                        onChange={props.changed}
                                        name={props.formData[fieldName].name}
                                        type={props.formData[fieldName].type}
                                        error={!props.formData[fieldName].valid && props.formData[fieldName].touched}
                                        helperText={(!props.formData[fieldName].valid && props.formData[fieldName].touched)?props.formData[fieldName].helpText:""}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    <Box>
                        <Button className={classes.submitButton} variant="contained" onClick={props.submitted} disabled={!props.formValid}
                                >Submit</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default CredentialForm;