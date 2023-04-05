import facebook from '../img/facebook.svg';
import github from '../img/github.svg';
import twitter from '../img/twitter.svg';

const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='logo'>
                    <p className='tag'>Movie Hive</p>
                    <p className='tag'>Discover Movies within One Click</p>
                </div>
                <div className='brands'>
                    <div className='brandLogo facebookLogo'>
                        <a href='https://facebook.com/Orrytt' target='blank'>
                            <img src={facebook} alt='facebook-logo' />
                        </a>
                    </div>
                    <div className='brandLogo githubLogo'>
                        <a href='https://github.com/ptatasu' target='blank'>
                            <img src={github} alt='github-logo' />
                        </a>
                    </div>
                    <div className='brandLogo twitterLogo'>
                        <a href='https://twitter.com/ptatasu' target='blank'>
                            <img src={twitter} alt='twitter-logo' />
                        </a>
                    </div>
                </div>
                <div className='copy'>Copyright &copy;2023</div>
            </div>
        </>
    );
};

export default Footer;
