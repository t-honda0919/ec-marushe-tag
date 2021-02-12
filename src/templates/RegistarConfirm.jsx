import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {push} from 'connected-react-router';
import {PrimaryButton, GreyButton} from '../components/UIKit';
import {getUser} from '../reducks/users/selectors';
import {maskify} from '../function/common';
import {signUp} from '../reducks/users/operations';
import NoImage from '../assets/img/src/no_image.png';

const useStyles = makeStyles((theme) => ({
    'label': {
        fontSize: '15px',
        marginLeft: '15px',
    },
    'labelCaution': {
        fontSize: '12px',
        color:  theme.palette.grey["500"]
    },
    'text': {
        fontWeight: 'bold',
        margin: 'auto auto 15px 40px',
    },
    'icon': {
        width: 150,
        height: 150,
        borderRadius: '50% 50% 50% 50%'
    }
}));

const RegistarConfirm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const user = getUser(selector);

    // 再読み込み対応
    useEffect(() => {
        if (user.username.length === 0) {
            dispatch(push('/registar'));
        } 
    }, [dispatch, user.username]);

    return (
        <div className="c-section-container">
        <h2 className="u-text__headline">アカウント登録確認</h2>
        <div className="module-spacer--medium" />
        <div className="center">
            <img className={classes.icon} src={user.icons.length > 0 ? user.icons[0].path : NoImage} alt="アイコン画像" />
        </div>
        <div className={classes.label}>ユーザー名:</div>
        <div className={classes.text}>{user.username}</div>
        <div className={classes.label}>メールアドレス:</div>
        <div className={classes.text}>{user.email}</div>
        <div className={classes.label}>{'パスワード: '}
            <span className={classes.labelCaution}>{'(セキュリティ上、マスキングしています。)'}</span>
        </div>
        <div className={classes.text}>{maskify(user.password, 0)}</div>
        <div className={classes.label}>{'確認パスワード: '}
            <span className={classes.labelCaution}>{'(セキュリティ上、マスキングしています。)'}</span>
        </div>
        <div className={classes.text}>{maskify(user.confirmPassword, 0)}</div>
        <div className={classes.label}>{'氏名(姓):'}</div>
        <div className={classes.text}>{user.lastname}</div>
        <div className={classes.label}>{'氏名(名):'}</div>
        <div className={classes.text}>{user.firstname}</div>
        <div className={classes.label}>{'姓名(姓カナ):'}</div>
        <div className={classes.text}>{user.lastnameKana}</div>
        <div className={classes.label}>{'姓名(名カナ):'}</div>
        <div className={classes.text}>{user.firstnameKana}</div>
        <div className={classes.label}>{'生年月日:'}</div>
        <div className={classes.text}>{user.yearOfBirth + '年' + user.monthOfBirth + '月' + user.dayOfBirth + '日'}</div>
        <div className="module-spacer--medium" />
        <div className="center">
                <PrimaryButton
                    label={"アカウント登録"}
                    onClick={() => dispatch(signUp())}
                />
                <div className="module-spacer--small" />
                <GreyButton
                    label={"入力修正"}
                    onClick={() => dispatch(push('/registar'))}
                />
            </div>
    </div>
    );
};

export default RegistarConfirm;