import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector,} from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate,  Link  } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import './postDetails.css'

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => { 
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    } 
  }, [post]);
  // RECOMMENDED

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
 
  return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
        <Typography variant="h3" component="h2">{post.companyName}</Typography>
          <Typography variant="h4" component="h4">{post.jobTitle}</Typography>
        
          <Typography gutterBottom variant="body2" component="p">{post.projectDeliverables}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.description}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
            ))} </Typography>
         
          <Typography variant="h6">{post.name}</Typography>
       
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might be Interested:</Typography>
          <Divider />
          <div className='container portfolio__container'>
            {recommendedPosts.map(({ jobTitle, name, projectDeliverables, selectedFile, _id }) => (
              <article className="portfolio__item" style={{ cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
              <div className='portfolio__item-image'>
              <img alt={jobTitle} src={selectedFile} height="200px" />
              </div>
                <h3>{jobTitle}</h3>
                <h4>{name}</h4>
                <div className="portfolio__item-cta">
                
                <div >{projectDeliverables}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
}

export default PostDetails
