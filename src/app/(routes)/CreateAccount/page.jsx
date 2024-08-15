"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Background from "@/app/_components/Background";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [otpDiv, setOtpDiv] = useState(false);
  const [verificationCode, setVerificationCode] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // New state variable

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (image) {
        formData.append("image", image);
      }
      const response = await axios.post("/api/users", formData);
      console.log(response.data);
      if (response.status === 200) {
        await handleSendOtp();
        setOtpDiv(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setError("Email already exists");
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("/api/generate-otp", {
        email,
      });
      console.log(response.data);
      if (response.data.message === "OTP sent successfully!") {
        setVerificationCode(true);
        setOtpDiv(false);
        setIsOtpSent(true); // Set OTP sent state to true
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Email already exists");
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleVerificationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/verify-otp", {
        email,
        otp,
      });
      if (response.data.message === "User verified successfully!") {
        setOtpDiv(false);
        setVerificationCode(false);
        router.push("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid OTP");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
     <Background> 
      <div className="flex justify-center items-center">
              <div className="w-full max-w-md p-md bg-primary shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-md text-center">
                  Create Account
                </h2>
                {error && (
                  <p className="text-red-500 text-center mb-md">{error}</p>
                )}
                <div className="items-center mt-md">
                  {!otpDiv ? (
                    <form className="space-y-md">
                      <div>
                        <Label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          readOnly={isOtpSent} // Make readonly if OTP is sent
                          className="mt-xs block w-full px-md py-sm border 
                                                border-gray-300 rounded-md shadow-sm focus:outline-none 
                                                focus:ring-secondary focus:border-secondary sm:text-sm"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          readOnly={isOtpSent} // Make readonly if OTP is sent
                          className="mt-xs block w-full px-md py-sm border border-gray-300 
                                                rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </Label>
                        <Input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          readOnly={isOtpSent} // Make readonly if OTP is sent
                          className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Image
                        </Label>
                        <Input
                          type="file"
                          id="image"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            if (file) {
                              setImage(file);
                            }
                          }}
                          required
                          readOnly={isOtpSent} // Make readonly if OTP is sent
                          className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                        />
                      </div>
                      <Button
                        className="w-full py-md px-lg bg-secondary border text-white 
                                        font-semibold rounded-md
                                        shadow-sm hover:bg-hover focus:outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-2"
                        onClick={handleSubmit}
                        disabled={isOtpSent}
                      >
                        Submit
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerificationCode} className="space-y-md">
                      <div>
                        <Label
                          htmlFor="otp"
                          className="block text-sm font-medium text-gray-700"
                        >
                          OTP
                        </Label>
                        <Input
                          id="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                        />
                      </div>
                      <Button
                        className="w-full py-md px-lg bg-secondary border text-white 
                                        font-semibold rounded-md
                                        shadow-sm hover:bg-hover focus:outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-2"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            </Background>
  );
};

export default CreateAccount;
