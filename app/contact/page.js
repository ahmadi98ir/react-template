import PageBanner from "@/components/PageBanner";
import NoxfolioLayout from "@/layout/NoxfolioLayout";

export const metadata = {
  title: "تماس با من",
};

const page = () => {
  return (
    <NoxfolioLayout>
      <PageBanner pageName={"تماس با من"} />
      {/* Contact Page Area start */}
      <section dir="rtl" className="contact-page pt-40 pb-130 rpb-100 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="contact-page-content rmb-55 wow fadeInUp delay-0-2s">
                <div className="section-title mb-30">
                  <span className="sub-title mb-15">با من در تماس باشید</span>
                  <h2>
                  برای پروژه جدیدتان <span> مشاوره بگیرید .</span>
                 
                  </h2>
                  <p>
                  نظرات و پیشنهادات شما برای من ارزشمند است.
                  </p>
                </div>
                <h6>Main Office</h6>
                <div className="widget_contact_info mb-35">
                  <ul>
                    <li>
                      <i className="far fa-map-marker-alt" /> تهران، بلوار میرداماد، ابتدای خیابان شنگرف، درب شرقی بانک مرکزی
                      <br /> 
                    </li>
                    <li>
                      <i className="far fa-envelope" />{" "}
                      <a href="mailto:support@gmail.com">info@ahmadi98.ir</a>
                    </li>
                    <li>
                      <i className="far fa-phone" />{" "}
                      <a dir="ltr" href="callto:+98 (021) 29985735">+98 (021) 29985735</a>
                    </li>
                  </ul>
                </div>
                <h5>Follow Me</h5>
                <div className="social-style-one mt-10">
                <a href="https://x.com/ahmadi98ir?t=uAi46M93v5CEwVLcumpZAg&s=09"target="blank">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://wa.me/989102413207">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="https://www.instagram.com/ahmadi98.ir/profilecard/?igsh=YmN1YzUzbTBtZG81"target="blank">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://github.com/ahmadi98ir"target="blank">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/mahdi-ahmadi-a2454a146/"target="blank">
              <i className="fab fa-linkedin" />
            </a>
                  
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-page-form contact-form form-style-one wow fadeInUp delay-0-2s">
                <form
                  id="contactForm"
                  className="contactForm"
                  name="contactForm"
                  action="assets/php/form-process.php"
                  method="post"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">نام کامل شما</label>
                        <input
                          type="text"
                          id="name"
                          name="نام و نام خانوادگی"
                          className="form-control"
                          defaultValue=""
                          placeholder=" "
                          required=""
                          data-error="لطفا نام کامل خود راوارد نمایید."
                        />
                        <label htmlFor="name" className="for-icon">
                          <i className="far fa-user" />
                        </label>
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">آدرس ایمیل شما</label>
                        <input
                          type="email"
                          id="email"
                          name="آدرس ایمیل"
                          className="form-control"
                          defaultValue=""
                          placeholder="support@gmail.com"
                          required=""
                          data-error="Please enter your Email"
                        />
                        <label htmlFor="email" className="for-icon">
                          <i className="far fa-envelope" />
                        </label>
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input
                          type="text"
                          id="phone_number"
                          name="تلفن شما"
                          className="form-control"
                          defaultValue=""
                          placeholder="0912xxxxxxx"
                          required=""
                          data-error="Please enter your Phone Number"
                        />
                        <label htmlFor="phone_number" className="for-icon">
                          <i className="far fa-phone" />
                        </label>
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subject">موضوع</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          defaultValue=""
                          placeholder="موضوع"
                          required=""
                          data-error="لطفا موضوع پیام خود را وارد نمایید."
                        />
                        <label htmlFor="subject" className="for-icon">
                          <i className="far fa-text" />
                        </label>
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">پیام شما</label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={4}
                          placeholder="چیزی بنویسید"
                          required=""
                          data-error="لطفا پیام خود را وارد نمایید."
                          defaultValue={""}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-0">
                        <button type="submit" className="theme-btn">
                          ارسال پیام <i className="far fa-angle-right" />
                        </button>
                        <div id="msgSubmit" className="hidden" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
      {/* Contact Page Area end */}
      {/* Location Map Area Start */}
      <div className="contact-page-map pb-120 rpb-90 wow fadeInUp delay-0-2s">
        <div className="container">
          <div className="our-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51824.220379336446!2d51.46814961508575!3d35.725879778389086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e041c1fabc95b%3A0x157a53179ef123b3!2z2KjYp9mG2qkg2YXYsdqp2LLbjCDYrNmF2YfZiNix24wg2KfYs9mE2KfZhduMINin24zYsdin2YY!5e0!3m2!1sfa!2sde!4v1730314368653!5m2!1sfa!2sde"
              style={{ border: 0, width: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </NoxfolioLayout>
  );
};
export default page;
