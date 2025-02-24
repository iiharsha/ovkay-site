'use client'

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const YourComponent = () => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleSubmit = () => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Please complete the CAPTCHA");
      return;
    }

    // Send token along with the form data
    console.log("ReCAPTCHA Token:", token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default YourComponent;

