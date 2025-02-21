import './AboutPage-style.css';

const About = () => {

    return (
         <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <div className="about-content">
                <p>
                    At Youngblood, we bring together a vibrant collection of artwork from talented artists across the globe. Whether you are an avid art enthusiast or just exploring the beauty of artistic expression, our gallery offers a diverse range of mediums, styles, and perspectives that will captivate and inspire.
                </p>
                <p>
                    From contemporary paintings to abstract sculptures, each piece tells a unique story and showcases the creativity of emerging and established artists. Take a journey through our curated collections and immerse yourself in the global art scene, right from the comfort of your home.
                </p>
            </div> 
        </div>
    );
};
console.log('Rendering About Page component');
export default About;