import { useState } from 'react';
import { Button, Box, Modal, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios'
import { useSnackbar } from 'notistack';


const ImageUploader = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [postView, setPostView] = useState()
  const [loading, setLoading] = useState(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSelectedImage = (e) => {
    if (!e.target.files.length) {
      return
    }

    var form = new FormData();
    form.append('image', e.target.files[0])
    setLoading(true)
    axios
    .post('https://localhost:7211/api/upload', form)
    .then(response => {
      setPostView(URL.createObjectURL(e.target.files[0]))
      enqueueSnackbar(
        `Successfully uploaded image ${response.data.fileName}`, 
        { variant: 'success' }
      );
    })
    .catch(e => {
      enqueueSnackbar(e.message, { variant: 'error' });
    })
    .finally(() => {
      setLoading(false)
    })
  }
  const handleClose = () => {
    setPostView()
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress />
      </Backdrop>
      <h4>Select an image to upload to the cloud...</h4>
      <Button variant="contained" component="label">
        Upload Image
        <input
          onChange={handleSelectedImage}
          id="raised-button-file"
          accept="image/png, image/jpg"
          type="file"
          hidden
        />
      </Button>
      <Modal
        open={postView}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <img style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }} src={postView} alt="post-view" />
        </Box>
      </Modal>
    </>
  )
}
export default ImageUploader