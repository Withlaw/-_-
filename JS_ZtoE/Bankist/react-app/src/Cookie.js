import { useState } from "react";

function CookieMessage() {
  const [isClicked, setIsClicked] = useState(false);
  const handleBtn = e => {
    setIsClicked(true);
  };
  return (
    isClicked || (
      <div className="cookie-message" onClick={handleBtn}>
        We use cookied for improved functionality and analutics.
        {/* <p>We use cookied for improved functionality and analutics.</p> */}
        <button className="btn btn--close-cookie">Got it!</button>
      </div>
    )
  );
}

export default CookieMessage;
