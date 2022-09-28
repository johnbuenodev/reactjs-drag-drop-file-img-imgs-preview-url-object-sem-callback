import { useState } from 'react';
import './DragDropFileImage.css';

function DragDropFileImage(props) {

  const {fileAction} = props;
   
  //images lista 
  const [images, setImages] = useState([]);
  //image  objeto
  const [image, setImage] = useState({});

  const dragEvents = {
    onDragEnter: (e) => {e.preventDefault();console.log('onDragEnter');},
    onDragLeave: (e) => {e.preventDefault();console.log('onDragLeave');}, 
    onDragOver:  (e) => {e.preventDefault();console.log('onDragOver');},
    onDrop:      (e) => {
      e.preventDefault();
      if(fileAction === false ) {
      console.log('onDrop');

      console.log("Ativado modo single Drag Drop file upload(processo sem backend). Alterar no fonte HARDCODE p true.");
      
      console.log('Files');
      console.log(e.dataTransfer.files);

      console.log('Arquivo: ');
      console.log(e.dataTransfer.files[0]);
      console.log('Arquivo nome: ');
      console.log(e.dataTransfer.files[0].name);

      const nomeProcess = e.dataTransfer.files[0].name;

      console.log('Nome processado:');
      const nome = nomeProcess.substr(0, nomeProcess.lastIndexOf('.')) || nomeProcess;
      console.log(nome);

      console.log('Arquivo size: ');
      console.log(e.dataTransfer.files[0].size);
      console.log('Arquivo type: ');
      console.log(e.dataTransfer.files[0].type);
      setImage({name:e.dataTransfer.files[0].name, size: e.dataTransfer.files[0].size, preview: URL.createObjectURL(e.dataTransfer.files[0])});

      } else {

        console.log("Ativado Multiple Drag Drop file upload(processo sem backend). Alterar no fonte HARDCODE p false.");

        const files = Array.from(e.dataTransfer.files);
        const imagesProcess = files.map((file) => {
          const {name, size} = file;
          const preview = URL.createObjectURL(file);
          return {name, size, preview};
        });

        setImages([...imagesProcess]);
      }
    },
  }

  return (
    <div className="container">
      <div className='file-drop' {...dragEvents}>
       <div className='text'>Arraste{fileAction === true ? ' as Imagens' : ' a Imagem' }!</div>
      </div>
      <div className='preview'>

       { 
         (images.length > 0 && fileAction === true) ? images.map((image) => {
         return (
          <div className='image' key={image.name}>
           <img src={image.preview} alt={image.name} />
          </div>
         ) 
         }) : null 
       }

       { (image.name && fileAction === false) ? 
          <div className='image'>
           <img src={image.preview} alt={image.name} />
          </div>
         : null 
       }
      
      </div>
      
    </div>
  );
}

export default DragDropFileImage;
