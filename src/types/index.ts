export type ToastType = "info" | "success" | "warning" | "error";
export type NotifyProps = {
  message: string;
  type: ToastType;
};

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface ApiResponse {
  data: object;
  message: string;
  status: number;
}

export interface VerifyOtpParams {
  email: string;
  otp: string;
}