import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@material-ui/icons';
import  loginStyles from "../styles/login.module.css"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Card, Container } from '@material-ui/core';

const login = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <section className={loginStyles.wrapper}>
            <div className={loginStyles.content}>
                <div className={loginStyles.login}>
                    <div>
                        <h1 className={loginStyles.bigText}>Log In</h1>
                        <div className={loginStyles.subText}>
                            Need an Account?
                            <span className={loginStyles.colorText}>
                                <em><a href=""> Create an account.</a></em>
                            </span>
                        </div>
                    </div>
                    <div>
                    <Form
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <div className={loginStyles.sectionField}>
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
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className={loginStyles.iconColor} />}
                                type="password"
                                placeholder="Password"
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
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default login;