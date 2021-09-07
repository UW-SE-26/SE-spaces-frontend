import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined, PersonOutlined } from '@material-ui/icons';
import  loginStyles from "../styles/login.module.css"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Card, Container } from '@material-ui/core';

const createAccount = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <section className={loginStyles.wrapper}>
            <div className={loginStyles.content}>
                <div className={loginStyles.login}>
                    <div>
                        <h1 className={loginStyles.bigText}>Create Account</h1>
                    </div>
                    <div>
                    <Form
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <div className={loginStyles.sectionField}>
                            <div className={loginStyles.firstLast}>
                                <Form.Item
                                    name="first"
                                    className={loginStyles.nameFields}
                                    rules={[{ required: true, message: 'Enter first name!' }]}
                                >
                                    <Input prefix={<PersonOutlined className={loginStyles.iconColor} />} placeholder="First Name"/>
                                </Form.Item>
                                <Form.Item
                                    name="last"
                                    className={loginStyles.nameFields}
                                    rules={[{ required: true, message: 'Enter last name!' }]}
                                >
                                    <Input prefix={<PersonOutlined className={loginStyles.iconColor} />} placeholder="Last Name"/>
                                </Form.Item>
                            </div>
                        <Form.Item
                            name="email"
                            className={loginStyles.loginFields}
                            rules={[{ required: true, message: 'Please enter your username!' }]}
                        >
                            <Input prefix={<MailOutlined className={loginStyles.iconColor} />} suffix="@uwaterloo.ca" placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            className={loginStyles.loginFields}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className={loginStyles.iconColor} />}
                                type="password"
                                placeholder="Password"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            className={loginStyles.loginFields}
                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className={loginStyles.iconColor} />}
                                type="password"
                                placeholder="Confirm Password"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        </div>
                        <Form.Item>
                            <a className={loginStyles.loginForgot} href="">
                                Forgot password?
                            </a>
                        </Form.Item>
                        <Form.Item className={loginStyles.loginFields}>
                            <Button type="primary" className={loginStyles.loginButton} htmlType="submit" >
                                Create New Account
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default createAccount;