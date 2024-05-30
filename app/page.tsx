
import { Fragment } from 'react'
import styles from "./page.module.css";
import Container from 'react-bootstrap/Container';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer'
import cover from '../public/frontCover2.jpeg'
import Image from 'next/image'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';




export default function Home() {
  return (
    <Fragment>

      <Header />
    <div className={styles.page}>
      
      <Image className={styles.banner} src={cover} alt="front banner" />
      <br/>
      <Container>
        <h3>This is the Title page for the LMS</h3>
      </Container>
      
    </div>
    <Footer/>
    </Fragment>
  );
}
