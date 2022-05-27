import React, { useEffect, Fragment, useState } from 'react';
import './FilePopover.scss';

const FilePopover: React.FC<{ saveFileToQuestion?: any, files?: any, question_id?: any }> = ({ saveFileToQuestion, files, question_id }) => {
    const [currentFiles, setCurrentFiles] = useState<any>([]);
    const [allFiles, setAllFiles] = useState<any>([]);

    useEffect(() => {
        if (files) {
            setCurrentFiles([]);
            setAllFiles([]);
            console.log(files);
            console.log(question_id);
            let insertFileData = files.map((file: any, index: any) => {
                let attachedToQuestion = false;
                let questionArray: { id: number }[] = [];
                file.questions.map((question: any, index: any) => {
                    questionArray.push({ id: question.id })
                    if (question.id === question_id) {
                        attachedToQuestion = true
                    }
                })
                if (attachedToQuestion) {
                    setCurrentFiles((fileData: any) => [...fileData, {
                        name: file.name,
                        date: file.created_at.slice(0, 10),
                        url: file.url,
                        id: file.id,
                        question_id: questionArray
                    }])
                }
                setAllFiles((fileData: any) => [...fileData, {
                    name: file.name,
                    date: file.created_at.slice(0, 10),
                    url: file.url,
                    id: file.id,
                    inQuestion: attachedToQuestion
                }])
            });
        }
    }, [files]);

    const openURL = (url: any) => {
        window.open(url)
    }

    const fileToQuestion = (file_id: any) => {
        saveFileToQuestion(file_id)
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

            {currentFiles.map((file: any, index: any) => (
                <div className="files">
                    <p>{file.name} | <span>Uploaded: {file.date}</span> | <span className="open-file" onClick={() => openURL(file.url)}><u>Open File</u></span></p>
                </div>
            ))}

            <div className="secondary-header">
                <p>All Files</p>
            </div>

            {allFiles.map((file: any, index: any) => (
                <div className="files">
                    <p>{file.name} | <span>Uploaded: {file.date}</span> | <span className="open-file" onClick={() => openURL(file.url)}><u>Open File</u></span>
                        {!file.inQuestion &&
                            <span className="open-file" onClick={() => fileToQuestion(file.id)}> | <u>Add File to Current Question</u></span>
                        }
                    </p>
                </div>
            ))}

            {/* {files && files.map((file: any, index: any) => (
                <Fragment>
                    {file.url !== null && <div className="files">
                        <p>{file.name} | <span>Uploaded: {file.created_at.slice(0, 10)}</span> | <span className="open-file" onClick={() => openURL(file.url)}><u>Open File</u></span>
                            {file.questions[0].id !== question_id &&
                                <span className="open-file" onClick={() => fileToQuestion(file.id)}> | <u>Add File to Current Question</u></span>
                            }
                        </p>
                    </div>}
                </Fragment>
            ))} */}
        </div>
    )
}

export default FilePopover;
