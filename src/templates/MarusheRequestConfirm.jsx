import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {push} from 'connected-react-router';
import {ImagePreviewNone, PrimaryButton, GreyButton} from '../components/UIKit';
import {getMarushe} from '../reducks/marushes/selectors';
import {marusheRegistar} from '../reducks/marushes/operations';
import {getPrefectureName} from '../function/data';
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

const MarusheRequestConfirm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const marushe = getMarushe(selector);

    // 再読み込み対応
    useEffect(() => {
        if (marushe.marusheName.length === 0) {
            dispatch(push('/marushe_request'));
        } 
    }, [dispatch, marushe]);

    return (
        <div className="c-section-container">
        <h2 className="u-text__headline">マルシェ申請確認</h2>
        <div className="module-spacer--medium" />
        <div className="center">
            <img className={classes.icon} src={marushe.icons.length > 0 ? marushe.icons[0].path : NoImage} alt="アイコン画像" />
        </div>
        <div className={classes.label}>マルシェ名:</div>
        <div className={classes.text}>{marushe.marusheName}</div>
        <div className={classes.label}>郵便番号:</div>
        <div className={classes.text}>{marushe.zipcode}</div>
        <div className={classes.label}>{'住所(都道府県):'}</div>
        <div className={classes.text}>{getPrefectureName(marushe.prefectures)}</div>
        <div className={classes.label}>{'住所(市町村・番地):'}</div>
        <div className={classes.text}>{marushe.address1}</div>
        <div className={classes.label}>{'住所(ビル名等):'}</div>
        <div className={classes.text}>{marushe.address2}</div>
        <div className={classes.label}>電話番号</div>
        <div className={classes.text}>{marushe.telNo}</div>
        <div className={classes.label}>{'マルシェバナー等:'}</div>
        <div className="p-grid__list-images">
            {marushe.images.length > 0 && (
                marushe.images.map(image => <ImagePreviewNone id={image.id} path={image.path} key={image.id} />)
            )}
        </div>
        <div className="module-spacer--medium" />
        <div className="center">
                <PrimaryButton
                    label={"マルシェ申請"}
                    onClick={() => dispatch(marusheRegistar())}
                />
                <div className="module-spacer--small" />
                <GreyButton
                    label={"入力修正"}
                    onClick={() => dispatch(push('/marushe_request'))}
                />
            </div>
    </div>
    );
};

export default MarusheRequestConfirm;