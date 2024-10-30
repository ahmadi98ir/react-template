"use client";
import { Fragment } from "react";
const SideBar = () => {
  const toggleSidebar = () => {
    console.log("hi");
    document.querySelector("body").classList.remove("side-content-visible");
  };
  return (
    <Fragment>
      {/*Form Back Drop*/}
      <div className="form-back-drop" onClick={() => toggleSidebar()} />
      {/* Hidden Sidebar */}
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon" onClick={() => toggleSidebar()}>
            <span className="fa fa-times" />
          </div>
          <div className="title">
            <h4>ارتباط با من</h4>
          </div>
          {/*Appointment Form*/}
          <div className="appointment-form">
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                toggleSidebar();
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  defaultValue=""
                  placeholder="نام شما"
                  required=""
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  defaultValue=""
                  placeholder="آدرس ایمیل"
                  required=""
                />
              </div>
              <div className="form-group">
                <textarea placeholder="پیام شما" rows={5} defaultValue={""} />
              </div>
              <div className="form-group">
                <button type="submit" className="theme-btn">
                  ارسال
                </button>
              </div>
            </form>
          </div>
          {/*Social Icons*/}
          <div className="social-style-one">
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
      </section>
      {/*End Hidden Sidebar */}
    </Fragment>
  );
};
export default SideBar;
