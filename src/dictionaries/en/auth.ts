import { AuthDictionary } from "dictionaries/types/AuthDictionary";

export const AuthLang: AuthDictionary = {
  common: {
    slogan: "Start a project<br>with the utilities of Taskcover</br>",
    form: {
      title: {
        password: "Password",
        confirmPassword: "Confirm password",
      },
    },
  },
  signin: {
    head: {
      title: "Sign in | Taskcover",
    },
    title: "Sign in",
    notSignup: "or do not have an account yet?",
    signupNow: "Sign up now",
    forgotPassword: "Forgot password?",
    key: "Sign in",
    notification: {
      signinSuccess: "Sign in successfully!",
    },
  },
  signup: {
    head: {
      title: "Sign up | Taskcover",
    },
    form: {
      title: {
        fullName: "Full name",
        phone: "Phone number",
        avatar: "Avatar",
      },
    },
    title: "Sign up",
    haveAccount: "or already have an account?",
    signinNow: "Sign in now",
    key: "Sign up",
    notification: {
      signupSuccess:
        "Successful registration, please check the code in the registration email!",
    },
  },
  verify: {
    head: {
      title: "Verify account | Taskcover",
    },
    form: {
      title: {
        code: "Code",
      },
    },
    title: "Verify account",
    description:
      "A code has been sent to your registered email. Please check your email and enter the code to complete the registration.",
    key: "Verify",
    notification: {
      signupSuccess: "Account verification successful, please sign in!",
    },
  },
  forgot: {
    head: {
      title: "Forgot password | Taskcover",
    },
    title: "Forgot password",
    description:
      "Password reset link will be sent to your email<br>Please enter your registered email</br>",
    messageSuccess:
      "Password reset link has been sent to your email<br>Please check your email</br>",
    backSignin: "Back to sign in",
    notification: {
      forgotSuccess: "Please visit the emailed link to change your password!",
    },
  },
  reset: {
    head: {
      title: "Reset new password | Taskcover",
    },
    form: {
      title: {
        newPassword: "New password",
      },
    },
    title: "Reset new password",
    notification: {
      resetSuccess: "Change password successfully, please sign in again.",
    },
  },
};
