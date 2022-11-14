import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap'

import unique from "../Assets/Unique.svg";
import eternity from "../Assets/eternity.svg";
import axe from "../Assets/axe.svg";
import hearthimg from "../Assets/heart.svg";
import '../scss/home.scss'

export default class Homenew extends React.Component {
    render() {
        return (
            <div className='home'>
                <div className="hero">
                    <Container>
                        <div className="overlay_header"><h1>Show your infinte love</h1></div>
                    </Container>
                </div>

                <Container className="section_1">
                    <h1 className="display-6 fw-bold text-center mb-4">Is there a very special person in your life?</h1>
                    <p className='text-center'>Whether it's a friend, family, partner or your pet.<br /> With these Lovelocks your love will be sealed.</p>
                </Container>

                <Row className="section_2">
                    <Col lg={2}></Col>
                    <Col lg={2} className="flex_images">
                        <img src={unique} />
                        <p className="boldh1">Unique</p>
                    </Col>
                    <Col lg={2} className="flex_images">
                        <img src={eternity} />
                        <p className="boldh1">For Eternity</p>

                    </Col>
                    <Col lg={2} className="flex_images">
                        <img src={axe} />
                        <p className="boldh1">Undestroyable</p>
                    </Col>
                    <Col lg={2}></Col>
                </Row>

                <Container className="section_5">
                    <Row>
                        <Col>
                            <h1 className="text-center display-5 fw-bold  mb-4">Mint your <span className="spanlove">Love</span>Lock
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col md={8}>
                            <p className="col-md-12 text-center">With the LoveLock NFT it is now possible to prove your beloved
                                partner true loyalty, honesty and faithfulness. Once the NFT minted on the Blockchain your
                                Love is as immutable as the NFT itself. Every NFT can be customized and is unique to you and
                                your Partner.</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='faded-button text-center'>
                                <img src={hearthimg} />
                            </div>
                        </Col>
                    </Row>
                </Container>


                <div className="section_3">
                    <h2 className='mb-4'>Start showing your Love now!</h2>
                    <div className='faded-button margin_topsmall'>
                        <Link
                            to={`${process.env.PUBLIC_URL}/mint`}
                            className="btn btn-light btn-lg"
                        >Mint now!</Link>
                    </div>
                </div>


                <Container className="section_6">
                    <h1 className="display-6 mb-3 fw-bold text-center  mb-4">Where does the custom come from?</h1>
                    <p className="text-center">It does not seem to be very clear where exactly this cute custom
                        comes from. Probably the most frequently mentioned version is the one that assumes Florence
                        in the heart of Italy as the startin point in Europe.</p>
                    <p className="text-center">This is probably where the graduates of the San Georgio Medical
                        University immortalized themselves after graduation on a grate of the Ponte Vecchio. As a
                        symbol that their university time is now definitely over, they hung the padlocks of their
                        lockers there. This custom was them presumably adopted by couples in love in Rome at the
                        Milvian Bridge.</p>
                </Container>


                <div className="section_4">
                    <Row className='justify-content-center'>
                        <Col className="text-center flex_images flex-column" lg={6}>
                            <h1 className="display-6 fw-bold mb-4">Don't take a risk</h1>
                            <p>The risk of the lock being lost, dismantled or otherwise out of place is just too risky
                                for eternal love. create your nft and your love will be sealed for eternity.</p>
                            <div className='faded-button'>
                                <Link
                                    to={`${process.env.PUBLIC_URL}/mint`}
                                    className="btn btn-danger btn-lg"
                                >Mint now!</Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
