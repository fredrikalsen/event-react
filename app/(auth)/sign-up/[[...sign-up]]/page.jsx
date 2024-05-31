// pages/sign-up.js

import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  
    
        <SignUp path="/sign-up" />
      </div>
  );
};

export default SignUpPage;
