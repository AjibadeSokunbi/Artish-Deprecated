import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import {  deletePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';


const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();  
 const dispatch = useDispatch();
 const user = JSON.parse(localStorage.getItem('profile'));
 const navigate = useNavigate();

 const openPost = (e) => {

  navigate(`/posts/${post._id}`);

};  



  return (

    <Card className={classes.card} raised elevation={6}>
       <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      > 
    <CardMedia className={classes.media} image={post.selectedFile} title={post.jobTitle} />
    <div className={classes.overlay}>
      <Typography variant="h6">{post.companyName}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={(e) => { e.stopPropagation(); 
          setCurrentId(post._id)}}
           style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
     )}
    <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{post.name}</Typography>
    </div>
 <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.jobTitle}</Typography>
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">{post.projectDeliverables}</Typography>
    </CardContent>
    </ButtonBase> 
    <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
    </div>
    
    <CardActions className={classes.cardActions}>
    {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
    </CardActions>
  </Card>
  )
}

export default Post;