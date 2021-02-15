import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '50px'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100px'
    },
    link: {
        textDecoration: 'none',
    }
}));

const ArticleItems = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {props.articles.map(article => (
                    <Grid item xs={12} sm={3} key={article.articleId} onClick={()=>props.onArticleClicked(article.articleId)}>
                        <NavLink className={classes.link} to='/articleDetail'>
                            <Paper className={classes.paper} >
                                <Typography color="textSecondary" gutterBottom>
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {article.description}
                                </Typography>
                            </Paper>
                        </NavLink>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onArticleClicked: (id) => dispatch(actions.fetchArticle(id))
    }
};

export default connect(null, mapDispatchToProps)(ArticleItems);
