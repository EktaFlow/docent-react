import { } from '@ionic/react';

import './HelpTopbar.scss';

const HelpTopbar: React.FC<{ text: String }> = ({ text }) => {
    return (
        <div className="help-topbar-wrapper">
            <h1>{text}</h1>
        </div>
    )
}
export default HelpTopbar;
