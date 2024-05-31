

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
        
        <SignIn path="/sign-in" />
      </div>
  );
};

export default SignInPage;
