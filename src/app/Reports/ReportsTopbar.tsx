import { } from '@ionic/react';

import './ReportsTopbar.scss';

const ReportsTopbar: React.FC<{ text: String }> = ({text}) => {
    return (
        <div className="reports-topbar-wrapper">
            <h1>{text}</h1>
        </div>
    )
}
export default ReportsTopbar;
