import { Modal, Button } from 'react-bootstrap'

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
                <div>
                    <p>Failures: {failures}</p>
                </div>
                <div>
                    <p>Answer time: {answerTime}</p>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="dark" className="btn-lg" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }