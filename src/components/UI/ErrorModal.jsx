import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
  return <div  onClick={props.onCloseCard} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div  className={classes.modal}>
      <div className={classes.content}>
        {props.children}
        </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const ErrorModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onCloseCard={props.onCloseCard}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default ErrorModal;