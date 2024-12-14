import React from 'react'
import HomeCarousel from './utils/HomeCarousel'
import Netmeds from "../assets/netmeds.png"
import Pharmeasy from "../assets/pharmeasy.png"
import TataMg from "../assets/tata-1mg.png"
import ApolloPharmacy from "../assets/appolopharmacy.jpeg"
import DawaiWala from "../assets/dawaibala.png"
import { Link } from 'react-router-dom'


const Companies = [{
    id: 1,
    name: 'Netmeds',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    logo: Netmeds,
    link: "https://www.netmeds.com/"

}, {
    id: 2,
    name: 'Pharmeasy',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: Pharmeasy,
    link: "https://pharmeasy.in/"

},
{
    id: 3,
    name: 'Tata 1Mg',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    logo: TataMg,
    link: "https://www.1mg.com/"

},
{
    id: 4,
    name: 'Apollo Pharmacy',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    logo: ApolloPharmacy,
    link: "https://www.apollopharmacy.in/"

},
{
    id: 5,
    name: 'DawaiWala',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    logo: DawaiWala,
    link: "https://www.dawaiwala.com/"

},


]

const Home = () => {
    return (
        <div className='max-md:mt-[120px] bg-[#F1FAFE] mt-[80px] w-screen flex items-center justify-center'>
            <div className='w-screen flex flex-col  justify-center '>

                <div className='flex flex-row px-[10px] gap-[20px] justify-between items-center mb-[10px]'>
                    {
                        Companies.map((company) => (
                            <Link to={company?.link} key={company.id} className='flex flex-1 flex-row flex-wrap items-center justify-center border-l-[1px] border-r-[1px] hover:scale-105 transition-all duration-100 cursor-pointer'>
                                <div className='flex flex-col items-center justify-center '>
                                    <img src={company.logo} alt={company.name} className=' max-md:h-[25px] w-max h-[40px] object-cover ' />
                                    {/* <h3>{company.name}</h3> */}

                                </div>
                            </Link>
                        ))
                    }


                </div>
                <div className='bg-[#166328] py-[20px]'>
                    <HomeCarousel />

                </div>

            </div>

        </div>
    )
}

export default Home