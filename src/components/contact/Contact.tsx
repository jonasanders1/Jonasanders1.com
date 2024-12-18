import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../customButton/CustomButton";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <SectionTitle title="Get in touch" subtitle="Contact me" />
      <div className="contact__container container grid">
        <div className="contact__content">
          <h3 className="contact__title">Talk to me</h3>

          <div className="contact__info">
            <div className="contact__card">
              <i className="bx bx-mail-send contact__card-icon"></i>
              <h3 className="contact__card-title">Email</h3>
              <span className="contact__card-data">Jonas@anders1.com</span>
              <a href="mailto:jonas@anders1.com" className="contact__button">
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </div>

            <div className="contact__card">
              <i className="bx bxl-whatsapp contact__card-icon"></i>
              <h3 className="contact__card-title">Whatsapp</h3>
              <span className="contact__card-data">+47 96049640</span>
              <a href="#" className="contact__button">
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </div>

            <div className="contact__card">
              <i className="bx bxl-messenger contact__card-icon"></i>
              <h3 className="contact__card-title">LinkedIn</h3>
              <span className="contact__card-data"></span>
              <a href="#" className="contact__button">
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact__content">
          <h3 className="contact__title">Write me your project</h3>
          <form className="contact__form">
            <div className="contact__form-div">
              <label className="contact__form-tag">Name</label>
              <input
                type="text"
                name="name"
                className="contact__form-input"
                placeholder="Enter your name..."
              />
            </div>

            <div className="contact__form-div">
              <label className="contact__form-tag">Mail</label>
              <input
                type="text"
                name="email"
                className="contact__form-input"
                placeholder="Enter your email..."
              />
            </div>

            <div className="contact__form-div contact__form-area">
              <label className="contact__form-tag">Message</label>
              <textarea
                name="message"
                className="contact__form-input"
                placeholder="Message..."
              ></textarea>
            </div>

            <CustomButton
              title="Send Message"
              isLink={false}
              icon={<FontAwesomeIcon icon={faPaperPlane} />}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
