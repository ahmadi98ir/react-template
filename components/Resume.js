import React from 'react';

const education = [
  {
    year: '2020 - 2022',
    degree: 'Master in Computer Science',
    institution: 'University of Technology',
    description: 'Advanced studies in software engineering and web technologies.'
  },
  {
    year: '2016 - 2020',
    degree: 'Bachelor in Computer Science',
    institution: 'State University',
    description: 'Fundamental computer science and programming concepts.'
  }
];

const experience = [
  {
    year: '2022 - Present',
    position: 'Senior Web Developer',
    company: 'Tech Solutions Inc.',
    description: 'Leading web development projects and mentoring junior developers.'
  },
  {
    year: '2020 - 2022',
    position: 'Full Stack Developer',
    company: 'Digital Agency',
    description: 'Developing full-stack applications using modern technologies.'
  },
  {
    year: '2018 - 2020',
    position: 'Frontend Developer',
    company: 'Web Studio',
    description: 'Creating responsive and interactive user interfaces.'
  }
];

export const Resume = () => {
  return (
    <section id="resume" className="resume-area pt-130 rpt-100 pb-100 rpb-70 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">Resume</span>
              <h2>Education & Experience</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Education Section */}
          <div className="col-lg-6">
            <div className="resume-content">
              <h4 className="title mb-40">Education</h4>
              {education.map((edu, index) => (
                <div key={index} className="resume-item wow fadeInUp delay-0-2s">
                  <div className="icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="content">
                    <span className="years">{edu.year}</span>
                    <h4>{edu.degree}</h4>
                    <h5>{edu.institution}</h5>
                    <p>{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience Section */}
          <div className="col-lg-6">
            <div className="resume-content">
              <h4 className="title mb-40">Experience</h4>
              {experience.map((exp, index) => (
                <div key={index} className="resume-item wow fadeInUp delay-0-2s">
                  <div className="icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="content">
                    <span className="years">{exp.year}</span>
                    <h4>{exp.position}</h4>
                    <h5>{exp.company}</h5>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;