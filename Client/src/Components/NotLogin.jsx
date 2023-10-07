import React,{useEffect,useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure,
    Spinner
  } from '@chakra-ui/react';
  import "../Styles/styles.css";
  import { useNavigate } from 'react-router-dom';


export default function NotLogin() {

    let Naviaget=useNavigate();
   
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
    
      const OverlayTwo = () => (
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'
        />
      )
    
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayOne />)

      useEffect(()=>{
            onOpen();
      },[])

      let  [spin,setSpin]=useState(false);

      function handleClickLogin(){
            setSpin(true)
            setTimeout(()=>{
                Naviaget("/login");
            },1000)
          
      }
    
      return (
        <div>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>SocioMeet</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Please Login first to use Website!</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
                <Button  ml="10px" onClick={handleClickLogin}>Login</Button>
              </ModalFooter>
              <div className="spinner-one">
          {
            spin && <Spinner
            
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='rgb(134, 216, 208)'
            size='xl'
          />
        }
        </div>
            </ModalContent>
          </Modal>
        </div>
      )
}
