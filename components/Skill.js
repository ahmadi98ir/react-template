import React from 'react';

const skills = [
  { name: 'HTML/CSS', percentage: 95 },
  { name: 'JavaScript', percentage: 90 },
  { name: 'React.js', percentage: 85 },
  { name: 'Node.js', percentage: 80 },
  { name: 'UI/UX Design', percentage: 85 },
  { name: 'Database', percentage: 75 }
];

export const Skill = () => {
  return (
    <section className="skill-area pt-130 rpt-100 pb-100 rpb-70 rel z-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="skill-content rmb-65 wow fadeInLeft delay-0-2s">
              <div className="section-title mb-25">
                <span className="sub-title mb-15">My Skills</span>
                <h2>Professional Skills</h2>
              </div>
              <p>
                Professional skillset in modern web technologies and development practices.
                Experienced in both frontend and backend development.
              </p>
              <div className="skills-wrap">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <h6 className="skill-title">{skill.name}</h6>
                      <div className="skill-percentage">
                        <span className="count-box">
                          <span className="count">{skill.percentage}</span>%
                        </span>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <div className="progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="skill-image wow fadeInRight delay-0-2s">
              <img src="/assets/images/skills/skills.jpg" alt="Skills" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;