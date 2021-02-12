import React , {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import axiosJsonpAdapter from 'axios-jsonp';
import {makeStyles} from '@material-ui/styles';
import {IconArea, ImageArea, PrimaryButton, SelectBox, TextInput} from '../components/UIKit';
import {checkNumber, checkRequired} from '../function/check';
import {getPrefectures, getPrefectureName} from '../function/data';
import {getMarushe} from '../reducks/marushes/selectors';
import {saveMarusheInfo} from '../reducks/marushes/operations';

const useStyles = makeStyles({
    'zipcodeText': {
        width: '170px',
        marginLeft: 0
    },
    'smallButton': {
        float: 'left',
        marginTop: '20px'
    },
    'clear': {
        clear: 'left'
    }
});

const MarusheRequest = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const marushe = getMarushe(selector);
    const zipcloudURL = 'https://zipcloud.ibsnet.co.jp/api/search?';
    const prefecturesList = getPrefectures();

    const [marusheName, setMarusheName] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [prefectures, setPrefectures] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [icons, setIcons] = useState([]);
    const [images, setImages] = useState([]);
    const [telNo, setTelNo] = useState("");
    const [errorList, setErrorList] = useState([]);

    // 初期処理
    useEffect(() => {
        setIcons(marushe.icons);
        setMarusheName(marushe.marusheName);
        setZipcode(marushe.zipcode);
        setPrefectures(marushe.prefectures);
        setAddress1(marushe.address1);
        setAddress2(marushe.address2);
        setImages(marushe.images);
        setTelNo(marushe.telNo);
    }, [marushe]);

    // 住所検索
    const handleSreachAddress = (zipcode) => {
        axios.get(zipcloudURL, {
            adapter: axiosJsonpAdapter,
            params: {
                zipcode: zipcode
            }
        })
        .then(result => {
            const data = result.data;
            setPrefectures(data.results[0].prefcode);
            setAddress1(data.results[0].address2 + data.results[0].address3);
            console.log(getPrefectureName(data.results[0].prefcode));
        }).catch((error) => {
            alert('入力した郵便番号の住所が存在しません。');
        });
    };

    // マルシェ名コールバック
    const inputMarusheName = useCallback((e) => {
        setMarusheName(e.target.value);
    }, [setMarusheName]);

    // 郵便番号コールバック
    const inputZipcode = useCallback((e) => {
        if (e.target.value.length <= 7) {
            setZipcode(e.target.value);

            if (e.target.value.length === 7) {
                handleSreachAddress(e.target.value);
            }
        }
    }, [setZipcode]);

    // 都道府県コールバック
    const inputPrefectures = useCallback((e) => {
        setPrefectures(e.target.value);
    }, [setPrefectures]);

    // 住所1コールバック
    const inputAddress1 = useCallback((e) => {
        setAddress1(e.target.value);
    }, [setAddress1]);

    // 住所2コールバック
    const inputAddress2 = useCallback((e) => {
        setAddress2(e.target.value);
    }, [setAddress2]);

    // 電話番号コールバック
    const inputTelNo = useCallback((e) => {
        setTelNo(e.target.value);
    }, [setTelNo]);

    // 入力チェック
    const checkError = useCallback((
        icons, marusheName, zipcode, prefectures, address1
        , address2, telNo, images
    ) => {
        let checkList = [];
        if (!checkRequired(marusheName)) {
            const error = {
                message: 'マルシェ名は必須です。',
                target: 'marusheName'
            };
            checkList.push(error);
        }
        if (!checkRequired(zipcode)) {
            const error = {
                message: '郵便番号は必須です。',
                target: 'zipcode'
            };
            checkList.push(error);
        }
        if (!checkRequired(prefectures)) {
            const error = {
                message: '都道府県は必須です。',
                target: 'prefectures'
            };
            checkList.push(error);
        }
        if (!checkRequired(address1)) {
            const error = {
                message: '住所(市町村・番地)は必須です。',
                target: 'address1'
            };
            checkList.push(error);
        }
        if (!checkRequired(telNo)) {
            const error = {
                message: '電話番号は必須です。',
                target: 'telNo'
            };
            checkList.push(error);
        } else if (!checkNumber(telNo)) {
            const error = {
                message: '電話番号は数字です。',
                target: 'telNo'
            };
            checkList.push(error);
        }
        setErrorList(checkList);

        // エラーがない場合、確認画面へ遷移
        if (checkList.length === 0) {
            dispatch(saveMarusheInfo(
                icons, marusheName, zipcode, prefectures, address1
                , address2, telNo,images
            ));
        }
    }, [setErrorList, dispatch]);

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline">マルシェ申請</h2>
            <div className="module-spacer--medium" />
            <IconArea description={"マルシェアイコン"} icons={icons} setIcons={setIcons} />
            <TextInput
                fullWidth={true} label={"マルシェ名"} multiline={false} required={true}
                rows={1} type={"text"} value={marusheName} onChange={inputMarusheName}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'marusheName') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <div className={classes.zipcodeText}>
                <TextInput
                    fullWidth={true} label={"郵便番号(ﾊｲﾌﾝなし)"} multiline={false} required={true}
                    rows={1} type={"text"} value={zipcode} onChange={inputZipcode}
                />
            </div>
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'zipcode') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <SelectBox 
                id={"zipcode"} value={prefectures} label={"都道府県"} onChange={inputPrefectures}
                list={prefecturesList}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'prefectures') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"市町村・番地"} multiline={false} required={true}
                rows={1} type={"text"} value={address1} onChange={inputAddress1}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'address1') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <TextInput
                fullWidth={true} label={"ビル名等"} multiline={false} required={false}
                rows={1} type={"text"} value={address2} onChange={inputAddress2}
            />
            <TextInput
                fullWidth={true} label={"電話番号"} multiline={false} required={true}
                rows={1} type={"text"} value={telNo} onChange={inputTelNo}
            />
            {errorList.length > 0 && (
                errorList.map((error, id) => (
                    (error.target === 'telNo') && (
                        <p className="u-text-error" key={id}>{'*' + error.message}</p>
                    )
                ))
            )}
            <ImageArea description={"マルシェバナー等"} images={images} setImages={setImages} />

            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"確認画面へ"}
                    onClick={() => checkError(
                        icons, marusheName, zipcode, prefectures, address1
                        , address2, telNo, images
                    )}
                />
            </div>
        </div>
    );
};

export default MarusheRequest;