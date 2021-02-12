import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {PrimaryButton, TextInput} from '../components/UIKit';
import {signIn} from '../reducks/users/operations';


const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Eメールコールバック
    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    // パスワードコールバック
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline">会員ログイン</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} type={"email"} value={email} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード(半角英数字で6文字以上)"} multiline={false} required={true}
                rows={1} type={"password"} value={password} onChange={inputPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"ログイン"}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className="module-spacer--small" />
                <p className="u-text-small" onClick={() => dispatch(push("/login/reset"))}>パスワードを忘れた方はこちら</p>
                <p className="u-text-small" onClick={() => dispatch(push("/registar"))}>アカウント登録がまだですか？</p>
            </div>
        </div>
    );
};

export default Login;