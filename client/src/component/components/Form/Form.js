import React, { useState, useEffect}  from 'react'
import { TextField, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost  } from '../../actions/posts';
import './form.css'
import ChipInput from 'material-ui-chip-input';

 
const Form = ({ currentId, setCurrentId }) => {

 const [postData, setPostData] = useState({ companyName: '', jobTitle: '', description: '', projectDeliverables: '', tags: [], selectedFile: '' });
 const post = useSelector((state) => (currentId ? state.posts.posts.find((projectDeliverables) => projectDeliverables._id === currentId) : null));
const classes = useStyles();
 const dispatch = useDispatch();
 const user = JSON.parse(localStorage.getItem('profile'));
 const navigate = useNavigate();



 useEffect(() => {
  if (!post?.jobTitle) clear();
  if (post) setPostData(post);
}, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ companyName: '', jobTitle: '', description: '', projectDeliverables: '', tags: [], selectedFile: '' });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (currentId === 0) {

    dispatch(createPost({ ...postData, name: `Created By: ${user?.result?.name}`},navigate));
    
    
    clear();
  } else {
    dispatch(updatePost(currentId, { ...postData, name:  `Created By:  ${user?.result?.name}`}));
    clear();
  }
 }
 
 if (!user?.result?.name) {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Please Sign In to Hire a Freelancer.
      </Typography>
    </Paper>
  );
}

const handleAddChip = (tag) => {
  setPostData({ ...postData, tags: [...postData.tags, tag] });
};

const handleDeleteChip = (chipToDelete) => {
  setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
};


 return (
    <Paper className= {classes.paper} elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <h1>Hire a Freelancer </h1>
        <Typography variant="h6">{currentId ? 'Edit' : 'Create'} a job post </Typography>
        <TextField name="companyName" variant="outlined" label="Company Name" fullWidth value={postData.companyName} onChange={(e) => setPostData({ ...postData, companyName: e.target.value })} />
        <TextField name="jobTitle" variant="outlined" label="Job Title" fullWidth value={postData.jobTitle} onChange={(e) => setPostData({ ...postData, jobTitle: e.target.value })} />
        <TextField name="projectDeliverables" variant="outlined" label="Project Deliverables" fullWidth multiline minRows={2} value={postData.projectDeliverables} onChange={(e) => setPostData({ ...postData, projectDeliverables: e.target.value })} />
        <TextField name="description" variant="outlined" label="description" fullWidth multiline minRows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        {/* <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} /> */}
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <button className='btn btn-primary' variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</button>
        <button  className='btn' variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</button>
        
        </form>
    </Paper>
  )
}

export default Form