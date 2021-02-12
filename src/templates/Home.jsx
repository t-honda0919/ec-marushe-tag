import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getApproval, getMarusheId, getRole} from '../reducks/users/selectors';

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const marusheId = getMarusheId(selector);
    const approval = getApproval(selector);
    const role = getRole(selector);

    return (
        <div className="center">
            <div>ようこそ！ マルシェへ</div>
            <div>{'マルシェID:' + marusheId}</div>
            <div>{'マルシェ申請状況:' + approval}</div>
            <div>{'権限:' + role}</div>
        </div>
        

    );
};

export default Home;