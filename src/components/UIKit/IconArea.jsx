import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/styles';
import {storage} from '../../firebase';
import NoImage from '../../assets/img/src/no_image.png';

const useStyles = makeStyles({
    'icon': {
        display: 'inline-block',
    },
    'iconImage': {
        width: 150,
        height: 150,
        borderRadius: '50% 50% 50% 50%'
    },
    'iconLabel': {
        marginTop: '10px',
        fontSize: '10px',
    }
})

const IconArea = (props) => {
    const classes = useStyles();
    const icons = props.icons;

    // 画像の削除
    const deleteIcon = useCallback(async(id) => {
        const newIcons = icons.filter(icon => icon.id !== id);
        props.setIcons(newIcons);

        return storage.ref("icons").child(id).delete();
    }, [icons, props]);

    // 画像のアップロード
    const uploadIcon = useCallback((e, icon) => {

        if (e.target.files.length > 0) {
            // 前回の画像削除
            if (icon.length > 0) {
                deleteIcon(icon[0].id);
            }
        
            const file = e.target.files;
            let blob = new Blob(file, {type: 'image/jpeg'});

            // Generate random 16 digits strings
            const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const N = 16;
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('');

            const uploadRef = storage.ref('icons').child(fileName);
            const uploadTask = uploadRef.put(blob);

            uploadTask.then(() => {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const newIcon = {id: fileName, path: downloadURL};
                    props.setIcons((prevState => [...prevState, newIcon]));
                });
            });
        }
    }, [deleteIcon, props]);

    return (
        <div className="center">
            <label className={classes.icon}>
                {icons.length === 0 ? (
                    <img src={NoImage} alt="iconImage" className={classes.iconImage} />
                ) : (
                    <img src={icons[0].path} alt="iconImage" className={classes.iconImage} />
                )}
                <input className="u-display-none" type="file" id="image"
                    onChange={(e) => uploadIcon(e, icons)}
                />
            </label>
            {icons.length === 0 && (
                <div className={classes.iconLabel}>{props.description + "の設定が可能です。"}</div>
            )}
        </div>
    );
};

export default IconArea;