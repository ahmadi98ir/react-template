import Link from "next/link";

const Resume = () => {
  return (
    <section id="resume" className="resume-area pt-130 rpt-100 rel z-1">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="big-icon mt-85 rmt-0 rmb-55 wow fadeInUp delay-0-2s">
              <i className="flaticon-asterisk-1" />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-xl-8 col-lg-9">
                <div className="section-title mb-60 wow fadeInUp delay-0-2s">
                  <span className="sub-title mb-15">My Resume</span>
                  <h2>
                    Real <span>Problem Solutions</span> Experience
                  </h2>
                </div>
              </div>
            </div>
            <div className="resume-items-wrap">
              <div className="row justify-content-between">
                <div className="col-xl-5 col-md-6">
                  <div className="resume-item wow fadeInUp delay-0-3s">
                    <div className="icon">
                      <i className="far fa-arrow-right" />
                    </div>
                    <div className="content">
                      <span className="years">2021 - Present</span>
                      <h4>Lead Product Designer</h4>
                      <span className="company">Google</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-md-6">
                  <div className="resume-item wow fadeInUp delay-0-4s">
                    <div className="icon">
                      <i className="far fa-arrow-right" />
                    </div>
                    <div className="content">
                      <span className="years">2016 - 2018</span>
                      <h4>Junior UX/UI Designer</h4>
                      <span className="company">LinkedIn</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-md-6">
                  <div className="resume-item wow fadeInUp delay-0-2s">
                    <div className="icon">
                      <i className="far fa-arrow-right" />
                    </div>
                    <div className="content">
                      <span className="years">2018 - 2021</span>
                      <h4>Senior Product Designer</h4>
                      <span className="company">Webflow</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-md-6">
                  <div className="resume-item wow fadeInUp delay-0-4s">
                    <div className="icon">
                      <i className="far fa-arrow-right" />
                    </div>
                    <div className="content">
                      <span className="years">2014 - 2016</span>
                      <h4>Graphics Designer</h4>
                      <span className="company">Apple</span>
                    </div>
                  </div>
                </div>
              </div>
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
  );
};
export default Resume;

export const Resume2 = () => {
  return (
    <section
      id="resume"
      className="resume-area-two bgc-black rel z-1 pt-185 rpt-145 pb-140 rpb-100"
    >
      <div className="container">
        <div className="row align-items-center pb-20">
          <div className="col-lg-8">
            <div className="section-title mb-35 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">
                <i className="flaticon-asterisk-1" />
                MY Expereince resume
              </span>
              <h2>work &amp; Education</h2>
            </div>
          </div>
          <div className="col-lg-4 text-lg-end">
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mb-35">Contact Me</a>
            </Link>
          </div>
        </div>
        <div className="row no-gap">
          <div className="col-xl-6">
            <div className="resume-box-wrap design-two">
              <div className="timeline-heading wow fadeInUp delay-0-4s">
                <span className="title">work</span>
                <div className="arrow">
                  <i className="far fa-arrow-down" />
                </div>
              </div>
              <div className="resume-box wow fadeInLeft delay-0-2s">
                <div className="resume-column">
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2021 - Present{" "}
                      </span>
                      <h5 className="title">Senior UI Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2018 - 2021{" "}
                      </span>
                      <h5 className="title">Senior UI Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                </div>
                <div className="resume-column">
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2016 - 2018{" "}
                      </span>
                      <h5 className="title">Junior UI Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2014 - 2016{" "}
                      </span>
                      <h5 className="title">Graphics Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                </div>
                <div className="resume-line">
                  <span className="resume-dots" />
                  <span className="resume-dots" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="resume-box-wrap mt-110 rmt-75">
              <div className="timeline-heading wow fadeInDown delay-0-4s">
                <span className="title">study</span>
                <div className="arrow">
                  <i className="far fa-arrow-down" />
                </div>
              </div>
              <div className="resume-box wow fadeInRight delay-0-2s">
                <div className="resume-column">
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2021 - Present{" "}
                      </span>
                      <h5 className="title">Senior UI Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2018 - 2021{" "}
                      </span>
                      <h5 className="title">Senior UI Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                </div>
                <div className="resume-column">
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2016 - 2018{" "}
                      </span>
                      <h5 className="title">Junior UI Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                  <div className="timeline-item">
                    <div className="resume-content">
                      <span className="duration">
                        <i className="far fa-calendar-alt" /> 2014 - 2016{" "}
                      </span>
                      <h5 className="title">Graphics Designer</h5>
                    </div>
                    <a href="#" className="details-btn">
                      <i className="fal fa-long-arrow-right" />
                    </a>
                  </div>
                </div>
                <div className="resume-line">
                  <span className="resume-dots" />
                  <span className="resume-dots" />
                </div>
              </div>
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
  );
};
