import { AuthDictionary } from "dictionaries/types/AuthDictionary";

export const AuthLang: AuthDictionary = {
  common: {
    slogan: "Bắt đầu dự án<br>với những tiện ích của Taskcover</br>",
    form: {
      title: {
        password: "Mật khẩu",
        confirmPassword: "Xác nhận mật khẩu",
      },
    },
  },
  signin: {
    head: {
      title: "Đăng nhập | Taskcover",
    },
    title: "Đăng nhập",
    notSignup: "hoặc chưa có tài khoản trước đó?",
    signupNow: "Đăng ký ngay",
    forgotPassword: "Quên mật khẩu?",
    key: "Đăng nhập",
    notification: {
      signinSuccess: "Đăng nhập thành công!",
    },
  },
  signup: {
    head: {
      title: "Đăng ký | Taskcover",
    },
    form: {
      title: {
        fullName: "Họ tên",
        phone: "Số điện thoại",
        avatar: "Ảnh đại diện",
      },
    },
    title: "Đăng ký",
    haveAccount: "hoặc đã có tài khoản?",
    signinNow: "Đăng nhập ngay",
    key: "Đăng ký",
    notification: {
      signupSuccess:
        "Đăng ký thành công, vui lòng kiểm tra mã code trong email đăng ký!",
    },
  },
  verify: {
    head: {
      title: "Xác thực tài khoản | Taskcover",
    },
    form: {
      title: {
        code: "Mã code",
      },
    },
    title: "Xác thực tài khoản",
    description:
      "Một mã đã được gửi đến email đăng ký của bạn. Vui lòng kiểm tra email và nhập mã để hoàn tất đăng ký.",
    key: "Xác thực",
    notification: {
      signupSuccess: "Xác minh tài khoản thành công, vui lòng đăng nhập!",
    },
  },
  forgot: {
    head: {
      title: "Quên mật khẩu | Taskcover",
    },
    title: "Quên mật khẩu",
    description:
      "Liên kết đặt lại mật khẩu sẽ được gửi đến email của bạn<br>Vui lòng nhập email đã đăng ký của bạn</br>",
    messageSuccess:
      "Đường link đặt lại mật khẩu đã được gửi đến email của bạn<br>Vui lòng kiểm tra email</br>",
    backSignin: "Quay lại đăng nhập",
    notification: {
      forgotSuccess:
        "Vui lòng truy cập link được gửi qua email để đổi mật khẩu mới!",
    },
  },
  reset: {
    head: {
      title: "Đặt lại mật khẩu mới | Taskcover",
    },
    form: {
      title: {
        newPassword: "Mật khẩu mới",
      },
    },
    title: "Đặt lại mật khẩu mới",
    notification: {
      resetSuccess: "Đổi mật khẩu thành công, vui lòng đăng nhập lại.",
    },
  },
};
