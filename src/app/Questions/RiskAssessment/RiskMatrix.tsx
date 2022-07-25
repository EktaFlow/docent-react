import React, { useState, useEffect } from 'react';

import './RiskMatrix.scss';

const RiskMatrix: React.FC<{ likelihood: number | undefined, consequence: number | undefined, riskScore: number | undefined }> = ({ likelihood, consequence, riskScore }) => {

  const [matrix, setMatrix] = useState([
    [null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ]);

  useEffect(() => {
    if (likelihood && consequence && riskScore) {
      let copyMatrix: any = [
        [null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ];
      copyMatrix[likelihood][consequence] = riskScore;
      setMatrix(copyMatrix);
      // console.log(copyMatrix)
    }
    else {
      resetMatrix(); 
    }
  }, [riskScore]);

  const resetMatrix = () => {
    setMatrix([
      [null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ]);
  }

  return (
    <div className="matrix-wrapper">

      <div className="matrix-top-wrapper">
        <div className="y-axis-wrapper">
          <div className="y-axis-label">
            <h4>Likelihood</h4>
          </div>
          <div className="y-axis-arrow-wrapper">
            <div className="y-axis-arrow-head-wrapper">
              <div className="y-axis-arrow-head"></div>
            </div>
            <div className="y-axis-arrow-body"></div>
          </div>
        </div>

        <table className="risk-matrix-table">
          <tbody>
            <tr className="matrix-row">
              <th id="51m" className="low-risk-cell m51">{matrix[5][1]}</th>
              <th id="52m" className="med-risk-cell m52">{matrix[5][2]}</th>
              <th id="53m" className="high-risk-cell m53">{matrix[5][3]}</th>
              <th id="54m" className="high-risk-cell m54">{matrix[5][4]}</th>
              <th id="55m" className="high-risk-cell m55">{matrix[5][5]}</th>
            </tr>
            <tr className="matrix-row">
              <th id="41m" className="low-risk-cell m41">{matrix[4][1]}</th>
              <th id="42m" className="med-risk-cell m42">{matrix[4][2]}</th>
              <th id="43m" className="med-risk-cell m43">{matrix[4][3]}</th>
              <th id="44m" className="high-risk-cell m44">{matrix[4][4]}</th>
              <th id="45m" className="high-risk-cell m45">{matrix[4][5]}</th>
            </tr>
            <tr className="matrix-row">
              <th id="31m" className="low-risk-cell m31">{matrix[3][1]}</th>
              <th id="32m" className="low-risk-cell m32">{matrix[3][2]}</th>
              <th id="33m" className="med-risk-cell m33">{matrix[3][3]}</th>
              <th id="34m" className="med-risk-cell m34">{matrix[3][4]}</th>
              <th id="35m" className="high-risk-cell m35">{matrix[3][5]}</th>
            </tr>
            <tr className="matrix-row">
              <th id="21m" className="low-risk-cell m21">{matrix[2][1]}</th>
              <th id="22m" className="low-risk-cell m22">{matrix[2][2]}</th>
              <th id="23m" className="low-risk-cell m23">{matrix[2][3]}</th>
              <th id="24m" className="med-risk-cell m24">{matrix[2][4]}</th>
              <th id="25m" className="med-risk-cell m25">{matrix[2][5]}</th>
            </tr>
            <tr className="matrix-row">
              <th id="11m" className="low-risk-cell m11">{matrix[1][1]}</th>
              <th id="12m" className="low-risk-cell m12">{matrix[1][2]}</th>
              <th id="13m" className="low-risk-cell m13">{matrix[1][3]}</th>
              <th id="14m" className="low-risk-cell m14">{matrix[1][4]}</th>
              <th id="15m" className="med-risk-cell m15">{matrix[1][5]}</th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="matrix-bottom-wrapper">
        <div className="x-axis-wrapper">
          <div className="x-axis-arrow-wrapper">
            <div className="x-axis-arrow-head-wrapper">
              <div className="x-axis-arrow-head"></div>
            </div>
            <div className="x-axis-arrow-body"></div>
          </div>
          <div className="x-axis-label-wrapper">
            <h4>Consequence</h4>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RiskMatrix;
