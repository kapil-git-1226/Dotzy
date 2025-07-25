import React, { useEffect } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import * as Yup from 'yup';
import Error from './error';
import { useState } from 'react';
import useFetch from '@/hooks/use-fetch';
import { login } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';


const Login = () => {
    const [errors,setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longlink = searchParams.get('createNew');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const {data, error, loading, fn:fnLogin} = useFetch(login, formData);
    const {fetchUser} = UrlState();

    useEffect(() => {
        if(error==null && data){
            navigate(`/dashboard?${longlink ? `createNew=${longlink}`: ""}`);
            fetchUser();
        }
    }, [data,error])

    const handleLogin = async() => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6,"Password must be at least 6 characters").required("Password is required"),
            });

            await schema.validate(formData, { abortEarly: false });

            // api call
            await fnLogin(formData);


        }catch(e){
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }


  return (
      <Card>
          <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>to your account if you already have one</CardDescription>
              {error && <Error message ={error.message}/>}
          </CardHeader>
          <CardContent className="space-y-2">
              <div className='space-y-1'>
                <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange}/>
                {errors.email && <Error message={errors.email} />}
              </div>
              <div className='space-y-1'>
                  <Input name="password" type="password" placeholder="Enter Password" onChange={handleInputChange}/>
                  {errors.password && <Error message={errors.password} />}
              </div>
          </CardContent>
          <CardFooter onClick={handleLogin} >
                <Button> 
                  {loading ? <BeatLoader size={10} color="black"/>:"Login"}
                </Button>
          </CardFooter>
      </Card>
  )
}

export default Login;