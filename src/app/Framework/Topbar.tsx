import { } from '@ionic/react';

import './Topbar.scss';

const Topbar: React.FC<{ text: String }> = ({ text }) => {
    return (
        <div className="general-topbar-wrapper">
            <h1>{text}</h1>
        </div>
    )
}
export default Topbar;