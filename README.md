# Image Uploader UI (React JS and Material UI)

The approach to the UI for the project is simple, a single page application (SPA) with an upload button. 
Upon clicking the button, the user will see a window pop up to give them the view of their files on their PC. From there, they can select the image they wish to upload. 

Upon selection, and clicking 'open', a request to the API will be sent with the image in the request header as a form. From a successful upload (ie. the API sends back the image data),
the UI will open the image in a modal and a notification will appear stating it was successful. From there, the user can click away from the modal, and start the process again. 

If an error would occur, this would also be displayed to the user. 
