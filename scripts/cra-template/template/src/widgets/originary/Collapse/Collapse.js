import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './Collapse.scss';

function Collapse({ children, title, opened }) {
  const [accordiondown, setAccordion] = useState(true);
  const activeKey = opened;
  return (
    <Accordion defaultActiveKey={activeKey}>
      <Card>
        <Accordion.Toggle as={Card.Header} className="container-fluid bg-white pointer title" open={!accordiondown} variant="div" eventKey="0" onClick={() => setAccordion(!accordiondown)}>
          <span className="float-left">
            {title}
          </span>
          <span className="float-right">
            <FontAwesomeIcon className="float-left" icon={accordiondown ? faAngleDown: faAngleLeft} />
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse as={Card.Body} eventKey="0">
          {children}
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Collapse;
