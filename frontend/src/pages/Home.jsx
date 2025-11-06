
import React from 'react'
import Hero from '../components/Hero'
import Latestcollection from '../components/Latestcollection'
import Title from '../components/Title'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
const Home = () => {
  return (
    <div>
      <Hero/>
      <Latestcollection/>
      <BestSellers/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
