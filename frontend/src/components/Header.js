import React from "react";
import "../css/Header.css";
import readable from "../images/readable.png";

import { Grid, Row, Col, Image } from "react-bootstrap";

const Header = () => {
  return (
    <div className="Header-header">
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <Row>
              <Col xs={8} md={8}>
                <Image src={readable} alt="Readable" responsive />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Header;
