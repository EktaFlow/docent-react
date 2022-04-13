import React, {useState, useEffect} from 'react'
import './Components.scss';
import {IonButton, IonContent, IonList, IonItem, IonListHeader} from '@ionic/react';

type FPP = {
  filters: {
    listBy: string
  },
  setFilters: React.Dispatch<React.SetStateAction<object>>
}

const FilterPopover: React.FC<FPP> = (props) =>  {
  const [openListBy, setOpenListBy] = useState(false)
  function dismissPopover(){
    console.log('close')
  }

  function changeListBy(change:string) {
    var f = props.filters
    f["listBy"] = change;
    props.setFilters(f)
  }


  return(
    <IonContent>
      <IonList>
        <IonListHeader>Filter Assessments</IonListHeader>
        <IonItem
          onClick={() => setOpenListBy(!openListBy)}
          button
        >List By: {props.filters.listBy}</IonItem>
        {
          openListBy &&
          <>
            <IonItem button onClick={() => changeListBy('created_at_old')}>Created At - Old to New</IonItem>
            <IonItem button onClick={() => changeListBy('created_at_new')}>Created At - New to Old</IonItem>
            <IonItem button onClick={() => changeListBy('mrl')}>MRL</IonItem>
            <IonItem button onClick={() => changeListBy('completion')}>Percent Complete</IonItem>
          </>
        }
      </IonList>
    </IonContent>
  )
};

export default FilterPopover;
