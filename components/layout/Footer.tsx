import { Fragment } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import classes from './Header.module.css'


const Footer = () => {

    return <Fragment>
        <div className={classes.footcontainer}>
        <Row>
            <Col md={5}>
                <p>Copyright &copy; 2024 JJ Safety LLC. All rights reserved</p>
            </Col>
            <Col md={2}></Col>
            <Col md={5}>
                <p>Contact | Privacy | Terms</p>
            </Col>
        </Row>
        </div>
    </Fragment>
}

export default Footer;