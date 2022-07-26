import React, { useEffect, Fragment, useState } from 'react';
import { IonButton } from '@ionic/react';
import './FilePopover.scss';

const FilePopover: React.FC<{ saveFileToQuestion?: any, files?: any, question_id?: any, deleteQuestionFile: any, deleteAssessmentFile: any }> = ({ saveFileToQuestion, files, question_id, deleteQuestionFile, deleteAssessmentFile }) => {
    const [currentFiles, setCurrentFiles] = useState<any>([]);
    const [allFiles, setAllFiles] = useState<any>([]);

    const [fileIndex, setFileIndex] = useState();
    const [showQuestions, setShowQuestions] = useState(false);

    useEffect(() => {
        // console.log(files)
        if (files) {
            setCurrentFiles([]);
            setAllFiles([]);
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
                    }])
                }
                setAllFiles((fileData: any) => [...fileData, {
                    name: file.name,
                    date: file.created_at.slice(0, 10),
                    url: file.url,
                    id: file.id,
                    questions: file.questions,
                    inQuestion: attachedToQuestion
                }])
            });
        }
    }, [files]);

    // useEffect(() => {
    //     if (allFiles) {
    //         console.log(allFiles)
    //     }
    // }, [allFiles]);

    const openURL = (url: any) => {
        window.open(url)
    }

    const fileToQuestion = (file_id: any) => {
        saveFileToQuestion(file_id)
    }

    const deleteQF = (file_id: any) => {
        deleteQuestionFile(file_id)
    }

    const deleteAF = (file_id: any) => {
        deleteAssessmentFile(file_id)
    }

    const clickViewFiles = (index: any) => {
        if (index !== fileIndex) {
            setShowQuestions(true);
        }
        else {
            setShowQuestions(!showQuestions);
        }
        setFileIndex(index);
    }

    return (
        <div className="file-popover-content">
            <div className="header">
                <h2>File Explorer</h2>
                {/* <IonButton>X</IonButton> */}
            </div>

            {/* <div className="secondary-header">
                <p>Recently Added</p>
            </div> */}

            <div className="secondary-header">
                <p>Current Files</p>
            </div>

            {currentFiles.map((file: any, index: any) => (
                <div className="files">
                    <p>{file.name} | <span>Date: {file.date}</span> | <span className="open-file" onClick={() => openURL(file.url)}>View File</span> | <span className="delete-file-question" onClick={() => deleteQF(file.id)}>Remove File from Current Question</span></p>
                </div>
            ))}

            <div className="secondary-header">
                <p>All Files</p>
            </div>

            {allFiles.map((file: any, index: any) => (
                <div className="files" key={index}>
                    <p>{file.name} | <span>Date: {file.date}</span> | <span className="open-file" onClick={() => openURL(file.url)}>View File </span> | <span className="delete-file-assessment" onClick={() =>deleteAF(file.id)}>Delete File from Assessment</span> | <span className="open-questions" onClick={() => clickViewFiles(index)}>List of Questions Attached</span>
                        {!file.inQuestion &&
                            <span> | <span className="open-file" onClick={() => fileToQuestion(file.id)}> Add File to Current Question</span></span>
                        }
                    </p>
                    {showQuestions && index === fileIndex &&
                        <Fragment>
                            {file.questions.map((question: any, index2: any) => (
                                <div className="questions">
                                    <p>{question.question_num}</p>
                                </div>))}
                            <IonButton color="dsb" onClick={() => clickViewFiles(index)}>Close Questions</IonButton>
                        </Fragment>
                    }
                </div>
            ))}
        </div>
    )
}

export default FilePopover;
