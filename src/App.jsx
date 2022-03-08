import { useEffect ,useState} from 'react';
import './App.css';
const PORT =  'https://exam-3-server-3p5sy.ondigitalocean.app';

function App() {
  const [homeorder, setHomeorder] = useState([])
  const [company, setCompany] = useState([])
  const [complex, setComplex] = useState([])

  useEffect(()=>{
    fetch(`${PORT}/homeorder`)
    .then(res => res.json())
    .then(data => setHomeorder(data))
  },[])

  useEffect(()=>{
    fetch(`${PORT}/companies`)
    .then(res => res.json())
    .then(data => setCompany(data))
  },[])


  const handleComplex1 = (e)=>{
    e.preventDefault()
    const elements = e.target.value

    fetch(`${PORT}/complex/?companieId=${elements}`)
    .then(res => res.json())
    .then(data => setComplex(data))
  }

   const handleCopm = (e)=>{
    e.preventDefault()
    const comp = e.target.elements.compa.value
    fetch(`${PORT}/companies`,{
      method: "post",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({comp})
    })
    .then(res => res.json())
    .then(data => console.log(data))
    console.log(comp);
   }

   const handleCopmlex = (e)=>{
    e.preventDefault()
    const complex = e.target.elements.complex.value
    const comp = e.target.elements.compa.value

    fetch(`${PORT}/complex`,{
      method: "post",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({complex,comp})
    })
    .then(res => res.json())
    .then(data => console.log(data))
   }

   const handleHouses = (e)=>{
    e.preventDefault()
    const elements = e.target.elements

    const address = elements.address.value
    const room = elements.room.value
    const price = elements.price.value
    const complex = elements.complex.value
    const comp = elements.compa.value

    fetch(`${PORT}/houses`,{
      method: "post",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({address,room,price,complex,comp})
    })
    .then(res => res.json())
    .then(data => console.log(data))

   }

    const btnCom = ()=>{
      document.querySelector('.copm').style.display = 'block'
      document.querySelector('.branch').style.display = 'none'
      document.querySelector('.houses').style.display = 'none'
    }
    const btnComplex = ()=>{
      document.querySelector('.copm').style.display = 'none'
      document.querySelector('.branch').style.display = 'block'
      document.querySelector('.houses').style.display = 'none'
    }
    const btnHouses = ()=>{
      document.querySelector('.copm').style.display = 'none'
      document.querySelector('.branch').style.display = 'none'
      document.querySelector('.houses').style.display = 'block'
    }
  return (
    <div className='company'>
      <div className='btn-list'>
        <button onClick={btnCom}>Add company</button>
        <button onClick={btnComplex}>Add complex</button>
        <button onClick={btnHouses}>Add house</button>
      </div>
      <div  className='copm'>
        <h3>Add company</h3>
        <form action="/" onSubmit={handleCopm}>
          <input name='compa' type="text"  placeholder='Company name' required/>
          <button type='submit'>Save</button>
        </form>
      </div>

      <div  className='branch'>
        <h3>Add complax</h3>
        <form action="/"  onSubmit={handleCopmlex}>
          <input type="text" name='complex' placeholder='Complex name' required/>
          <select  name="compa" id="">
          <option value="1">Companie</option>
            {
              company && company.map((e, i)=>(
                <option value={e.companie_id} key={i}> {e.companie_name}</option>
              ))
            }
            </select>
          <button type='submit'>Save</button>
        </form>
      </div>
      <div  className='houses'>
        <h3>Add houses</h3>
        <form action="/" onSubmit={handleHouses}>
          <input name='address' type="text"  placeholder='House address' required/>
          <input name='room' type="number"  placeholder='House room' required/>
          <input name='price' type="number"  placeholder='House price' required/>
          <select onChange={handleComplex1} name="compa" id="">
            <option value="1">Companie</option>
            {
              company && company.map((e, i)=>(
                <option value={e.companie_id} key={i}> {e.companie_name}</option>
              ))
            }
            </select>
            <select name="complex" id="">
            <option value="1">Complex</option>
            {
              complex && complex.map((e, i)=>(
                <option value={e.branch_id} key={i}> {e.branch_name}</option>
              ))
            }
            </select>
          <button type='submit'>Save</button>
        </form>
      </div>
      <h2>Uy sotib olgan haridorlar</h2>
      <table className='bank'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Tel</th>
            <th>Companie</th>
            <th>Complax</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {homeorder && homeorder.map((e,i)=>(
          <tr key={i}>
            <td>{e.order_id}</td>
            <td>{e.client_name}</td>
            <td>{e.client_phone}</td>
            <td>{e.companie_name} </td>
            <td>{e.branch_name} </td>
            <td><mark>{e.house_room }</mark> hona</td>
          </tr>
          ))}
        </tbody>
      </table>
   </div>
  );
}

export default App;
