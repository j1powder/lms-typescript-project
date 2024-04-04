'use client'

import {useState, useEffect, Fragment} from 'react'
import { projectFirestore } from '../../FirebaseConfig';
import { query, where, orderBy, doc, updateDoc, setDoc, getDocs, collection} from 'firebase/firestore'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column' 
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { useRouter } from 'next/navigation'
import { DataContext, useDataContext } from '@/context/DataContext';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { useLocalStorage } from '@/helper-function/HelperFunctions';
import Link from 'next/link';

import classes from './CompanyData.module.css'

const EmployeeData = () => {
    const [employeeData, setEmployeeData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRow, setSelectedRow] = useState<any>();
    const router = useRouter();
    const {updateRowData, selection} = useDataContext();
    const { updateEmployeeData, empSelection} = useEmployeeContext();
    const company = useLocalStorage('CompanyName').trim()

    
    
    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const collectionRef = collection(projectFirestore, "users")
        
        const q = query(collectionRef, where("Company_Name", "==", `${company}`));
        // if(selection !== undefined && selection.Name){
        //   q = query(collectionRef, where("Company_Name", "==", `${selection.Name}`))
        // } else {
        //   q = query(collectionRef, where("Company_Name", "==", `${company}`)) 
        // }
        
        const querySnapshot = await getDocs(q);
        //const q = query(querySnapshot, orderBy('Name'))
      
        querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return results.push({id: doc.id, ...doc.data()});
        });
       
        setEmployeeData(results);
        setLoading(false);
      }
        
          fetchData()
      
        },[company]) 
       
       
        
        //console.log(employeeData)
        //console.log(company)


        const sendToEmployeesPage = (e:any) => {
            updateEmployeeData(e);
            localStorage.setItem("EmployeeName", e.value.Name)
            router.push('/employees/courses')
        }
    

    if(loading){
      return <Card>
        <Link href="/dashboard"><Button>Back</Button></Link>
        <h3>Loading data...</h3>
        </Card>
    } else {

    return <Fragment>

<Card >
<Link href="/dashboard"><Button>Back</Button></Link>
          <h5>Company Data Component</h5>
          <h5>{company}</h5>
          
       <br/>


        <DataTable value={employeeData} 
                 showGridlines 
                 paginator 
                 rows={10} 
                 rowsPerPageOptions={[10, 25, 50]}
                 selectionMode="single" 
                 selection={selectedRow}
                 onSelectionChange={sendToEmployeesPage}>

        <Column field="Name" filter header="Name"></Column>
        <Column field="Company_Name" filter header="Company"></Column>
        <Column field="Email" header="Email"></Column>
        <Column field="Status" header="Status"></Column>
      </DataTable>
      </Card>
            </Fragment>
    }
}

export default EmployeeData;