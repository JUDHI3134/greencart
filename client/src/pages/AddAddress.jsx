import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

//input field component
const InputField = ({type, placeholder, name, handleChange, address}) => (
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
        
    />
)


const AddAddress = () => {

    const { axios, user, navigate } = useAppContext();


    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post("/api/address/add", {address})
            if (data.success) {
                toast.success(data.message)
                navigate("/cart")
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/cart")
        }
    },[])


  return (
    <div className='mt-16 pb-16'>
          <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
          
          <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
              <div className='flex-1 max-w-md'>
                  <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                      
                    <div className='grid grid-cols-2 gap-4'>
                      <InputField handleChange={handleChange} name='firstName' address={address} type='text' placeholder='First name' />    
                      <InputField handleChange={handleChange} name='lastName' address={address} type='text' placeholder='Last name' />    
                      </div>
                      
                      <InputField handleChange={handleChange} name='email' address={address} type='email' placeholder='Email Address' />  
                      <InputField handleChange={handleChange} name='street' address={address} type='text' placeholder='Street' />  

                      <div className='grid grid-cols-2 gap-4'>
                      <InputField handleChange={handleChange} name='city' address={address} type='text' placeholder='City' />    
                      <InputField handleChange={handleChange} name='state' address={address} type='text' placeholder='State' />    
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                      <InputField handleChange={handleChange} name='zipcode' address={address} type='number' placeholder='Zip Code' />    
                      <InputField handleChange={handleChange} name='country' address={address} type='text' placeholder='Country' />    
                      </div>
                      <InputField handleChange={handleChange} name='phone' address={address} type='phone' placeholder='Phone Number' /> 

                      <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition uppercase cursor-pointer'>Save Address</button>
                      

                  </form>  
              </div>
              <img src={assets.add_address_iamge} className='md:mr-16 mb-16 md:mt-0' alt="" />
          </div>

    </div>
  )
}

export default AddAddress
