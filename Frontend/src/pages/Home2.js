import React from 'react';
import {Link} from "react-router-dom";
import {Container} from 'react-bootstrap'
import {Accordion, Card, Row, Col} from 'react-bootstrap'
import '../scss/home.scss'

import unique from "../Assets/Unique.svg";
import eternity from "../Assets/eternity.svg";
import axe from "../Assets/axe.svg";
import hearthimg from "../Assets/heart.svg";

export default class Homenew extends React.Component {
    render() {
        return (
            <div>
                <div className="hero">
                    <Row className="row h-100 ">
                        <Col className="col text-center  test">
                            <div className="overlay_header"><h1>Show your infinte love</h1></div>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </div>
                <div className="section_1">
                    <Row className="h-100">
                        <Col></Col>
                        <Col className="col text-center  test section_1_text col-md-5">
                            <div className="h-50 test">
                                <h1 className="boldh1">Is there a very special person in your life?</h1>
                            </div>
                            <div className="h-50 test"><h5>Whether it's a friend, family, partner or your pet.<br/> With
                                these Lovelocks your lvoe will be sealed.</h5></div>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
                <div className="section_2">
                    <Row className="h-100">
                        <Col className="text-center"></Col>
                        <Col className="text-center flex_images flex-column">
                            <img src={unique}/>
                            <p className="boldh1">Unique</p>
                        </Col>
                        <Col className="text-center flex_images flex-column">
                            <img src={eternity}/>
                            <p className="boldh1">For Eternity</p>

                        </Col>
                        <Col className="text-center flex_images flex-column">
                            <img src={axe}/>
                            <p className="boldh1">Undestroyable</p>
                        </Col>
                        <Col className="text-center"></Col>
                    </Row>
                </div>

                <div className="section_5">
                    <Row>
                        <Col className="margin_top">
                            <h1 className="text-center display-5 fw-bold">Mint your <span
                                className="spanlove">Love</span>Lock
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col md={8} className="margin_top">
                            <p className="col-md-12 fs-5">With the LoveLock NFT it is now possible to prove your beloved
                                partner true loyalty, honesty and faithfulness. Once the NFT minted on the Blockchain your
                                Love is as immutable as the NFT itself. Every NFT can be customized and is unique to you and
                                your Partner.</p>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='faded-button text-center'>
                                <img src={hearthimg}/>
                            </div>
                        </Col>
                    </Row>
                </div>


                <div className="section_3">
                    <Row className="h-100">
                        <Col className="text-center flex_images flex-column">
                            <h2>Start showing your Love now!</h2>
                            <div className='faded-button margin_topsmall'>
                                <Link
                                    to={`${process.env.PUBLIC_URL}/mint`}
                                    className="btn btn-light btn-lg"
                                >Mint now!</Link>
                            </div>
                        </Col>

                    </Row>
                </div>


                <div className="section_6">
                    <Row>
                        <Col></Col>
                        <Col className="margin_top" md={7}>
                            <h1 className="text-center display-5 fw-bold">Where does the custom come from?</h1>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col md={8}>
                            <p className="col-md-12 fs-5">It does not seem to be very clear where exactly this cute custom
                                comes from. Probably the most frequently mentioned version is the one that assumes Florence
                                in the heart of Italy as the startin point in Europe.</p>
                            <p className="col-md-12 fs-5">This is probably where the graduates of the San Georgio Medical
                                University immortalized themselves after graduation on a grate of the Ponte Vecchio. As a
                                symbol that their university time is now definitely over, they hung the padlocks of their
                                lockers there. This custom was them presumably adopted by couples in love in Rome at the
                                Milvian Bridge.</p>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>


                <div className="section_4">
                    <Row className="h-100">
                        <Col></Col>
                        <Col className="text-center flex_images flex-column" md={6}>
                            <h1 className=" fw-bold">Don't take a risk</h1>
                            <p>The risk of the lock being lost, dismantled or otherwise out of place is just too risky
                                for eternal love. create your nft and your love will be sealed for eternity.</p>
                            <div className='faded-button'>
                                <Link
                                    to={`${process.env.PUBLIC_URL}/mint`}
                                    className="btn btn-danger btn-lg"
                                >Mint now!</Link>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
                <div className="section_9"></div>

            </div>
        );
    }
}
