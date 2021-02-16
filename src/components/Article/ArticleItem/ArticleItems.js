import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import * as actions from "../../../store/actions";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '50px'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        height: '100px'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.secondary,
    },
    iconButton: {
        padding: '0px'
    }
}));

const ArticleItems = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {props.articles.map(article => (
                    <Grid item xs={12} sm={3} key={article.articleId}>
                        <Paper className={classes.paper}>
                            <Grid container justify="flex-end">
                                <IconButton className={classes.iconButton} onClick={() => props.onDeleteClicked(article.articleId)}><HighlightOffIcon fontSize="small"/></IconButton>
                            </Grid>
                            <NavLink className={classes.link} to='/articleDetail'>
                                <Grid onClick={() => props.onArticleClicked(article.articleId)}>
                                    <Typography color="textSecondary" gutterBottom>
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {article.description}
                                    </Typography>
                                </Grid>
                            </NavLink>
                        </Paper>

                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onArticleClicked: (id) => dispatch(actions.fetchArticle(id)),
        onDeleteClicked: (id) => dispatch(actions.openDialog(id))
    }
};

export default connect(null, mapDispatchToProps)(ArticleItems);
