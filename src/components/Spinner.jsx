import { Spinner } from "react-bootstrap";
import './Spinner.scss';
const SpinnerCircle = () => {
  return (
    <div className="loading-wrapper">
    <div className="loading-cat">
          <div className="cat-body" />
          <div className="cat-animation-mask" />
          <div className="cat-head">
            <div className="cat-face" />
            <div className="cat-ear" />
            <div className="cat-hand" />
            <div className="cat-eye" />
            <div className="cat-eye-light" />
            <div className="cat-mouth" />
            <div className="cat-beard left" />
            <div className="cat-beard right" />
          </div>
          <div className="cat-foot">
          <div className="cat-belly" />
          <div className="cat-leg" />
          <div className="cat-tail" />
          </div>
    </div>  
    </div>
 )
};

export default SpinnerCircle;
