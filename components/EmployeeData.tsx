'use client'

import {useState, useEffect, Fragment} from 'react'
import { projectFirestore } from '../FirebaseConfig';
import { query, where, orderBy, doc, updateDoc, setDoc, getDocs, collection} from 'firebase/firestore'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column' 
import { useRouter } from 'next/navigation'
import { DataContext, useDataContext } from '@/context/DataContext';

import classes from './CompanyData.module.css'

const EmployeeData = () => {
    const [employeeData, setEmployeeData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRow, setSelectedRow] = useState<any>();
    const router = useRouter();
    const {updateRowData, selection} = useDataContext();

    

    useEffect(()=>{
        let results:object[]=[];
        const fetchData = async () => {
        const collectionRef = collection(projectFirestore, "users")
        const q = query(collectionRef, where("Company_Name", "==", `${selection.Name}`))
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
        },[]) 



        //console.log(selection.Name)

        const sendToEmployeesPage = (e:any) => {
            updateRowData(e);
            router.push('/employees/courses')
        }

        let thisCompaniesUsers:object[] = [];
        if(employeeData){
          employeeData.map((user:any)=>{
            if(user.Company_Name === selection.Name ){
              return thisCompaniesUsers.push(user)
            }
          })
        }

        console.log(thisCompaniesUsers)
    

    if(loading){
      return <h3>Loading data...</h3>
    } else {

    return <Fragment>
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
            </Fragment>
    }
}

export default EmployeeData;