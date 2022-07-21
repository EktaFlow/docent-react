import {IonItem, IonCheckbox, IonLabel} from '@ionic/react';
import './ChooseThreads.scss'
const ChooseThreads: React.FC<({ threads: any, setThreads: any })> = ({ threads, setThreads }) => {

  // const [th, setTh] = useState({t: true, a: true, b: true, c: true, d: true, e: true, f: true, g: true, h: true, i: true});

  // useEffect(() => {
  //
  // }, [])

  // function changeThreads(event, value) {
  //
  // }

  return(
    <div className="choose-threads-wrapper">
      <h3>Choose Threads</h3>
      <p>Unselecting a thread will remove it from your MRA. Typically, all threads are selected.</p>
      <div className="choose-threads-inner">
        <div className="left-side-picks">
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.t} onIonChange={e => setThreads({...threads, ['t']: !threads.t})} slot="start" color="dsb" />
            <IonLabel>Technology Maturity</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.a} slot="start" color="dsb" />
            <IonLabel>A. Technology & Industrial Base</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.b} slot="start" color="dsb" />
            <IonLabel>B. Design</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.c} slot="start" color="dsb" />
            <IonLabel>C. Cost & Funding</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.d} slot="start" color="dsb" />
            <IonLabel>D. Materials</IonLabel>
          </IonItem>
        </div>
        <div className="right-side-picks">
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.e} slot="start" color="dsb" />
            <IonLabel>E. Process Capability & Control</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.f} slot="start" color="dsb" />
            <IonLabel>F. Quality Management</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.g} slot="start" color="dsb" />
            <IonLabel>G. Mfg Personnel</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.h} slot="start" color="dsb" />
            <IonLabel>H. Facilities</IonLabel>
          </IonItem>
          <IonItem color="docentlight"   >
            <IonCheckbox checked={threads.i} slot="start" color="dsb" />
            <IonLabel>I. Mfg Management</IonLabel>
          </IonItem>
        </div>
      </div>
    </div>
  )
}
export default ChooseThreads;
