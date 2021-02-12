import React , {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {push} from 'connected-react-router';
import {IconArea, PrimaryButton, SelectBox, TextInput} from '../components/UIKit';
import {checkKana, checkLength, checkRequired} from '../function/check';
import {saveUserInfo} from '../reducks/users/operations';
import {getUser} from '../reducks/users/selectors';
import {getBirthYears, getBirthMonths, getBirthDays} from '../function/data';
 
const useStyles = makeStyles({
    'birth': {
        display: 'flex'
    }
});

const Registar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const user = getUser(selector);

    const [icons, setIcons] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstnameKana, setFirstnameKana] = useState("");
    const [lastnameKana, setLastnameKana] = useState("");
    const [errorList, setErrorList] = useState([]);
    const [yearOfBirth, setYearOfBirth] = useState("");
    const [monthOfBirth, setMonthOfBirth] = useState("");
    const [dayOfBirth, setDayOfBirth] = useState("");

    // 初期処理
    useEffect(() => {
        setIcons(user.icons);
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
        setConfirmPassword(user.confirmPassword);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setFirstnameKana(user.firstnameKana);
        setLastnameKana(user.lastnameKana);
        if (user.yearOfBirth.length === 0) {
            user.yearOfBirth = '1921';
            user.monthOfBirth = '1';
            user.dayOfBirth = '1';
        }
        setYearOfBirth(user.yearOfBirth);
        setMonthOfBirth(user.monthOfBirth);
        setDayOfBirth(user.dayOfBirth);
    }, [user]);

    // ユーザー名コールバック
    const inputUsername = useCallback((e) => {
        setUsername(e.target.value);
    }, [setUsername]);

    // メールアドレスコールバック
    const inputEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    // パスワードコールバック
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    // 確認パスワードコールバック
    const inputConfirmPassword = useCallback((e) => {
        setConfirmPassword(e.target.value);
    }, [setConfirmPassword]);

    // 姓コールバック
    const inputLastname = useCallback((e) => {
        setLastname(e.target.value);
    }, [setLastname]);

    // 名コールバック
    const inputFirstname = useCallback((e) => {
        setFirstname(e.target.value);
    }, [setFirstname]);

    // 名カナコールバック
    const inputFirstnameKana = useCallback((e) => {
        setFirstnameKana(e.target.value);
    }, [setFirstnameKana]);

    // 姓カナコールバック
    const inputLastnameKana = useCallback((e) => {
        setLastnameKana(e.target.value);
    }, [setLastnameKana]);

    // 生年月日(年)コールバック
    const inputYearOfBirth = useCallback((e) => {
        setYearOfBirth(e.target.value);
    }, [setYearOfBirth]);

    // 生年月日(月)コールバック
    const inputMonthOfBirth = useCallback((e) => {
        setMonthOfBirth(e.target.value);
        setDayOfBirth('1');
    }, [setMonthOfBirth]);

    // 生年月日(日)コールバック
    const inputDayOfBirth = useCallback((e) => {
        setDayOfBirth(e.target.value);
    }, [setDayOfBirth]);

    // 入力チェック
    const checkError = useCallback((
        username, email, password, confirmPassword, lastname
        , firstname, lastnameKana, firstnameKana, icons, yearOfBirth
        , monthOfBirth, dayOfBirth) => {
        let checkList = [];
        if (!checkRequired(username)) {
            const error = {
                message: 'ユーザー名は必須です。',
                target: 'username'
            };
            checkList.push(error);
        } 
        if (!checkRequired(email)) {
            const error = {
                message: 'メールアドレスは必須です。',
                target: 'email'
            };
            checkList.push(error);
        } 
        if (!checkRequired(password)) {
            const error = {
                message: 'パスワードは必須です。',
                target: 'password'
            };
            checkList.push(error);
        } else if (!checkLength(password, 6)) {
            const error = {
                message: 'パスワードは６文字以上です。',
                target: 'password'
            };
            checkList.push(error);
        } 
        if (!checkRequired(confirmPassword)) {
            const error = {
                message: '確認パスワードは必須です。',
                target: 'confirmPassword'
            };
            checkList.push(error);
        } else if (!checkLength(confirmPassword, 6)) {
            const error = {
                message: '確認パスワードは６文字以上です。',
                target: 'confirmPassword'
            };
            checkList.push(error);
        } else if (password !== confirmPassword) {
            const error = {
                message: 'パスワードと確認パスワードが異なります。',
                target: 'confirmPassword'
            };
            checkList.push(error);
        } 
        if (!checkRequired(lastname)) {
            const error = {
                message: '氏名(姓)は必須です。',
                target: 'lastname'
            };
            checkList.push(error);
        }
        if (!checkRequired(firstname)) {
            const error = {
                message: '氏名(名)は必須です。',
                target: 'firstname'
            };
            checkList.push(error);
        }
        if (!checkRequired(lastnameKana)) {
            const error = {
                message: '氏名(姓カナ)は必須です。',
                target: 'lastnameKana'
            };
            checkList.push(error);
        } else if (!checkKana(lastnameKana, 0)) {
            const error = {
                message: '氏名(姓カナ)は全角カナです。',
                target: 'lastnameKana'
            };
            checkList.push(error);
        }
        if (!checkRequired(firstnameKana)) {
            const error = {
                message: '氏名(名カナ)は必須です。',
                target: 'firstnameKana'
            };
            checkList.push(error);
        } else if (!checkKana(firstnameKana, 0)) {
            const error = {
                message: '氏名(名カナ)は全角カナです。',
                target: 'firstnameKana'
            };
            checkList.push(error);
        }
        setErrorList(checkList);

        // エラーがない場合、確認画面へ遷移
        if (checkList.length === 0) {
            dispatch(saveUserInfo(
                username, email, password, confirmPassword, lastname
                , firstname, lastnameKana, firstnameKana, icons, yearOfBirth
                , monthOfBirth, dayOfBirth));
        }
    }, [setErrorList, dispatch]);

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline">アカウント登録</h2>
            <div className="module-spacer--medium" />
            <IconArea description={"アイコン"} icons={icons} setIcons={setIcons} />
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} type={"text"} value={username} onChange={inputUsername}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'username') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} type={"email"} value={email} onChange={inputEmail}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'email') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"パスワード(半角英数字で6文字以上)"} multiline={false} required={true}
                rows={1} type={"password"} value={password} onChange={inputPassword}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'password') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"パスワードの再確認"} multiline={false} required={true}
                rows={1} type={"password"} value={confirmPassword} onChange={inputConfirmPassword}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'confirmPassword') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <div className="module-spacer--extra-small" />
            <TextInput
                fullWidth={true} label={"氏名(姓)"} multiline={false} required={true}
                rows={1} type={"test"} value={lastname} onChange={inputLastname}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'lastname') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"氏名(名)"} multiline={false} required={true}
                rows={1} type={"test"} value={firstname} onChange={inputFirstname}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'firstname') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"氏名(姓フリガナ)"} multiline={false} required={true}
                rows={1} type={"text"} value={lastnameKana} onChange={inputLastnameKana}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'lastnameKana') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"氏名(名フリガナ)"} multiline={false} required={true}
                rows={1} type={"test"} value={firstnameKana} onChange={inputFirstnameKana}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'firstnameKana') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <div classes={classes.birth}>
                <SelectBox 
                    id={"yearOfBirth"} value={yearOfBirth} label={"生年月日(年)"} onChange={inputYearOfBirth}
                    list={getBirthYears()}
                />
                <SelectBox 
                    id={"monthOfBirth"} value={monthOfBirth} label={"生年月日(月)"} onChange={inputMonthOfBirth}
                    list={getBirthMonths()}
                />
                <SelectBox 
                    id={"dayOfBirth"} value={dayOfBirth} label={"生年月日(年)"} onChange={inputDayOfBirth}
                    list={getBirthDays(yearOfBirth, monthOfBirth)}
                />
            </div>
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"確認画面へ"}
                    onClick={() => checkError(
                        username, email, password, confirmPassword, lastname
                        , firstname, lastnameKana, firstnameKana, icons, yearOfBirth
                        , monthOfBirth, dayOfBirth
                    )}
                />
                <div className="module-spacer--small" />
                <p className="u-text-small" onClick={() => dispatch(push('/login'))}>アカウントをお持ちの方はこちら</p>
            </div>
        </div>
    );
};

export default Registar;