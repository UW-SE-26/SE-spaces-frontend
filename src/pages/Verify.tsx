import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@material-ui/icons';
import  loginStyles from "../styles/login.module.css"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Card, Container } from '@material-ui/core';
import axios from 'axios';

const login = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);

        const verify_user = {
            email: values.email + "@uwaterloo.ca",
            code: values.code,
        }
        console.log(verify_user);

        axios.post('http://134.122.43.103:3000/api/users/verify', verify_user).then(res => {
            console.log(res);
            if(res.data.success) {
                console.log("verified!")
            }
        });
    };
    return (
        <section className={loginStyles.wrapper}>
            <div className={loginStyles.content}>
                <div className={loginStyles.verify}>
                    <div>
                        <h1 className={loginStyles.bigText}>Verify</h1>
                        <div className={loginStyles.subText}>
                            A confirmation code has been sent to your email.
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
                            name="code"
                            className={loginStyles.loginFields}
                            rules={[{ required: true, message: 'Please enter your confirmation code!' }]}
                        >
                            <Input prefix={<MailOutlined className={loginStyles.iconColor} />} placeholder="Confirmation Code"/>
                        </Form.Item>
                        </div>
                        <Form.Item className={loginStyles.loginFields}>
                            <Button type="primary" className={loginStyles.loginButton} htmlType="submit" >
                                Confirm
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