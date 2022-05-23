import React, { useEffect, Fragment } from 'react';
import './FilePopover.scss';

const FilePopover: React.FC<{ files?: any, question_id?: any }> = ({ files, question_id }) => {
    useEffect(() => {
        if (files) {
            console.log(files);
        }
    }, [files]);

    const openURL = (url: any) => {
        window.open(url)
    }

    return (
        <div className="file-popover-content">
            <div className="header">
                <h2>File Explorer</h2>
            </div>

            {/* <div className="secondary-header">
                <p>Recently Added</p>
            </div> */}

            <div className="secondary-header">
                <p>Current Files</p>
            </div>

            {files.map((file: any, index: any) => (
                file.questions.length !== 0 &&
                <Fragment>
                    {file.questions[0].id === question_id &&
                        <div className="files">
                            <p>{file.name} | <span>Uploaded: {file.created_at.slice(0, 10)}</span> | <span className="open-file" onClick={() => openURL(file.url)}><u>Open File</u></span></p>
                        </div>}
                </Fragment>
            ))}

            <div className="secondary-header">
                <p>All Files</p>
            </div>

            {files && files.map((file: any, index: any) => (
                <Fragment>
                    {file.url !== null && <div className="files">
                        <p>{file.name} | <span>Uploaded: {file.created_at.slice(0, 10)}</span> | <span className="open-file" onClick={() => openURL(file.url)}><u>Open File</u></span></p>
                    </div>}
                </Fragment>
            ))}
        </div>
    )
}

export default FilePopover;
