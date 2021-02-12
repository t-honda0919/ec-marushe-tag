import {saveUserInfoAction, signInAction, signOutAction} from './actions';
import {push} from 'connected-react-router';
import {auth, db , FirebaseTimestamp} from '../../firebase';

const marushesRef = db.collection('marushes');
const usersRef = db.collection("users");

// サインイン状態確認
export const listenAuthState = ()  => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                // サインインしている場合
                const uid = user.uid;
                let approval = 0;

                usersRef.doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data();
                        if (!data) {
                            throw new Error('ユーザーデータが存在しません。')
                        }

                        // marushesの申請情報取得
                        if (data.marushe_id.length > 0) {
                            marushesRef.doc(data.marushe_id).get()
                                .then(snapshot => {
                                    const data_marushe = snapshot.data();
                                    if (!data_marushe) {
                                        throw new Error('マルシェデータが存在しません。')
                                    }
                                    approval = data_marushe.approval;

                                    dispatch(signInAction({
                                        approval: approval,
                                        icons: data.icons,
                                        isSignedIn: true,
                                        marusheId: data.marushe_id,
                                        role: data.role,
                                        uid: uid,
                                        username: data.username
                                    }));
                            });
                        } else {
                            dispatch(signInAction({
                                approval: approval,
                                icons: data.icons,
                                isSignedIn: true,
                                marusheId: data.marushe_id,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }));
                        }
                    });
            } else {
                // サインインしていない場合
                dispatch(push('/'));
            }
        });
    };
};

// ユーザー情報の保存
export const saveUserInfo = (
    username,
    email,
    password,
    confirmPassword,
    lastname,
    firstname,
    lastnameKana,
    firstnameKana,
    icons,
    yearOfBirth,
    monthOfBirth,
    dayOfBirth) => {

    return async (dispatch, getState) => {
        const userState = getState().users;

        userState.username = username;
        userState.email = email;
        userState.password = password;
        userState.confirmPassword = confirmPassword;
        userState.lastname = lastname;
        userState.firstname = firstname;
        userState.lastnameKana = lastnameKana;
        userState.firstnameKana = firstnameKana;
        userState.icons = icons;
        userState.yearOfBirth = yearOfBirth;
        userState.monthOfBirth = monthOfBirth;
        userState.dayOfBirth = dayOfBirth;

        dispatch(saveUserInfoAction(userState));

        // 取得後、アカウント登録確認画面へ遷移
        dispatch(push('/registar/confirm'));
    };
};

// サインイン
export const signIn = (email, password) => {
    return async (dispatch) => {
        // Validation
        // 必須チェック
        if (email === '' || password === '') {
            alert('必須項目が未入力です');
            return false;
        }

        // サインイン
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;

                // auth機能でユーザー認証後、usersコレクションからユーザー情報取得
                if (user) {
                    const uid = user.uid;

                    usersRef.doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data();

                            dispatch(signInAction({
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }));

                            // 取得後、Homeへ遷移
                            dispatch(push('/'));
                        });
                }
            });
    };
};

// サインアウト
export const signOut = () => {
    return async (dispatch) => {
        // サインアウト
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push('/login'));
            });
    }
};

// ユーザー登録
export const signUp = () => {
    return async (dispatch, getState) => {
        const userState = getState().users;

        // ユーザー登録
        return auth.createUserWithEmailAndPassword(userState.email, userState.password)
            .then(result => {
                const user = result.user;

                // auth機能でユーザー登録後、usersコレクションに登録
                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();

                    const userInitialData = {
                        address1: "",
                        address2: "",
                        create_at: timestamp,
                        email: userState.email,
                        day_of_birth: userState.dayOfBirth,
                        fistname: userState.firstname,
                        fistname_kana: userState.firstnameKana,
                        icons: userState.icons,
                        marushe_id: "",
                        month_of_birth: userState.monthOfBirth,
                        lastname: userState.lastname,
                        lastname_kana: userState.lastnameKana,
                        payment: "",
                        prefectures: "",
                        zipcode: "",
                        role: "none",
                        tel_no: "",
                        uid: uid,
                        updated_at: timestamp,
                        username: userState.username,
                        year_of_birth: userState.yearOfBirth
                    };

                    // usersコレクション登録
                    usersRef.doc(uid).set(userInitialData).then(async () => {
                        dispatch(push('/'));
                    });
                }
            }).catch((error) => {
                alert('アカウント登録に失敗しました。もう1度お試しください。');
                throw new Error(error);
            });
    };
};