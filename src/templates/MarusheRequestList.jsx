import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {push} from 'connected-react-router';
import {ApprovalListItem} from '../components/Marushes';
import {fetchMarushes} from '../reducks/marushes/operations';
import {getApprovalMarushes} from '../reducks/marushes/selectors';
import {getRole} from '../reducks/users/selectors';

const MarusheRequestList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const approvalList = getApprovalMarushes(selector);
    const role = getRole(selector);

    // 初期処理
    useEffect(() => {
        // URL直接打たれたの場合、Homeへ遷移
        if (role.length === 0) {
            dispatch(push('/'));
        } else {
            dispatch(fetchMarushes());
        }
    }, [dispatch, role]);

    return (
        <section className="c-section-wrapin">
            {approvalList.length > 0 && (
                approvalList.map(approval => (
                    <ApprovalListItem
                        key={approval.marushe_id}
                        id={approval.marushe_id}
                        marusheName={approval.marushe_name}
                        icons={approval.icons}
                        approvalRequestName={approval.approval_request_username}
                        approvalRequestAt={approval.approval_request_at}
                    />
                ))
            )}
        </section>
    );
};

export default MarusheRequestList;