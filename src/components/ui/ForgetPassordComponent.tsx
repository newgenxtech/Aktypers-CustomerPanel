import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import login from "@/assets/img/realistic_image_the_ideas_is_about_tyres.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input, message } from "antd";
import { useRequestOTP, useVerifyOTP } from "@/hooks/GetHooks";

interface FormState {
  email: string;
  otp: string;
  new_password: string;
  confirm_password: string;
}

const ForgetPassordComponent = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormState>({
    email: "",
    otp: "",
    new_password: "",
    confirm_password: ""
  });

  const { mutate: requestOTP, isPending: isRequestingOTP } = useRequestOTP();
  const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOTP();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    requestOTP(
      { email: formData.email },
      {
        onSuccess: (data) => {
          if (data.email_status) {
            setOtpSent(true);
          }
        }
      }
    );
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      message.error("Passwords do not match");
      return;
    }

    verifyOTP(
      {
        email: formData.email,
        otp: formData.otp,
        new_password: formData.new_password
      },
      {
        onSuccess: (data) => {
          if (data.message === 'Password updated successfully.') {
            navigate("/auth/login");
          }
        }
      }
    );
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen fade-in-15">
      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={otpSent ? handleVerifyOTP : handleRequestOTP}
          className="mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              {otpSent
                ? "Enter the OTP sent to your email and set your new password"
                : "Enter your email to receive a password reset OTP"}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={otpSent}
                className="w-full py-2"
              />
            </div>

            {otpSent && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    className="w-full py-2"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input.Password
                    id="new_password"
                    placeholder="Enter new password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                    className="w-full py-2"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input.Password
                    id="confirm_password"
                    placeholder="Confirm new password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    className="w-full py-2"
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={isRequestingOTP || isVerifying}>
              {isRequestingOTP || isVerifying ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              ) : otpSent ? (
                "Reset Password"
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link to="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden lg:block">
        <img
          src={login}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default ForgetPassordComponent;