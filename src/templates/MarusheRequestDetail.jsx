import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {getPrefectureName} from '../function/data';
import {db} from '../firebase';
import NoImage from '../assets/img/src/no_image.png';

const marushesRef = db.collection("marushes");

const useStyles = makeStyles((theme) => ({
    'icon': {
        width: 150,
        height: 150,
        borderRadius: '50% 50% 50% 50%'
    },
    'label': {
        fontSize: '15px',
        marginLeft: '15px',
    },
    'text': {
        fontWeight: 'bold',
        margin: 'auto auto 15px 40px',
    },
    'sliderBox': {
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto 24px auto",
            height: 320,
            width: 320
        },
        [theme.breakpoints.up("sm")]: {
            margin: "0 auto",
            height: 400,
            width: 400
        }
    },
    'detail': {
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto 16px auto",
            height: "auto",
            width: 320
        },
        [theme.breakpoints.up("sm")]: {
            margin: "0 auto",
            height: "auto",
            width: 400
        }
    },
    'price': {
        fontSize: 36
    }
}));

const MarusheRequstDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    
    // URLよりマルシェIDを取得
    const path = selector.router.location.pathname
    const id = path.split("/marushe_request/")[1];
    console.log(id);

    // マルシェ情報
    const [marushe, setMarushe] = useState(null);

     // 初期処理
     useEffect(() => {
        // IDを元にマルシェ情報の取得
        marushesRef.doc(id).get()
            .then(doc => {
                const data = doc.data();
                setMarushe(data);
            });
    }, [id]);

    return (
        <section className="c-section-container">
            {marushe && (
                <div>
                    <div className="center">
                        <img className={classes.icon} src={marushe.icons.length > 0 ? marushe.icons[0].path : NoImage} alt="アイコン画像" />
                    </div>
                    <div className={classes.label}>マルシェ名:</div>
                    <div className={classes.text}>{marushe.marushe_name}</div>
                    <div className={classes.label}>郵便番号:</div>
                    <div className={classes.text}>{marushe.zipcode}</div>
                    <div className={classes.label}>{'住所(都道府県):'}</div>
                    <div className={classes.text}>{getPrefectureName(marushe.prefectures)}</div>
                    <div className={classes.label}>{'住所(市町村・番地):'}</div>
                    <div className={classes.text}>{marushe.address1}</div>
                    <div className={classes.label}>{'住所(ビル名等):'}</div>
                    <div className={classes.text}>{marushe.address2}</div>
                    <div className={classes.label}>電話番号</div>
                    <div className={classes.text}>{marushe.tel_no}</div>
                    <div className={classes.label}>{'マルシェバナー等:'}</div>
                </div>
                
            )}
        </section>
    );
};

export default MarusheRequstDetail;