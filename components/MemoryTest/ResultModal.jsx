import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faStopwatch } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'

import convertTime from '../../helpers/convertTime'

import { useTest } from '../../context/TestContext'

export default function ResultModal() {
  const { t, i18n } = useTranslation();

  const {
    modalShow,
    cancelTest,
    failures,
    startTime,
    finishTime,
    testData,
    statistic,
    getTestPosition
  } = useTest();

  console.log('testData=>', testData);
  console.log('statistic=>', statistic);

  console.log(getTestPosition());
    return (
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="result-modal"
      >
        <Modal.Header closeButton className="align-items-center">
          <Modal.Title id="contained-modal-title-vcenter">
            {t('resultModalTitle')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="result-modal__details d-flex justify-content-between">
              {
                testData && statistic ? (
                  <div className="result-data">
                    <p className="result-data__value">
                        <FontAwesomeIcon icon={faBomb} size="xs" />
                        <span>{getTestPosition()}</span>
                    </p>
                    <p className="result-data__label">Position</p>
                  </div>
                ) : ''
              }
              <div className="result-data">
                  <p className="result-data__value">
                      <FontAwesomeIcon icon={faBomb} size="xs" />
                      <span>{failures}</span>
                  </p>
                  <p className="result-data__label">{t('resultFailuresTitle')}</p>
              </div>
              <div className="result-data">
                  <p className="result-data__value">
                      <FontAwesomeIcon icon={faStopwatch} size="xs" />
                      <span>{convertTime(finishTime - startTime)}</span>
                  </p>
                  <p className="result-data__label">{t('resultAnswerTimeTitle')}</p>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="dark" className="btn-lg" onClick={cancelTest}>{t('resultButtonLabel')}</Button>
        </Modal.Footer>
      </Modal>
    );
  }