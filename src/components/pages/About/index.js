import './index.css';

const About = () => {
  return (
    <div className='about'>
      <div class="header_about">
          <h1>About Us</h1>
      </div>
      <div className="container_about">
          <h2>Welcome to Our Restaurant</h2>
          <p>
              Our restaurant offers a delightful culinary experience with a blend of traditional and modern dishes. Located in the heart of the city, we pride ourselves on using the freshest ingredients and serving meals that satisfy both the palate and the soul.
          </p>
          <h2>Our Story</h2>
          <p>
              Established in 2005, our restaurant started as a small family-run business with a passion for food and hospitality. Over the years, we have grown and evolved, but our core values remain the same: to provide excellent food and exceptional service.
          </p>
          <h2>Our Team</h2>
          <p>
              Our team is a group of dedicated professionals who love what they do. From our chefs who craft each dish with care to our friendly waitstaff who ensure your dining experience is enjoyable, everyone at our restaurant is committed to making your visit memorable.
          </p>
          <h2>Contact Us</h2>
          <p>
              We would love to hear from you! For reservations, catering services, or any other inquiries, please contact us at:
          </p>
          <p>
              <strong>Phone:</strong> (123) 456-7890<br/>
              <strong>Email:</strong> info@ourrestaurant.com
          </p>
      </div>
    </div>
    );
};

export default About;
