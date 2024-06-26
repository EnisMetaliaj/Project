
import React ,{ useEffect, useState } from 'react'
import './App.css'
import MovieBox from './MovieBox';
import 'bootstrap/dist/css//bootstrap.min.css'
import { Navbar,Container,Nav,Form,FormControl, Button } from 'react-bootstrap';

const api_url="https://api.themoviedb.org/3/movie/popular?api_key=1d1d8844ae1e746c459e7be85c15c840"
const api_search="https://api.themoviedb.org/3/search/movie?api_key=1d1d8844ae1e746c459e7be85c15c840&query"

function App() {
  const[movies,setMovies]=useState([]);
  const[query,setQuery]=useState('')
    
  useEffect(()=>{

fetch(api_url)
.then((res)=>res.json())
.then(data=>{

  console.log(data)
  setMovies(data.results)
})

  },[])

const searchMovie=async(e)=>{
  e.preventDefault();
  console.log("Searching")
  try{
const url=`https://api.themoviedb.org/3/search/movie?api_key=1d1d8844ae1e746c459e7be85c15c840&query=${query}`;
const res=await fetch(url);
const data=await res.json();
console.log(data)
setMovies(data.results)
  }
  catch(e){
console.log(e)
  }
}
  const changeHandler=(e)=>{
    setQuery(e.target.value)

  }

  return (
    <>
<Navbar bg="dark" expand="lg" variant="dark">

  <Container fluid>
    <Navbar.Brand href="/home">MovieDB App</Navbar.Brand>
    <Navbar.Brand href="/home">Trending</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>


      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-3" style={{maxHeight:'100px'}} navbarScroll></Nav>
        <Form className='d-flex' onSubmit={searchMovie}>

        <FormControl
        type="search"
        placeholder="Movie search"
        className="me-2"       
         aria-label="search"
         name="query"
         value={query} onChange={changeHandler}></FormControl>
         <Button variant="secondary" type="Submit">Search</Button>
         </Form>

      </Navbar.Collapse>
    

  </Container>
</Navbar>

<div>
  {movies.length>0 ? (
    <div className='container'>
      <div className='grid'>
      {movies.map((movieReq)=><MovieBox key={movieReq.id} {...movieReq} />)}

      </div>
      
      </div>
  
  ):(
    <h2>Sorry!!!-NO MOVIES FOUND</h2>
  )}


     
</div>

   
    </>
  )
}

export default App;
