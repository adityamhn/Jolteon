import { Form, Input, notification } from "antd";
import React from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Styles from "/styles/Landing.module.scss";
import { useRouter } from "next/router";
import { login } from "../services/auth.service";

export default function Login() {
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = async () => {
    const values = await form.getFieldsValue();
    try {
      console.log("Received values of form: ", values);
      let value = await login(values.email, values.password);
      console.log(value);
      // Do something'
      router.push("/user/dashboard");
    } catch (err) {
      console.log(err.message);
      console.log(err.code);
    }
  };

  return (
    <Layout>
      <Navbar hide={true} />
      <div className={Styles.AuthContainer}>
        <h1
          style={{
            margin: "0rem",
          }}
        >
          WELCOME BACK
        </h1>
        <p
          style={{
            marginTop: "0.8rem",
          }}
        >
          Please enter your details
        </p>

        <Form
          form={form}
          onFinish={onFinish}
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Form.Item
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your Email"
              className="input-box"
              style={{
                width: "100%",
                height: "3rem",
                marginTop: "1rem",

                padding: "0 1rem",
              }}
            />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              placeholder="Enter your Password"
              className="input-box"
              style={{
                width: "100%",
                height: "3rem",
                marginTop: "1rem",

                padding: "0 1rem",
              }}
              type="password"
            />
          </Form.Item>
          <div
            style={{
              textAlign: "right",
              margin: "1rem 0",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            Forgot Password?
          </div>
          <Form.Item>
            <Button
              onClick={onFinish}
              style={{
                marginTop: "2rem",
                height: 48,
                width: "100%",
              }}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{
            margin: "1rem 0",
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        >
          New here?{" "}
          <span
            style={{
              cursor: "pointer",
            }}
            className="yellow-text"
            onClick={() => {
              router.push("/register");
            }}
          >
            Register
          </span>
        </div>
      </div>
    </Layout>
  );
}
