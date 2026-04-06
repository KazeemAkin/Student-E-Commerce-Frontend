import { Form, Formik } from "formik";
import * as Yup from "yup";

// css
import "../Index/Index.css";

// image
import about_us_image from "../../assets/demo-images/reading-table.jpg";
import contact_us_image from "../../assets/elements/contact_us.svg";

// components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import FooterNote from "./FooterNote";
import InputField from "../../components/form/InputField";
import colors from "../../config/colors";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format.").required(required),
  password: Yup.string().required(required),
});

const initialValues = {
  email: "",
  password: "",
};

function ContactUsScreen() {
  /**
   * Submit contact us form
   * @param {*} values
   */
  const handleSubmit = async (values) => {};
  return (
    <section className="main-wrapper">
      <Navbar active_screen="contact" />
      <BottomNavbar />

      <header className="about-us-header">
        <div className="header-image">
          <img src={about_us_image} alt="contact" />
        </div>
        <div className="header-text">Contact</div>
      </header>

      <section className="contact-us-container">
        <div className="contact-us-body">
          <div className="form-body">
            <h3>Let's hear from you</h3>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ values }) => (
                <Form
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div className="field-container">
                    <InputField
                      name="Full Name"
                      placeholder="Enter full name"
                      fontSize={14}
                      height={30}
                      width="100%"
                      backgroundColor={colors.ash}
                      paddingLeft={25}
                      paddingRight={25}
                      labelTitle="Full Name"
                    />
                  </div>
                  <div className="field-container">
                    <InputField
                      name="email"
                      placeholder="Enter email"
                      fontSize={14}
                      height={30}
                      width="100%"
                      type="email"
                      backgroundColor={colors.ash}
                      paddingLeft={25}
                      paddingRight={25}
                      labelTitle="Email"
                    />
                  </div>
                  <div className="field-container">
                    <InputField
                      name="message"
                      placeholder="Enter your message"
                      fontSize={14}
                      height={150}
                      rows={8}
                      cols={8}
                      width="100%"
                      as="textarea"
                      backgroundColor={colors.ash}
                      paddingLeft={25}
                      paddingRight={25}
                      labelTitle="Message"
                    />
                  </div>

                  <div className="flex justify-center mt-30 w-100pc">
                    <ButtonIcon
                      buttonText="Send Message"
                      backgroundColor={colors.primary}
                      borderColor={colors.primary}
                      color={colors.white}
                      width="100%"
                      height={51}
                      marginTop={2}
                      borderRadius={0}
                      fontSize={16}
                      onClick={() => handleSubmit(values)}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="image-box">
            <img src={contact_us_image} alt="Contact Us" />
          </div>
        </div>
      </section>

      <FooterNote
        style={{ backgroundColor: colors.lightgray }}
        rightBtnStyle={{ backgroundColor: colors.primary }}
        linkStyle={{ color: colors.white }}
      />
      <Footer />
    </section>
  );
}

export default ContactUsScreen;
