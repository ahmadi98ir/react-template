"use client";
import { useState } from "react";

const faqs = [
  { q: "What Service We Provide?", a: "To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences." },
  { q: "How Many Years Of Experience?", a: "At vero eos et accusamus dignissimos ducimus voluptatum corrupti quos dolores quas molestias excepturie." },
  { q: "Have Any Professional Team Member?", a: "To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences." },
  { q: "Are You Awards Winning Agency?", a: "To take a trivial example which undertakes laborious physical exercise except to obtain some advantage pleasure annoying consequences." },
];

const Faq = () => {
  const [open, setOpen] = useState(1);
  return (
    <div className="accordion wow fadeInUp delay-0-4s" id="faq-accordion">
      {faqs.map((f, i) => (
        <div className="accordion-item" key={i}>
          <h5 className="accordion-header">
            <button
              className={`accordion-button${open === i ? "" : " collapsed"}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              {f.q}
            </button>
          </h5>
          <div className={`accordion-collapse collapse${open === i ? " show" : ""}`}>
            <div className="accordion-body"><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Faq;
