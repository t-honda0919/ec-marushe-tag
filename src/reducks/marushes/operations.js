import {fetchMarushesAction, saveMarusheInfoAction} from './actions';
import {push} from 'connected-react-router';
import {db , FirebaseTimestamp} from '../../firebase';

const marushesRef = db.collection('marushes');
const usersRef = db.collection('users');

const APPROVAL_PENDING = 1;

// マルシェ情報取得
export const fetchMarushes = () => {
    return async (dispatch) => {
        marushesRef.orderBy("approval_request_at", "asc").where('approval', '==' , APPROVAL_PENDING).get()
            .then(snapshots => {
                const marusheList = [];
                snapshots.forEach(snapshot => {
                    const marushe = snapshot.data();

                    marusheList.push(marushe);
                });
                
                dispatch(fetchMarushesAction(marusheList));
            });
    };
};

// マルシェ情報の保存
export const saveMarusheInfo = (
    icons,
    marusheName,
    zipcode,
    prefectures,
    address1,
    address2,
    telNo,
    images) => {

    return async (dispatch, getState) => {
        const marusheState = getState().marushes;

        marusheState.icons = icons;
        marusheState.marusheName = marusheName;
        marusheState.zipcode = zipcode;
        marusheState.prefectures = prefectures;
        marusheState.address1 = address1;
        marusheState.address2 = address2;
        marusheState.telNo = telNo;
        marusheState.images = images;

        dispatch(saveMarusheInfoAction(marusheState));

        // 取得後、マルシェ申請確認画面へ遷移
        dispatch(push('/marushe_request/confirm'));
    };
};

// マルシェ登録
export const marusheRegistar = () => {
    return async (dispatch, getState) => {
        const marusheState = getState().marushes;
        const uid = getState().users.uid;
        const username = getState().users.username;
        const ref = marushesRef.doc();
        const marushe_id = ref.id;

        const timestamp = FirebaseTimestamp.now();

        const marusheInitialData = {
            approval: 1,
            approval_uid: uid,
            approval_request_at: timestamp,
            approval_request_username: username,
            address1: marusheState.address1,
            address2: marusheState.address2,
            create_at: timestamp,
            icons: marusheState.icons,
            images: marusheState.images,
            marushe_id: marushe_id,
            marushe_name: marusheState.marusheName,
            prefectures: marusheState.prefectures,
            tel_no: marusheState.telNo,
            updateed_at: timestamp,
            zipcode: marusheState.zipcode
        };

        // marushesコレクション登録
        marushesRef.doc(marushe_id).set(marusheInitialData).then(async () => {
            // usersのmarushe_idの為、user情報取得
            usersRef.doc(uid).get().then(snapshot => {
                const data = snapshot.data();
                
                data.marushe_id = marushe_id;
                data.updateed_at = timestamp;

                // marushe_idの更新
                usersRef.doc(uid).set(data, {merge: true}).then(() => {
                    dispatch(push("/"));
                }).catch((error) => {
                    throw new Error(error);
                });
            }).catch((error) => {
                throw new Error(error);
            });
        });
    };
};