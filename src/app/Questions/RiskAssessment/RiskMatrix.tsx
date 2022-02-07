import './RiskMatrix.scss';

const RiskMatrix: React.FC = () => {
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
            <tr className="matrix-row">
              <th id="51m" className="low-risk-cell m51"></th>
              <th id="52m" className="med-risk-cell m52"></th>
              <th id="53m" className="high-risk-cell m53"></th>
              <th id="54m" className="high-risk-cell m54"></th>
              <th id="55m" className="high-risk-cell m55"></th>
            </tr>
            <tr className="matrix-row">
              <th id="41m" className="low-risk-cell m41"></th>
              <th id="42m" className="med-risk-cell m42"></th>
              <th id="43m" className="med-risk-cell m43"></th>
              <th id="44m" className="high-risk-cell m44"></th>
              <th id="45m" className="high-risk-cell m45"></th>
            </tr>
            <tr className="matrix-row">
              <th id="31m" className="low-risk-cell m31"></th>
              <th id="32m" className="low-risk-cell m32"></th>
              <th id="33m" className="med-risk-cell m33"></th>
              <th id="34m" className="med-risk-cell m34"></th>
              <th id="35m" className="high-risk-cell m35"></th>
            </tr>
            <tr className="matrix-row">
              <th id="21m" className="low-risk-cell m21"></th>
              <th id="22m" className="low-risk-cell m22"></th>
              <th id="23m" className="low-risk-cell m23"></th>
              <th id="24m" className="med-risk-cell m24"></th>
              <th id="25m" className="med-risk-cell m25"></th>
            </tr>
            <tr className="matrix-row">
              <th id="11m" className="low-risk-cell m11"></th>
              <th id="12m" className="low-risk-cell m12"></th>
              <th id="13m" className="low-risk-cell m13"></th>
              <th id="14m" className="low-risk-cell m14"></th>
              <th id="15m" className="med-risk-cell m15"></th>
            </tr>
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
    // <table className="risk-matrix-table">
    //   <tr className="matrix-row">
    //     <th id="51m" className="low-risk-cell m51"></th>
    //     <th id="52m" className="med-risk-cell m52"></th>
    //     <th id="53m" className="high-risk-cell m53"></th>
    //     <th id="54m" className="high-risk-cell m54"></th>
    //     <th id="55m" className="high-risk-cell m55"></th>
    //   </tr>
    //   <tr className="matrix-row">
    //     <th id="41m" className="low-risk-cell m41"></th>
    //     <th id="42m" className="med-risk-cell m42"></th>
    //     <th id="43m" className="med-risk-cell m43"></th>
    //     <th id="44m" className="high-risk-cell m44"></th>
    //     <th id="45m" className="high-risk-cell m45"></th>
    //   </tr>
    //   <tr className="matrix-row">
    //     <th id="31m" className="low-risk-cell m31"></th>
    //     <th id="32m" className="low-risk-cell m32"></th>
    //     <th id="33m" className="med-risk-cell m33"></th>
    //     <th id="34m" className="med-risk-cell m34"></th>
    //     <th id="35m" className="high-risk-cell m35"></th>
    //   </tr>
    //   <tr className="matrix-row">
    //     <th id="21m" className="low-risk-cell m21"></th>
    //     <th id="22m" className="low-risk-cell m22"></th>
    //     <th id="23m" className="low-risk-cell m23"></th>
    //     <th id="24m" className="med-risk-cell m24"></th>
    //     <th id="25m" className="med-risk-cell m25"></th>
    //   </tr>
    //   <tr className="matrix-row">
    //     <th id="11m" className="low-risk-cell m11"></th>
    //     <th id="12m" className="low-risk-cell m12"></th>
    //     <th id="13m" className="low-risk-cell m13"></th>
    //     <th id="14m" className="low-risk-cell m14"></th>
    //     <th id="15m" className="med-risk-cell m15"></th>
    //   </tr>
    // </table>
  )
}

export default RiskMatrix;
