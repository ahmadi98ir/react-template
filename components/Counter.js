"use client";
import CountUp from "react-countup";

const Counter = ({ end, decimals, extraClass }) => {
  return (
    <CountUp
      end={end || 100}
      duration={3}
      decimals={decimals || 0}
      enableScrollSpy
      scrollSpyOnce
    >
      {({ countUpRef }) => (
        <span
          dir="rtl"
          className={`count-text ${extraClass}`}
          data-from="0"
          data-to={end}
          ref={countUpRef}
        >
          count
        </span>
      )}
    </CountUp>
  );
};

export default Counter;
