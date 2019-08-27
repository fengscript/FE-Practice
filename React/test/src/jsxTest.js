import React from "react";

const t = n => {
  return n;
};

export default () => {
  const text = `It's some text`;
  const anotherText = `It's some another text`;
  return (
    <div>
      prepare text
      <br />
      {t(2) > 1 ? <span>{text}</span> : <span>{anotherText}</span>}
    </div>
  );
};
