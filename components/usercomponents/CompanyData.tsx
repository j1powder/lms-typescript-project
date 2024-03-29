'use client'

import {useState, useEffect, Fragment, useContext} from 'react'
import { projectFirestore } from '../../FirebaseConfig';
import { query, orderBy, doc, updateDoc, setDoc, getDocs, collection} from 'firebase/firestore'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button';      
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'  
import { useRouter } from 'next/navigation';   
import { DataContext, DataContextProvider, useDataContext } from '@/context/DataContext';  
import Link from 'next/link'               


import classes from './CompanyData.module.css'



const CompanyData = () => {
 const [myData, setMyData] = useState<any>();
 const [loading, setLoading] = useState<boolean>(true);
 const [progressData, setProgressData] = useState<any>();
 const [selectedRow, setSelectedRow] = useState<any>();
 const router = useRouter();
 const {updateRowData, selection} = useDataContext();


    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(projectFirestore, "companies"));
        //const q = query(querySnapshot, orderBy('Name'))
      
        querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return results.push({id: doc.id, ...doc.data()});
        });
       
        setMyData(results);
        setLoading(false);
      }
      fetchData()
        },[])  
      

    //console.log(selection)

    if(loading){
        return <h4>Loading data....</h4>
    }    else {
        return <Fragment>
          <Card title="top page">
          <h5>Company Data Component</h5>
          <Button><Link href="/employees">See Below</Link></Button>
          </Card>
       <br/>

      <DataTable value={myData} 
                 showGridlines 
                 paginator 
                 rows={10} 
                 rowsPerPageOptions={[10, 25, 50]}
                 selectionMode="single" 
                 selection={selectedRow}
                 onSelectionChange={(e)=>{updateRowData(e); router.push('/employees'); console.log(selection); }}>

        <Column field="Name" filter header="Company" sortable></Column>
        <Column field="Status" filter header="Status"></Column>
        <Column field="Expires_On" header="Expiration"></Column>
        <Column field="Completed_Courses" header="Percent Complete"></Column>
      </DataTable>
  
    </Fragment>
    
    }

}

export default CompanyData; 

