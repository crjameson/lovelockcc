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
                        <div className="overlay_header"><h1 className='fw-bold text-center'>Show your infinite love</h1><p className='text-center'>Create your own love lock NFT on the blockchain.<br /> Unique. Everlasting. Undestroyable.</p></div>
                        
                    </Container>
                </div>

                <Container className="section_1">
                    <h2 className="display-6 fw-bold text-center mb-4">Is there a very special person in your life?</h2>
                    <p className='text-center'>Whether it's your partner, a friend or family. With these love locks your love will be sealed. <br /> A bit nerdy but certainly a very special and romantic gift for your loved ones.</p>
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
                            <h2 className="text-center display-5 fw-bold  mb-4">Mint your <span className="spanlove">Love</span>Lock
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col md={8}>
                            <p className="col-md-12 text-center">With the LoveLock NFT it is now possible to prove your beloved
                                partner true loyalty, honesty and faithfulness. Once the NFT minted on the Blockchain your
                                love is as immutable as the NFT itself. Every NFT can be customized and is unique to you and
                                your partner.</p>
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
                    <p className="col-md-12 text-center">Wherever you are, and whatever you do, be in love. Love is the bridge between you and everything. (Rumi)</p>
                    <div className='faded-button margin_topsmall'>
                        <Link
                            to={`${process.env.PUBLIC_URL}/mint`}
                            className="btn btn-light btn-lg"
                        >Mint now!</Link>
                    </div>
                </div>


                <Container className="section_6">
                    <h2 className="display-6 mb-3 fw-bold text-center  mb-4">The Idea of Love Locks</h2>
                    <p className="">You have probably already seen them on bridges all over the world, padlocks which significant others lock to a bridge to seal their love. The history of these love locks dates back over 100 years to Serbia but has quickly spread worldwide. 

These little locks are a beautiful romantic gesture and the perfect gift for your anniversary, wedding or valentines day. </p>
<p className="">But they also have their caveats. There was the story of the famous Pont des Arts bridge in Paris which collapsed under the weight of 45 tons of love locks and some municipal authorities treat them as vandalism and remove them. </p>

<p className=""><b>So the basic idea of this little website is to put that romantic love lock gesture on the blockchain which makes it really immutable, undestroyable and forever. 

No waste, no pollution of the environment and no way to remove it. A bit nerdy but certainly a very special gift for your loved ones.</b> 
</p>
                </Container>

                <Container className="section_6">
                    <h2 className="display-6 mb-3 fw-bold text-center  mb-4">How does it work?</h2>
                    <p className=""><b>You can design and mint your own unique love lock Non Fungible Token (NFT) on this website.</b> It's fully decentralized and the complete NFT is stored on the blockchain itself! This makes it independent from any centralized service providers and even this website.</p>
<p className="">To create your own love lock is very simple:</p>
<ol>
    <li>Connect your wallet to this site</li>
    <li>Design your unique LoveLock</li>
    <li>Press the mint Button</li>
</ol>

<p className="">Then your unique love lock will be created and sent to your wallet.</p>

<p className="">There is a one time fee for the lock of 25 USD paid in the native Token during mint (ETH / Matic). 
<b> Half of the funds will go into a raffle and each month one of the locks will be chosen as winner.</b> This is completely random and happens to be fully automated supported by chainlink automation and their verifiable randomness oracles.  So if you’re lucky, maybe you can go for a nice dinner or even a short holiday trip together with that money. And you have this chance every month. We thought this might make the locks more interesting even for the not so romantic persons.  
</p>
<p className="">The other half of the fee is used for transaction fees and the development fund of this website. We plan to build a beautiful love lock bridge in the metaverse. </p>
                </Container>

                <Container className="section_6">
                    <h2 className="display-6 mb-3 fw-bold text-center  mb-4">Frequently asked Questions</h2>
                    <h3>Which networks do you support?</h3>
                    <p className="">We are currently live on the Polygon network but plan to support other EVM-based chains or Layer2 solutions for Ethereum as well. Next one will probably be Arbitrum. For you it's no difference, you can use any chain which is convenient for you. </p>
                    
                    <h3>What happens when I win the raffle?</h3>
                    <p className="">Each raffle runs 30 days and will always end on the first day of a month at 6 PM UTC. The countdown shows the remaining time and the current amount to win. You can check if you have won by just going to the raffle site. If you have won you have until the next raffle starts to claim your prize money. If it's not claimed it will go into the next raffle. </p>

                    <h3>Is this site secure?</h3>
                    <p className="">Yes it is. We won't ask you for any personal information ever and have no access to your funds or wallet. When connecting to the site, you provide only  a public key and there are only two possible transactions on this site. Mint your NFT love lock and claim your prize money. To prove this our code is verified and fully open source. </p>

                    <h3>Is the raffle truly random?</h3>
                    <p className="">Yes. We are using Chain Link VRF which is some amazing technology where you can generate provable random numbers. You can read more about this here. </p>

                    <h3>Why this idea?</h3>
                    <p className="">We are a bit nerdy ourselves and just love to learn and play around with new technology. This is very time consuming and sometimes a little burden for a relationship. So with this romantic gesture, we hope to at least get a little more understanding ;) Besides this, this project originated in the Chain Link fall Hackathon 2022 and we were looking for a nice idea which is not about DeFi or Money, as that's not that much fun in a bear market ;)</p>

                    <h3>Any more questions?</h3>
                    <p className="">Just send us an email and we will see what we can do for you. </p>
                    
                 </Container>


                <div className="section_4">
                    <Row className='justify-content-center'>
                        <Col className="text-center flex_images flex-column" lg={6}>
                            <h1 className="display-6 fw-bold mb-4">Ready?</h1>
                            <p></p>
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
