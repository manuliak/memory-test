import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faStopwatch } from '@fortawesome/free-solid-svg-icons'

export default function ResultModal({show, failures, answerTime, onHide}) {
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="result-modal"
      >
        <Modal.Header closeButton className="align-items-center">
          <Modal.Title id="contained-modal-title-vcenter">
            Your result
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="result-modal__details d-flex justify-content-between">
                <div className="result-data">
                    <p className="result-data__value">
                        <FontAwesomeIcon icon={faBomb} size="xs" />
                        <span>{failures}</span>
                    </p>
                    <p className="result-data__label">Failures</p>
                </div>
                <div className="result-data">
                    <p className="result-data__value">
                        <FontAwesomeIcon icon={faStopwatch} size="xs" />
                        <span>{answerTime}</span>
                    </p>
                    <p className="result-data__label">Answer time</p>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="dark" className="btn-lg" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }