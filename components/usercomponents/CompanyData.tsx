'use client'

import {useState, useEffect, Fragment, useContext} from 'react'
import { projectFirestore } from '../../FirebaseConfig';
import { query, orderBy, doc, updateDoc, setDoc, getDocs, collection} from 'firebase/firestore'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Card  from 'react-bootstrap/Card'
import { Button } from 'primereact/button';      
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'  
import { useRouter } from 'next/navigation';   
import { DataContext, DataContextProvider, useDataContext } from '@/context/DataContext';
import Pagination from 'react-bootstrap/Pagination';


import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

import Link from 'next/link'               


import classes from './CompanyData.module.css'
import { arrayBuffer } from 'stream/consumers';




const CompanyData = (props:any) => {
 const [myData, setMyData] = useState<any>();
 const [loading, setLoading] = useState<boolean>(true);
 const [progressData, setProgressData] = useState<any>();
 const [selectedRow, setSelectedRow] = useState<any>();
 const [activeStatus, setActiveStatus] = useState<boolean>(false)
 const [currentPage, setCurrentPage] = useState<any>()
 const [currentArray, setCurrentArray] = useState<any>()
 const [postsPerPage, setPostsPerPage] = useState<Number>(10)
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



      

    

    let items = [];
    let chunk = 20
    let active = 1
    let arr1;
    let arr2;
    let arr3;
    let arr4;
    let arr5;
    let arr6;
    let arr7;
    let arr8;
    let arr9;
    let arr10;
    let arr11;
    let arr12;



    if(myData){
      for (let number = 1; number <= 12; number++) {
        items.push(
          <Pagination.Item key={number} active={number === active}>
          
            {number}
            
         </Pagination.Item>,
        );
      }

      // arr1 = myData.splice(0, chunk);
      // arr2 = myData.splice(0, chunk);
      // arr3 = myData.splice(0, chunk);
      // arr4 = myData.splice(0, chunk);
      // arr5 = myData.splice(0, chunk);
      // arr6 = myData.splice(0, chunk);
      // arr7 = myData.splice(0, chunk);
      // arr8 = myData.splice(0, chunk);
      // arr9 = myData.splice(0, chunk);
      // arr10 = myData.splice(0, chunk);
      // arr11 = myData.splice(0, chunk);
      // arr12 = myData.splice(0, chunk);

    }


    const handlePagination = (number:any) => {
      setCurrentPage(number);
    };

    console.log(currentPage)


    if(loading){
        return <h4>Loading data....</h4>
    }    else {
        return <Fragment>
          <Card style={{padding:'1rem'}}>
          <Container>
            <Row className={classes.rowMargin}>
              <Col className={classes.gridItems} md={4}><b>Company</b></Col>
              <Col className={classes.gridItems} md={2}><b>Status</b></Col>
              <Col className={classes.gridItems} md={3}><b>Expires</b></Col>
              <Col className={classes.gridItems} md={3}><b>Percentage Complete</b></Col>
              </Row>
              <hr/>
        
                {myData && myData.map((data:any)=>{
                  return <Fragment key={data.id}>
                    <Row className={classes.rowMargin}>
                    <Col className={classes.gridItems} style={{fontWeight:"550"}} md={4}>{data.Name}</Col>
                    <Col className={classes.gridItems} md={2} style={data.Status === "Activated" ? {fontWeight:"500", color:"green"}: {color:"red"}}>{data.Status}</Col>
                    <Col className={classes.gridItems} md={3}>{data.Expires_On}</Col>
                    <Col className={classes.gridItems} md={3}>{data.Completed_Courses}</Col>
                    </Row>
                    <hr/>
                    
                    </Fragment>
                })}
              <Pagination >{items && items.map((item)=>{               
                return <span key={item.key} onClick={()=>{setCurrentPage(item.key)}}>{item}</span>
              })}</Pagination>

{/*                 <Pagination>
                  <Pagination.Item>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Item>{4}</Pagination.Item>
                  <Pagination.Item>{5}</Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination> */}
                
              
            
          </Container>


          <h5>Company Data Component</h5>
{/*       <PrimeReactProvider value={{unstyled:true}}>   
      <DataTable value={myData} 
                 showGridlines
                 paginator 
                 rows={10} 
                 rowsPerPageOptions={[10, 25, 50]}
                 selectionMode="single" 
                 selection={selectedRow}
                 onSelectionChange={(e)=>{updateRowData(e); router.push('/employees'); console.log(selection); localStorage.setItem("CompanyName", e.value.Name) }}>

        <Column field="Name" filter header="Company" sortable></Column>
        <Column field="Status" filter header="Status"></Column>
        <Column field="Expires_On" header="Expiration"></Column>
        <Column field="Completed_Courses" header="Percent Complete"></Column>
      </DataTable>
      </PrimeReactProvider>  */}
      </Card>
    </Fragment>
    
    }

}

export default CompanyData; 

